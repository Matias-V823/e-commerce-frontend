import { z } from 'zod'

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number()
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoriesArraySchema = z.array(CategorySchema);


export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});


/* Shopping Cart */
const ShoppingCartContentSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true
}).extend({
    productId: z.number(),
    quantity: z.number()
})

export const ShoppingCartScheema = z.array(ShoppingCartContentSchema)

export const CouponSchema = z.object({
    name: z.string().default(''),
    message: z.string(),
    percentage: z.coerce.number().min(0).max(100).default(0)
})

export const CouponResponseSchema = z.object({
    message: z.string(),
    coupon: z.object({
        id: z.number(),
        name: z.string(),
        percentage: z.coerce.number().min(0).max(100),
        expirationDate: z.string()
    })
})


const OrderContentSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    price: z.number()
})

export const OrderSchema = z.object({
    total: z.number(),
    coupon: z.string(),
    contents: z.array(OrderContentSchema).min(1,{ message: 'El carrito no puede ir vacío'})
})


export const SuccessResponseSchema = z.object({
  message: z.string()
})
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number()
})


/* Export Types */

export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartScheema>;
export type Coupon = z.infer<typeof CouponSchema>

