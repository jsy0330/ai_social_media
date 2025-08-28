"use client";

import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim() || !groupId.trim()) return;
    onLogin({ userId, groupId });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-blue-100 to-yellow-100">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-extrabold text-center mb-4 mt-6 text-gray-800">
          소셜 피드 입장
        </h2>

        {/* 설명 문구 */}
        <p className="text-sm text-gray-800 mt-6 mb-8 leading-snug text-center w-100 mx-auto">
          이 플랫폼은 익명으로 운영되는 가상의 소셜 미디어 플랫폼입니다. <br />
          <strong>사용자 ID(학번)</strong>와 <strong>그룹 번호(그룹 1~그룹 8)</strong>를 입력하세요. <br />
          <strong>그룹 번호는 반드시 실험 안내자의 안내에 따라 입력해 주세요.</strong> <br />
          입장 후 첫 메시지를 보내야 다른 사람들의 게시글을 볼 수 있습니다.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          {/* 사용자 ID 입력 */}
          <label className="flex flex-col text-sm font-medium text-gray-700 w-100">
            사용자 ID (학번):
            <input
              type="text"
              inputMode="numeric"
              placeholder="숫자만 입력"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>

          {/* 그룹 번호 선택 (드롭다운) */}
          <label className="flex flex-col text-sm font-medium text-gray-700 w-100">
            그룹 번호 (그룹 1~그룹 8):
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="mt-1 mb-6 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="" className="text-gray-400">
                그룹 번호 선택
              </option>
              <option value="1">그룹 1</option>
              <option value="2">그룹 2</option>
              <option value="3">그룹 3</option>
              <option value="4">그룹 4</option>
              <option value="5">그룹 5</option>
              <option value="6">그룹 6</option>
              <option value="7">그룹 7</option>
              <option value="8">그룹 8</option>
            </select>
          </label>

          <button
  type="submit"
  disabled={!userId.trim() || !groupId.trim()}
  className={`w-64 font-semibold px-4 py-2 rounded-lg shadow-md transition 
    ${!userId.trim() || !groupId.trim() 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
      : "bg-gradient-to-r from-blue-500 to-purple-400 text-white hover:opacity-85"}`}
>
  입장하기
</button>

        </form>
      </div>
    </div>
  );
}
