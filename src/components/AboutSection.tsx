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
      description: "Đồng hành cùng mọi đại công trình lớn"
    },
    {
      id: "stat-2",
      icon: Users2,
      value: "5000+",
      label: "Khách hàng tin tưởng",
      description: "Sự hài lòng tuyệt đối làm kim chỉ nam"
    },
    {
      id: "stat-3",
      icon: Building2,
      value: "1000+",
      label: "Dự án hoàn thành",
      description: "Biệt thự, đại lộ sảnh và resort nghỉ dưỡng"
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
            <span className="font-headline text-xs font-bold tracking-widest text-primary-red uppercase mb-1">
              UY TÍN ĐƯỢC KHẲNG ĐỊNH
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-6 uppercase tracking-tight">
              VỀ <span className="text-primary-red">LINH TRANG</span> HOME
            </h2>
            
            <p className="text-sm md:text-base text-[#aeb4be] leading-relaxed mb-8">
              Với nhiều năm kinh nghiệm trong lĩnh vực cung cấp gạch ốp lát cao cấp, thiết bị vệ sinh nhập khẩu và nội thất tinh tế hàng đầu, Linh Trang Home luôn nỗ lực không ngừng nghỉ để kiến tạo nên những công trình đẳng cấp quốc tế, đem lại sự an tâm tuyệt đối cho khách hàng và đối tác xây dựng.
            </p>

            {/* Bullets lists */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-primary-red/30 bg-primary-red/5 flex items-center justify-center flex-shrink-0 text-primary-red">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Sản phẩm chính hãng 100%
                  </h4>
                  <p className="text-xs text-[#aeb4be]">
                    Toàn bộ vật liệu, thiết bị vệ sinh được tuyển chọn khắt khe trực tiếp từ hệ thống đối tác quốc tế chất lượng uy tín nhất.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-primary-red/30 bg-primary-red/5 flex items-center justify-center flex-shrink-0 text-primary-red">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Giá cả đi đôi với chất lượng
                  </h4>
                  <p className="text-xs text-[#aeb4be]">
                    Chính sách giá minh bạch, tối ưu, ổn định bền vững giúp chủ đầu tư kiểm soát chi phí thi công xây dựng an tâm nhất.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-primary-red/30 bg-primary-red/5 flex items-center justify-center flex-shrink-0 text-primary-red">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider mb-1">
                    Chính sách hậu mãi & bảo hành vàng
                  </h4>
                  <p className="text-xs text-[#aeb4be]">
                    Linh Trang Home đồng hành trọn đời mọi dự án. Đội ngũ kỹ thuật túc trực 24/7 giải quyết mọi rủi ro về vật liệu dứt điểm siêu tốc.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Counter Statistics Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-white/5 relative">
          {stats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-[#245B4A]/25 border border-white/5 shadow-inner p-6 rounded-xl flex flex-col items-center text-center group hover:border-[#E50914]/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary-red mb-4 group-hover:bg-primary-red group-hover:text-white transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="font-headline text-4xl font-black text-primary-red tracking-tight mb-2">
                  {item.value}
                </div>
                <h5 className="font-headline text-xs font-bold text-white uppercase tracking-widest mb-1.5">
                  {item.label}
                </h5>
                <p className="text-[10px] text-[#aeb4be] leading-normal">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
