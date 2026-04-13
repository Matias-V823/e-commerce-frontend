import { Coupon, CouponResponseSchema, Product, ShoppingCart } from "@/src/schemas";
import { devtools } from 'zustand/middleware'
import { create } from "zustand";


interface Store {
    total: number
    contents: ShoppingCart
    coupon: Coupon
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    calculateTotal: () => void
    calculateDiscount: (percentage: number) => void
    applyCoupon: (code: string) => Promise<void>
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
        
        get().calculateTotal()

    },
    removeFromCart: (productId) => {
        const contents = get().contents.filter(item => item.productId !== productId)
        set(() => ({
            contents
        }))
        get().calculateTotal()
    },
    updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
            get().removeFromCart(productId)
            return
        }
        const contents = get().contents.map(item =>
            item.productId === productId && item.inventory >= quantity
                ? { ...item, quantity }
                : item
        )
        set(() => ({
            contents
        }))
        get().calculateTotal()
    },
    calculateTotal: () => {
        const total = get().contents.reduce((acc, item) => {
            return acc + (item.quantity * item.price)
        }, 0)

        set(() => ({
            total
        }))
    },
    calculateDiscount: (percentage) => {
        const discount = (percentage / 100) * get().total 
        set(() =>({
            total: get().total - discount
        }))
    },
    applyCoupon: async (code: string) => {
        const req = await fetch('/coupons/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ coupon_name: code })
        })
        const json = await req.json()
        const response = CouponResponseSchema.parse(json)
        set(() => ({
            coupon: {
                name: response.coupon.name,
                message: response.message,
                percentage: response.coupon.percentage
            }
        }))
    },
    coupon:{
        percentage: 0,
        message: '',
        name: ''
    },  
    contents: []
})))