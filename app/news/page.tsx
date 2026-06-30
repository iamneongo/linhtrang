'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search, BookOpen, Clock, X } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { blogPosts as staticBlogPosts } from '@/data';
import { fetchNews } from '@/lib/content';
import { BlogPost } from '@/types';

function NewsContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(staticBlogPosts);

  useEffect(() => {
    fetchNews().then(setBlogPosts);
  }, []);

  // Filtering logic
  const filteredPosts = blogPosts.filter(post => {
    const query = searchQuery.trim().toLowerCase();
    return !query ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query);
  });

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
        activeSection="news"
      />

      {/* Page Header (Clean, Flat, Non-Card style) */}
      <section className="pt-28 pb-12 bg-[#245B4A] border-b border-white/5 relative">
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
                BLOG THIẾT KẾ & KIẾN TRÚC THỜI THƯỢNG
              </span>
              <h1 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-wide text-white mb-4 drop-shadow-md">
                Tin Tức - Xu Hướng
              </h1>
              <p className="font-sans text-xs md:text-sm text-white/80 leading-relaxed font-normal">
                Khám phá cẩm nang lựa chọn vật liệu hoàn thiện, kiến thức thiết kế nội ngoại thất phong thủy và những xu hướng công nghệ nhà tắm tiện nghi tiên phong trên thế giới.
              </p>
            </div>

            {/* Clock count Badge */}
            <div className="shrink-0 flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-2 rounded-full text-[9px] uppercase font-bold tracking-[0.15em] text-white/90 shadow-md h-fit w-fit">
              <Clock className="w-4 h-4 text-[#E50914] animate-pulse" />
              <span>Cập nhật liên tục theo tuần</span>
            </div>
          </div>

          {/* Flat Search input (NO card container) */}
          <div className="pt-8 border-t border-white/5 relative z-20 max-w-2xl">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-white/40">Tìm kiếm bài viết</span>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/45" />
                <input
                  type="text"
                  placeholder="Nhập từ khóa tìm kiếm tiêu đề, nội dung tin tức..."
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
          </div>
        </div>
      </section>

      {/* Main showcase area */}
      <section className="py-12 bg-[#245B4A] relative flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">

          {/* Grid display */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
              <BookOpen className="w-12 h-12 mx-auto text-white/20 mb-4 animate-bounce" />
              <p className="text-sm text-text-secondary">Không tìm thấy bài viết nào khớp với từ khóa của bạn.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-5 py-2 bg-primary-red hover:bg-[#c0000c] text-white text-xs font-headline font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Xem tất cả tin tức
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  onClick={() => router.push(`/news/${post.id}`)}
                  className="group cursor-pointer flex flex-col bg-white border border-slate-200 hover:border-primary-red/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Text */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary-red" />
                        {post.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-[#245B4A]" />
                        {post.author}
                      </span>
                    </div>

                    <h3 className="font-headline text-sm font-bold text-slate-800 group-hover:text-primary-red transition-colors mb-1.5 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
                      {post.summary}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1 text-[10px] text-primary-red font-bold uppercase tracking-wider">
                      <span>Đọc tiếp</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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

export default function NewsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#245B4A] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs font-headline font-bold tracking-widest uppercase">Đang tải tin tức...</p>
        </div>
      </div>
    }>
      <NewsContent />
    </Suspense>
  );
}
