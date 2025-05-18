// lib/api.ts
import axios from 'axios'

const API_URL = 'http://localhost:1337/api'

// http://localhost:1337/api/articles?sort=publishedAt:desc&populate=cover
export async function fetchArticles() {
  const res = await axios.get(`${API_URL}/articles?sort=publishedAt:desc&populate=cover`)
  console.log(res.data.data)
  return res.data.data
}

// slug = first-post
// /articles?filters[slug][$eq]=first-post&populate=cover
export async function fetchArticleBySlug(slug: string) {
  const res = await axios.get(`${API_URL}/articles?filters[slug][$eq]=${slug}&populate=cover`)
  console.log(res.data.data[0])
  return res.data.data[0]
}

export async function fetchArticleSlugs() {
  const res = await axios.get(`${API_URL}/articles`)
  return res.data.data.map((item: any) => item.attributes.slug)
}