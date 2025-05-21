// app/posts/[id]/page.js
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { useRouter } from "next/navigation";

// async function getPost(id) {
//   const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) return null;
//   return res.json();
// }

// export default async function PostDetailPage({ params }) {
//   const post = await getPost(params.id);

//   if (!post) return notFound();

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
//       <p className="mb-4">{post.content}</p>

//       <div className="space-x-4">
//         {/* 수정 버튼 */}
//         <Link href={`/edit/${post.id}`} className="text-blue-600">
//           수정
//         </Link>

//         {/* 삭제 버튼 */}
//         <DeleteButton id={post.id} />
//       </div>
//     </main>
//   );
// }

// // 클라이언트 컴포넌트로 분리
// ("use client");
// function DeleteButton({ id }) {
//   const router = useRouter();

//   const handleDelete = async () => {
//     const confirmed = confirm("정말 삭제하시겠습니까?");
//     if (!confirmed) return;

//     await fetch(`/api/posts/${id}`, {
//       method: "DELETE",
//     });

//     router.push("/"); // 홈으로 이동
//   };

//   return (
//     <button onClick={handleDelete} className="text-red-600">
//       삭제
//     </button>
//   );
// }

// 코드 수정
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
    <main className="m-4 space-y-4">
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
