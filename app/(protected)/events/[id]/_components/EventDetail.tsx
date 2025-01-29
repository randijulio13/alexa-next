'use client'

import { Event } from '@prisma/client'
import React from 'react'

interface EventDetailProps {
    event: Event
}

const EventDetail = ({ event }: EventDetailProps) => {
    return (
        <div className="grid-cols-4">
            <div className="col-span-4">
                <h1 className="text-3xl font-bold">{event.name}</h1>
            </div>
        </div>
    )
}

export default EventDetail
