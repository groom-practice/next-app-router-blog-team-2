"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [text, setText] = useState("");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setText(q);
  }, [searchParams]);

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (text) {
      params.set("q", text);
    } else {
      params.delete("q");
    }

    router.push("?" + params.toString());
  };

  return (
    <form onSubmit={onSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="제목 검색어 입력"
        className="border px-3 py-1 rounded"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        검색
      </button>
    </form>
  );
}
