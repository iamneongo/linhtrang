'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Layers, X, Search, Check, ChevronDown, SlidersHorizontal, Upload, Sparkles, RefreshCw, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { projects as staticProjects } from '@/data';
import { fetchProjects } from '@/lib/content';
import { Project } from '@/types';

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
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
        <ChevronDown className={`w-4 h-4 text-white/55 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 bg-[#1a4535] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar z-35 p-1.5"
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
                    ? 'bg-primary-red/[0.15] text-primary-red font-semibold'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {value === opt.value && <Check className="w-3.5 h-3.5 text-primary-red shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectsContent() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');
  const [selectedStyle, setSelectedStyle] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);

  // AI Room Visualizer states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [aiVisualizing, setAiVisualizing] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [aiResult, setAiResult] = useState<{
    detectedStyle: string;
    suggestions: string[];
    conceptImage: string;
  } | null>(null);
  const [visualizerOpen, setVisualizerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract unique filter options
  const locations = ['Tất cả', ...Array.from(new Set(projects.map(p => p.location)))];
  const styles = ['Tất cả', ...Array.from(new Set(projects.map(p => p.style)))];

  const locationOptions = locations.map(loc => ({ value: loc, label: loc === 'Tất cả' ? 'Tất cả địa điểm' : loc }));
  const styleOptions = styles.map(st => ({ value: st, label: st === 'Tất cả' ? 'Tất cả phong cách' : st }));

  // Filtering logic
  const filteredProjects = projects.filter(proj => {
    const matchesLocation = selectedLocation === 'Tất cả' || proj.location === selectedLocation;
    const matchesStyle = selectedStyle === 'Tất cả' || proj.style === selectedStyle;
    
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      proj.title.toLowerCase().includes(query) ||
      proj.description.toLowerCase().includes(query) ||
      proj.category.toLowerCase().includes(query) ||
      proj.location.toLowerCase().includes(query) ||
      proj.style.toLowerCase().includes(query);

    return matchesLocation && matchesStyle && matchesSearch;
  });

  const handleProjectClick = (proj: Project) => {
    router.push(`/projects/${proj.id}`);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const routes: Record<string, string> = {
      projects: '/projects', news: '/news', about: '/about', faq: '/faq', consultation: '/contact',
    };
    router.push(routes[sectionId] || `/?section=${sectionId}`);
  };

  // AI Visualizer handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        startAiVisualization();
      };
      reader.readAsDataURL(file);
    }
  };

  const startAiVisualization = () => {
    setVisualizerOpen(true);
    setAiVisualizing(true);
    setAiStep(0);
    setAiResult(null);
    
    // Simulate stages
    const interval = setInterval(() => {
      setAiStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setAiVisualizing(false);
          setAiResult({
            detectedStyle: 'Modern Luxury (Sang Trọng Hiện Đại)',
            suggestions: [
              'Phòng khách có ánh sáng tự nhiên tốt, khuyên dùng **Gạch Vân Đá Marble Calacatta Tây Ban Nha (LT-MARBLE-01)** khổ lớn 80x160cm để tạo chiều sâu và độ bóng bẩy.',
              'Mảng tường tivi hoặc vách sofa rất thích hợp sử dụng **Tấm Ốp Lam Sóng Charcoal Gỗ Óc Chó Ý (LT-CHARCOAL-01)** nhằm tăng khả năng tiêu âm và mang nét ấm áp mộc mạc của gỗ.',
              'Để tạo điểm nhấn nghệ thuật và tăng tính thẩm mỹ, gợi ý kết hợp thêm **Đèn Thả Bàn Ăn Bắc Âu Minimalist Slim (LT-LIGHT-TH02)** hoặc **Bàn Ăn Mặt Đá Phiến Hermes (LT-BA-HERMES)** chân đồng thau đúc.'
            ],
            conceptImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
          });
          return 4;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#245B4A] text-white font-sans overflow-x-hidden antialiased flex flex-col">
      <Header
        onCategoryClick={(id) => router.push(`/category/${id}`)}
        onProjectClick={(id) => router.push(`/projects/${id}`)}
        onNavigateToSection={handleNavigateToSection}
        activeSection="projects"
      />

      {/* Page Header (Clean, Flat, Non-Card style) */}
      <section className="pt-28 pb-10 bg-[#245B4A] border-b border-white/5 relative z-30">
        {/* Subtle decorative elements directly on background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-red/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#FFD700]/5 blur-[110px] rounded-full pointer-events-none"></div>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            {/* Title & Description */}
            <div className="max-w-3xl">
              <span className="font-headline text-[10px] font-bold tracking-[0.25em] text-[#FFD700] uppercase mb-2 block">
                BẢO CHỨNG BỞI CHẤT LƯỢNG THI CÔNG
              </span>
              <h1 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-wide text-white mb-4 drop-shadow-md">
                Dự Án Tiêu Biểu
              </h1>
              <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-normal">
                Linh Trang Home tự hào là đối tác cung cấp giải pháp vật liệu & thiết bị vệ sinh nhập khẩu cao cấp cho hàng loạt đại công trình biệt thự, căn hộ cao cấp và resort nghỉ dưỡng quy mô lớn.
              </p>
            </div>

            {/* Project count Badge */}
            <div className="shrink-0 flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-2 rounded-full text-[9px] uppercase font-bold tracking-[0.15em] text-white/90 shadow-md h-fit w-fit">
              <span className="w-2 h-2 bg-[#E50914] rounded-full animate-pulse"></span>
              <span>{projects.length} dự án hoàn thành bàn giao</span>
            </div>
          </div>

          {/* Flat Filters & Search Grid (Collapsible to save space on mobile) */}
          <div className="flex flex-col md:flex-row gap-4 items-center pt-6 border-t border-white/5 relative z-20">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
              <input
                type="text"
                placeholder="Tìm tên công trình, vị trí, phong cách..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] text-white placeholder-white/30 border border-white/10 rounded-xl pl-11 pr-10 py-3.5 text-xs focus:outline-none focus:border-[#E50914]/40 focus:ring-1 focus:ring-[#E50914]/40 transition-all shadow-inner font-medium"
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

            {/* Action Buttons */}
            <div className="flex gap-2.5 w-full md:w-auto shrink-0 justify-end">
              {/* Toggle Filters Button */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 md:flex-none h-11 px-4 border rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-97 ${
                  showFilters || selectedLocation !== 'Tất cả' || selectedStyle !== 'Tất cả'
                    ? 'bg-[#E50914] border-[#E50914] text-white shadow-lg shadow-[#E50914]/20 font-bold'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-white/90'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Bộ lọc {selectedLocation !== 'Tất cả' || selectedStyle !== 'Tất cả' ? '• Hoạt động' : ''}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {/* Reset Filter Button */}
              {(selectedLocation !== 'Tất cả' || selectedStyle !== 'Tất cả' || searchQuery !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLocation('Tất cả');
                    setSelectedStyle('Tất cả');
                    setSearchQuery('');
                  }}
                  className="h-11 px-4 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-xl text-xs font-headline font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-97"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              )}
            </div>
          </div>

          {/* Collapsible Advanced Filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden w-full relative z-20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/20 p-4 border border-white/5 rounded-2xl">
                  {/* Location Filter */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Khu vực địa điểm</span>
                    <CustomSelect
                      value={selectedLocation}
                      onChange={setSelectedLocation}
                      options={locationOptions}
                    />
                  </div>

                  {/* Style Filter */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Phong cách thiết kế</span>
                    <CustomSelect
                      value={selectedStyle}
                      onChange={setSelectedStyle}
                      options={styleOptions}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Visualizer Banner Widget */}
          <div className="mt-6 relative overflow-hidden rounded-2xl border border-[#FFD700]/15 bg-gradient-to-r from-[#173e32] via-[#245b4a] to-[#2b6d59] p-6 shadow-xl relative z-10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-red/5 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl text-center md:text-left">
                <span className="inline-flex items-center gap-1.5 font-headline text-[9px] font-bold tracking-[0.2em] text-[#FFD700] uppercase mb-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  <Sparkles className="w-3 h-3 text-[#FFD700]" /> Trải nghiệm AI độc quyền
                </span>
                <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-wide text-white mb-2">
                  Dựng Phối Cảnh AI Căn Hộ Của Bạn
                </h3>
                <p className="text-xs text-white/70 leading-relaxed max-w-xl">
                  Tải lên ảnh căn phòng mộc hoặc hiện trạng nhà bạn. Trợ lý AI của Linh Trang Home sẽ ngay lập tức đề xuất phong cách thiết kế, cách phối màu gạch và bày trí đèn nội thất phù hợp nhất.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-[#E50914] to-[#c0000c] text-white text-xs font-headline font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/25 hover:brightness-110 active:scale-97 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Gửi ảnh dựng phối cảnh AI
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main showcase area */}
      <section className="py-10 bg-[#245B4A] relative flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
              
          {/* Grid display */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
              <Layers className="w-12 h-12 mx-auto text-white/20 mb-4 animate-bounce" />
              <p className="text-sm text-text-secondary">Không tìm thấy dự án nào khớp với tiêu chí tìm kiếm của bạn.</p>
              <button
                onClick={() => {
                  setSelectedLocation('Tất cả');
                  setSelectedStyle('Tất cả');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2 bg-primary-red hover:bg-[#c0000c] text-white text-xs font-headline font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Reset tìm kiếm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  onClick={() => handleProjectClick(proj)}
                  className="group cursor-pointer flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary-red/30 hover:shadow-xl transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold font-headline rounded-full bg-white/90 text-slate-700 uppercase tracking-widest shadow-sm">
                      {proj.category}
                    </span>
                    <span className="absolute bottom-3 right-3 text-[9px] font-bold font-headline text-white bg-black/40 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-full">
                      {proj.year}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-headline text-sm font-bold text-slate-800 group-hover:text-primary-red transition-colors mb-1.5 line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed flex-1">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary-red" />
                        {proj.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Compass className="w-3 h-3 text-primary-red" />
                        {proj.area}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* AI Visualizer Modal */}
      <AnimatePresence>
        {visualizerOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#245B4A] border border-white/10 text-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col relative z-50"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FFD700] animate-pulse" />
                  <h3 className="font-headline text-sm font-bold uppercase tracking-wider">MIA AI • Phối Cảnh Không Gian</h3>
                </div>
                <button
                  onClick={() => setVisualizerOpen(false)}
                  className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {aiVisualizing ? (
                  /* Visualizing Loading State */
                  <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
                    <div className="relative">
                      {/* Pulsing circles */}
                      <span className="absolute inset-0 rounded-full bg-[#E50914]/25 scale-125 animate-ping"></span>
                      <div className="w-16 h-16 rounded-full bg-[#E50914] flex items-center justify-center text-white relative z-10 shadow-lg shadow-[#E50914]/20">
                        <RefreshCw className="w-7 h-7 animate-spin" />
                      </div>
                    </div>

                    <div className="max-w-md space-y-2">
                      <h4 className="font-headline text-base font-bold text-white uppercase tracking-wide">
                        MIA AI Đang Xử Lý Không Gian...
                      </h4>
                      <p className="text-xs text-white/50">
                        Phân tích ảnh hiện trạng để kiến tạo giải pháp vật liệu & thiết kế tối ưu.
                      </p>
                    </div>

                    {/* Fake steps animation */}
                    <div className="w-full max-w-xs space-y-3 pt-4 text-left mx-auto">
                      {[
                        'Nhận diện kết cấu trần-tường-sàn...',
                        'Đo lường độ sáng & góc chiếu tự nhiên...',
                        'Khớp vật liệu đá và thiết bị cao cấp...',
                        'Kiến tạo mô hình phối cảnh 3D...'
                      ].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[9px] font-bold ${
                            aiStep > idx 
                              ? 'bg-[#10B981] border-[#10B981] text-white' 
                              : aiStep === idx 
                                ? 'bg-[#E50914] border-[#E50914] text-white animate-pulse' 
                                : 'border-white/10 text-white/30'
                          }`}>
                            {aiStep > idx ? '✓' : idx + 1}
                          </div>
                          <span className={`text-xs ${
                            aiStep > idx 
                              ? 'text-white font-medium' 
                              : aiStep === idx 
                                ? 'text-[#FFD700] font-bold' 
                                : 'text-white/30'
                          }`}>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : aiResult ? (
                  /* Visualizer Result Display */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Images Side (Before/After) */}
                    <div className="space-y-4">
                      <span className="font-headline text-[10px] font-black tracking-widest text-[#FFD700] uppercase block">
                        KẾT QUẢ PHỐI CẢNH AI ĐỀ XUẤT
                      </span>

                      {/* Concept Image */}
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg aspect-[4/3] bg-black">
                        <img
                          src={aiResult.conceptImage}
                          alt="AI Concept"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-[#10B981] text-white text-[9px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> 3D Phối Cảnh Gợi Ý
                        </span>
                      </div>

                      {/* Original image preview */}
                      <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-white/5">
                        {selectedImage && (
                          <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/15">
                            <img src={selectedImage} alt="Original" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Ảnh gốc của bạn</p>
                          <p className="text-xs text-white/80 font-medium truncate max-w-[200px]">Đã nhận diện thành công</p>
                        </div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="ml-auto px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Đổi ảnh khác
                        </button>
                      </div>
                    </div>

                    {/* AI Feedback & Consultation Form Side */}
                    <div className="space-y-6">
                      <div className="bg-[#327863]/30 p-5 rounded-2xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                          <h5 className="font-headline text-xs font-black uppercase tracking-wider text-white">
                            Phong cách phù hợp: <span className="text-[#FFD700]">{aiResult.detectedStyle}</span>
                          </h5>
                        </div>

                        <div className="space-y-3">
                          {aiResult.suggestions.map((sug: string, sIdx: number) => {
                            const parts = sug.split(/\*\*(.*?)\*\*/g);
                            return (
                              <div key={sIdx} className="text-xs leading-relaxed text-white/90 flex gap-2">
                                <span className="text-[#FFD700] mt-0.5">•</span>
                                <p>
                                  {parts.map((p, pIdx) => 
                                    pIdx % 2 === 1 
                                      ? <strong key={pIdx} className="text-[#FFD700] font-bold">{p}</strong> 
                                      : p
                                  )}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Quick Contact Form inside Modal */}
                      <div className="p-5 border border-white/10 bg-black/10 rounded-2xl space-y-4">
                        <div>
                          <h5 className="font-headline text-xs font-bold uppercase tracking-wider text-white">
                            Nhận thiết kế & Báo giá 3D thực tế
                          </h5>
                          <p className="text-[10px] text-white/50 leading-relaxed mt-1">
                            Linh Trang Home hỗ trợ đo đạc hiện trạng và lên bản vẽ 3D chuyên sâu hoàn toàn miễn phí từ kiến trúc sư thực tế.
                          </p>
                        </div>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            alert('Cảm ơn bạn! Yêu cầu nhận bản vẽ 3D từ ảnh phối cảnh đã được gửi. Đội ngũ KTS sẽ liên hệ lại với bạn ngay.');
                            setVisualizerOpen(false);
                          }}
                          className="space-y-3"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Họ & tên của bạn"
                              className="w-full bg-white/[0.04] text-white placeholder-white/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#E50914] transition-all"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Số điện thoại"
                              className="w-full bg-white/[0.04] text-white placeholder-white/30 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#E50914] transition-all"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-3 bg-[#E50914] hover:bg-[#c0000c] text-white text-[10px] font-headline font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-[#E50914]/10 active:scale-98 flex items-center justify-center gap-1.5"
                          >
                            Đăng ký nhận bản vẽ 3D thực tế <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <ChatBot />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#245B4A] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs font-headline font-bold tracking-widest uppercase">Đang tải dự án...</p>
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
