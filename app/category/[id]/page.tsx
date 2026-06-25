'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
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
    router.push(`/#${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-[#245B4A] text-white font-sans overflow-x-hidden antialiased flex flex-col">
      <title>{`${category.name} | LINH TRANG HOME`}</title>
      <meta name="description" content={category.description} />

      <Header
        onCategoryClick={(id) => router.push(`/category/${id}`)}
        onProjectClick={() => handleNavigateToSection('projects')}
        onNavigateToSection={handleNavigateToSection}
        activeSection=""
      />

      {/* Hero Category Banner */}
      <section className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#245B4A] via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full flex flex-col items-center text-center pt-16">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-xs font-headline font-bold text-white/60 hover:text-primary-red transition-all uppercase tracking-widest mb-4 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Quay lại danh mục
          </Link>
          
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 text-white shadow-xl">
            <DynamicIcon name={category.iconName} className="w-8 h-8" />
          </div>

          <h1 className="font-headline text-3xl md:text-5xl font-extrabold uppercase text-glow tracking-tight text-white mb-3">
            {category.name}
          </h1>
          <p className="text-xs md:text-sm text-text-secondary max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Main showcase area */}
      <section className="py-16 bg-[#245B4A] border-t border-white/5 relative flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Filters & Search Block */}
          <div className="bg-[#327863]/30 border border-white/10 rounded-2xl p-6 mb-12 shadow-xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Search input (5 cols) */}
              <div className="lg:col-span-5 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm theo tên, mã code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#327863]/40 text-white placeholder-white/40 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:border-primary-red transition-all shadow-inner"
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

              {/* Brand filter (3 cols) */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <span className="text-xs text-text-secondary font-medium whitespace-nowrap">Thương hiệu:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-[#327863]/40 text-white font-semibold border border-white/10 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-primary-red cursor-pointer transition-all"
                >
                  <option value="Tất cả">Tất cả thương hiệu</option>
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Material filter (3 cols) */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <span className="text-xs text-text-secondary font-medium whitespace-nowrap">Chất liệu:</span>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full bg-[#327863]/40 text-white font-semibold border border-white/10 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-primary-red cursor-pointer transition-all truncate"
                >
                  <option value="Tất cả">Tất cả chất liệu</option>
                  {uniqueMaterials.map((mat) => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>

              {/* Reset button (1 col) */}
              <div className="lg:col-span-1 flex justify-end">
                {(selectedBrand !== 'Tất cả' || selectedMaterial !== 'Tất cả' || searchQuery !== '') && (
                  <button
                    onClick={() => {
                      setSelectedBrand('Tất cả');
                      setSelectedMaterial('Tất cả');
                      setSearchQuery('');
                    }}
                    className="text-primary-red hover:underline font-bold tracking-wide uppercase text-[10px] cursor-pointer flex items-center gap-1 py-2"
                  >
                    Xóa lọc
                  </button>
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
