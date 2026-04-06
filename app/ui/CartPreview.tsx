'use client';

import { useStore } from "@/src/store/store";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/16/solid";
import Image from "next/image";


export function CartPreview() {

    const contents = useStore((state) => state.contents)
    const removeFromCart = useStore((state) => state.removeFromCart)
    const updateQuantity = useStore((state) => state.updateQuantity)
    const itemCount = contents.length


    return (
        <div className="bg-white border border-zinc-200 rounded-lg shadow-lg p-4 w-80">
            <h4 className="font-bold uppercase text-sm">Shopping Bag</h4>
            <p className="text-xs text-zinc-600 mb-3">{itemCount} item{itemCount !== 1 ? 's' : ''} in cart</p>
            <div className="max-h-64 overflow-y-auto">
                {contents.map((item) => (
                    <div key={item.productId} className="flex items-center justify-between text-xs border-b border-zinc-200 p-2 gap-2">
                        <Image 
                            src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.image}`} 
                            alt={`Imagen del producto ${item.name}`}
                            className="rounded-md object-cover"
                            width={50}
                            height={50}

                        />
                        <div className="flex flex-col flex-1">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-zinc-500">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className="p-1 hover:bg-zinc-100 rounded transition-colors cursor-pointer"
                            >
                                <MinusIcon className="w-3 h-3"/>
                            </button>
                            <span className="w-6 text-center font-medium">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className="p-1 hover:bg-zinc-100 rounded transition-colors cursor-pointer"
                            >
                                <PlusIcon className="w-3 h-3"/>
                            </button>
                        </div>
                        <button 
                            onClick={() => removeFromCart(item.productId)}
                            className="p-1 hover:bg-red-50 rounded transition-colors text-red-600 cursor-pointer"
                        >
                            <TrashIcon className="w-3 h-3"/>
                        </button>
                    </div>
                ))}
            </div>
            <button className="w-full bg-zinc-900 text-white text-xs mt-2 py-2 rounded hover:bg-zinc-800 transition-colors cursor-pointer">
                Proceder al pago
            </button>
        </div>
    );
}
