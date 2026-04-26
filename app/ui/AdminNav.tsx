import Link from "next/link";

export default function AdminNav() {

    return (
        <header className="sticky top-0 z-40 bg-paper border-b border-black/10">
            <div className="flex items-center justify-between h-14 px-6">

                <div className="flex-1">
                    <span className="text-[11px] tracking-[0.2em] uppercase font-medium select-none">
                        E-Commerce by Matias-V823
                    </span>
                </div>
                <nav className="flex items-center gap-8">
                    <Link href={'/admin/products'} className="text-xs ">Productos</Link>
                    <Link href={'/admin/sales'} className="text-xs ">Ventas</Link>
                    <Link href={'/'} className="text-xs bg-gray-700 p-2 rounded-full text-zinc-50">Tienda</Link>
                </nav>
            </div>
        </header>
    );
}
