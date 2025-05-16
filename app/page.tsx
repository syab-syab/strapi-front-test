// app/page.tsx
import { fetchArticles } from '@/lib/api'
import Link from 'next/link'

export default async function HomePage() {
  const articles = await fetchArticles()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">ブログ一覧</h1>
      <ul className="space-y-4">
        {articles.map((article: any) => (
          <li key={article.id}>
            {/* article.attributes.slugだとエラーが出る */}
            <Link href={`/articles/${article.slug}`}>
              <p className="text-lg text-blue-600 underline">
                {/* article.attributes.titleだとエラーが出る */}
                {article.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}