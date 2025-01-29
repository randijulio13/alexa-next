'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Event } from '@prisma/client'
import React from 'react'

interface EventDetailProps {
    event: Event
}

const EventDetail = ({ event }: EventDetailProps) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
                <h1 className="text-3xl font-bold">{event.name}</h1>
            </div>

            <div>
                <Card>
                    <CardHeader>
                        <CardTitle></CardTitle>
                    </CardHeader>
                    <CardContent>asd</CardContent>
                </Card>
            </div>
        </div>
    )
}

export default EventDetail
