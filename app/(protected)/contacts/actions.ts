'use server'

import { prisma } from '@/lib/prisma'
import { CreateContactInputs } from './_components/CreateContact'
import { Contact } from '@prisma/client'
import { GetPaginateDataActionProps, PaginationData } from '@/schemas/common'

export const GetContactAction = async ({
    page,
    take,
}: GetPaginateDataActionProps): Promise<PaginationData<Contact[]>> => {
    const contacts = await prisma.contact.findMany({
        skip: page * take,
        take,
    })

    const totalContacts = await prisma.contact.count()

    const totalPage = Math.ceil(totalContacts / take)

    return {
        data: contacts,
        currentPage: page,
        perPage: take,
        totalData: totalContacts,
        totalPage,
    }
}

export const CreateContactAction = async (data: CreateContactInputs): Promise<Contact> => {
    const contact = await prisma.contact.create({
        data,
    })
    return contact
}

export const DeleteContactAction = async (id: number): Promise<Contact> => {
    const deleted = await prisma.contact.delete({
        where: {
            id,
        },
    })
    return deleted
}
