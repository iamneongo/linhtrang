'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, X, ShoppingBag, ArrowRight, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { categories, productsByCategoryId } from '@/data';

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <HelpCircle className={className} />;
  return <IconComponent className={className} />;
}

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

function CustomSelect({ value, onChange, options }: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(o => o.value === value) || options[0];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full z-20">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold border border-white/10 rounded-xl px-4 py-3 text-xs flex justify-between items-center transition-all cursor-pointer shadow-sm active:scale-99"
      >
        <span className="truncate">{selectedOption.label}</span>
        <LucideIcons.ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white border border-black/[0.08] rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar z-30 p-1.5"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center justify-between transition-all cursor-pointer rounded-lg ${
                  value === opt.value
                    ? 'bg-primary-red/[0.06] text-primary-red font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && <LucideIcons.Check className="w-3.5 h-3.5 text-primary-red shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const catId = params.id as string;
  const category = categories.find((c) => c.id === catId);
  const products = productsByCategoryId[catId] || [];

  // Filter and Search states
  const [selectedBrand, setSelectedBrand] = useState<string>('Tất cả');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!category) {
    return (
      <div className="min-h-screen bg-[#245B4A] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-headline text-3xl font-extrabold text-primary-red uppercase mb-4">
          Không tìm thấy danh mục
        </h2>
        <p className="text-sm text-text-secondary mb-8 max-w-md">
          Danh mục sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-primary-red/20"
        >
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Extract unique filters
  const uniqueBrands = Array.from(new Set(products.map((p) => p.origin)));
  const uniqueMaterials = Array.from(new Set(products.map((p) => p.material)));

  const brandOptions = [
    { value: 'Tất cả', label: 'Tất cả thương hiệu' },
    ...uniqueBrands.map((b) => ({ value: b, label: b })),
  ];

  const materialOptions = [
    { value: 'Tất cả', label: 'Tất cả chất liệu' },
    ...uniqueMaterials.map((m) => ({ value: m, label: m })),
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesBrand = selectedBrand === 'Tất cả' || prod.origin === selectedBrand;
    const matchesMaterial = selectedMaterial === 'Tất cả' || prod.material === selectedMaterial;
    const word = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !word ||
      prod.name.toLowerCase().includes(word) ||
      prod.code.toLowerCase().includes(word) ||
      prod.description.toLowerCase().includes(word);
    return matchesBrand && matchesMaterial && matchesSearch;
  });

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'projects') {
      router.push('/projects');
      return;
    }
    if (sectionId === 'news') {
      router.push('/news');
      return;
    }
    router.push(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-[#245B4A] text-white font-sans overflow-x-hidden antialiased flex flex-col">
      <title>{`${category.name} | LINH TRANG HOME`}</title>
      <meta name="description" content={category.description} />

      <Header
        onCategoryClick={(id) => router.push(`/category/${id}`)}
        onProjectClick={(id) => router.push(`/projects?id=${id}`)}
        onNavigateToSection={handleNavigateToSection}
        activeSection=""
      />

      {/* Hero Category Banner */}
      <section className="relative h-[55vh] min-h-[420px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover brightness-[0.22] scale-105 transition-transform duration-[12000ms] ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Subtle architectural grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"></div>
          {/* Radial vignette gradient overlay for focus and depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(36,91,74,0.15)_0%,#245B4A_100%)]"></div>
          {/* Soft top-to-bottom dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#245B4A]"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col items-center text-center pt-20">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-[10px] font-headline font-bold text-white/50 hover:text-primary-red hover:border-primary-red/30 transition-all uppercase tracking-[0.2em] mb-8 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 cursor-pointer group shadow-md backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Quay lại danh mục
          </Link>
          
          {/* Glowing Badge for category icon */}
          <div className="relative mb-6 group">
            {/* Outer golden red glowing aura */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#E50914]/20 to-[#FFD700]/25 blur-md group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9B0000] via-[#E50914] to-[#FFD700] flex items-center justify-center text-white shadow-[0_8px_30px_rgba(229,9,20,0.35)] border border-white/20 relative hover:scale-105 transition-all duration-300">
              <DynamicIcon name={category.iconName} className="w-7 h-7 text-white animate-pulse" />
            </div>
          </div>

          <span className="font-headline text-[10px] font-bold tracking-[0.3em] text-[#FFD700] uppercase mb-3">
            BỘ SƯU TẬP KIỆT TÁC CAO CẤP
          </span>

          <h1 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-wide bg-gradient-to-r from-white via-[#FFF5E6] to-white bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)] mb-4">
            {category.name}
          </h1>
          
          <p className="font-sans text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed mb-6 text-center px-4 font-normal tracking-wide drop-shadow-sm">
            {category.description}
          </p>

          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[9px] uppercase font-bold tracking-[0.15em] text-white/85 shadow-lg">
            <span className="w-2 h-2 bg-[#E50914] rounded-full animate-pulse"></span>
            <span>{products.length} dòng sản phẩm nhập khẩu độc quyền</span>
          </div>
        </div>
      </section>

      {/* Main showcase area */}
      <section className="py-16 bg-[#245B4A] border-t border-white/5 relative flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 -mt-16">
          
          {/* Filters & Search Block (Ultra-Premium Glassmorphism) */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl relative z-30">
            {/* Subtle inner decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-red/5 blur-[90px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFD700]/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              
              {/* Search input (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Từ khóa tìm kiếm</span>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
                  <input
                    type="text"
                    placeholder="Tìm sản phẩm theo tên, mã code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.04] text-white placeholder-white/30 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-xs focus:outline-none focus:border-[#E50914]/40 focus:ring-1 focus:ring-[#E50914]/40 transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Brand filter (3 cols) */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Thương hiệu</span>
                <CustomSelect
                  value={selectedBrand}
                  onChange={setSelectedBrand}
                  options={brandOptions}
                />
              </div>

              {/* Material filter (3 cols) */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Chất liệu</span>
                <CustomSelect
                  value={selectedMaterial}
                  onChange={setSelectedMaterial}
                  options={materialOptions}
                />
              </div>

              {/* Reset button (1 col) */}
              <div className="md:col-span-1 flex justify-center md:justify-end">
                {(selectedBrand !== 'Tất cả' || selectedMaterial !== 'Tất cả' || searchQuery !== '') ? (
                  <button
                    onClick={() => {
                      setSelectedBrand('Tất cả');
                      setSelectedMaterial('Tất cả');
                      setSearchQuery('');
                    }}
                    title="Xóa bộ lọc"
                    className="h-10 px-4 bg-[#E50914]/10 hover:bg-[#E50914] text-white rounded-xl text-[10px] font-headline font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 border border-[#E50914]/20 w-full md:w-auto justify-center"
                  >
                    <X className="w-3.5 h-3.5" /> Xóa
                  </button>
                ) : (
                  <div className="h-10 w-0 md:w-4"></div>
                )}
              </div>

            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-[#327863]/15 border border-dashed border-white/10 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/40">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="font-headline text-lg font-bold text-white mb-2">
                Không tìm thấy sản phẩm phù hợp
              </h4>
              <p className="text-xs text-text-secondary max-w-sm leading-relaxed mb-6">
                Hãy điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để hiển thị thêm sản phẩm của danh mục {category.name}.
              </p>
              <button
                onClick={() => {
                  setSelectedBrand('Tất cả');
                  setSelectedMaterial('Tất cả');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-primary-red hover:bg-[#c0000c] text-white text-xs font-headline font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((prod, idx) => (
                <motion.div
                  key={prod.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.5 }}
                  className="group/prod bg-[#327863]/30 border border-white/10 hover:border-primary-red/30 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Image with Code Badge */}
                  <div className="aspect-video relative overflow-hidden bg-black/35">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 text-[9px] font-bold font-headline rounded-full bg-primary-red text-white uppercase tracking-widest shadow-md">
                      {prod.code}
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-headline text-base font-bold text-white group-hover/prod:text-primary-red transition-colors mb-2 line-clamp-2 min-h-[48px]">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Specifications */}
                    <div className="space-y-2 border-t border-white/5 pt-4 mb-6 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Thương hiệu:</span>
                        <span className="text-white font-semibold uppercase">{prod.origin}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Chất liệu:</span>
                        <span className="text-white truncate max-w-[170px]" title={prod.material}>
                          {prod.material}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Kích thước:</span>
                        <span className="text-white font-mono">{prod.size}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <Link
                        href={`/product/${prod.id}`}
                        className="flex-1 py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-white font-headline font-bold text-[11px] tracking-wider transition-colors cursor-pointer border border-white/5"
                      >
                        XEM CHI TIẾT
                      </Link>
                      <Link
                        href={`/?quote=${prod.code}#consultation`}
                        className="px-4 py-3 rounded-xl bg-primary-red hover:bg-[#c0000c] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                        title="Yêu cầu thông tin / Báo giá"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
