'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { blogPosts as staticBlogPosts } from '@/data';
import { fetchNews } from '@/lib/content';
import { BlogPost } from '@/types';

function renderFormattedContent(content: string) {
  if (!content) return null;
  const items = content.split('\n');
  return items.map((paragraph, idx) => {
    if (!paragraph.trim()) return <div key={idx} className="h-3" />;

    if (paragraph.startsWith('### ')) {
      return (
        <h4 key={idx} className="font-headline text-lg font-bold text-[#245B4A] mt-8 mb-3 uppercase tracking-wide border-l-4 border-primary-red pl-4">
          {paragraph.replace('### ', '')}
        </h4>
      );
    }

    if (paragraph.match(/^\d+\.\s/)) {
      const textContent = paragraph.replace(/^\d+\.\s/, '');
      const number = paragraph.match(/^\d+/)?.[0];
      const parts = textContent.split(/\*\*(.*?)\*\*/g);
      return (
        <div key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-700 my-3">
          <span className="w-6 h-6 rounded-full bg-primary-red text-white font-headline font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
            {number}
          </span>
          <p className="flex-1">
            {parts.map((part, partIdx) =>
              partIdx % 2 === 1 ? <strong key={partIdx} className="font-bold text-slate-900">{part}</strong> : part
            )}
          </p>
        </div>
      );
    }

    const parts = paragraph.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={idx} className="text-sm text-slate-700 leading-relaxed mb-4 font-sans">
        {parts.map((part, partIdx) =>
          partIdx % 2 === 1 ? <strong key={partIdx} className="font-bold text-slate-900">{part}</strong> : part
        )}
      </p>
    );
  });
}

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(staticBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then(setBlogPosts)
      .finally(() => setLoading(false));
  }, []);

  const post = blogPosts.find(p => p.id === id);
  const currentIndex = blogPosts.findIndex(p => p.id === id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const relatedPosts = blogPosts.filter(p => p.id !== id).slice(0, 3);

  const handleNavigateToSection = (sectionId: string) => {
    const routes: Record<string, string> = {
      projects: '/projects', news: '/news', about: '/about', faq: '/faq', consultation: '/contact',
    };
    router.push(routes[sectionId] || `/?section=${sectionId}`);
  };

  if (!post && loading) {
    return (
      <div className="min-h-screen bg-[#245B4A] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs font-headline font-bold tracking-widest uppercase">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#245B4A] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-headline font-bold mb-4">Bài viết không tồn tại</p>
          <button onClick={() => router.push('/news')} className="px-6 py-3 bg-primary-red text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider">
            Quay lại tin tức
          </button>
        </div>
      </div>
    );
  }

  // Estimate read time
  const wordCount = post.content.split(' ').length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      <Header
        onCategoryClick={(id) => router.push(`/category/${id}`)}
        onProjectClick={(id) => router.push(`/projects/${id}`)}
        onNavigateToSection={handleNavigateToSection}
        activeSection="news"
      />

      {/* Hero image */}
      <section className="relative h-[55vh] min-h-[360px] bg-black overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        {/* Back button */}
        <button
          onClick={() => router.push('/news')}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white/80 hover:text-white text-xs font-headline font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full transition-all hover:bg-black/50 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Tin tức
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-headline text-[9px] text-primary-red font-extrabold tracking-widest uppercase bg-white px-3 py-1 rounded-full mb-3 inline-block">
              Kiến thức chuyên mục
            </span>
            <h1 className="font-headline text-2xl md:text-4xl font-black text-white leading-tight mt-2">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article */}
      <section className="py-12 bg-slate-50 flex-1">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          {/* Meta bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-b border-slate-200 pb-6 mb-8"
          >
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary-red" />
              <span>Ngày đăng: <strong className="text-slate-700">{post.date}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#245B4A]" />
              <span>Tác giả: <strong className="text-slate-700">{post.author}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Đọc trong <strong className="text-slate-700">{readTime} phút</strong></span>
            </div>
          </motion.div>

          {/* Summary lead */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base text-slate-600 leading-relaxed font-medium mb-8 p-6 bg-[#245B4A]/5 border-l-4 border-[#245B4A] rounded-r-xl"
          >
            {post.summary}
          </motion.p>

          {/* Full content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-slate max-w-none"
          >
            {renderFormattedContent(post.content)}
          </motion.div>

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
            {['Thiết kế nội thất', 'Vật liệu cao cấp', 'Xu hướng 2025', 'Linh Trang Home'].map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-headline font-semibold rounded-full border border-slate-200 hover:bg-[#245B4A] hover:text-white hover:border-[#245B4A] transition-all cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Author card */}
          <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#245B4A] flex items-center justify-center text-white font-headline font-black text-xl flex-shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-headline font-bold mb-1">Tác giả bài viết</p>
              <p className="font-headline font-bold text-slate-800 text-base">{post.author}</p>
              <p className="text-xs text-slate-500 mt-1">Chuyên gia tư vấn thiết kế nội thất & vật liệu cao cấp tại Linh Trang Home</p>
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <button
                onClick={() => router.push(`/news/${prevPost.id}`)}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-red/30 hover:shadow-md transition-all text-left cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-primary-red transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-headline font-bold mb-1">Bài trước</p>
                  <p className="text-xs font-headline font-bold text-slate-700 group-hover:text-primary-red transition-colors line-clamp-2">{prevPost.title}</p>
                </div>
              </button>
            ) : <div />}

            {nextPost ? (
              <button
                onClick={() => router.push(`/news/${nextPost.id}`)}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-red/30 hover:shadow-md transition-all text-right cursor-pointer sm:flex-row-reverse"
              >
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-red transition-colors flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-headline font-bold mb-1">Bài tiếp theo</p>
                  <p className="text-xs font-headline font-bold text-slate-700 group-hover:text-primary-red transition-colors line-clamp-2">{nextPost.title}</p>
                </div>
              </button>
            ) : <div />}
          </div>

          {/* Related posts */}
          <div className="mt-14">
            <h3 className="font-headline text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-primary-red rounded-full inline-block" />
              Bài viết liên quan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map(p => (
                <button
                  key={p.id}
                  onClick={() => router.push(`/news/${p.id}`)}
                  className="group text-left rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-primary-red/30 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-slate-400 font-headline mb-1">{p.date}</p>
                    <p className="text-xs font-headline font-bold text-slate-800 group-hover:text-primary-red transition-colors line-clamp-2 leading-snug">{p.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 p-8 rounded-2xl bg-[#245B4A] text-white text-center">
            <p className="font-headline text-lg font-black uppercase mb-2">Cần tư vấn thiết kế?</p>
            <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto">Đội ngũ chuyên gia Linh Trang Home sẵn sàng hỗ trợ bạn miễn phí.</p>
            <button
              onClick={() => router.push('/contact')}
              className="px-8 py-3.5 bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-primary-red/20"
            >
              Nhận tư vấn miễn phí
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
