import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall, CalendarPlus, HelpCircle } from 'lucide-react';

import Header from './components/Header';
import ProductSection from './components/ProductSection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import ProjectsSection from './components/ProjectsSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

import { HERO_URL } from './data';

// High-end slider images for Hero section (reusing premium architecture photos to make this look gorgeous)
const heroSlides = [
  {
    image: HERO_URL,
    sub: "PHÂN PHỐI ĐỘC QUYỀN TOÀN CẦU",
    title1: "NÂNG TẦM",
    title2: "KHÔNG GIAN SỐNG",
    title3: "CỦA BẠN",
    desc: "Linh Trang Home mang đến giải pháp hoàn hảo về gạch ốp lát tiên phong, thiết bị vệ sinh thông minh mạ màu PVD và dòng nội thất cao cấp của các thương hiệu châu Âu cho mọi công trình lớn nhỏ."
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    sub: "XU HƯỚNG SANG TRỌNG ĐƯƠNG ĐẠI",
    title1: "ĐẲNG CẤP",
    title2: "KIẾN TRÚC MỸ MỸ",
    title3: "VĨNH CỬU",
    desc: "Khám phá tủ thiết bị vệ sinh nhập khẩu nguyên đại từ Đức và Tây Ban Nha. Đường vân tinh thạch, men sứ Nano kháng khuẩn nâng niu từng giác quan gia chủ."
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    sub: "DÀNH CHO CHỦ NHÂN KIỆT XUẤT",
    title1: "THỔI HỒN",
    title2: "VÀO ĐẠI CÔNG TRÌNH",
    title3: "ĐỘC BẢN",
    desc: "Mọi sản phẩm tại Linh Trang Home là kết tinh từ các nghệ nhân chế tác vĩ đại bậc nhất thế giới, chắt chiu bảo hành trọn kiếp công trình để kiến tạo bình yên vĩnh cửu."
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [quoteProduct, setQuoteProduct] = useState({ name: '', code: '' });

  // Handle slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Smooth scroll helper
  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll directly to anchor
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  // Callback when user requests quote on a product
  const handleProductSelectForQuote = (productName: string, productCode: string) => {
    setQuoteProduct({ name: productName, code: productCode });
    
    // Direct link to the booking form
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

  return (
    <div className="min-h-screen bg-[#245B4A] text-[#ffdad5] select-none font-sans overflow-x-hidden antialiased flex flex-col">
      
      {/* Dynamic Header navbar */}
      <Header
        onCategoryClick={(catId) => {
          handleNavigateToSection('products');
        }}
        onProjectClick={(projId) => {
          handleNavigateToSection('projects');
        }}
        onNavigateToSection={handleNavigateToSection}
        activeSection={activeSection}
      />

      {/* Hero Premium Interactive Carousel */}
      <section id="home" className="relative h-screen w-full flex items-center overflow-hidden">
        
        {/* Carousel Background Images with fade-in slide motion */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[currentSlide].image}
                alt="Luxury Home Show"
                className="w-full h-full object-cover brightness-[0.7]"
                referrerPolicy="no-referrer"
              />
              {/* Modern dual linear dark overlays for pristine font legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#245B4A] via-[#245B4A]/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#245B4A] via-transparent to-black/30"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlays Area */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center h-full">
          <div className="max-w-3xl mt-12 md:mt-20">
            
            {/* Slide tiny subhead */}
            <motion.span
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-headline text-[10px] sm:text-xs font-black tracking-widest text-[#aeb4be] uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-fit mb-6 block uppercase"
            >
              {heroSlides[currentSlide].sub}
            </motion.span>

            {/* Split Colored Header */}
            <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-none tracking-tight text-white">
              {heroSlides[currentSlide].title1} <br />
              <span className="text-primary-red text-glow">
                {heroSlides[currentSlide].title2}
              </span> <br />
              {heroSlides[currentSlide].title3}
            </h1>

            {/* Sub description */}
            <p className="text-xs sm:text-sm md:text-base text-[#aeb4be] mb-10 max-w-xl leading-relaxed font-medium">
              {heroSlides[currentSlide].desc}
            </p>

            {/* Actions Grid */}
            <div className="flex flex-wrap gap-4">
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

        {/* Floating Sidebar Widgets corner */}
        <div id="floating-side-panel" className="absolute right-4 md:right-8 bottom-8 md:bottom-12 z-20 flex flex-col gap-3">
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

        {/* Carousel Indicators and Manual buttons */}
        <div id="carousel-controls" className="absolute bottom-8 left-4 md:left-8 z-20 flex items-center gap-6">
          <div className="flex gap-2.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-primary-red' : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
                title={`Chuyển đến slide ${idx + 1}`}
              ></button>
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

      {/* Trust bar (Built in About Section layout for neat block progression) */}
      <section id="trust-bar" className="bg-[#327863]/20 border-b border-white/5 py-10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red group-hover:bg-primary-red group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider">Sản phẩm chính hãng</h4>
              <p className="text-[10px] text-[#aeb4be] uppercase tracking-normal">Cam kết chất lượng 100%</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red group-hover:bg-primary-red group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider">Báo giá cạnh tranh</h4>
              <p className="text-[10px] text-[#aeb4be] uppercase tracking-normal">Tối ưu chi phí công trình</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red group-hover:bg-primary-red group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider">Tư vấn tận tâm</h4>
              <p className="text-[10px] text-[#aeb4be] uppercase tracking-normal">Đội ngũ chuyên môn 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red group-hover:bg-primary-red group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider">Hỗ trợ vận chuyển</h4>
              <p className="text-[10px] text-[#aeb4be] uppercase tracking-normal">Đúng tiến độ cam kết</p>
            </div>
          </div>

        </div>
      </section>

      {/* Sub sections */}
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
