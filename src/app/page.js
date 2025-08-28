"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import PostForm from "./PostForm";
import PostList from "./PostList";

// 사용자 ID → 색상 매핑 함수
function getColorForUser(userId) {
  const colors = [
    "bg-orange-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-teal-400",
    "bg-indigo-400",
    "bg-lime-400",
  ];
  const numericId = parseInt(userId, 10); // 학번이 숫자라고 가정
  if (isNaN(numericId)) {
    return colors[0]; // 숫자가 아니면 기본색
  }
  return colors[numericId % colors.length];
}

export default function Home() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-blue-100 to-yellow-100">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        {/* 상단 사용자 정보 */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${getColorForUser(
              user.userId
            )}`}
          >
            {user.userId.slice(-2)}
          </div>
          <div>
            <p className="font-semibold text-gray-800">ID {user.userId}</p>
            <p className="text-sm text-gray-500">Group {user.groupId}</p>
          </div>
        </div>

        {/* 글 작성 폼 */}
        <PostForm user={user} />

        {/* 글 목록 */}
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">내 게시물</h3>
          <PostList user={user} />
        </div>
      </div>
    </div>
  );
}
