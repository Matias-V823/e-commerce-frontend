"use client"

import { useMemo } from "react"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { getSalesByDate, getMonthlySales, getWeeklySales } from "@/src/api"
import { useSalesDateStore } from "@/src/store/salesDateStore"

const WeeklyChart = dynamic(() => import("./WeeklyChart"), { ssr: false })

export default function SalesStats() {
    const date = useSalesDateStore((s) => s.date)
    const formattedDate = format(date, "yyyy-MM-dd")
    const formattedMonth = format(date, "yyyy-MM")

    const { data: transactions } = useQuery({
        queryKey: ["transactions", formattedDate],
        queryFn: () => getSalesByDate(formattedDate),
    })

    const { data: weeklyData } = useQuery({
        queryKey: ["weekly", formattedDate],
        queryFn: () => getWeeklySales(formattedDate),
    })

    const { data: monthlyData } = useQuery({
        queryKey: ["monthly", formattedMonth],
        queryFn: () => getMonthlySales(formattedMonth),
    })

    const dailyTotal = useMemo(() => {
        if (!transactions?.length) return "0.00"
        return transactions.reduce((sum, t) => sum + parseFloat(t.total), 0).toFixed(2)
    }, [transactions])

    return (
        <div className="space-y-3">
            {/* KPI row */}
            <div className="grid grid-cols-2 gap-2 mt-10">
                <div className="border border-black/[0.07] rounded-sm px-4 py-3 bg-paper">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-ash mb-1.5">
                        Total del día
                    </p>
                    <p className="text-xl font-medium text-ink tabular-nums">
                        ${dailyTotal}
                    </p>
                </div>
                <div className="border border-black/[0.07] rounded-sm px-4 py-3 bg-paper">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-ash mb-1.5">
                        Ventas del mes
                    </p>
                    <p className="text-xl font-medium text-ink tabular-nums">
                        {monthlyData ? monthlyData.count : "—"}
                    </p>
                </div>
            </div>

            {/* Weekly chart */}
            <div className="border border-black/[0.07] rounded-sm px-4 pt-7 pb-1 bg-paper">
                <p className="text-[10px] tracking-[0.15em] uppercase text-ash mb-1">
                    Ventas esta semana
                </p>
                {weeklyData ? (
                    <WeeklyChart data={weeklyData} />
                ) : (
                    <div className="h-35 flex items-center justify-center">
                        <span className="text-xs text-muted">Cargando...</span>
                    </div>
                )}
            </div>
        </div>
    )
}
