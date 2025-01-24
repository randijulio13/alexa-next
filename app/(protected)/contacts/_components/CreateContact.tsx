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
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { CreateContactAction } from '../actions'
import { LoaderCircle } from 'lucide-react'

export interface CreateContactInputs {
    name: string
    phone: string
    address: string
}

interface CreateContactProps {
    getData: () => Promise<void>
}

const CreateContact = ({ getData }: CreateContactProps) => {
    const [open, setOpen] = useState(false)
    const toggleModal = useMemo(() => () => setOpen(!open), [open])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateContactInputs>()

    const onSubmit = async (data: CreateContactInputs) => {
        try {
            await CreateContactAction(data)
            toast({
                title: 'Contact created',
                description: 'The contact has been successfully created.',
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
                <Button onClick={toggleModal}>Create New Contact</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Contact</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new contact.
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="formContact"
                    className="grid gap-6 py-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            placeholder="John Doe"
                            readOnly={isSubmitting}
                            id="name"
                            {...register('name', {
                                required: 'This field is required',
                            })}
                        />
                        {errors.name && (
                            <span className="text-destructive text-sm">
                                {errors.name.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            placeholder="1234567890"
                            readOnly={isSubmitting}
                            id="phone"
                            {...register('phone', {
                                required: 'This field is required',
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Only numbers are allowed',
                                },
                            })}
                        />
                        {errors.phone && (
                            <span className="text-destructive text-sm">
                                {errors.phone.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            placeholder="1234 Elm St"
                            readOnly={isSubmitting}
                            id="address"
                            {...register('address', {
                                required: 'This field is required',
                            })}
                        />
                        {errors.address && (
                            <span className="text-destructive text-sm">
                                {errors.address.message}
                            </span>
                        )}
                    </div>
                </form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="formContact"
                        disabled={isSubmitting}
                    >
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
