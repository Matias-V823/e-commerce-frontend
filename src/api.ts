import { MonthlyDataSchema, TransactionsResponseSchema, WeeklyDataSchema } from "./schemas"

export async function getSalesByDate(date: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/transactions?transactionDate=${date}`
    const req = await fetch(url)
    const json = await req.json()
    return TransactionsResponseSchema.parse(json)
}

export async function getWeeklySales(date: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/weekly?date=${date}`
    const req = await fetch(url)
    const json = await req.json()
    return WeeklyDataSchema.parse(json)
}

export async function getMonthlySales(month: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/monthly?month=${month}`
    const req = await fetch(url)
    const json = await req.json()
    return MonthlyDataSchema.parse(json)
}
