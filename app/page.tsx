// app/page.tsx
import { fetchArticles } from '@/lib/api'
import Link from 'next/link'
// import Image from 'next/image'
// import { useEffect, useState } from 'react'

type Tag = {
  id: number
  name: string
}

type Article = {
  id: number
  title: string
  slug: string
  tags: Tag[]
}

export default async function HomePage() {
  // const [articles, setArticles] = useState<Article[]>([])
  const articles = await fetchArticles()

  //   useEffect(() => {
  //   const fetchArticles = async () => {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?populate=tags&cover`, {
  //       cache: 'no-store',
  //     })
  //     const json = await res.json()
  //     setArticles(json.data)
  //   }

  //   fetchArticles()
  // }, [])

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">記事一覧</h1>
      <ul className="space-y-4">
        {articles.map((article: any) => (
          <li key={article.id} style={{marginBottom: "20px"}}>
            {/* article.attributes.slugだとエラーが出る */}
            <Link href={`/articles/${article.slug}`}>
              <p className="text-lg text-blue-600 underline">
                {/* article.attributes.titleだとエラーが出る */}
                {article.title}
              </p>
            </Link>
            <img
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${article.cover.formats.thumbnail.url}`}
            />
          {/* タグの表示 */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <p>tag</p>
            {article.tags?.map((tag: Tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-sm bg-gray-200 text-gray-700 rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
          <hr />
          </li>
        ))}
      </ul>
    </main>
  )
}