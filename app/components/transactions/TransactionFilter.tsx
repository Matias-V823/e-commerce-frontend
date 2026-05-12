"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import "react-calendar/dist/Calendar.css"
import { format } from 'date-fns'
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api"
import TransactionSummary from "./TransactionSummary"

const Calendar = dynamic(() => import("react-calendar"), { ssr: false })

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const TransactionFilter = () => {
  const [date, setDate] = useState<Value>(new Date())

  const formattedDate = date instanceof Date ? format(date, 'yyyy-MM-dd') : ''

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", formattedDate],
    queryFn: () => getSalesByDate(formattedDate),
    enabled: !!formattedDate,
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
      <div>
        <Calendar
          value={date}
          onChange={setDate}
        />
      </div>
      <div className="space-y-3">
        {isLoading && <p className="text-sm text-muted">Cargando...</p>}
        {data && data.length ? data.map((transaction) => (
          <TransactionSummary key={transaction.id} transaction={transaction} />
        )) : !isLoading && <p className="text-sm text-ash">No hay ventas para esta fecha</p>}
      </div>
    </div>
  )
}
export default TransactionFilter