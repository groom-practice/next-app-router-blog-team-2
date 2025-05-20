// app/posts/[id]/page.js
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPage({ params }) {
  const resolvedParams = await params; // *수정 : 여기서 await 해주기
  // const { id } = params;
  const { id } = resolvedParams; // *수정 : resolvedParams에서 id 받아와야함

  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const post = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
    </main>
  );
}
