'use server'

import { prisma } from '@/lib/prisma'
import { CreateVendorInputs } from './_components/CreateVendor'
import { Vendor } from '@prisma/client'

export const GetVendorAction = async (): Promise<Vendor[]> => {
    const vendor = await prisma.vendor.findMany()
    return vendor
}

export const GetVendorByIdAction = async (id: number): Promise<Vendor> => {
    const vendor = await prisma.vendor.findFirst({
        where: {
            id,
        },
    })
    return vendor as Vendor
}

export const CreateVendorAction = async (
    data: CreateVendorInputs
): Promise<Vendor> => {
    const vendor = await prisma.vendor.create({
        data,
    })
    return vendor
}

export const DeleteVendorAction = async (vendor: Vendor): Promise<Vendor> => {
    const deleted = await prisma.vendor.delete({
        where: {
            id: vendor.id,
        },
    })
    return deleted
}
