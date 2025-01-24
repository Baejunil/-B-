import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";

function MiniHomePage() {
  const [miniHomeData, setMiniHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndMiniHome = async () => {
      try {
        // 1. localStorage에서 토큰 가져온 직후
        const token = localStorage.getItem("token");
        console.log("[MiniHomePage] Retrieved Token:", token);

        if (!token) {
          throw new Error("로그인이 필요합니다. 다시 로그인해주세요.");
        }

        // 2. fetch 하기 직전
        console.log("[MiniHomePage] Fetch user info with token:", token);

        const userResponse = await fetch("http://localhost:8080/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
        }

        const currentUser = await userResponse.json();
        console.log("[MiniHomePage] Fetched user info:", currentUser);

        // 3. miniHomeInfo 가져오기 직전
        console.log("[MiniHomePage] Fetch miniHome info with token:", token);
        const miniHomeResponse = await fetch(
          `http://localhost:8080/api/minihome/${currentUser.data.userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!miniHomeResponse.ok) {
          throw new Error("미니홈 정보를 가져오는 데 실패했습니다.");
        }

        const miniHomeResult = await miniHomeResponse.json();
        console.log("[MiniHomePage] Fetched miniHome info:", miniHomeResult);

        setMiniHomeData({
          ...miniHomeResult,
          user: currentUser,
        });
      } catch (err) {
        console.error("[MiniHomePage] 오류 발생:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndMiniHome();
  }, []);

  const updateBackground = (fileUrl) => {
    setMiniHomeData((prev) => ({
      ...prev,
      background: fileUrl,
    }));
  };

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  if (error) return <div>{error}</div>;
  if (!miniHomeData || !miniHomeData.user)
    return <div>미니홈 정보를 불러올 수 없습니다.</div>;

  return (
    <div>
      <Profile
        user={miniHomeData.user}
        miniHomeData={miniHomeData}
        updateBackground={updateBackground}
      />
    </div>
  );
}

export default MiniHomePage;
