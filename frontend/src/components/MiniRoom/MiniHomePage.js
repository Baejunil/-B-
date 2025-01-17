import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";

function MiniHomePage() {
  const [miniHomeData, setMiniHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 현재 로그인된 사용자 정보
  useEffect(() => {
    const fetchUserAndMiniHome = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("토큰이 없습니다. 로그인이 필요합니다.");

        // 현재 사용자 정보 가져오기
        const userRes = await fetch("http://localhost:8080/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!userRes.ok) throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
        const currentUser = await userRes.json();

        // 미니홈 정보 가져오기
        const miniHomeRes = await fetch(`http://localhost:8080/api/minihome/${currentUser.userId}`);
        if (!miniHomeRes.ok) throw new Error("미니홈 정보를 가져오는 데 실패했습니다.");
        const miniHomeData = await miniHomeRes.json();

        // MiniHomeData에 User 정보 포함
        setMiniHomeData({
          ...miniHomeData,
          user: currentUser,
        });
      } catch (err) {
        console.error(err.message);
        setMiniHomeData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndMiniHome();
  }, []);

  if (loading) return <div>데이터를 불러오는 중입니다...</div>;
  if (!miniHomeData || !miniHomeData.user) return <div>미니홈 정보를 불러올 수 없습니다.</div>;

  return (
    <div style={{ display: "flex" }}>
      {/* Profile 컴포넌트로 miniHomeData의 user 전달 */}
      <Profile user={miniHomeData.user} />
    </div>
  );
}

export default MiniHomePage;
