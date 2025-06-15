
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
    src: "/placeholder.svg?id=photo-1493397212122-2b85dda8106b",
    alt: "Moderne Gebäudefassade mit geschwungenen Linien vor blauem Himmel",
    title: "Architektur & Fassadengestaltung",
    description: "Verleihen Sie Ihrem Zuhause Charakter mit innovativen Fassaden."
  },
  {
    src: "/placeholder.svg?id=photo-1721322800607-8c38375eef04",
    alt: "Helles, modernes Wohnzimmer mit Designermöbeln und großen Fenstern",
    title: "Innenausbau & Wohnkomfort",
    description: "Schaffen Sie Räume zum Leben und Wohlfühlen."
  },
  {
    src: "/placeholder.svg?id=photo-1581090464777-f3220bbe1b8b",
    alt: "Hand hält eine leuchtend blaue Glühbirne, Symbol für Energieeffizienz",
    title: "Energieeffizienz & Nachhaltigkeit",
    description: "Kosten senken und die Umwelt schonen durch smarte Sanierung."
  },
  {
    src: "/placeholder.svg?id=photo-1506744038136-46273834b3fb",
    alt: "Idyllische Seenlandschaft umgeben von dichten Wäldern",
    title: "Ökologisch Bauen & Wohnen",
    description: "Bauen mit der Natur im Einklang für ein gesundes Zuhause."
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
