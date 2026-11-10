import { MetadataRoute } from 'next'
import { getAllDoctors } from '@/lib/services/doctorService'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.allahmalik-hospital.com'

  // ১. সকল ডাক্তারের ডায়নামিক URL-সমূহ — সরাসরি MongoDB থেকে (কোনো static fallback নেই)
  let doctorSlugs: string[] = []
  try {
    const doctors = await getAllDoctors()
    doctorSlugs = doctors.map((doctor) => doctor.slug)
  } catch (error) {
    console.error('[SITEMAP_DB_ERROR]', error)
  }

  const doctorUrls: MetadataRoute.Sitemap = doctorSlugs.map((slug) => ({
    url: `${baseUrl}/doctors/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ২. সকল ডিপার্টমেন্টের URL-সমূহ
  const specialties = [
    'gynecology',
    'orthopedics',
    'cardiology',
    'gastroenterology',
    'medicine',
    'pediatrics',
    'ent',
  ]

  const specialtyUrls = specialties.map((specialty) => ({
    url: `${baseUrl}/specialties/${specialty}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ৩. স্ট্যাটিক ও ডায়নামিক পেজগুলোর ফাইনাল সাইটম্যাপ
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/doctors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/specialties`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    ...specialtyUrls,
    ...doctorUrls,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
  ]
}
