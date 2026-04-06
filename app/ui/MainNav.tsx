'use client';

import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import HoverOverlay from "./HoverOverlay";
import { CartPreview } from "./CartPreview";

export default function MainNav() {
  return (
    <header className="px-10 py-5 flex flex-col md:flex-row justify-between ">
        <div className="flex justify-center">
            <h3>E-commerce <span className="text-[10px] text-zinc-500">by Matias-V823</span></h3>
        </div>
        <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
          <HoverOverlay
            trigger={<ShoppingBagIcon className="w-5 h-5 cursor-pointer relative" />}
            content={<CartPreview />}
          />
          <span className="absolute top-10 right-12 text-xs">1</span>
        </nav>
    </header>
  )
}