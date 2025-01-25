import React from 'react'
import Dashboard from './_components/Dashboard'
import { GetTotalContactAction, GetTotalVendorAction } from './actions'
import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'

const page = async () => {
    const totalContact = await GetTotalContactAction()
    const totalVendor = await GetTotalVendorAction()
    console.log({ totalContact, totalVendor })
    const items: BreadcrumbItemProps[] = [
        {
            label: 'Home',
        },
    ]
    return (
        <div className="p-4">
            <div className="mb-4">
                <AppBreadcrumb items={items} />
            </div>
            <Dashboard {...{ totalContact, totalVendor }} />
        </div>
    )
}

export default page
