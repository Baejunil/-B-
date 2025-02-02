import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Friends.css";

function Friends({ currentUser }) {
  const [users, setUsers] = useState([]); // 전체 사용자 목록
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]); // 친구 목록
  const [pendingRequests, setPendingRequests] = useState([]); // 받은 팔로우 요청 목록
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 전체 사용자 목록 가져오기
        const allUsersRes = await axios.get("http://localhost:8080/friends/all");
        setUsers(allUsersRes.data);

        // 내가 팔로우한 사용자 목록 가져오기
        const friendsRes = await axios.get(`http://localhost:8080/friends/${currentUser}`);
        setFriends(friendsRes.data.map(f => f.friendUser.userId)); // API 응답 구조 반영

        // 내가 받은 팔로우 요청 목록 가져오기
        const pendingRes = await axios.get(`http://localhost:8080/friends/pending/${currentUser}`);
        setPendingRequests(pendingRes.data);

      } catch (err) {
        console.error("API 요청 오류:", err);
        setError("정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  /**
   * [POST] 친구 요청 보내기 (PENDING 상태로 저장)
   */
  const handleSendRequest = async (receiverId) => {
    console.log("팔로우 요청 데이터:", { userId: currentUser, friendUserId: receiverId });

    try {
      await axios.post("http://localhost:8080/friends/request", {
        userId: currentUser,
        friendUserId: receiverId,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("팔로우 요청을 보냈습니다.");

    } catch (err) {
      console.error("팔로우 요청 오류:", err.response ? err.response.data : err.message);
      alert("팔로우 요청 중 오류가 발생했습니다.");
    }
  };

  /**
   * [PATCH] 친구 요청 수락
   */
  const handleAcceptRequest = async (requestId) => {
    try {
      await axios.patch("http://localhost:8080/friends/accept", null, {
        params: { requestId },
      });

      alert("팔로우 요청을 수락했습니다.");

      // 목록에서 제거
      setPendingRequests(prev => prev.filter(request => request.requestId !== requestId));

      // 친구 목록 갱신
      const friendsRes = await axios.get(`http://localhost:8080/friends/${currentUser}`);
      setFriends(friendsRes.data.map(f => f.friendUser.userId));

    } catch (err) {
      console.error("팔로우 요청 수락 오류:", err.response ? err.response.data : err.message);
      alert("팔로우 요청 수락 중 오류가 발생했습니다.");
    }
  };

  /**
   * [DELETE] 친구 요청 거절
   */
  const handleRejectRequest = async (requestId) => {
    try {
      await axios.delete("http://localhost:8080/friends/reject", {
        params: { requestId },
      });

      alert("팔로우 요청을 거절했습니다.");

      // 목록에서 제거
      setPendingRequests(prev => prev.filter(request => request.requestId !== requestId));

    } catch (err) {
      console.error("팔로우 요청 거절 오류:", err.response ? err.response.data : err.message);
      alert("팔로우 요청 거절 중 오류가 발생했습니다.");
    }
  };

  /**
   * [DELETE] 친구 삭제 요청
   */
  const handleUnfollow = async (friendUserId) => {
    console.log("언팔로우 요청 데이터:", { userId: currentUser, friendUserId });

    try {
      await axios.delete("http://localhost:8080/friends/unfollow", {
        params: { userId: currentUser, friendUserId },
      });

      alert("언팔로우 성공");

      // 언팔로우 후 최신 친구 목록 다시 가져오기
      const friendsRes = await axios.get(`http://localhost:8080/friends/${currentUser}`);
      setFriends(friendsRes.data.map(f => f.friendUser.userId));

    } catch (err) {
      console.error("언팔로우 요청 오류:", err.response ? err.response.data : err.message);
      alert("언팔로우 중 오류가 발생했습니다.");
    }
  };

  // 본인 계정 제외한 검색 결과 필터링
  const filteredUsers = users
    .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(user => currentUser && user.userId !== currentUser); // ✅ currentUser가 null일 경우 대비

  // 내가 해당 유저를 팔로우했는지 확인
  const isFollowing = (userId) => {
    return friends.includes(userId); // API 응답 구조를 반영하여 수정
  };

  return (
    <div className="friends-container">
      <h2>회원 목록</h2>

      <input
        type="text"
        placeholder="회원 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {error && <div className="error-message">{error}</div>}
      {loading && <div>로딩 중...</div>}

      {/* 받은 친구 요청 목록 */}
      <h2>일촌 요청</h2>
      {pendingRequests.length === 0 ? (
        <p>받은 일촌 요청이 없습니다.</p>
      ) : (
        pendingRequests.map(request => (
          <div key={request.requestId} className="user-card">
            <span>{request.requester.userId}님의 요청</span>
            <button onClick={() => handleAcceptRequest(request.requestId)}>수락</button>
            <button onClick={() => handleRejectRequest(request.requestId)}>거절</button>
          </div>
        ))
      )}

      <h2>회원 목록</h2>
      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          filteredUsers.map((user) => {
            const followed = isFollowing(user.userId);
            return (
              <div key={user.userId} className="user-card">
                <span>{user.username}</span>
                {followed ? (
                  <button onClick={() => handleUnfollow(user.userId)}>언팔로우</button>
                ) : (
                  <button onClick={() => handleSendRequest(user.userId)}>팔로우 요청</button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Friends;
