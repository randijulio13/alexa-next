import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'
import React from 'react'
import { GetVendorByIdAction } from '../actions'

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
            <div>{id}</div>
        </div>
    )
}

export default page
