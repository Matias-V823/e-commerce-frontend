import TransactionFilter from "@/app/components/transactions/TransactionFilter"
import Heading from "@/app/components/ui/Heading"
import { getSalesByDate } from "@/src/api"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { format } from "date-fns"

const SalesPage = async () => {
  const queryClient = new QueryClient()
  const today = new Date()
  const formatDate = format(today, "yyyy-MM-dd")

  await queryClient.prefetchQuery({
    queryKey: ["transactions", formatDate],
    queryFn: () => getSalesByDate(formatDate),
  })

  return (
    <>
      <Heading>Ventas</Heading>
      <p className="text-sm">En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fecha</p>
      <HydrationBoundary state={dehydrate(queryClient)}>

        <TransactionFilter />
      </HydrationBoundary>
    </>
  )
}
export default SalesPage