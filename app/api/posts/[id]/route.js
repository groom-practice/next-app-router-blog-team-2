// app/api/posts/[id]/route.js
import { getPostById, posts } from "../../../../data/data";

// GET
export async function GET(_, { params }) {
  const { id } = await params; // *수정: await params
  const post = posts.find((p) => p.id === id); // *수정: params.id(X)

  if (!post) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }
  return Response.json(post);
}

// PUT
export async function PUT(req, { params }) {
  const { id } = await params; // *수정: await params
  const body = await req.json();
  const post = posts.find((p) => p.id === id); // *수정: params.id(X)

  if (!post) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  post.title = body.title ?? post.title;
  post.content = body.content ?? post.content;

  return Response.json(post);
}

// DELETE
export async function DELETE(_, { params }) {
  const { id } = await params; // *수정: await params
  const index = posts.findIndex((p) => p.id === id); // *수정: params.id(X)
  if (index === -1) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  posts.splice(index, 1);
  return Response.json({ message: "Deleted" });
}
