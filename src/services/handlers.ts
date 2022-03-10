import client from './api'

type PaginationParams = {
    skip?: number,
    limit?: number,
}

type ListCoinsParams = PaginationParams & {
    currency?: string
}

export const listCoins = async (params?: ListCoinsParams) => client.get('/coins', { params })
