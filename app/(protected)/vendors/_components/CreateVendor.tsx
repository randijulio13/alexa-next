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
import { CreateVendorAction } from '../actions'
import { LoaderCircle } from 'lucide-react'

export interface CreateVendorInputs {
    name: string
    description: string
}

interface CreateVendorProps {
    getData: () => Promise<void>
}

const CreateVendor = ({ getData }: CreateVendorProps) => {
    const [open, setOpen] = useState(false)
    const toggleModal = useMemo(() => () => setOpen(!open), [open])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateVendorInputs>()

    const onSubmit = async (data: CreateVendorInputs) => {
        try {
            CreateVendorAction(data)
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
                    <DialogDescription>
                        Fill out the form below to create a new vendor.
                    </DialogDescription>
                </DialogHeader>
                <form
                    id="formVendor"
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder="1234 Elm St"
                            readOnly={isSubmitting}
                            id="description"
                            {...register('description', {
                                required: 'This field is required',
                            })}
                        />
                        {errors.description && (
                            <span className="text-destructive text-sm">
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                </form>
                <DialogFooter>
                    <Button
                        type="submit"
                        form="formVendor"
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

export default CreateVendor
