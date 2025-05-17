// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'

type Article = {
  id: number
  documentId: string
  title: string
  slug: string
  content: any[]
  publishDate: string | null
  createdAt: string
  cover?: {
    url: string
    name: string
    width: number
    height: number
  }
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  // ${API_URL}/articles?filters[slug][$eq]=${slug}&populate=cover
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?filters[slug][$eq]=${slug}&populate=cover`, {
    cache: 'no-store',
  })

  const json = await res.json()
  const article = json.data[0]

  return article || null
}

function renderRichText(content: any[]) {
  return content.map((block: any, index: number) => {
    if (block.type === 'paragraph') {
      const text = block.children.map((child: any) => child.text).join('')
      return <p key={index} className="mb-4">{text}</p>
    }
    return null
  })
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) return notFound()

  return (
    <main className="prose mx-auto p-8">
      <h1>{article.title}</h1>

      {article.cover?.url && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${article.cover.url}`}
          alt={article.cover.name}
          width={article.cover.width}
          height={article.cover.height}
          className="rounded-xl shadow-md"
        />
      )}

      <div className="mt-6">{renderRichText(article.content)}</div>
    </main>
  )
}