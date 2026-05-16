import Heading from "@/app/components/ui/Heading"
import ProductsTable from "@/app/components/products/ProductsTable"
import { ProductsResponseSchema } from "@/src/schemas"

async function getProducts() {
  const url = `${process.env.API_URL}/products`
  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const res = await req.json()
  return ProductsResponseSchema.parse(res)
}

const ProductPage = async () => {
  const { data: products } = await getProducts()

  return (
    <div>
      <Heading>Administrar Productos</Heading>
      <ProductsTable products={products} />
    </div>
  )
}
export default ProductPage
