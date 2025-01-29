'use server'

import { prisma } from '@/lib/prisma'
import { Vendor } from '@prisma/client'
import { FormSchemaType } from './_components/CreateVendor'

export const GetVendorAction = async (): Promise<Vendor[]> => {
    const vendor = await prisma.vendor.findMany()
    return vendor
}

export const GetVendorByIdAction = async (id: number): Promise<Vendor> => {
    const vendor = await prisma.vendor.findFirst({
        where: {
            id,
        },
        include: {
            VendorsEvents: true,
        },
    })
    return vendor as Vendor
}

export const CreateVendorAction = async (data: FormSchemaType): Promise<Vendor> => {
    const vendor = await prisma.vendor.create({
        data: {
            name: data.name,
            description: data.description,
            vendorType: data.vendorType,
        },
    })
    return vendor
}

export const DeleteVendorAction = async (id: number): Promise<Vendor> => {
    const deleted = await prisma.vendor.delete({
        where: {
            id,
        },
    })
    return deleted
}
