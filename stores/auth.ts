import { JWTPayload } from '@/schemas/common'
import { create } from 'zustand'

interface AuthStoreProps {
    userData: JWTPayload
    setUserData: (user: JWTPayload) => void
}

const useAuthStore = create<AuthStoreProps>((set) => ({
    userData: {} as JWTPayload,
    setUserData: (payload: JWTPayload) => set({ userData: payload }),
}))

export default useAuthStore
