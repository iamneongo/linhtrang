import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowRight } from 'lucide-react';
import { projects as staticProjects } from '../data';
import { fetchProjects } from '@/lib/medusa';
import { Project } from '@/types';

export default function ProjectsSection() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

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
            onClick={() => router.push('/projects')}
            className="text-xs font-headline font-bold tracking-wider hover:text-primary-red transition-all flex items-center gap-2 group cursor-pointer text-slate-800 bg-slate-50 border border-slate-200/80 px-5 py-2.5 rounded-full shadow-sm"
          >
            XEM TẤT CẢ DỰ ÁN <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#E50914]" />
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
              onClick={() => router.push(`/projects?id=${proj.id}`)}
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
    </section>
  );
}
