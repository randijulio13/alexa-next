import React from 'react'
import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'
import { GetVendorAction } from './actions'
import VendorDatatable from './_components/VendorDatatable'

const page = async () => {
    const data = await GetVendorAction()
    const items: BreadcrumbItemProps[] = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: 'Vendors',
        },
    ]
    return (
        <div className="p-4">
            <div className="mb-4">
                <AppBreadcrumb items={items} />
            </div>
            <VendorDatatable initialData={data} />
        </div>
    )
}

export default page
