"use client"

import { Transaction } from "@/src/schemas"
import Image from "next/image"
import { format } from "date-fns"

export default function TransactionSummary({ transaction }: { transaction: Transaction }) {
    const time = format(new Date(transaction.transactionDate), "HH:mm")

    return (
        <div className="border border-black/[0.07] border-t-2 border-t-ink rounded-sm overflow-hidden">

            {/* Header */}
            <div className="flex items-baseline justify-between px-5 pt-4 pb-3">
                <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-ash">
                    Orden #{String(transaction.id).padStart(3, "0")}
                </span>
                <span className="text-[11px] text-muted tabular-nums">{time}</span>
            </div>

            {/* Line items */}
            <div className="border-t border-black/6">
                {transaction.contents.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 px-5 py-3 border-b border-black/[0.06] last:border-b-0"
                    >
                        <div className="relative w-11 h-11 shrink-0 rounded overflow-hidden bg-surface">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/img/${item.product.image}`}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-ink truncate">{item.product.name}</p>
                            <p className="text-[11px] text-muted mt-0.5">
                                {item.quantity} {item.quantity === 1 ? "unidad" : "unidades"}
                            </p>
                        </div>
                        <span className="text-sm font-medium text-ink tabular-nums shrink-0">
                            ${item.price}
                        </span>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="bg-zinc-900 px-5 py-4 space-y-2">
                {transaction.coupon && (
                    <div className="flex justify-between text-[11px] text-zinc-50">
                        <span className="tracking-widest uppercase">Cupón {transaction.coupon}</span>
                        {transaction.discount && (
                            <span className="tabular-nums">−${transaction.discount}</span>
                        )}
                    </div>
                )}
                <div className="flex justify-between items-baseline">
                    <span className="text-[11px] tracking-[0.12em] uppercase text-zinc-50">Total</span>
                    <span className="text-base font-medium text-zinc-200 tabular-nums">${transaction.total}</span>
                </div>
            </div>
        </div>
    )
}
