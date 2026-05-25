"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
    const path = usePathname();
    const navItems = [
        { label: "Productos", href: "/admin/products" },
        { label: "Ventas", href: "/admin/sales" },
        { label: "Tienda", href: "/" },
    ];

    return (
        <header className="sticky top-0 z-40 bg-paper border-b border-black/10">
            <div className="flex items-center justify-between h-14 px-6">

                <div className="flex-1">
                    <span className="text-[11px] tracking-[0.2em] uppercase font-medium select-none">
                        E-Commerce by Matias-V823
                    </span>
                </div>
                <nav className="flex items-center gap-8 rounded-full">
                    { navItems.map(({ label, href }) => (
                        <Link key={label} href={href} className={`text-xs ${path === href ? 'bg-zinc-950 text-zinc-50 rounded-full p-2' : 'hover:bg-zinc-200 hover:text-zinc-950 rounded-full p-2'}`}>{label}</Link>
                    ))
                    }
                </nav>
            </div>
        </header>
    );
}
