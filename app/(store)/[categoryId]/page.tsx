import AddProductButton from "@/app/products/AddProductButton"
import HeroImage from "@/app/ui/HeroImage"
import NavSection from "@/app/ui/NavSection"
import { getProducts } from "@/src/services/categories"
import Image from "next/image"

type Params = Promise<{ categoryId: string }>

const StorePage = async ({ params }: { params: Params }) => {
  const { categoryId } = await params
  const products = await getProducts(categoryId)

  return (
    <div>
      <HeroImage />
      <NavSection currentCategoryId={categoryId} />

      <div className="px-px pt-px">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
          {products.products.map((p) => (
            <div key={p.id} className="group relative overflow-hidden bg-surface">

              <div className="relative aspect-3/4 overflow-hidden">
                <Image
                  src={`${process.env.API_URL}/img/${p.image}`}
                  alt={p.name}
                  fill
                  loading="eager"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <AddProductButton product={p} />
                </div>
              </div>

              <div className="pt-2.5 pb-5 px-2">
                <p className="text-[11px] tracking-[0.07em] uppercase text-ink font-light leading-snug">
                  {p.name}
                </p>
                <p className="text-[11px] text-ash mt-0.5">
                  ${p.price}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StorePage
