"use client"

import dynamic from "next/dynamic"
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api"
import { useSalesDateStore } from "@/src/store/salesDateStore"
import TransactionSummary from "./TransactionSummary"

const Calendar = dynamic(() => import("react-calendar"), { ssr: false })

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const TransactionFilter = () => {
    const date = useSalesDateStore((s) => s.date)
    const setDate = useSalesDateStore((s) => s.setDate)

    const formattedDate = date instanceof Date ? format(date, "yyyy-MM-dd") : ""

    const { data: transactions, isLoading } = useQuery({
        queryKey: ["transactions", formattedDate],
        queryFn: () => getSalesByDate(formattedDate),
        enabled: !!formattedDate,
    })

    const handleDateChange = (value: Value) => {
        if (value instanceof Date) setDate(value)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {/* Left: Calendar */}
            <div>
                <Calendar value={date} onChange={handleDateChange} />
            </div>

            {/* Right: Transactions */}
            <div className="space-y-3">
                {isLoading && <p className="text-sm text-muted">Cargando...</p>}
                {transactions && transactions.length
                    ? transactions.map((transaction) => (
                        <TransactionSummary key={transaction.id} transaction={transaction} />
                    ))
                    : !isLoading && (
                        <p className="text-sm text-ash">No hay ventas para esta fecha</p>
                    )}
            </div>
        </div>
    )
}
export default TransactionFilter
