// app/tags/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Tag = {
  id: number
  name: string
  slug: string
  articles: Article[]
}

type Article = {
  id: number
  title: string
  slug: string
  tags: { id: number; name: string }[]
}

export default async function TagDetailPage({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tags?filters[slug][$eq]=${params.slug}&populate[articles][populate]=tags`,
    {
      cache: 'no-store',
    }
  )

  const json = await res.json()
  const tag: Tag | undefined = json.data[0]

  if (!tag) return notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">#{tag.name} に関する記事</h1>

      {tag.articles.length === 0 ? (
        <p>このタグに紐づく記事はありません。</p>
      ) : (
        <ul className="space-y-4">
          {tag.articles.map((article) => (
            <li key={article.id} className="border rounded-xl p-4 shadow-sm">
              <Link href={`/articles/${article.slug}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {article.title}
                </h2>
              </Link>

              {/* タグ表示 */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {article.tags.map((t) => (
                  <span
                    key={t.id}
                    className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded"
                  >
                    #{t.name}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
