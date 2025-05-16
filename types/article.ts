// types/article.ts
export interface Article {
  id: number
  attributes: {
    title: string
    slug: string
    content: string
    publishedAt: string
    cover?: {
      data: {
        attributes: {
          url: string
          alternativeText: string
        }
      }
    }
  }
}
