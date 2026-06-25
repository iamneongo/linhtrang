'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, Layers, X, Search, Check, ChevronDown } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { projects } from '@/data';
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
            className="absolute left-0 right-0 top-full mt-2 bg-white border border-black/[0.08] rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar z-35 p-1.5"
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
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');
  const [selectedStyle, setSelectedStyle] = useState('Tất cả');

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

  const handleCloseDetail = () => {
    router.push('/projects', { scroll: false });
  };

  const handleNavigateToSection = (sectionId: string) => {
    const routes: Record<string, string> = {
      projects: '/projects', news: '/news', about: '/about', faq: '/faq', consultation: '/contact',
    };
    router.push(routes[sectionId] || `/?section=${sectionId}`);
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
      <section className="pt-28 pb-12 bg-[#245B4A] border-b border-white/5 relative z-30">
        {/* Subtle decorative elements directly on background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-red/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#FFD700]/5 blur-[110px] rounded-full pointer-events-none"></div>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
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

          {/* Flat Filters & Search Grid (NO card container) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-8 border-t border-white/5 relative z-20">
            
            {/* Search input (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Từ khóa tìm kiếm</span>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
                <input
                  type="text"
                  placeholder="Tìm tên công trình, vị trí, phong cách..."
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

            {/* Location filter (3 cols) */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Khu vực địa điểm</span>
              <CustomSelect
                value={selectedLocation}
                onChange={setSelectedLocation}
                options={locationOptions}
              />
            </div>

            {/* Style filter (3 cols) */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Phong cách thiết kế</span>
              <CustomSelect
                value={selectedStyle}
                onChange={setSelectedStyle}
                options={styleOptions}
              />
            </div>

            {/* Reset button (1 col) */}
            <div className="md:col-span-1 flex justify-center md:justify-end">
              {(selectedLocation !== 'Tất cả' || selectedStyle !== 'Tất cả' || searchQuery !== '') ? (
                <button
                  onClick={() => {
                    setSelectedLocation('Tất cả');
                    setSelectedStyle('Tất cả');
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
      </section>

      {/* Main showcase area */}
      <section className="py-12 bg-[#245B4A] relative flex-1">
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
