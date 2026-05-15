import { NextRequest } from "next/server"
import { parseISO, startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const monthParam = searchParams.get("month")
    if (!monthParam) return Response.json({ error: "month required" }, { status: 400 })

    const refDate = parseISO(`${monthParam}-01`)
    const days = eachDayOfInterval({ start: startOfMonth(refDate), end: endOfMonth(refDate) })

    const results = await Promise.all(
        days.map(async (day) => {
            const dateStr = format(day, "yyyy-MM-dd")
            const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions?transactionDate=${dateStr}`
            try {
                const res = await fetch(url, { cache: "no-store" })
                const data = await res.json()
                const transactions = Array.isArray(data) ? data : []
                return {
                    count: transactions.length,
                    total: transactions.reduce(
                        (sum: number, t: { total: string }) => sum + parseFloat(t.total),
                        0
                    ),
                }
            } catch {
                return { count: 0, total: 0 }
            }
        })
    )

    const totalCount = results.reduce((sum, r) => sum + r.count, 0)
    const totalAmount = results.reduce((sum, r) => sum + r.total, 0)

    return Response.json({ count: totalCount, total: totalAmount.toFixed(2) })
}
