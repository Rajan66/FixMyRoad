import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
// import AdminRoute from '../_components/AdminRoute'
import ComplaintTable from './_components/ComplaintTable'

const page = () => {
    return (
        <div>
            <div className="flex justify-between flex-col xvsm:flex-row gap-y-3">
                <h1 className="font-semibold text-3xl xvsm:pb-10 opacity-80">
                    Complaints
                </h1>
            </div>
            <ComplaintTable />
        </div>
    )
}

export default page