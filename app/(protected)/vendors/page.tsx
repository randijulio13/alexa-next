import React from 'react'
import Datatable from './_components/Datatable'
import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'
import { GetVendorAction } from './actions'

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
            <Datatable initialData={data} />
        </div>
    )
}

export default page
