'use client';

import { ShoppingBagIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";
import HoverOverlay from "./HoverOverlay";
import { CartPreview } from "./CartPreview";
import { useStore } from "@/src/store/store";

export default function MainNav() {
  const itemCount = useStore((state) =>
    state.contents.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-black/10">
      <div className="flex items-center justify-between h-14 px-6">

        <div className="flex-1">
          <span className="text-[11px] tracking-[0.2em] uppercase font-medium select-none">
            E-Commerce by Matias-V823
          </span>
        </div>

        <nav className="flex items-center gap-8">
          {["Hombre", "Mujer", "Niño"].map((label) => (
            <button
              key={label}
              className="text-[11px] tracking-[0.14em] uppercase font-light text-ink hover:text-ash transition-colors cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex-1 flex items-center justify-end gap-5">
          <button className="hover:opacity-40 transition-opacity cursor-pointer" aria-label="Buscar">
            <MagnifyingGlassIcon className="w-4.5 h-4.5" strokeWidth={1.5} />
          </button>
          <button className="hover:opacity-40 transition-opacity cursor-pointer" aria-label="Cuenta">
            <UserIcon className="w-4.5 h-4.5" strokeWidth={1.5} />
          </button>
          <HoverOverlay
            trigger={
              <div className="relative flex items-center hover:opacity-40 transition-opacity cursor-pointer">
                <ShoppingBagIcon className="w-4.5 h-4.5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 min-w-4 h-4 flex items-center justify-center bg-ink text-paper text-[9px] rounded-full px-0.5">
                    {itemCount}
                  </span>
                )}
              </div>
            }
            content={<CartPreview />}
          />
        </div>

      </div>
    </header>
  );
}
