import React from 'react'
import Dashboard from './_components/Dashboard'
import { GetTotalContactAction, GetTotalVendorAction, GetTotalEventAction } from './actions'
import AppBreadcrumb, { BreadcrumbItemProps } from '@/components/app/breadcrumb'

const page = async () => {
    const totalContact = await GetTotalContactAction()
    const totalVendor = await GetTotalVendorAction()
    const totalEvent = await GetTotalEventAction()

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
            <Dashboard {...{ totalContact, totalVendor, totalEvent }} />
        </div>
    )
}

export default page
