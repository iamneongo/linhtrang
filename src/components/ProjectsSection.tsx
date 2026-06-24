import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Compass, Layers, X, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title Heading & Custom red accent */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="font-headline text-xs font-bold tracking-widest text-[#5e3f3b] uppercase">
              BẢO CHỨNG BỞI CHẤT LƯỢNG THI CÔNG
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold uppercase mt-1 leading-tight tracking-tight text-[#245B4A]">
              Dự án <span className="text-[#E50914]">tiêu biểu</span>
            </h2>
            <div className="w-16 h-1 bg-[#E50914] mt-3 rounded-full"></div>
          </div>
          <button 
            onClick={() => setSelectedProject(projects[0])}
            className="text-xs font-headline font-bold tracking-wider hover:text-primary-red transition-all flex items-center gap-2 group cursor-pointer text-slate-800"
          >
            CHI TIẾT MẪU KIẾN TRÚC <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E50914]" />
          </button>
        </div>

        {/* 4 Cards Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Product background with scale hover */}
              <div className="rounded-2xl overflow-hidden mb-4 relative aspect-[4/3] bg-slate-100 shadow-md">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#E50914]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-[#245B4A]/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] text-white font-headline font-semibold uppercase tracking-wider">
                    Xem dự án
                  </span>
                </div>
              </div>

              {/* Text metadata details with hover red shift */}
              <h3 className="font-headline text-sm font-bold text-slate-900 group-hover:text-[#E50914] transition-colors leading-tight mb-1.5">
                {proj.title}
              </h3>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#E50914]" />
                <span>{proj.location}</span>
                <span className="text-slate-300 mx-1">•</span>
                <span>{proj.style}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* High-fidelity Architectural Project Details Dialog Popup Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            id="project-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#245B4A]/45 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              id="project-detail"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8 relative text-slate-900 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto pr-1">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Image Showcase frame */}
                  <div className="md:col-span-7 rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 shadow-md">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Project Specifications detail sheet */}
                  <div className="md:col-span-5 flex flex-col justify-center">
                    <span className="font-headline text-[10px] text-[#E50914] font-extrabold tracking-widest uppercase mb-1">
                      Công trình bàn giao thực tế
                    </span>
                    <h3 className="font-headline text-xl md:text-2xl font-bold text-[#245B4A] leading-tight mb-4">
                      {selectedProject.title}
                    </h3>

                    {/* Meta values */}
                    <div className="grid grid-cols-2 gap-4 border-y border-slate-155 py-4 mb-6 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Vị trí địa điểm</p>
                          <p className="font-bold text-slate-800">{selectedProject.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Năm hoàn thành</p>
                          <p className="font-bold text-slate-800">{selectedProject.year}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Quy mô diện tích</p>
                          <p className="font-bold text-slate-800">{selectedProject.area}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#E50914] flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Phong cách thiết kế</p>
                          <p className="font-bold text-slate-800">{selectedProject.style}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#5e3f3b] text-xs leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>

                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-full py-3.5 text-center font-headline font-bold text-xs tracking-wider uppercase rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Quay lại bộ sưu tập
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
