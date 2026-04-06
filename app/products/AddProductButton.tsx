"use client"

import { useStore } from "@/src/store/store"
import { Product } from "../schemas"

const AddProductButton = ({product}: {product: Product}) => {
    const addToCart = useStore(state => state.addToCart)

    return (
        <button
            className="transition-colors hover:text-black cursor-pointer"
            onClick={() => addToCart(product)}
        >
            <svg
                className="product-add-to-cart__button-icon"
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="currentColor"
            >
                <path d="M12.523 3.747v7.732h7.732v1.05h-7.732v7.732h-1.05V12.53H3.74v-1.05h7.733V3.747h1.05z"></path>
            </svg>
        </button>
    )
}
export default AddProductButton