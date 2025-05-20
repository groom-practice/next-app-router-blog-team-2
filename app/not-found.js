// app/not-found.js
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="mt-4">
        존재하지 않는 경로이거나 삭제된 글입니다.
      </p>
      <Link href="/" className="text-blue-600 underline mt-6 inline-block">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
