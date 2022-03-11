import client from './api'


type PaginationParams = {
    skip?: number,
    limit?: number,
}

type ListCoinsParams = PaginationParams & {
    currency?: string
}

export const listCoins = (params?: ListCoinsParams) => client.get('/coins', { params })

type Period = 
| "24h"
| "1w"
| "1m"
| "3m"
| "6m"
| "1y"
| "all"


type ChartsInfoParams = {
    period?: Period,
    coinId: string
}

export const getChartInfo = (params: ChartsInfoParams) => client.get('/charts', {params})
