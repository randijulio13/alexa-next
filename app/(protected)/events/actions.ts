'use server'

import { prisma } from '@/lib/prisma'
import { FormSchemaType } from './_components/CreateEvent'
import { Event } from '@prisma/client'
import { GetPaginateDataActionProps, PaginationData } from '@/schemas/common'

export const CreateEventAction = async (data: FormSchemaType): Promise<Event> => {
    const event = await prisma.event.create({
        data: {
            name: data.name,
            description: data.description,
            location: data.location,
            eventDate: data.eventDate,
            createdBy: data.createdBy,
        },
    })

    return event
}

export const GetEventAction = async ({ page, take }: GetPaginateDataActionProps): Promise<PaginationData<Event[]>> => {
    const events = await prisma.event.findMany({
        skip: page * take,
        take,
    })

    const totalEvents = await prisma.event.count()

    const totalPage = Math.ceil(totalEvents / take)

    return {
        data: events,
        currentPage: page,
        perPage: take,
        totalData: totalEvents,
        totalPage,
    }
}

export const DeleteEventAction = async (id: number): Promise<Event> => {
    const event = await prisma.event.delete({
        where: {
            id,
        },
    })

    return event
}

export const GetEventByIdAction = async (id: number): Promise<Event> => {
    const event = await prisma.event.findFirst({
        where: {
            id,
        },
    })

    return event as Event
}
