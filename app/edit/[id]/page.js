"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }) {
  const { id } = params; // *수정 : use() X. -> 그냥 동기적으로 꺼내기!
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error(err);
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    }
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    router.push(`/posts/${id}`);
  };

  return (
    <main className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6 m-4">
      <h1 className="text-2xl font-bold mb-6">글 수정</h1>
      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full h-40 mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpdate}
      >
        수정 완료
      </button>
    </main>
  );
}
