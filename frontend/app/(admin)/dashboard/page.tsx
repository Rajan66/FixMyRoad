"use client"
import Loading from '@/components/ui/Loading'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter();

  router.push('/dashboard/restaurants')


  return (
    <Loading />
  )
}

export default page