import Image from "next/image"

const HeroImage = () => {
  return (
    <div className="flex w-full h-[82vh] min-h-105 overflow-hidden">

      <div className="relative flex-3 overflow-hidden group">
        <Image
          src="/model-hoodie.avif"
          alt="Nueva colección"
          fill
          priority
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute bottom-8 left-8 text-paper">
          <p className="text-[10px] tracking-[0.22em] uppercase mb-2 opacity-75">
            Nueva colección
          </p>
          <h2 className="font-display text-[2.6rem] font-light italic leading-[1.1]">
            Temporada<br />Primavera
          </h2>
        </div>
      </div>

      {/* Right: two stacked images */}
      <div className="flex flex-col flex-2 gap-px">
        <div className="relative flex-1 overflow-hidden group">
          <Image
            src="/model-hoodie-profile.avif"
            alt="Modelo perfil"
            fill
            priority
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="relative flex-1 overflow-hidden group">
          <Image
            src="/hoodie-bull-zoom.avif"
            alt="Detalle producto"
            fill
            priority
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute bottom-5 left-5 text-paper">
            <p className="text-[10px] tracking-[0.22em] uppercase opacity-75">Destacado</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroImage
