
import { ReactNode } from "react";

interface ThemenBoxProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  image?: { src: string; alt: string };
}

const ThemenBox = ({ icon, title, children, image }: ThemenBoxProps) => (
  <section className="bg-white rounded-lg border p-5 mb-7 flex flex-col md:flex-row gap-4 shadow-sm animate-fade-in">
    {image && (
      <div className="w-full md:w-56 flex-shrink-0">
        <img
          src={image.src}
          alt={image.alt}
          className="object-cover rounded-lg w-full h-36 md:h-40 mb-4 md:mb-0"
          loading="lazy"
        />
      </div>
    )}
    <div className={`flex-shrink-0 flex items-start mt-1 ${image ? 'hidden md:flex' : ''}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 text-emerald-800">{title}</h3>
      <div className="text-[1.04rem] text-gray-800 leading-relaxed">{children}</div>
    </div>
  </section>
);

export default ThemenBox;
