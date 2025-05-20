// app/posts/[id]/page.js

import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/posts'

export default async function PostDetailPage({ params }) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <article className="prose">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
