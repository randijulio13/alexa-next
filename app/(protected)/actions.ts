'use server'

import { prisma } from '@/lib/prisma'

export const GetTotalContactAction = async (): Promise<number> => {
    return await prisma.contact.count()
}

export const GetTotalVendorAction = async (): Promise<number> => {
    return await prisma.vendor.count()
}
