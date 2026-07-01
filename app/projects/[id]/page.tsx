'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { MapPin, Calendar, Compass, Layers, ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import RichTextContent from '@/components/RichTextContent';
import { projects as staticProjects } from '@/data';
import { fetchProjects } from '@/lib/content';
import { Project } from '@/types';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const project = projects.find(p => p.id === id);
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const relatedProjects = projects.filter(p => p.id !== id && p.style === project?.style).slice(0, 3)
    || projects.filter(p => p.id !== id).slice(0, 3);

  const handleNavigateToSection = (sectionId: string) => {
    const routes: Record<string, string> = {
      projects: '/projects', news: '/news', about: '/about', faq: '/faq', consultation: '/contact',
    };
    router.push(routes[sectionId] || `/?section=${sectionId}`);
  };

  if (!project && loading) {
    return (
      <div className="min-h-screen bg-[#245B4A] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs font-headline font-bold tracking-widest uppercase">Đang tải dự án...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#245B4A] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-headline font-bold mb-4">Dự án không tồn tại</p>
          <button onClick={() => router.push('/projects')} className="px-6 py-3 bg-primary-red text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider cursor-pointer">
            Quay lại dự án
          </button>
        </div>
      </div>
    );
  }

  const specs = [
    { icon: MapPin, label: 'Vị trí', value: project.location },
    { icon: Calendar, label: 'Năm hoàn thành', value: project.year },
    { icon: Compass, label: 'Diện tích', value: project.area },
    { icon: Layers, label: 'Phong cách', value: project.style },
  ];

  const highlights = [
    { title: 'Vật liệu cao cấp', desc: 'Toàn bộ vật liệu được nhập khẩu nguyên đại từ các thương hiệu hàng đầu châu Âu.' },
    { title: 'Bảo hành trọn đời', desc: 'Linh Trang Home cam kết đồng hành cùng công trình suốt vòng đời sử dụng.' },
    { title: 'Thiết kế độc bản', desc: 'Mỗi dự án được thiết kế và tư vấn riêng theo yêu cầu đặc thù của chủ đầu tư.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      <Header
        onCategoryClick={(catId) => router.push(`/category/${catId}`)}
        onProjectClick={(projId) => router.push(`/projects/${projId}`)}
        onNavigateToSection={handleNavigateToSection}
        activeSection="projects"
      />

      {/* Full-bleed hero image */}
      <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        {/* Back button */}
        <button
          onClick={() => router.push('/projects')}
          className="absolute top-24 left-4 md:left-8 flex items-center gap-2 text-white/80 hover:text-white text-xs font-headline font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full transition-all hover:bg-black/50 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Dự án
        </button>

        {/* Category badge */}
        <div className="absolute top-24 right-4 md:right-8">
          <span className="font-headline text-[9px] font-bold tracking-widest uppercase bg-[#245B4A]/70 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-headline text-[9px] text-primary-red font-extrabold tracking-widest uppercase bg-white px-3 py-1 rounded-full mb-3 inline-block">
              Công trình bàn giao thực tế
            </span>
            <h1 className="font-headline text-2xl md:text-5xl font-black text-white leading-tight mt-2 uppercase">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 mt-3 text-white/70 text-xs">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary-red" />{project.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary-red" />{project.year}</span>
              <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-primary-red" />{project.area}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-14 bg-slate-50 flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left: Description + highlights */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="font-headline text-xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-primary-red rounded-full inline-block" />
                  Mô tả công trình
                </h2>
                <RichTextContent
                  className="text-sm md:text-base text-slate-600 mb-10"
                  fallbackText={project.description}
                  html={project.descriptionHTML}
                />

                {/* Image gallery (single image repeated for demo) */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 shadow-md">
                    <img src={project.imageUrl} alt={project.title} referrerPolicy="no-referrer" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 shadow-md">
                    <img src={project.imageUrl} alt={project.title} referrerPolicy="no-referrer" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 [object-position:30%]" />
                  </div>
                </div>

                {/* Highlights */}
                <h2 className="font-headline text-xl font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-primary-red rounded-full inline-block" />
                  Điểm nổi bật
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  {highlights.map((h, i) => (
                    <motion.div
                      key={h.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary-red/30 hover:shadow-md transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-red/10 flex items-center justify-center mb-3">
                        <span className="text-primary-red font-headline font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h4 className="font-headline text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">{h.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Prev / Next */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevProject ? (
                    <button
                      onClick={() => router.push(`/projects/${prevProject.id}`)}
                      className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-red/30 hover:shadow-md transition-all text-left cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-primary-red transition-colors flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-headline font-bold mb-1">Dự án trước</p>
                        <p className="text-xs font-headline font-bold text-slate-700 group-hover:text-primary-red transition-colors line-clamp-2">{prevProject.title}</p>
                      </div>
                    </button>
                  ) : <div />}

                  {nextProject ? (
                    <button
                      onClick={() => router.push(`/projects/${nextProject.id}`)}
                      className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200 hover:border-primary-red/30 hover:shadow-md transition-all sm:flex-row-reverse text-left sm:text-right cursor-pointer"
                    >
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-red transition-colors flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-headline font-bold mb-1">Dự án tiếp theo</p>
                        <p className="text-xs font-headline font-bold text-slate-700 group-hover:text-primary-red transition-colors line-clamp-2">{nextProject.title}</p>
                      </div>
                    </button>
                  ) : <div />}
                </div>
              </motion.div>
            </div>

            {/* Right: Specs sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="sticky top-24 flex flex-col gap-5"
              >
                {/* Spec card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="font-headline text-xs font-black text-slate-500 uppercase tracking-widest mb-5">Thông số kỹ thuật</h3>
                  <div className="flex flex-col gap-4">
                    {specs.map((spec) => {
                      const Icon = spec.icon;
                      return (
                        <div key={spec.label} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                          <div className="w-9 h-9 rounded-lg bg-primary-red/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-primary-red" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 font-headline font-bold uppercase tracking-wider">{spec.label}</p>
                            <p className="text-sm font-bold text-slate-800 mt-0.5">{spec.value}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTA card */}
                <div className="p-6 rounded-2xl bg-[#245B4A] text-white">
                  <h3 className="font-headline text-base font-black uppercase mb-2">Muốn công trình tương tự?</h3>
                  <p className="text-white/70 text-xs leading-relaxed mb-5">Linh Trang Home sẵn sàng tư vấn và cung cấp giải pháp vật liệu cao cấp cho công trình của bạn.</p>
                  <a href="tel:0977247623" className="flex items-center justify-center gap-2 w-full py-3 bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-primary-red/20">
                    <Phone className="w-4 h-4 fill-current" />
                    Gọi 0977 247 623
                  </a>
                  <button
                    onClick={() => router.push('/contact')}
                    className="mt-3 flex items-center justify-center w-full py-3 border border-white/20 hover:bg-white/10 text-white font-headline font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Nhận tư vấn miễn phí
                  </button>
                </div>

                {/* Share */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200">
                  <p className="text-xs font-headline font-bold text-slate-500 uppercase tracking-widest mb-3">Chia sẻ dự án</p>
                  <div className="flex gap-2">
                    {['Facebook', 'Zalo', 'Copy link'].map(platform => (
                      <button key={platform} className="flex-1 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-headline font-bold text-slate-600 hover:bg-[#245B4A] hover:text-white hover:border-[#245B4A] transition-all cursor-pointer">
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <h3 className="font-headline text-lg font-black text-slate-800 uppercase tracking-tight mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-primary-red rounded-full inline-block" />
                Dự án cùng phong cách
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => router.push(`/projects/${p.id}`)}
                    className="group text-left rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-primary-red/30 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <img src={p.imageUrl} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-slate-400 font-headline mb-1 uppercase tracking-wider">{p.category} · {p.year}</p>
                      <p className="text-xs font-headline font-bold text-slate-800 group-hover:text-primary-red transition-colors line-clamp-2 leading-snug">{p.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
