'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Vendor } from '@prisma/client'
import React from 'react'
import VendorEventDatatable from './VendorEventDatatable'
import useAuthStore from '@/stores/auth'

interface VendorDetailCardProps {
    data: Vendor
}

const VendorDetailCard = ({ data }: VendorDetailCardProps) => {
    const { userData } = useAuthStore()

    return (
        <div className="grid grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 justify-between">
                        <h4 className="text-xl mb-0 font-bold">{data.name}</h4>
                        <Badge className="text-xs font-bold px-2 py-0.5">{data.vendorType}</Badge>
                    </div>
                    <span className="text-sm text-secondary-foreground/40">{data.description}</span>
                </CardHeader>
                <CardContent></CardContent>
            </Card>
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>List Event</CardTitle>
                </CardHeader>
                <CardContent>
                    {userData.name}
                    <VendorEventDatatable />
                </CardContent>
            </Card>
        </div>
    )
}

export default VendorDetailCard
