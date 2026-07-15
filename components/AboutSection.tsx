import { motion } from 'motion/react';
import { Award, ShieldCheck, HeartHandshake, Sparkles, Building2, Users2, Briefcase } from 'lucide-react';
import { ABOUT_SHOWROOM_URL } from '../data';
import BrandLogo from './BrandLogo';

export default function AboutSection() {
  const stats = [
    {
      id: "stat-1",
      icon: Sparkles,
      value: "10+",
      label: "Năm kinh nghiệm",
      description: "Đồng hành cùng nhiều công trình dân dụng và nghỉ dưỡng"
    },
    {
      id: "stat-2",
      icon: Users2,
      value: "5000+",
      label: "Khách hàng tin tưởng",
      description: "Tập trung vào trải nghiệm tư vấn rõ ràng và chuyên nghiệp"
    },
    {
      id: "stat-3",
      icon: Building2,
      value: "1000+",
      label: "Dự án hoàn thành",
      description: "Biệt thự, căn hộ, khách sạn và resort nghỉ dưỡng"
    },
    {
      id: "stat-4",
      icon: ShieldCheck,
      value: "50+",
      label: "Đối tác thương hiệu",
      description: "Hợp tác chặt chẽ cùng các nhãn hàng quốc tế"
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#327863] relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* About Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Column: Glassmorphic Logo Showroom Frame */}
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
            {/* Ambient visual overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#245B4A]/45 backdrop-blur-md p-6 rounded-2xl border border-white/10 scale-90 md:scale-100 shadow-2xl relative">
                <div className="absolute inset-0 bg-primary-red/5 rounded-2xl blur-lg pointer-events-none"></div>
                <BrandLogo
                  variant="light"
                  layout="vertical"
                  height="80px"
                  className="relative z-10"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text & Bullet Specs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <span className="font-headline text-[10px] font-bold tracking-widest text-white bg-primary-red px-3 py-1 rounded-full uppercase mb-3 inline-block w-fit shadow-sm shadow-primary-red/20">
              UY TÍN ĐƯỢC KHẲNG ĐỊNH
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight relative pb-3 flex items-center">
              VỀ LINH TRANG HOME
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary-red rounded-full"></span>
            </h2>
            
            <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
              Với nhiều năm kinh nghiệm trong lĩnh vực cung cấp gạch ốp lát cao cấp, thiết bị vệ sinh nhập khẩu và nội thất chọn lọc, Linh Trang Home mang đến giải pháp phù hợp cho từng phong cách không gian và nhu cầu sử dụng thực tế.
            </p>

            {/* Bullets lists */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-red flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-primary-red/10">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Sản phẩm chính hãng 100%
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Toàn bộ vật liệu và thiết bị vệ sinh được tuyển chọn từ các đối tác uy tín, đi kèm thông tin xuất xứ và chất lượng rõ ràng.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-red flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-primary-red/10">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Giá cả đi đôi với chất lượng
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Chính sách giá minh bạch và tư vấn theo đúng nhu cầu giúp chủ đầu tư chủ động kiểm soát ngân sách cho từng hạng mục.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-red flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-primary-red/10">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Hậu mãi và bảo hành rõ ràng
                  </h4>
                  <p className="text-xs text-text-secondary">
                    Linh Trang Home hỗ trợ khách hàng trong suốt quá trình lựa chọn, lắp đặt và sử dụng với chính sách hậu mãi minh bạch, dễ theo dõi.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Counter Statistics Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-white/10 relative">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
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
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="font-headline text-4xl font-black text-primary-red tracking-tight mb-2">
                  {item.value}
                </div>
                <h5 className="font-headline text-xs font-bold text-[#245B4A] uppercase tracking-widest mb-1.5">
                  {item.label}
                </h5>
                <p className="text-xs text-slate-600 leading-normal">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
