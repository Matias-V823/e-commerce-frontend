import TransactionFilter from "@/app/components/transactions/TransactionFilter"
import Heading from "@/app/components/ui/Heading"

const SalesPage = () => {
  return (
    <>
      <Heading>Ventas</Heading>
      <p className="text-sm">En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fecha</p>

      <TransactionFilter/>
    </>
  )
}
export default SalesPage