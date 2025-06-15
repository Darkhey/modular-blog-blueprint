
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

const images = [
  {
    src: "/placeholder.svg?id=photo-1487958449943-2429e8be8625",
    alt: "Modernes Haus von außen",
    title: "Fassadensanierung & Neubau",
    description: "Energieeffizient und stilvoll wohnen."
  },
  {
    src: "/placeholder.svg?id=photo-1721322800607-8c38375eef04",
    alt: "Helles, modernes Wohnzimmer",
    title: "Innenausbau & Design",
    description: "Schaffen Sie Ihre persönliche Wohlfühloase."
  },
  {
    src: "/placeholder.svg?id=photo-1600585152220-4068416e7f45",
    alt: "Moderne Küche mit Kochinsel",
    title: "Küchen- & Badmodernisierung",
    description: "Funktionalität trifft auf Ästhetik."
  },
  {
    src: "/placeholder.svg?id=photo-1586023492125-27b2c045efd7",
    alt: "Gemütlicher Wohnbereich mit Holzboden",
    title: "Bodenbeläge & Raumgestaltung",
    description: "Die Basis für ein harmonisches Zuhause."
  }
];

const ImageCarouselSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Inspiration für Ihr Zuhause
        </h2>
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video md:aspect-[2.4/1] overflow-hidden rounded-lg">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-3xl font-bold text-shadow-lg">{image.title}</h3>
                    <p className="mt-2 text-lg text-gray-200 text-shadow-md">{image.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none" />
        </Carousel>
      </div>
    </section>
  );
};

export default ImageCarouselSection;
