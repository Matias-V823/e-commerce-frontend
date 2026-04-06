import { CategoryWithProductsResponseSchema } from "@/app/schemas"

const url = `${process.env.API_URL}/categories`

export async function getProducts(categoryId: string){
  const req = await fetch(`${url}/${categoryId}?products=true`)
  const json = await req.json()
  const products = CategoryWithProductsResponseSchema.parse(json)
  return products
}