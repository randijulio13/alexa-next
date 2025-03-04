export type PaginationData<T> = {
    data: T
    totalPage: number
    totalData: number
    perPage: number
    currentPage: number
}

export type BaseActionResponse<T> = Promise<{
    data: T | null
    error: string | null
}>

export type JWTPayload = {
    id: number
    username: string
    name: string
    role: string
    iat?: number
    exp?: number
}

export type Formatter<T = string> = {
    format: (value: T) => string
    parse: (value: string) => T
}

export type GetPaginateDataActionProps = {
    page: number
    take: number
}
