"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => {
        if (res.status === 404) router.push("/not-found");
        return res.json();
      })
      .then(setPost);
  }, [id, router]);

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  if (!post) return <p>로딩 중...</p>;

  return (
    <main>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="my-4">{post.content}</p>
      <div className="space-x-2">
        <Link href={`/edit/${id}`} className="text-blue-600 underline">
          수정
        </Link>
        <button onClick={handleDelete} className="text-red-600 underline">
          삭제
        </button>
      </div>
    </main>
  );
}