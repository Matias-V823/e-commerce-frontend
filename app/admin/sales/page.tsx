import TransactionFilter from "@/app/components/transactions/TransactionFilter"
import SalesStats from "@/app/components/transactions/SalesStats"
import Heading from "@/app/components/ui/Heading"
import { getSalesByDate, getMonthlySales, getWeeklySales } from "@/src/api"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { format } from "date-fns"

const SalesPage = async () => {
    const queryClient = new QueryClient()
    const today = new Date()
    const formatDate = format(today, "yyyy-MM-dd")
    const formatMonth = format(today, "yyyy-MM")

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ["transactions", formatDate],
            queryFn: () => getSalesByDate(formatDate),
        }),
        queryClient.prefetchQuery({
            queryKey: ["weekly", formatDate],
            queryFn: () => getWeeklySales(formatDate),
        }),
        queryClient.prefetchQuery({
            queryKey: ["monthly", formatMonth],
            queryFn: () => getMonthlySales(formatMonth),
        }),
    ])

    return (
        <div className="w-full">
            <div className="flex gap-2">
                <Heading>Ventas</Heading>
                <p className="text-sm">
                    En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fecha
                </p>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <SalesStats />
                <TransactionFilter />
            </HydrationBoundary>
        </div>
    )
}
export default SalesPage
