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
    <main>
      <h1 className="text-xl font-bold mb-4">글 작성</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full h-40 mb-2"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        작성 완료
      </button>
    </main>
  );
}
