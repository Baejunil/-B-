import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Friends.css";

function Friends({ currentUser }) {
  const [users, setUsers] = useState([]);         // 전체 사용자 목록
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);     // 내가 팔로우하고 있는 관계
  const [error, setError] = useState(null);       // 에러 메시지
  const [loading, setLoading] = useState(false);  // 로딩 상태

  // 컴포넌트 마운트/ currentUser 변경 시 친구 목록, 전체 유저 목록 가져오기
  useEffect(() => {
    // currentUser가 없으면 요청하지 않음
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1) 전체 유저 목록 (백엔드: /api/users/all)
        const allUsersRes = await axios.get("/api/users/all");
        setUsers(allUsersRes.data);

        // 2) 내가 현재 팔로우하는 friend 목록 (백엔드: /friends/{userId})
        const friendsRes = await axios.get(`/friends/${currentUser}`);
        setFriends(friendsRes.data);

      } catch (err) {
        console.error(err);
        setError("정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  /**
   * [POST] /friends/follow
   */
  const handleFollow = async (friendUserId) => {
    try {
      await axios.post("/friends/follow", {
        userId: currentUser,
        friendUserId,
      });
      // 로컬 state 갱신
      setFriends(prev => [...prev, { userId: currentUser, friendUserId }]);
    } catch (err) {
      console.error(err);
      alert("팔로우 중 오류가 발생했습니다.");
    }
  };

  /**
   * [DELETE] /friends/unfollow
   */
  const handleUnfollow = async (friendUserId) => {
    try {
      await axios.delete("/friends/unfollow", {
        params: { userId: currentUser, friendUserId },
      });
      // 로컬 state에서 제거
      setFriends(prev => prev.filter(f => f.friendUserId !== friendUserId));
    } catch (err) {
      console.error(err);
      alert("언팔로우 중 오류가 발생했습니다.");
    }
  };

  // 검색 필터 적용 (ex: user.username이 searchTerm를 포함)
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 해당 userId가 내 friend 목록에 있는지 판단
  const isFollowing = (userId) => {
    return friends.some(f => f.friendUserId === userId);
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

      {/* 에러 표시 */}
      {error && <div className="error-message">{error}</div>}
      {/* 로딩 표시 */}
      {loading && <div>로딩 중...</div>}

      {/* 유저 목록 표시 */}
      <div className="users-list">
        {filteredUsers.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          filteredUsers.map((user) => {
            // 본인 계정은 버튼 표시 X
            if (user.userId === currentUser) {
              return (
                <div key={user.userId} className="user-card">
                  <span>{user.username} (본인)</span>
                </div>
              );
            }

            const followed = isFollowing(user.userId);

            return (
              <div key={user.userId} className="user-card">
                <span>{user.username}</span>

                {followed ? (
                  <button onClick={() => handleUnfollow(user.userId)}>
                    언팔로우
                  </button>
                ) : (
                  <button onClick={() => handleFollow(user.userId)}>
                    팔로우
                  </button>
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
