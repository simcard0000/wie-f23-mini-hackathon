'use client'

import Sidebar from '@/components/sidebar'
import SearchAddFood from '@/components/search-add-food'

export default function Home() {
  return (
    <div className='flex flex-horizontal text-left w-full'>
      <Sidebar />
      <SearchAddFood />
    </div>
  )
}
