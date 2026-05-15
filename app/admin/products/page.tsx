import Heading from "@/app/components/ui/Heading"
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
  const products = ProductsResponseSchema.parse(res)
  return products
}

const ProductPage = async () => {
  const products = await getProducts()

  return (
    <div>
      <Heading>Administrar Productos</Heading>
    </div>
  )
}
export default ProductPage