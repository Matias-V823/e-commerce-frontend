'use client';

import { useStore } from "@/src/store/store";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export function CartPreview() {
  const contents = useStore((state) => state.contents)
  const total = useStore((state) => state.total)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const updateQuantity = useStore((state) => state.updateQuantity)

  return (
    <div className="bg-paper border border-black/10 w-80">

      <div className="px-5 py-4 border-b border-black/[0.06]">
        <h4 className="text-[11px] tracking-[0.15em] uppercase font-medium">
          Bolsa de compra
        </h4>
        <p className="text-[10px] text-ash mt-0.5">
          {contents.length} {contents.length === 1 ? "artículo" : "artículos"}
        </p>
      </div>

      <div className="max-h-72 overflow-y-auto">
        {contents.length === 0 ? (
          <div className="flex items-center justify-center h-20">
            <p className="text-[11px] text-muted tracking-[0.05em]">Tu bolsa está vacía</p>
          </div>
        ) : (
          contents.map((item) => (
            <div key={item.productId} className="flex gap-3 p-4 border-b border-black/[0.06]">
              <div className="relative w-14 h-20 shrink-0 overflow-hidden bg-surface">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] tracking-[0.06em] uppercase font-light leading-snug truncate">
                  {item.name}
                </p>
                <p className="text-[11px] text-ash mt-0.5">${item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-5 h-5 flex items-center justify-center hover:bg-surface transition-colors cursor-pointer"
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-5 h-5 flex items-center justify-center hover:bg-surface transition-colors cursor-pointer"
                  >
                    <PlusIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="self-start p-0.5 hover:opacity-40 transition-opacity cursor-pointer"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

      {contents.length > 0 && (
        <div className="p-4 pt-3">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] tracking-[0.08em] uppercase font-light">Total</span>
            <span className="text-[12px] font-medium">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-ink text-paper text-[11px] tracking-[0.15em] uppercase py-3.5 hover:bg-ink/80 transition-colors cursor-pointer font-light">
            Continuar compra
          </button>
        </div>
      )}

    </div>
  );
}
