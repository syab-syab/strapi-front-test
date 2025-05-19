// app/tags/page.tsx
import Link from 'next/link'

type Tag = {
  id: number
  name: string
  slug: string
}

// http://localhost:1337/api/tags
export default async function TagListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
    cache: 'no-store',
  })

  const json = await res.json()
  console.log(json)
  const tags: Tag[] = json.data

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">タグ一覧</h1>

      <ul className="grid grid-cols-2 gap-4">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link
              href={`/tags/${tag.slug}`}
              className="block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              #{tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}