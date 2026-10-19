import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stackgsb-studio.vercel.app'
  
  return [
    {
      url: `${baseUrl}/`, // Home page
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`, // About Us page
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`, // Portfolio page
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // (Note: not-found ya 404 page ko sitemap me daalne ki zaroorat nahi hoti)
  ]
}