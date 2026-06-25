'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall, CalendarPlus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '@/components/Header';
import ProductSection from '@/components/ProductSection';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import ProjectsSection from '@/components/ProjectsSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

import { HERO_URL } from '@/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const heroSlides = [
  {
    image: HERO_URL,
    sub: 'PHÂN PHỐI ĐỘC QUYỀN TOÀN CẦU',
    title1: 'NÂNG TẦM',
    title2: 'KHÔNG GIAN SỐNG',
    title3: 'CỦA BẠN',
    desc: 'Linh Trang Home mang đến giải pháp hoàn hảo về gạch ốp lát tiên phong, thiết bị vệ sinh thông minh mạ màu PVD và dòng nội thất cao cấp của các thương hiệu châu Âu cho mọi công trình lớn nhỏ.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    sub: 'XU HƯỚNG SANG TRỌNG ĐƯƠNG ĐẠI',
    title1: 'ĐẲNG CẤP',
    title2: 'KIẾN TRÚC MỸ MỸ',
    title3: 'VĨNH CỬU',
    desc: 'Khám phá tủ thiết bị vệ sinh nhập khẩu nguyên đại từ Đức và Tây Ban Nha. Đường vân tinh thạch, men sứ Nano kháng khuẩn nâng niu từng giác quan gia chủ.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    sub: 'DÀNH CHO CHỦ NHÂN KIỆT XUẤT',
    title1: 'THỔI HỒN',
    title2: 'VÀO ĐẠI CÔNG TRÌNH',
    title3: 'ĐỘC BẢN',
    desc: 'Mọi sản phẩm tại Linh Trang Home là kết tinh từ các nghệ nhân chế tác vĩ đại bậc nhất thế giới, chắt chiu bảo hành trọn kiếp công trình để kiến tạo bình yên vĩnh cửu.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [quoteProduct, setQuoteProduct] = useState({ name: '', code: '' });

  const heroRef = useRef<HTMLDivElement>(null);
  const trustBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleProductSelectForQuote = (productName: string, productCode: string) => {
    setQuoteProduct({ name: productName, code: productCode });
    handleNavigateToSection('consultation');
  };

  const handleClearQuoteFill = () => {
    setQuoteProduct({ name: '', code: '' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // GSAP animations for Hero Carousel
  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();

    // Reset initial states to avoid jump
    gsap.set([".hero-sub", ".hero-title", ".hero-desc", ".hero-btn-container"], { opacity: 0, y: 30 });
    gsap.set(".hero-bg-img", { opacity: 0, scale: 1.15 });

    // Animate background image zoom and fade
    tl.to(".hero-bg-img", { 
      scale: 1, 
      opacity: 1, 
      duration: 1.6, 
      ease: "power3.out" 
    });

    // Stagger animate other elements
    tl.to([".hero-sub", ".hero-title", ".hero-desc", ".hero-btn-container"], { 
      y: 0, 
      opacity: 1, 
      duration: 0.9, 
      stagger: 0.12, 
      ease: "power4.out" 
    }, "-=1.2");

  }, { dependencies: [currentSlide], scope: heroRef, revertOnUpdate: true });

  // GSAP scroll trigger for Trust Bar elements
  useGSAP(() => {
    if (!trustBarRef.current) return;

    gsap.fromTo(".trust-bar-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trustBarRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: trustBarRef });

  return (
    <div className="min-h-screen bg-[#245B4A] text-[#ffdad5] select-none font-sans overflow-x-hidden antialiased flex flex-col">
      <Header
        onCategoryClick={() => handleNavigateToSection('products')}
        onProjectClick={() => handleNavigateToSection('projects')}
        onNavigateToSection={handleNavigateToSection}
        activeSection={activeSection}
      />

      {/* Hero */}
      <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Luxury Home Show"
            className="hero-bg-img w-full h-full object-cover brightness-[0.7] opacity-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#245B4A] via-[#245B4A]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#245B4A] via-transparent to-black/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center h-full">
          <div className="max-w-3xl pt-20 md:pt-24">
            <span className="hero-sub font-headline text-[10px] sm:text-xs font-black tracking-widest text-text-secondary uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit mb-6 block opacity-0">
              {heroSlides[currentSlide].sub}
            </span>

            <h1 className="hero-title font-headline text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-none tracking-tight text-white opacity-0">
              {heroSlides[currentSlide].title1} <br />
              <span className="text-primary-red text-glow">
                {heroSlides[currentSlide].title2}
              </span>{' '}
              <br />
              {heroSlides[currentSlide].title3}
            </h1>

            <p className="hero-desc text-sm sm:text-base md:text-lg text-text-secondary mb-8 md:mb-10 max-w-xl leading-relaxed font-medium opacity-0">
              {heroSlides[currentSlide].desc}
            </p>

            <div className="hero-btn-container flex flex-wrap gap-4 opacity-0">
              <button
                onClick={() => handleNavigateToSection('products')}
                className="px-6 md:px-8 py-4 bg-primary-red text-white text-xs md:text-sm font-headline font-bold uppercase tracking-wider rounded-xl flex items-center gap-2.5 shadow-lg shadow-primary-red/20 hover:bg-[#c0000c] transition-all duration-300 group cursor-pointer"
              >
                KHÁM PHÁ SẢN PHẨM
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                onClick={() => handleNavigateToSection('projects')}
                className="px-6 md:px-8 py-4 border-2 border-white/80 hover:border-white text-white text-xs md:text-sm font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-white hover:text-[#070A0F] transition-all duration-300 cursor-pointer"
              >
                XEM DỰ ÁN
              </button>
            </div>
          </div>
        </div>

        <div className="absolute right-4 md:right-8 bottom-8 md:bottom-12 z-20 flex flex-col gap-3">
          <a
            href="tel:0977247623"
            title="Liên hệ Hotline ngay"
            className="w-12 h-12 rounded-full bg-[#327863]/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary-red hover:text-white hover:border-primary-red hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <PhoneCall className="w-5 h-5" />
          </a>
          <button
            onClick={() => handleNavigateToSection('consultation')}
            title="Nhận giải pháp nhà 3D miễn phí"
            className="w-12 h-12 rounded-full bg-[#327863]/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary-red hover:text-white hover:border-primary-red hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
          >
            <CalendarPlus className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-8 left-4 md:left-8 z-20 flex items-center gap-6">
          <div className="flex gap-2.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-primary-red' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
                title={`Chuyển đến slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="hidden sm:flex p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/5 gap-1">
            <button
              onClick={prevSlide}
              className="p-1.5 rounded-full text-white/75 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              title="Slide trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1.5 rounded-full text-white/75 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              title="Slide sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section id="trust-bar" ref={trustBarRef} className="bg-[#327863]/20 border-b border-white/5 py-8 md:py-10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title: 'Sản phẩm chính hãng', desc: 'Cam kết chất lượng 100%' },
            { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Báo giá cạnh tranh', desc: 'Tối ưu chi phí công trình' },
            { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: 'Tư vấn tận tâm', desc: 'Đội ngũ chuyên môn 24/7' },
            { icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', title: 'Hỗ trợ vận chuyển', desc: 'Đúng tiến độ cam kết' },
          ].map((item, idx) => (
            <div key={idx} className="trust-bar-item flex items-center gap-4 group opacity-0">
              <div className="w-10 h-10 rounded-xl bg-primary-red flex items-center justify-center text-white group-hover:bg-[#c0000c] transition-all duration-300 shadow-md shadow-primary-red/10">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <div>
                <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductSection onProductSelectForQuote={handleProductSelectForQuote} />
      <AboutSection />
      <FAQSection />
      <ProjectsSection />
      <NewsSection
        quoteFillProduct={quoteProduct.name}
        quoteFillCode={quoteProduct.code}
        onClearQuoteFill={handleClearQuoteFill}
      />
      <Footer />
      <ChatBot />
    </div>
  );
}
