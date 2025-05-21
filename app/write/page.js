"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        category: "React",
      }),
    });

    router.push("/");
  };

  return (
    <main className="m-4 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        📝 글 작성
      </h1>
      <input
        className="border border-gray-300 dark:border-gray-600 rounded-md p-3 w-full bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-300 dark:border-gray-600 rounded-md p-3 w-full h-40 bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition cursor-pointer"
        onClick={handleSubmit}
      >
        작성 완료
      </button>
    </main>
  );
}
