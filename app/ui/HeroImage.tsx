import Image from "next/image"

const HeroImage = () => {
    return (
        <div className="flex gap-2 items-start">
            <div className="shrink-0"> 
                <Image
                    src="/model-hoodie.avif"
                    alt="Imagen de producto"
                    width={900}
                    height={600}
                    loading="eager"
                    className="block transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <div className="flex flex-col self-stretch gap-2 w-63.5">
                <div className="relative flex-1 overflow-hidden">
                    <Image
                        src="/model-hoodie-profile.avif"
                        alt="Imagen de producto"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <div className="relative flex-1 overflow-hidden">
                    <Image
                        src="/hoodie-bull-zoom.avif"
                        alt="Imagen de producto"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroImage