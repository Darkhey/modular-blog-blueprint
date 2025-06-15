
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Link } from "react-router-dom";

const images = [
  {
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
    alt: "Moderne smarte Heizungssteuerung mit Thermostat",
    title: "Smarte Heizungssteuerung",
    description: "Intelligente Thermostate für optimalen Komfort und Energieeffizienz.",
    to: "/smart-home"
  },
  {
    src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
    alt: "Moderne LED-Beleuchtung in einem stilvollen Wohnraum",
    title: "Intelligente Beleuchtung",
    description: "Smarte LEDs und Lichtsysteme für perfekte Atmosphäre.",
    to: "/smart-home"
  },
  {
    src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop",
    alt: "Hand hält eine leuchtend blaue Glühbirne, Symbol für Energieeffizienz",
    title: "Energiemanagement & Smart Home",
    description: "Kosten senken und die Umwelt schonen durch smarte Technologie.",
    to: "/smart-home"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    alt: "Idyllische Seenlandschaft umgeben von dichten Wäldern",
    title: "Nachhaltiges Wohnen",
    description: "Leben im Einklang mit der Natur durch smarte Lösungen.",
    to: "/themen/nachhaltigkeit"
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
                {image.to ? (
                  <Link
                    to={image.to}
                    className="block group transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    tabIndex={0}
                  >
                    <div className="relative aspect-video md:aspect-[2.4/1] overflow-hidden rounded-lg">
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h3 className="text-3xl font-bold text-shadow-lg">{image.title}</h3>
                        <p className="mt-2 text-lg text-gray-200 text-shadow-md">{image.description}</p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="relative aspect-video md:aspect-[2.4/1] overflow-hidden rounded-lg">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <h3 className="text-3xl font-bold text-shadow-lg">{image.title}</h3>
                      <p className="mt-2 text-lg text-gray-200 text-shadow-md">{image.description}</p>
                    </div>
                  </div>
                )}
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
