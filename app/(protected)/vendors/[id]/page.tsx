import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'
import React from 'react'
import { GetVendorByIdAction } from '../actions'
import VendorDetailCard from './_components/VendorDetailCard'

interface EditVendorPageProps {
    params: Promise<{ id: string }>
}

const page = async ({ params }: EditVendorPageProps) => {
    const { id } = await params
    const data = await GetVendorByIdAction(Number(id))
    const items: BreadcrumbItemProps[] = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: 'Vendors',
            link: '/vendors',
        },
        { label: data.name },
    ]
    return (
        <div className="p-4">
            <div className="mb-4">
                <AppBreadcrumb items={items} />
            </div>
            <VendorDetailCard data={data} />
        </div>
    )
}

export default page
