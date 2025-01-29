'use server'

import { prisma } from '@/lib/prisma'
import { generateToken } from '@/lib/utils'
import { BaseActionResponse } from '@/schemas/common'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { LoginFormInputs } from './_components/FormLogin'

export const AuthenticateAction = async (request: LoginFormInputs): BaseActionResponse<User> => {
    const cookieStore = await cookies()

    const user = await prisma.user.findFirst({
        where: {
            username: request.username,
        },
    })

    if (!user) {
        return { data: {} as User, error: 'Incorrect username or password.' }
    }

    const isValidPassword = await bcrypt.compare(request.password, user.password)
    if (!isValidPassword) {
        return { data: {} as User, error: 'Incorrect username or password.' }
    }

    const expiresIn = request.remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24

    const token = generateToken(user, expiresIn)
    cookieStore.set('auth_token', token, {
        maxAge: expiresIn,
    })

    return { data: user, error: null }
}

export const Logout = async (): BaseActionResponse<null> => {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')

    return { data: null, error: null }
}
