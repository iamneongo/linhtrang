import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, X, Check, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Category, Product } from '../types';
import { categories, productsByCategoryId } from '../data';

// Custom component helper to map strings to LucideIcons components safely
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return <HelpCircle className={className} />;
  return <IconComponent className={className} />;
}

interface ProductSectionProps {
  onProductSelectForQuote: (productName: string, productCode: string) => void;
}

export default function ProductSection({ onProductSelectForQuote }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Advanced Filtering and Search state within Category details modal
  const [selectedBrand, setSelectedBrand] = useState<string>('Tất cả');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const handleSelectCategory = (cat: Category | null) => {
    setSelectedCategory(cat);
    // Reset filters and search queries whenever switching categories
    setSelectedBrand('Tất cả');
    setSelectedMaterial('Tất cả');
    setSearchQuery('');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleQuoteClick = (product: Product) => {
    onProductSelectForQuote(product.name, product.code);
    setSelectedProduct(null);
    handleSelectCategory(null);
  };

  return (
    <section id="products" className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Visual glowing accent background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-red/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Title & Link to show all */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="font-headline text-xs font-bold tracking-widest text-slate-500 uppercase">
              KIẾN TẠO PHÂN KHÚC THƯỢNG LƯU
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold uppercase mt-1 leading-tight tracking-tight text-[#245B4A]">
              Danh mục <span className="text-primary-red">sản phẩm</span>
            </h2>
            <div className="w-16 h-1 bg-primary-red mt-3 rounded-full"></div>
          </div>
          <button 
            onClick={() => handleSelectCategory(categories[0])}
            className="text-xs font-headline font-bold tracking-wider text-slate-800 hover:text-primary-red transition-all flex items-center gap-2 group cursor-pointer"
          >
            XEM TẤT CẢ DANH MỤC <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary-red" />
          </button>
        </div>

        {/* Categories Carousel (Frosted larger slide cards) */}
        <div className="relative mt-8">
          {/* Carousel Navigation Buttons */}
          <div className="absolute -top-16 right-0 flex gap-2.5 z-10">
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

          {/* Scrolling horizontal list */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none"
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                onClick={() => handleSelectCategory(cat)}
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
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Category Product Showcase Overlay Modal (High-Fidelity) */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            id="category-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#245B4A]/48 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              id="category-modal-content"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-5xl bg-[#327863] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col max-h-[90vh]"
            >
              {/* Modal header details */}
              <div className="flex justify-between items-start border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red">
                    <DynamicIcon name={selectedCategory.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline text-xl md:text-2xl font-bold text-white uppercase text-glow">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">{selectedCategory.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectCategory(null)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Đóng"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Intelligent Filter & Search Bar */}
              {(() => {
                const categoryProducts = productsByCategoryId[selectedCategory.id] || [];
                const uniqueBrands = Array.from(new Set(categoryProducts.map(p => p.origin)));
                const uniqueMaterials = Array.from(new Set(categoryProducts.map(p => p.material)));
                
                const filteredProducts = categoryProducts.filter((prod) => {
                  const matchesBrand = selectedBrand === 'Tất cả' || prod.origin === selectedBrand;
                  const matchesMaterial = selectedMaterial === 'Tất cả' || prod.material === selectedMaterial;
                  const word = searchQuery.trim().toLowerCase();
                  const matchesSearch = !word || 
                    prod.name.toLowerCase().includes(word) || 
                    prod.code.toLowerCase().includes(word) || 
                    prod.description.toLowerCase().includes(word);
                  return matchesBrand && matchesMaterial && matchesSearch;
                });

                return (
                  <>
                    <div className="bg-[#245B4A]/30 border border-white/5 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs">
                      {/* Search Query Input */}
                      <div className="relative w-full md:w-72">
                        <LucideIcons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          placeholder="Tìm sản phẩm, mã Code..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#327863]/40 text-white placeholder-white/40 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-primary-red transition-all"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Select Dropdowns Group */}
                      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        
                        {/* Brand / Origin filter */}
                        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 sm:flex-initial">
                          <span className="text-text-secondary font-medium whitespace-nowrap">Thương hiệu:</span>
                          <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full sm:w-auto bg-[#327863]/40 text-white font-semibold border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-red cursor-pointer transition-all"
                          >
                            <option value="Tất cả">Tất cả thương hiệu</option>
                            {uniqueBrands.map(brand => (
                              <option key={brand} value={brand}>{brand}</option>
                            ))}
                          </select>
                        </div>

                        {/* Material filter */}
                        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 sm:flex-initial">
                          <span className="text-text-secondary font-medium whitespace-nowrap">Chất liệu:</span>
                          <select
                            value={selectedMaterial}
                            onChange={(e) => setSelectedMaterial(e.target.value)}
                            className="w-full sm:w-48 bg-[#327863]/40 text-white font-semibold border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-red cursor-pointer transition-all truncate"
                          >
                            <option value="Tất cả">Tất cả chất liệu</option>
                            {uniqueMaterials.map(mat => (
                              <option key={mat} value={mat}>
                                {mat.length > 25 ? `${mat.substring(0, 25)}...` : mat}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Clear specific active query items button */}
                        {(selectedBrand !== 'Tất cả' || selectedMaterial !== 'Tất cả' || searchQuery !== '') && (
                          <button
                            onClick={() => {
                              setSelectedBrand('Tất cả');
                              setSelectedMaterial('Tất cả');
                              setSearchQuery('');
                            }}
                            className="text-primary-red hover:underline font-bold tracking-wide uppercase text-[10px] ml-auto sm:ml-0 cursor-pointer"
                          >
                            Xóa lọc
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Products Grid display based on results length */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-2">
                      {filteredProducts.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-[#245B4A]/15 border border-dashed border-white/10 rounded-2xl">
                          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/40">
                            <LucideIcons.Search className="w-8 h-8" />
                          </div>
                          <h4 className="font-headline text-base font-bold text-white mb-2">
                            Không tìm thấy sản phẩm phù hợp
                          </h4>
                          <p className="text-xs text-text-secondary max-w-sm leading-relaxed mb-6">
                            Vui lòng thay đổi từ khóa tìm kiếm hoặc đặt lại các bộ lọc về ban đầu để hiển thị đầy đủ dải sản phẩm.
                          </p>
                          <button
                            onClick={() => {
                              setSelectedBrand('Tất cả');
                              setSelectedMaterial('Tất cả');
                              setSearchQuery('');
                            }}
                            className="px-5 py-2.5 bg-primary-red hover:bg-[#c0000c] text-white text-xs font-headline font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                          >
                            Đặt lại trạng thái lọc
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {filteredProducts.map((prod) => (
                            <div
                              key={prod.id}
                              className="group/prod bg-[#245B4A]/25 border border-white/5 hover:border-primary-red/30 rounded-xl overflow-hidden flex flex-col h-full shadow-inner hover:shadow-2xl transition-all duration-300"
                            >
                              {/* Product image with ratio aspect & label tag */}
                              <div className="aspect-video relative overflow-hidden bg-black/40">
                                <img
                                  src={prod.imageUrl}
                                  alt={prod.name}
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold font-headline rounded-full bg-primary-red text-white uppercase tracking-widest">
                                  {prod.code}
                                </span>
                              </div>

                              {/* Info & contents */}
                              <div className="p-5 flex flex-col flex-1">
                                <h4 className="font-headline text-sm font-bold text-white group-hover/prod:text-primary-red transition-colors mb-2 min-h-[40px] line-clamp-2">
                                  {prod.name}
                                </h4>
                                <p className="text-xs text-text-secondary line-clamp-2 mb-4 pr-1 flex-1">
                                  {prod.description}
                                </p>

                                <div className="space-y-1.5 border-t border-white/5 pt-3.5 mb-5 text-[11px]">
                                  <div className="flex justify-between">
                                    <span className="text-text-secondary">Xuất xứ:</span>
                                    <span className="text-white font-semibold">{prod.origin}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-text-secondary">Chất liệu:</span>
                                    <span className="text-white select-all truncate max-w-[150px]" title={prod.material}>{prod.material}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-text-secondary">Kích thước:</span>
                                    <span className="text-white select-all">{prod.size}</span>
                                  </div>
                                </div>

                                {/* Interactive action grids */}
                                <div className="flex gap-2.5">
                                  <button
                                    onClick={() => setSelectedProduct(prod)}
                                    className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-headline font-bold text-[11px] tracking-wider transition-colors cursor-pointer"
                                  >
                                    XEM CHI TIẾT
                                  </button>
                                  <button
                                    onClick={() => handleQuoteClick(prod)}
                                    className="px-3.5 py-2 rounded-lg bg-primary-red hover:bg-[#c0000c] text-white flex items-center justify-center transition-colors cursor-pointer"
                                    title="Yêu cầu thông tin / Báo giá"
                                  >
                                    <ShoppingBag className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Slide-Out Panel or High-End Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            id="product-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              id="product-detail-modal"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="w-full max-w-4xl bg-[#327863] border border-white/15 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Absolute Close */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-1 rounded-full bg-black/40 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto pr-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Photo area with framing */}
                  <div className="rounded-xl overflow-hidden aspect-square border border-white/10 shadow-lg relative bg-black/20">
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-4 left-4 px-3.5 py-1 text-xs font-bold font-headline bg-primary-red text-white tracking-widest rounded-full uppercase">
                      Code: {selectedProduct.code}
                    </span>
                  </div>

                  {/* Description specs detailed */}
                  <div className="flex flex-col">
                    <span className="font-headline text-[10px] text-primary-red font-extrabold tracking-widest uppercase mb-1">
                      Chi tiết sản phẩm phân phối độc quyền
                    </span>
                    <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                      {selectedProduct.name}
                    </h3>
                    
                    {/* Copyable code button */}
                    <div className="flex gap-2 items-center mb-5 bg-[#245B4A] border border-white/5 py-2 px-3.5 rounded-xl w-fit">
                      <span className="text-xs text-text-secondary">Mã sản phẩm:</span>
                      <span className="text-xs font-mono font-bold text-white select-all">{selectedProduct.code}</span>
                      <button
                        onClick={() => handleCopyCode(selectedProduct.code)}
                        className="text-[10px] text-primary-red font-semibold hover:underline border-l border-white/10 pl-2.5 uppercase tracking-wider"
                      >
                        {copiedCode === selectedProduct.code ? (
                          <span className="text-green-400 flex items-center gap-1">
                            <Check className="w-3 h-3" /> ĐÃ COPY
                          </span>
                        ) : (
                          'Sao chép'
                        )}
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-text-secondary leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    <div className="space-y-3 bg-[#245B4A]/25 p-4 rounded-xl border border-white/5 mb-8 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-text-secondary">Xuất xứ / Brand:</span>
                        <span className="text-white font-bold uppercase">{selectedProduct.origin}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-text-secondary">Vật liệu cấu thành:</span>
                        <span className="text-white text-right">{selectedProduct.material}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-text-secondary">Kích thước chuẩn:</span>
                        <span className="text-white font-mono">{selectedProduct.size}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-secondary">Đơn giá bán sỉ/lẻ:</span>
                        <span className="text-primary-red font-bold text-sm">Theo khối lượng dự án (Liên hệ)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuoteClick(selectedProduct)}
                      className="w-full py-4 rounded-xl bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold text-xs tracking-widest uppercase shadow-lg shadow-primary-red/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      YÊU CẦU BÁO GIÁ & THI CÔNG
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
