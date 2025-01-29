import { User } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '@/schemas/common'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateToken(user: User, expiresIn: number): string {
    const jwtSecret = process.env.JWT_SECRET

    const token = jwt.sign(
        { id: user.id, username: user.username, name: user.name, role: user.role },
        String(jwtSecret),
        {
            expiresIn,
        }
    )

    return token
}

export function decodeToken(token: string): JWTPayload {
    const jwtSecret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, String(jwtSecret)) as JWTPayload

    return decoded
}

export function getPagination(current: number, last: number): (string | number)[] {
    const delta = 1
    const left = current - delta
    const right = current + delta + 1
    const range: number[] = []
    const rangeWithDots: (string | number)[] = []
    const firstPageIndex = 0

    if (last < delta * 2 + 3) {
        return Array.from({ length: last }, (_, i) => i)
    }

    for (let i = firstPageIndex; i < last; i++) {
        if (i === firstPageIndex || i === last - 1 || (i >= left && i < right)) {
            range.push(i)
        }
    }

    let previous: number | undefined
    for (const i of range) {
        if (previous !== undefined) {
            if (i - previous === 2) {
                rangeWithDots.push(previous + 1)
            } else if (i - previous !== 1) {
                rangeWithDots.push('...')
            }
        }
        rangeWithDots.push(i)
        previous = i
    }

    return rangeWithDots
}
