import { Product, ShoppingCart } from "@/app/schemas";
import { devtools } from 'zustand/middleware'
import { create } from "zustand";


interface Store {
    total: number
    contents: ShoppingCart
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
}

export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    addToCart: (product) => {
        const { id: productId, categoryId, ...data } = product
        let contents: ShoppingCart = []

        const duplicated = get().contents.findIndex(item => item.productId === productId)

        if (duplicated >= 0) {
            if (get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return
            contents = get().contents.map(item=> item.productId === productId ? {
                ...item,
                quantity: item.quantity + 1
            }: item) 

        } else {
            contents = [...get().contents, {
                ...data,
                productId,
                quantity: 1
            }]
        }

        set(() => ({
            contents
        }))

    },
    removeFromCart: (productId) => {
        const contents = get().contents.filter(item => item.productId !== productId)
        set(() => ({
            contents
        }))
    },
    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeFromCart(productId)
            return
        }
        const contents = get().contents.map(item =>
            item.productId === productId
                ? { ...item, quantity }
                : item
        )
        set(() => ({
            contents
        }))
    },
    contents: []
})))