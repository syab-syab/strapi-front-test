// app/articles/[slug]/page.tsx
import { fetchArticleBySlug } from '@/lib/api'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const res = await fetch('http://localhost:1337/api/articles')
  const data = await res.json()

  // slug: article.attributes.slug, だとエラーが出る
  return data.data.map((article: any) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: Props) {
  const article = await fetchArticleBySlug(params.slug)

  if (!article) return notFound()

  // const { title, content, publishedAt, cover } = article.attributes
  const { title, content, publishedAt, cover } = article
  // const imageUrl = cover?.data?.attributes?.url
  const imageUrl = cover?.data?.url

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        {new Date(publishedAt).toLocaleDateString()}
      </p>
      {imageUrl && (
        <img
          src={`http://localhost:1337${imageUrl}`}
          // alt={cover?.data?.attributes?.alternativeText || ''}
          alt={cover?.data?.alternativeText || ''}
          className="mb-6 rounded shadow"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  )
}
