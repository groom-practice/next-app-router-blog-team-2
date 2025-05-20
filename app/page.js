// app/page.js
import Link from "next/link";
import SearchBox from "../components/SearchBox";

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home({ searchParams }) {
  const keyword = searchParams?.q || "";
  const category = searchParams?.category || "";

  const allPosts = await getPosts();
  const filteredPosts = allPosts.filter((post) => {
    const matchesKeyword = post.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesCategory = category ? post.category === category : true;
    return matchesKeyword && matchesCategory;
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">블로그 글 목록</h1>
      <SearchBox />
      <div className="flex gap-2 mt-2">
        {["All", "React", "Next.js", "JavaScript"].map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/" : `/?category=${cat}`}
            className="text-blue-500 underline"
          >
            {cat}
          </Link>
        ))}
      </div>
      <ul className="mt-4">
        {filteredPosts.map((post) => (
          <li key={post.id} className="border-b py-2">
            <Link href={`/posts/${post.id}`} className="text-lg text-blue-600">
              {post.title}
            </Link>
            <span className="ml-2 text-sm text-gray-500">
              [{post.category}]
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}