import Link from "next/link";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  const posts = await response.json();

  return (
    <main className="p-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">블로그 글 목록</h1>
        <ul className="mt-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b py-2">
              <Link
                href={`/posts/${post.id}`}
                className="text-lg text-blue-600"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
