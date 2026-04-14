'use client';

import { submitOrder } from "@/actions/submit-order-action";
import { useStore } from "@/src/store/store";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payment = () => {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount)
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const applyCoupon = useStore((state) => state.applyCoupon)
  const clearOrder = useStore((state) => state.clearOrder)
  const coupon = useStore((state) => state.coupon)
  const router = useRouter()

  const [couponOpen, setCouponOpen] = useState(false);
  const [couponValue, setCouponValue] = useState('');
  const [agreed, setAgreed] = useState(false);
  const order = {
    total,
    coupon: coupon.name,
    contents
  }

  const submitOrderWithData = submitOrder.bind(null, order)
  const [state, dispatch] = useActionState(submitOrderWithData, {
    errors: [],
    success: ''
  })

  useEffect(() => {

    if(state.errors && state.errors.length > 0){
      state.errors.forEach((error) => toast.error(error))
    }

    if (state.success) {
      toast.success(state.success)

      setTimeout(() => {
        clearOrder()
        router.push('/')
      }, 1500)
    }
  }, [state, router])


  const handleCoupon = async () => {
    await applyCoupon(couponValue);
    setTimeout(() => {
      setCouponOpen(false);
    }, 4000)
  }



  return (
    <div className="min-h-screen bg-paper flex flex-col">

      <header className="border-b border-black/10 h-14 flex items-center px-8">
        <div className="flex-1">
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase font-medium hover:text-ash transition-colors"
          >
            E-Commerce by Matias-V823
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.12em] uppercase font-medium">Bolsa</span>
          <span className="block w-8 h-px bg-black/20" />
          <span className="text-[10px] tracking-[0.12em] uppercase text-muted">Pago</span>
        </div>

        <div className="flex-1 flex justify-end">
          <Link
            href="/"
            className="text-[10px] tracking-widest uppercase text-ash hover:text-ink transition-colors"
          >
            ← Seguir comprando
          </Link>
        </div>
      </header>

      <div className="flex-1 w-full max-w-6xl mx-auto px-8 py-12 grid grid-cols-[1fr_360px] gap-16 items-start">

        <div>
          <div className="flex items-baseline justify-between mb-6">
            <h1 className="text-[11px] tracking-[0.2em] uppercase font-medium">Bolsa de compra</h1>
            <span className="text-[10px] text-ash">
              {contents.length} {contents.length === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>

          <div className="border-t border-black/10" />

          {contents.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl font-light italic text-ash">Tu bolsa está vacía</p>
              <Link
                href="/"
                className="inline-block mt-5 text-[11px] tracking-[0.15em] uppercase underline underline-offset-4 hover:text-ash transition-colors"
              >
                Explorar colección
              </Link>
            </div>
          ) : (
            contents.map((item) => (
              <div key={item.productId} className="flex gap-5 py-6 border-b border-black/6">

                <div className="relative w-16 h-24 shrink-0 bg-surface overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.image}`}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <p className="text-[12px] tracking-[0.08em] uppercase font-light leading-snug">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-ash mt-1">${item.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.08em] uppercase text-muted">Cant.</span>
                    <div className="flex items-center border border-black/10">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface transition-colors cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] w-5 text-center tabular-nums select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-surface transition-colors cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between py-0.5">
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1 hover:opacity-40 transition-opacity cursor-pointer"
                    aria-label="Eliminar artículo"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[12px] tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

              </div>
            ))
          )}
        </div>

        <div className="border border-black/10 p-6 flex flex-col">

          <h2 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-6">
            Resumen del pedido
          </h2>

          <div className="border-t border-black/6 pt-4 pb-4">
            <button
              onClick={() => setCouponOpen(!couponOpen)}
              className="flex items-center justify-between w-full text-[11px] tracking-widest uppercase text-ash hover:text-ink transition-colors cursor-pointer"
            >
              <span>Código de descuento</span>
              <span className="text-base font-light leading-none">{couponOpen ? '−' : '+'}</span>
            </button>
            {
              coupon.message && couponOpen && (
                <p className="mt-2 text-[10px] text-green-600">
                  {coupon.message}
                </p>
              )
            }
            {couponOpen && (
              <div className="mt-3 flex border border-black/10">
                <input
                  type="text"
                  value={couponValue}
                  onChange={(e) => setCouponValue(e.target.value.toUpperCase())}
                  placeholder="CÓDIGO"
                  className="flex-1 px-3 py-2.5 text-[11px] tracking-[0.08em] uppercase bg-surface placeholder:text-muted outline-none font-light"
                />
                <button
                  onClick={handleCoupon}
                  className="px-4 text-[10px] tracking-[0.12em] uppercase font-medium border-l border-black/10 hover:bg-surface transition-colors cursor-pointer">
                  Aplicar
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-black/6 py-4 flex justify-between items-center">
            <span className="text-[11px] tracking-[0.08em] uppercase text-ash font-light">Subtotal</span>
            <span className="text-[12px] tabular-nums">${total.toFixed(2)}</span>
          </div>

          <div className="py-3 flex justify-between items-center">
            <span className="text-[11px] tracking-[0.08em] uppercase text-ash font-light">Envío</span>
            <span className="text-[11px] text-ash">Gratis</span>
          </div>

          <div className="flex-col border-t border-black/10 pt-5 pb-6 items-center">
            {discount! > 0 && (
              <div className="flex flex-col items-start gap-1">
                <span className="text-[10px] tracking-[0.08em] uppercase text-green-600 font-light">
                  -${discount!.toFixed(2)}
                </span>
              </div>
            )
            }
            <div className="flex justify-between">
              <span className="text-[11px] tracking-[0.14em] uppercase font-medium">Total</span>
              <span className="text-[15px] font-medium tabular-nums">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 mb-5">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-4 h-4 shrink-0 border flex items-center justify-center transition-colors cursor-pointer ${agreed ? 'bg-ink border-ink' : 'border-black/30 hover:border-ink'
                }`}
              aria-label="Aceptar términos y condiciones"
            >
              {agreed && (
                <svg className="w-2.5 h-2.5 text-paper" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1.5 5L4 7.5L8.5 2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <p className="text-[10px] text-ash leading-relaxed">
              Acepto los{' '}
              <button className="underline underline-offset-2 hover:text-ink transition-colors cursor-pointer">
                Términos y Condiciones
              </button>
              . Autorizo el procesamiento de mis datos personales de acuerdo con el Aviso de Privacidad.
            </p>
          </div>

          <form action={dispatch}>
            <button
              type="submit"
              disabled={!agreed || contents.length === 0}
              className="w-full bg-ink text-paper text-[11px] tracking-[0.18em] uppercase py-4 hover:bg-ink/80 transition-colors cursor-pointer font-light disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Proceder al pago
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-black/6">
            <div className="flex items-center justify-center gap-5 mb-4">
              <img src="/visa-new-checkout-logo-2.png" alt="Visa" className="h-5 object-contain opacity-50" />
              <img src="/mastercard-new-checkout-logo-2.png" alt="Mastercard" className="h-5 object-contain opacity-50" />
              <img src="/maestro-new-checkout-logo-2.png" alt="Maestro" className="h-5 object-contain opacity-50" />
            </div>
            <p className="text-[10px] text-muted text-center leading-relaxed">
              Los precios y gastos de envío no están confirmados hasta completar la compra.
            </p>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[10px] text-ash">¿Necesitas ayuda? </span>
            <button className="text-[10px] underline underline-offset-2 hover:text-ash transition-colors cursor-pointer">
              Atención al cliente
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
