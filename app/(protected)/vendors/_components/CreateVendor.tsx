'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { CreateVendorAction } from '../actions'
import { LoaderCircle } from 'lucide-react'
import { VendorType } from '@prisma/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { z } from 'zod'
interface CreateVendorProps {
    getData: () => Promise<void>
}

export type FormSchemaType = z.infer<typeof FormSchema>

const FormSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required.',
        })
        .min(1, 'Name is required'),
    description: z
        .string({
            required_error: 'Description is required',
        })
        .min(1, 'Description is required'),
    vendorType: z.nativeEnum(VendorType, {
        required_error: 'Vendor type is required',
    }),
})

const CreateVendor = ({ getData }: CreateVendorProps) => {
    const [open, setOpen] = useState(false)
    const toggleModal = useMemo(() => () => setOpen(!open), [open])

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            description: '',
            vendorType: 'OTHER',
        },
    })
    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
        control,
    } = form

    const onSubmit = async (data: FormSchemaType) => {
        try {
            await CreateVendorAction(data)
            toast({
                title: 'Vendor created',
                description: 'The vendor has been successfully created.',
            })
            setOpen(false)
            reset()

            getData()
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    variant: 'destructive',
                    title: 'An error occurred',
                    description: err.message,
                })
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={toggleModal}>
            <DialogTrigger asChild>
                <Button onClick={toggleModal}>Create New Vendor</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Vendor</DialogTitle>
                    <DialogDescription>Fill out the form below to create a new vendor.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id="formVendor" className="grid gap-6 py-4" onSubmit={handleSubmit(onSubmit)}>
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" readOnly={isSubmitting} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="1234 Elm St" readOnly={isSubmitting} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="vendorType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vendor Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a vendor type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(VendorType).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" form="formVendor" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin" />
                                Creating...
                            </span>
                        ) : (
                            'Create'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateVendor
