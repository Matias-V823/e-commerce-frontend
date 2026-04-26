import { getCategories } from "@/src/services/categories"
import Link from "next/link"

const NavSection = async ({ currentCategoryId }: { currentCategoryId: string }) => {
  const categories = await getCategories()

  return (
    <div className="flex flex-col items-center justify-center  py-3 border-b border-black/[0.06] bg-zinc-800">
      <div className="pb-2">
        <h4 className="text-paper text-[11px] tracking-[0.15em] uppercase font-medium">Categorías</h4>
      </div>
      <div className="flex gap-5">
        {categories.map((category) => {
          const isActive = String(category.id) === currentCategoryId
          return (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className={`text-[11px] tracking-[0.12em] uppercase transition-colors ${
                isActive
                  ? "text-paper font-medium underline underline-offset-4 decoration-1"
                  : "text-zinc-400 font-light hover:text-paper"
              }`}
            >
              {category.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default NavSection
