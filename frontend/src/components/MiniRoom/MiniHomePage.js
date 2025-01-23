import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";

function MiniHomePage() {
  const [miniHomeData, setMiniHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가
  //const [currentUser, setCurrentUser] = useState(null);



  useEffect(() => {
    const fetchUserAndMiniHome = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("로그인이 필요합니다. 다시 로그인해주세요.");
        }

        // 사용자 정보 가져오기
        const userResponse = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.status === 401) {
          throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        }

        if (!userResponse.ok) {
          throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
        }

        const currentUser = await userResponse.json();
        //setCurrentUser(userData.data)

        //console.log(`currentUser값---------->${userData.data} `)
        //console.log(currentUser.userId)
        // 로그인한 사용자 미니홈 정보 가져오기
        const miniHomeResponse = await fetch(
          `http://localhost:8080/api/minihome/${currentUser.data.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (miniHomeResponse.status === 401) {
          throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        }

        if (!miniHomeResponse.ok) {
          throw new Error("미니홈 정보를 가져오는 데 실패했습니다.");
        }

        const miniHomeData = await miniHomeResponse.json();

        // miniHomeData에 user 정보 포함
        setMiniHomeData({
          ...miniHomeData,
          user: currentUser,
        });
      } catch (err) {
        console.error("오류 발생:", err.message);
        setError(err.message); // 에러 메시지 설정
        setMiniHomeData(null);

        // 인증 에러일 경우 로컬스토리지에서 토큰 제거
        if (err.message.includes("인증이 만료")) {
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndMiniHome();
  }, []);
  
    console.log(miniHomeData)

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  if (error) return <div>{error}</div>; // 에러 메시지 표시
  if (!miniHomeData || !miniHomeData.user)
    return <div>미니홈 정보를 불러올 수 없습니다.</div>;

  return (
    <div style={{ display: "flex" }}>
      {/* Profile 컴포넌트로 miniHomeData의 user 전달 */}
      <Profile user={miniHomeData.user} miniHomeData={miniHomeData} />
      
    </div>
  );
}

export default MiniHomePage;
