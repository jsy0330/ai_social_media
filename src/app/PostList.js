"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function PostList({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {posts
        .filter((post) => post.userId === user.userId) // 내 게시물만
        .map((post) => (
          <div
            key={post.id}
            className="p-4 bg-gray-50 rounded-lg shadow-sm border"
          >
            <p className="text-gray-800 font-medium">{post.text}</p>
            <p className="text-sm text-gray-500">
              {post.userId} (그룹 {post.groupId}) •{" "}
              <span className="font-semibold text-blue-500">
                {post.visibility}
              </span>
            </p>
          </div>
        ))}
    </div>
  );
}
