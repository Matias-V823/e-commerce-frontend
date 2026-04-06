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
      <NavSection/>
      <HeroImage/>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-10">
        {products.products.map((p) => (
          <div 
            key={p.id} 
            className="group w-64 border border-zinc-100 p-5 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2 bg-white"
          >
            <div className="overflow-hidden mb-4">
              <Image
                src={`${process.env.API_URL}/img/${p.image}`}
                alt={`Imagen de producto ${p.name}`}
                width={400}
                height={600}
                loading="eager"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex justify-between text-zinc-600 font-light">
              <div>
                <h3 className="text-sm uppercase font-medium">{p.name}</h3>
                <p className="text-sm text-zinc-400">${p.price}</p>
              </div>
              <button className="transition-colors hover:text-black cursor-pointer">
                <svg 
                  className="product-add-to-cart__button-icon" 
                  aria-hidden="true" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  stroke="currentColor"
                >
                  <path d="M12.523 3.747v7.732h7.732v1.05h-7.732v7.732h-1.05V12.53H3.74v-1.05h7.733V3.747h1.05z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StorePage