import { MetadataRoute } from 'next'
import { doctorsData } from '@/data/doctors'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.allahmalik-hospital.com'

  // ১. সকল ডাক্তারের ডায়নামিক URL-সমূহ
  const doctorUrls = doctorsData.map((doctor) => ({
    url: `${baseUrl}/doctors/${doctor.id}`,
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

  // ৩. স্টেটিক ও ডায়নামিক পেজগুলোর ফাইনাল সাইটম্যাপ
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
      priority: 0.9 
    },
    { 
      url: `${baseUrl}/about`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.7 
    },
    { 
      url: `${baseUrl}/contact`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.7 
    },
    ...doctorUrls,
    ...specialtyUrls,
  ]
}