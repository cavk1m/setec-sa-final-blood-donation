'use client'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { Card, Spin } from 'antd'

export default function Greeting() {
  const { data, isLoading } = useQuery({
    queryKey: ['greeting'],
    queryFn: async () => (await api.get('/api/greeting')).data,
  })

  return (
    <Card title="Greeting">
      {isLoading ? <Spin /> : <h2>{data}</h2>}
    </Card>
  )
}
