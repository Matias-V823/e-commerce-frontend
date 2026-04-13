import { CategoriesArraySchema, CategoryWithProductsResponseSchema } from "@/src/schemas"
import { redirect } from "next/navigation"

const url = `${process.env.API_URL}/categories`

export async function getProducts(categoryId: string) {
  const req = await fetch(`${url}/${categoryId}?products=true`)
  if (!req.ok) {
    redirect('/1')
  }
  const json = await req.json()
  const products = CategoryWithProductsResponseSchema.parse(json)

  return products
}

export async function getCategories() {
  const req = await fetch(url)
  const json = await req.json()
  const categories = CategoriesArraySchema.parse(json)

  return categories
}