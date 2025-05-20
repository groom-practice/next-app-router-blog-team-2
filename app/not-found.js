// app/not-found.js
export default function NotFound() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">페이지를 찾을 수 없습니다.</h1>
      <p className="text-gray-600">존재하지 않는 경로이거나 삭제된 글입니다.</p>
    </main>
  );
}
