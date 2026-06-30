'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Award, ShieldCheck, HeartHandshake, Sparkles, Building2, Users2, Briefcase, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import BrandLogo from '@/components/BrandLogo';
import { ABOUT_SHOWROOM_URL } from '@/data';

export default function AboutPage() {
  const router = useRouter();

  const stats = [
    { id: 's1', icon: Sparkles, value: '10+', label: 'Năm kinh nghiệm', description: 'Đồng hành cùng mọi đại công trình lớn' },
    { id: 's2', icon: Users2, value: '5000+', label: 'Khách hàng tin tưởng', description: 'Sự hài lòng tuyệt đối làm kim chỉ nam' },
    { id: 's3', icon: Building2, value: '1000+', label: 'Dự án hoàn thành', description: 'Biệt thự, đại lộ sảnh và resort nghỉ dưỡng' },
    { id: 's4', icon: ShieldCheck, value: '50+', label: 'Đối tác thương hiệu', description: 'Hợp tác chặt chẽ cùng các nhãn hàng quốc tế' },
  ];

  const values = [
    {
      id: 'v1', icon: Award,
      title: 'Sản phẩm chính hãng 100%',
      desc: 'Toàn bộ vật liệu, thiết bị vệ sinh được tuyển chọn khắt khe trực tiếp từ hệ thống đối tác quốc tế chất lượng uy tín nhất.',
    },
    {
      id: 'v2', icon: Sparkles,
      title: 'Giá cả đi đôi với chất lượng',
      desc: 'Chính sách giá minh bạch, tối ưu, ổn định bền vững giúp chủ đầu tư kiểm soát chi phí thi công xây dựng an tâm nhất.',
    },
    {
      id: 'v3', icon: HeartHandshake,
      title: 'Chính sách hậu mãi & bảo hành vàng',
      desc: 'Linh Trang Home đồng hành trọn đời mọi dự án. Đội ngũ kỹ thuật túc trực 24/7 giải quyết mọi rủi ro về vật liệu dứt điểm siêu tốc.',
    },
    {
      id: 'v4', icon: Briefcase,
      title: 'Đội ngũ chuyên gia hàng đầu',
      desc: 'Hơn 50 kỹ sư, kiến trúc sư và chuyên gia tư vấn giàu kinh nghiệm sẵn sàng đồng hành cùng bạn từ khâu thiết kế đến bàn giao.',
    },
  ];

  const milestones = [
    { year: '2014', title: 'Thành lập Linh Trang Home', desc: 'Khai trương showroom đầu tiên tại Đà Lạt, Lâm Đồng với dòng gạch nhập khẩu Tây Ban Nha.' },
    { year: '2017', title: 'Mở rộng danh mục sản phẩm', desc: 'Đưa vào phân phối thiết bị vệ sinh mạ PVD cao cấp từ Đức và các thương hiệu châu Âu hàng đầu.' },
    { year: '2020', title: 'Vượt mốc 1000 dự án', desc: 'Hoàn thành hơn 1000 dự án thiết kế biệt thự, penthouse và resort hạng sang trên toàn quốc.' },
    { year: '2023', title: 'Ra mắt hệ thống nội thất', desc: 'Bổ sung dòng nội thất cao cấp châu Âu, hoàn thiện hệ sinh thái không gian sống toàn diện.' },
    { year: '2024', title: 'Kỷ niệm 10 năm phát triển', desc: 'Hơn 5000 khách hàng tin tưởng, mở rộng mạng lưới đối tác ra 50+ thương hiệu quốc tế lớn.' },
  ];

  const handleNavigateToSection = (sectionId: string) => {
    const routes: Record<string, string> = {
      projects: '/projects',
      news: '/news',
      about: '/about',
      faq: '/faq',
      consultation: '/contact',
    };
    if (routes[sectionId]) {
      router.push(routes[sectionId]);
    } else {
      router.push(`/?section=${sectionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#245B4A] text-white font-sans overflow-x-hidden antialiased flex flex-col">
      <Header
        onCategoryClick={(id) => router.push(`/category/${id}`)}
        onProjectClick={(id) => router.push(`/projects/${id}`)}
        onNavigateToSection={handleNavigateToSection}
        activeSection="about"
      />

      {/* Hero Banner */}
      <section className="relative pt-40 pb-28 overflow-hidden min-h-[420px] flex items-end">
        {/* Background image */}
        <img
          src={ABOUT_SHOWROOM_URL}
          alt="Linh Trang Home Showroom"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        {/* Brand color tint */}
        <div className="absolute inset-0 bg-[#245B4A]/40 mix-blend-multiply" />
        {/* Decorative accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary-red via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="font-headline text-[10px] font-black tracking-widest text-white bg-primary-red px-3 py-1 rounded-full uppercase mb-4 inline-block shadow-lg shadow-primary-red/30">
              UY TÍN ĐƯỢC KHẲNG ĐỊNH
            </span>
            <h1 className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-6 drop-shadow-xl">
              VỀ LINH<br />
              <span className="text-primary-red">TRANG HOME</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl drop-shadow">
              Hơn 10 năm kinh nghiệm phân phối độc quyền vật liệu xây dựng cao cấp và thiết bị vệ sinh nhập khẩu từ châu Âu — Linh Trang Home là điểm tựa tin cậy cho mọi đại công trình đẳng cấp.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Main Content */}
      <section className="py-20 bg-[#327863] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* About Intro Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden group shadow-2xl aspect-video bg-black/40"
            >
              <img
                src={ABOUT_SHOWROOM_URL}
                alt="Hệ thống Showroom Linh Trang Home"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#245B4A]/45 backdrop-blur-md p-6 rounded-2xl border border-white/10 scale-90 md:scale-100 shadow-2xl relative">
                  <div className="absolute inset-0 bg-primary-red/5 rounded-2xl blur-lg pointer-events-none" />
                  <BrandLogo variant="light" layout="vertical" height="80px" className="relative z-10" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-8"
            >
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight relative pb-3 flex items-center">
                  CÂU CHUYỆN<br />CỦA CHÚNG TÔI
                  <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary-red rounded-full" />
                </h2>
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4">
                  Với nhiều năm kinh nghiệm trong lĩnh vực cung cấp gạch ốp lát cao cấp, thiết bị vệ sinh nhập khẩu và nội thất tinh tế hàng đầu, Linh Trang Home luôn nỗ lực không ngừng nghỉ để kiến tạo nên những công trình đẳng cấp quốc tế.
                </p>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  Chúng tôi tin rằng mỗi không gian sống xứng đáng được hoàn thiện bằng những vật liệu tốt nhất — và đó là lý do chúng tôi không ngừng tìm kiếm, tuyển chọn và mang đến những sản phẩm cao cấp nhất từ khắp châu Âu.
                </p>
              </div>

              {/* Quick info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <MapPin className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Địa chỉ</p>
                    <p className="text-xs text-white/60">Đà Lạt, Lâm Đồng</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Phone className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Hotline</p>
                    <p className="text-xs text-white/60">0977 247 623</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Giờ mở cửa</p>
                    <p className="text-xs text-white/60">8:00 – 18:00 hàng ngày</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="font-headline text-xs font-black tracking-widest text-white bg-primary-red px-3 py-1 rounded-full uppercase mb-3 inline-block shadow-sm shadow-primary-red/20">
                GIÁ TRỊ CỐT LÕI
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-black text-white mt-3 uppercase">
                Điều Tạo Nên Linh Trang Home
              </h2>
              <div className="w-16 h-1 bg-primary-red mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary-red/30 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-red flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-primary-red/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-2">{v.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-white/10 mb-24">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white border border-slate-100 shadow-lg p-6 rounded-xl flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-xl hover:border-primary-red/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-red flex items-center justify-center text-white mb-4 group-hover:bg-[#c0000c] transition-all shadow-md shadow-primary-red/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-headline text-4xl font-black text-primary-red tracking-tight mb-2">{item.value}</div>
                  <h5 className="font-headline text-xs font-bold text-[#245B4A] uppercase tracking-widest mb-1.5">{item.label}</h5>
                  <p className="text-xs text-slate-600 leading-normal">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline milestones */}
          <div>
            <div className="text-center mb-12">
              <span className="font-headline text-xs font-black tracking-widest text-white bg-primary-red px-3 py-1 rounded-full uppercase mb-3 inline-block shadow-sm shadow-primary-red/20">
                HÀNH TRÌNH PHÁT TRIỂN
              </span>
              <h2 className="font-headline text-3xl md:text-4xl font-black text-white mt-3 uppercase">
                10 Năm Xây Dựng Đẳng Cấp
              </h2>
              <div className="w-16 h-1 bg-primary-red mx-auto mt-4 rounded-full" />
            </div>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />
              <div className="flex flex-col gap-10">
                {milestones.map((m, idx) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Year badge */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary-red items-center justify-center text-white font-headline font-black text-sm shadow-lg shadow-primary-red/30 z-10 flex-shrink-0">
                      {m.year}
                    </div>

                    {/* Mobile year */}
                    <div className="flex md:hidden w-12 h-12 rounded-full bg-primary-red items-center justify-center text-white font-headline font-black text-xs shadow-lg shadow-primary-red/30 flex-shrink-0 z-10">
                      {m.year}
                    </div>

                    {/* Content */}
                    <div className={`md:w-[calc(50%-3.5rem)] ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                      <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-primary-red/30 transition-all duration-300">
                        <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-2">{m.title}</h4>
                        <p className="text-xs text-white/60 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                    {/* Spacer for the other side on desktop */}
                    <div className="hidden md:block md:w-[calc(50%-3.5rem)]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#245B4A] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-headline text-2xl md:text-3xl font-black text-white uppercase mb-4">
            Sẵn sàng kiến tạo không gian<br />
            <span className="text-primary-red">đẳng cấp cùng chúng tôi?</span>
          </h2>
          <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto">
            Đội ngũ chuyên gia Linh Trang Home sẵn sàng tư vấn miễn phí — từ lựa chọn vật liệu đến thiết kế 3D toàn diện.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0977247623"
              className="px-8 py-4 bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-primary-red/20 text-sm"
            >
              ☎️ Gọi ngay: 0977 247 623
            </a>
            <button
              onClick={() => router.push('/contact')}
              className="px-8 py-4 border-2 border-white/30 hover:border-white text-white font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all duration-300 text-sm"
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
