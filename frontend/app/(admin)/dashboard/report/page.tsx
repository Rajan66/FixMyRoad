import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
// import AdminRoute from '../_components/AdminRoute'
import ReportTable from './_components/ReportTable'

const page = () => {
    return (
        <div>
            <div className="flex justify-between flex-col xvsm:flex-row gap-y-3">
                <h1 className="font-semibold text-3xl xvsm:pb-10 opacity-80">
                    Reports
                </h1>
            </div>
            <ReportTable />
            {/* <UsersTable /> */}
        </div>
    )
}

export default page