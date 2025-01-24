'use client'

import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { DoorOpen, Moon, Sun } from 'lucide-react'
import { JWTPayload } from '@/schemas/common'
import { Logout } from '@/app/login/actions'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AppTopbarProps {
    userData: JWTPayload
}

const AppTopbar = ({ userData }: AppTopbarProps) => {
    const { setTheme, theme } = useTheme()
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    const router = useRouter()

    const handleLogout = async () => {
        await Logout()
        router.push('/login')
    }

    return (
        <div className="border-b w-full h-16 flex items-center px-4">
            <SidebarTrigger />
            <div className="ms-auto flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="duration-100 transition-all w-8 h-8 active:-rotate-90 rounded-full"
                >
                    {theme === 'light' ? <Moon /> : <Sun />}
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">{userData.name}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleLogout}>
                            <DoorOpen />
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default AppTopbar
