import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://karamcharhr.online',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
  ]
}
