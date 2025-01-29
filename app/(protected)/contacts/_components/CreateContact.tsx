'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo, useState } from 'react'
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
import { CreateContactAction } from '../actions'
import { LoaderCircle } from 'lucide-react'
import { QueryObserverResult } from '@tanstack/react-query'
import { PaginationData } from '@/schemas/common'
import { Contact } from '@prisma/client'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'

export interface CreateContactInputs {
    name: string
    phone: string
    address: string
}

export type FormSchemaType = z.infer<typeof FormSchema>

const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z
        .string()
        .regex(/^[0-9]*$/, 'Only numbers are allowed')
        .min(1, 'Phone Number is required'),
    address: z.string().min(1, 'Address is required'),
})

interface CreateContactProps {
    refetch: () => Promise<QueryObserverResult<PaginationData<Contact[]>, Error>>
}

const CreateContact = ({ refetch }: CreateContactProps) => {
    const [open, setOpen] = useState(false)
    const toggleModal = useMemo(() => () => setOpen(!open), [open])

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
        },
    })
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
        reset,
    } = form

    const onSubmit = async (data: FormSchemaType) => {
        try {
            await CreateContactAction(data)
            toast({
                title: 'Contact created',
                description: 'The contact has been successfully created.',
            })
            setOpen(false)
            reset()

            refetch()
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
                <Button onClick={toggleModal}>Create New Contact</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Contact</DialogTitle>
                    <DialogDescription>Fill out the form below to create a new contact.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form id="formContact" className="grid gap-6 py-4" onSubmit={handleSubmit(onSubmit)}>
                        <FormField
                            name="name"
                            control={control}
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
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1234567890" readOnly={isSubmitting} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="1234 Elm St" readOnly={isSubmitting} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" form="formContact" disabled={isSubmitting}>
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

export default CreateContact
