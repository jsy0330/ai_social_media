"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation"; // 🔑 페이지 이동용

export default function PostForm({ user }) {
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState("@public"); // 공개 범위 상태
  const router = useRouter();

  const submitPost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    await addDoc(collection(db, "posts"), {
      text,
      createdAt: serverTimestamp(),
      userId: user.userId,
      groupId: user.groupId,
      visibility, // 공개 범위 추가
    });

    setText(""); // 입력창 초기화
    router.push("/feed"); // 🔑 게시 완료 → 피드 페이지로 이동
  };

  return (
    <form
      onSubmit={submitPost}
      className="flex flex-col gap-3 p-4 border-b border-gray-200 bg-white rounded-lg shadow-sm"
    >
      {/* 공개 범위 선택 */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-gray-800">
          게시물을 볼 수 있는 사람:
        </label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="@public">@public</option>
          <option value="@friends">@friends</option>
        </select>
      </div>

      {/* 게시글 입력창 */}
      <textarea
        className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 placeholder:font-semibold"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="귀하의 면접 경험을 공유해 주세요."
      />

      {/* 버튼 */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-gray-600 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition"
        >
          게시하기
        </button>
      </div>
    </form>
  );
}
