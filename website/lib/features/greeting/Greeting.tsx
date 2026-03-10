'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'

export default function Greeting() {
  const { data, isLoading } = useQuery({
    queryKey: ['greeting'],
    queryFn: async () => (await api.get('/api/greeting')).data,
  })

  if (isLoading) return <p>Loading...</p>
  return <h1>{data}</h1>
}
