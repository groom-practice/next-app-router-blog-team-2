import Link from "next/link";
import SearchBox from "./components/SearchBox";

export default async function Home({ searchParams }) {
  // 검색 및 카테고리 파라미터 설정
  const params = await searchParams;
  const category = params?.category || "";
  const query = params?.q?.toLowerCase() || "";

  // 게시글 fetch
  const response = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  const posts = await response.json();

  // 검색 및 카테고리 별로 게시글 필터링
  const filteredPosts = posts.filter((post) => {
    const filterQuery = post.title.toLowerCase().includes(query);
    const filterCategory = category ? post.category === category : true;
    return filterQuery && filterCategory;
  });

  return (
    <main className="m-4">
      <h1 className="text-2xl font-bold mb-4">블로그 글 목록</h1>
      <SearchBox />
      <div className="flex gap-2 mt-2">
        {["All", "React", "Next.js", "JavaScript"].map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/" : `/?category=${cat}`}
            className="text-blue-500 px-2 py-1 rounded hover:bg-blue-100 transition"
          >
            {cat}
          </Link>
        ))}
      </div>
      <ul className="mt-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id} className="border-b py-2">
              <Link
                href={`/posts/${post.id}`}
                className="text-lg text-blue-600 hover:font-semibold transition-colors duration-200"
              >
                {post.title}
              </Link>
              <span className="ml-2 text-sm text-gray-500">
                [{post.category}]
              </span>
            </li>
          ))
        ) : (
          <li> 검색 결과가 없습니다. </li>
        )}
      </ul>
    </main>
  );
}
