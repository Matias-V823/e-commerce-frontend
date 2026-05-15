import { NextRequest } from "next/server"
import { parseISO, startOfWeek, eachDayOfInterval, addDays, format } from "date-fns"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const dateParam = searchParams.get("date")
    if (!dateParam) return Response.json({ error: "date required" }, { status: 400 })

    const refDate = parseISO(dateParam)
    const weekStart = startOfWeek(refDate, { weekStartsOn: 1 })
    const days = eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) })

    const results = await Promise.all(
        days.map(async (day) => {
            const dateStr = format(day, "yyyy-MM-dd")
            const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions?transactionDate=${dateStr}`
            try {
                const res = await fetch(url, { cache: "no-store" })
                const data = await res.json()
                const transactions = Array.isArray(data) ? data : []
                return {
                    date: dateStr,
                    count: transactions.length,
                    total: transactions.reduce(
                        (sum: number, t: { total: string }) => sum + parseFloat(t.total),
                        0
                    ),
                }
            } catch {
                return { date: dateStr, count: 0, total: 0 }
            }
        })
    )

    return Response.json(results)
}
