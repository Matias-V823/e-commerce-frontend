"use client"

import { useStore } from "@/src/store/store"
import { Product } from "../schemas"

const AddProductButton = ({ product }: { product: Product }) => {
  const addToCart = useStore(state => state.addToCart)

  return (
    <button
      className="w-9 h-9 bg-paper flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-200 cursor-pointer shadow-sm"
      onClick={(e) => {
        e.preventDefault()
        addToCart(product)
      }}
      aria-label="Agregar al carrito"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M12.523 3.747v7.732h7.732v1.05h-7.732v7.732h-1.05V12.53H3.74v-1.05h7.733V3.747h1.05z" />
      </svg>
    </button>
  )
}

export default AddProductButton
