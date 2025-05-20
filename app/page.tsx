'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Tag = {
  id: number
  name: 'Blog' | 'Extensions' | 'WebApp'
}

type Cover = {
  url: string
  alternativeText: string | null
}

type Article = {
  id: number
  title: string
  slug: string
  tags: Tag[]
  cover: Cover | null
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?populate[tags]=true&populate[cover]=true`, {
        cache: 'no-store',
      })
      const json = await res.json()
      setArticles(json.data)
    }

    fetchArticles()
  }, [])

  // タグ名ごとに記事をグルーピング（固定の3カテゴリ）
  const groupByTagName = (tagName: Tag['name']) =>
    articles.filter((article) => article.tags.some((tag) => tag.name === tagName))

  const groupedArticles = {
    Blog: groupByTagName('Blog'),
    Extensions: groupByTagName('Extensions'),
    WebApp: groupByTagName('WebApp'),
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">記事一覧（タグ別）</h1>

      {(['Blog', 'Extensions', 'WebApp'] as const).map((tag) => (
        <section key={tag} className="mb-10">
          <hr />
          <h2 className="text-2xl font-semibold mb-4">#{tag}</h2>
          {groupedArticles[tag].length === 0 ? (
            <p className="text-gray-500">記事がありません。</p>
          ) : (
            <ul className="space-y-2">
              {groupedArticles[tag].map((article) => (
                <li key={article.id} className="border p-3 rounded">
                  <p>
                    <img
                      style={{width: "500px"}}
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${article?.cover?.url}`}
                    />                    
                  </p>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  )
}
