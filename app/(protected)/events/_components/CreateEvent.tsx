'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { PaginationData } from '@/schemas/common'
import useAuthStore from '@/stores/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Event } from '@prisma/client'
import { QueryObserverResult } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CreateEventAction } from '../actions'

const FormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    location: z.string().min(1, 'Location is required'),
    eventDate: z.date({ required_error: 'Event Date is required' }),
    createdBy: z.number(),
})

export type FormSchemaType = z.infer<typeof FormSchema>

interface CreateEventProps {
    refetch: () => Promise<QueryObserverResult<PaginationData<Event[]>, Error>>
}

const CreateEvent = ({ refetch }: CreateEventProps) => {
    const [open, setOpen] = useState(false)
    const toggleModal = useCallback(() => {
        setOpen((open) => !open)
    }, [open])

    const { userData } = useAuthStore()

    const defaultValues = useMemo(
        () => ({
            name: '',
            description: '',
            location: '',
            eventDate: new Date(),
            createdBy: userData.id,
        }),
        [userData]
    )

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    })

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = form

    useEffect(() => {
        if (!open) {
            reset(defaultValues)
        }
    }, [open])

    const onSubmit = async (request: FormSchemaType) => {
        try {
            toast({
                title: 'Creating Event',
                description: 'Please wait while the event is being created.',
            })
            await CreateEventAction(request)
            refetch()
            toast({
                title: 'Event created',
                description: 'The Event has been successfully created.',
            })
            toggleModal()
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
                <Button>Create New Event</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Event</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} id="formEvent" className="grid gap-6 py-4">
                        <FormField
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="John Doe" readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Description" readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="location"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Jl. Merdeka" readOnly={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="eventDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Event Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'pl-3 text-left font-normal',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <Button type="submit" form="formEvent" disabled={isSubmitting}>
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

export default CreateEvent
