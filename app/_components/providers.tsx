'use client'

import React, { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/app/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { Suspense } from 'react'
import { getQueryClient } from '@/lib/query'

interface ProvidersProps {
    children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    const queryClient = getQueryClient()

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <SidebarProvider>
                    <Suspense fallback={'Loading...'}>{children}</Suspense>
                </SidebarProvider>
            </QueryClientProvider>
            <Toaster />
        </ThemeProvider>
    )
}

export default Providers
