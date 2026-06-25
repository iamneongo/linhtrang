import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types';
import { categories } from '../data';

// Custom component helper to map strings to LucideIcons components safely
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <HelpCircle className={className} />;
  return <IconComponent className={className} />;
}

export default function ProductSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.85; // Scroll 85% of viewport width
      carouselRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="products" className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Visual glowing accent background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-red/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title & Link to show all & Carousel Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="font-headline text-xs font-bold tracking-widest text-slate-500 uppercase">
              KIẾN TẠO PHÂN KHÚC THƯỢNG LƯU
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold uppercase mt-1 leading-tight tracking-tight text-[#245B4A]">
              Danh mục <span className="text-primary-red">sản phẩm</span>
            </h2>
            <div className="w-16 h-1 bg-primary-red mt-3 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            <Link 
              href={`/category/${categories[0].id}`}
              className="text-xs font-headline font-bold tracking-wider text-slate-800 hover:text-primary-red transition-all flex items-center gap-2 group cursor-pointer"
            >
              XEM TẤT CẢ DANH MỤC <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary-red" />
            </Link>
            
            {/* Carousel Navigation Buttons placed directly in header */}
            <div className="hidden md:flex gap-2 z-10">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 hover:text-[#245B4A] shadow-sm active:scale-95 transition-all cursor-pointer"
                title="Slide trước"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 hover:text-[#245B4A] shadow-sm active:scale-95 transition-all cursor-pointer"
                title="Slide sau"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categories Carousel (Frosted larger slide cards) */}
        <div className="relative mt-8">

          {/* Scrolling horizontal list */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none"
          >
            {categories.map((cat, idx) => (
              <Link href={`/category/${cat.id}`} key={cat.id}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="group relative w-[280px] sm:w-[320px] md:w-[350px] shrink-0 aspect-[4/5] snap-start rounded-2xl overflow-hidden bg-black border border-slate-100 cursor-pointer shadow-lg hover:shadow-2xl hover:border-primary-red/30 transition-all duration-500"
                >
                  {/* Product background image */}
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Overlay with neutral dark gradient and frosted details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 shadow-lg group-hover:bg-primary-red group-hover:text-white group-hover:border-primary-red group-hover:scale-110 transition-all duration-300 text-white">
                        <DynamicIcon name={cat.iconName} className="w-6 h-6" />
                      </div>
                      <h3 className="font-headline text-base font-bold text-white uppercase group-hover:text-primary-red transition-colors duration-300 tracking-wide">
                        {cat.name}
                      </h3>
                      <p className="text-[10px] text-white/70 uppercase tracking-widest font-semibold mt-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        {cat.badge}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
