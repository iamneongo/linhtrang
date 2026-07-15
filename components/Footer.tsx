import { motion } from 'motion/react';
import { Sparkles, CheckCircle2, BadgePercent, Truck, ShieldCheck, MapPin, Phone, Mail, Clock, Send, Globe, Play, Share2 } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const chooseReasons = [
    {
      id: "reason-1",
      icon: Sparkles,
      title: "Sản phẩm đa dạng",
      description: "Danh mục đa dạng từ gạch ốp lát, thiết bị vệ sinh đến nội thất và phụ kiện hoàn thiện."
    },
    {
      id: "reason-2",
      icon: CheckCircle2,
      title: "Chất lượng đảm bảo",
      description: "Sản phẩm được tuyển chọn từ các thương hiệu uy tín, có thông tin xuất xứ rõ ràng."
    },
    {
      id: "reason-3",
      icon: BadgePercent,
      title: "Giá bán hợp lý",
      description: "Báo giá minh bạch, linh hoạt theo quy mô công trình và nhu cầu thực tế."
    },
    {
      id: "reason-4",
      icon: Truck,
      title: "Giao nhận chủ động",
      description: "Hỗ trợ giao hàng, phối hợp tiến độ và khảo sát theo kế hoạch triển khai của công trình."
    },
    {
      id: "reason-5",
      icon: ShieldCheck,
      title: "Hậu mãi chu đáo",
      description: "Chính sách bảo hành và hỗ trợ sau bán hàng rõ ràng, giúp khách hàng yên tâm khi sử dụng."
    }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* "Vì sao chọn Linh Trang Home" Section (5-Grid Layout) */}
      <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
        {/* Visual glow backdrop for footer header */}
        <div className="absolute top-0 right-1/4 w-[250px] h-[250px] bg-[#245B4A]/5 blur-[90px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="font-headline text-[10px] font-black tracking-widest text-white bg-primary-red px-3 py-1 rounded-full uppercase inline-block mb-3 shadow-sm shadow-primary-red/20">
              BẢO CHỨNG SỰ HÀI LÒNG KHÁCH HÀNG
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-[#245B4A] uppercase mt-1 leading-tight">
              Vì sao chọn <span className="text-primary-red">Linh Trang Home</span>
            </h2>
            <div className="w-16 h-1 bg-primary-red mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {chooseReasons.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="p-6 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-primary-red/30 hover:bg-white hover:shadow-xl transition-all duration-300 text-center group shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-red flex items-center justify-center text-white mx-auto mb-5 group-hover:scale-110 transition-transform shadow-md shadow-primary-red/20">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="font-headline text-sm font-bold text-[#245B4A] mb-2 uppercase group-hover:text-primary-red transition-all">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Luxury Footer Section */}
      <footer className="bg-[#1c473a] pt-20 pb-8 border-t border-white/10 relative overflow-hidden">
        

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Main columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5 text-xs text-text-secondary">
            
            {/* Column 1: Intro (3 Cols) */}
            <div className="lg:col-span-3 space-y-6">
              <BrandLogo
                variant="light"
                layout="horizontal"
                height="38px"
              />
              <p className="text-text-secondary leading-relaxed pr-2">
                Linh Trang Home cung cấp giải pháp vật liệu hoàn thiện, thiết bị phòng tắm và nội thất cao cấp, đồng hành cùng khách hàng từ khâu chọn mẫu đến hoàn thiện không gian.
              </p>
              
              {/* Social Channels */}
              <div className="flex gap-3">
                <a
                  href="#facebook"
                  title="Theo dõi chúng tôi trên Facebook"
                  className="w-10 h-10 rounded-full bg-[#245B4A]/25 flex items-center justify-center border border-white/5 text-text-secondary hover:text-white hover:bg-primary-red hover:border-primary-red transition-all"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  title="Kênh Youtube của Linh Trang Home"
                  className="w-10 h-10 rounded-full bg-[#245B4A]/25 flex items-center justify-center border border-white/5 text-text-secondary hover:text-white hover:bg-primary-red hover:border-primary-red transition-all"
                >
                  <Play className="w-4 h-4" />
                </a>
                <a
                  href="#share"
                  title="Chia sẻ liên kết"
                  className="w-10 h-10 rounded-full bg-[#245B4A]/25 flex items-center justify-center border border-white/5 text-text-secondary hover:text-white hover:bg-primary-red hover:border-primary-red transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: About Us navigation (2 Cols) */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <h5 className="font-headline text-xs font-bold text-white uppercase tracking-widest border-l-2 border-primary-red pl-3 h-fit">
                VỀ CHÚNG TÔI
              </h5>
              <ul className="space-y-3 font-semibold text-text-secondary">
                <li><a href="#about" className="hover:text-white transition-colors">Giới thiệu công ty</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Tầm nhìn - Sứ mệnh</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Đội ngũ kỹ sư</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Hệ thống showroom</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Tuyển dụng nhân sự</a></li>
              </ul>
            </div>

            {/* Column 3: Corporate Policy (2 Cols) */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <h5 className="font-headline text-xs font-bold text-white uppercase tracking-widest border-l-2 border-primary-red pl-3 h-fit">
                CHÍNH SÁCH
              </h5>
              <ul className="space-y-3 font-semibold text-text-secondary">
                <li><a href="#policy-1" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
                <li><a href="#policy-2" className="hover:text-white transition-colors">Chính sách đổi trả minh bạch</a></li>
                <li><a href="#policy-3" className="hover:text-white transition-colors">Chính sách giao nhận vận chuyển</a></li>
                <li><a href="#policy-4" className="hover:text-white transition-colors">Chính sách thanh toán linh hoạt</a></li>
                <li><a href="#policy-5" className="hover:text-white transition-colors">Chính sách bảo mật dữ liệu</a></li>
              </ul>
            </div>

            {/* Column 4: Location Contacts & Google Maps Embed (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-headline text-xs font-bold text-white uppercase tracking-widest border-l-2 border-primary-red pl-3 h-fit">
                    LIÊN HỆ
                  </h5>
                  <ul className="space-y-3 text-text-secondary">
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <MapPin className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                      <span>81 Hùng Vương, Phường Lâm Viên, TP. Đà Lạt, Lâm Đồng</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-white/70 flex-shrink-0" />
                      <a href="tel:0977247623" className="hover:text-white transition-colors font-bold text-white">
                        0977 247 623
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-white/70 flex-shrink-0" />
                      <span>info@linhtranghome.vn</span>
                    </li>
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <Clock className="w-4 h-4 text-white/70 flex-shrink-0 mt-0.5" />
                      <span>08:00 - 21:00 (Hỗ trợ Hotline & Khảo sát công trình tất cả các ngày trong tuần)</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h5 className="font-headline text-xs font-bold text-white uppercase tracking-widest border-l-2 border-primary-red pl-3 h-fit">
                    BẢN ĐỒ CHỈ ĐƯỜNG
                  </h5>
                  <div className="w-full h-44 rounded-xl overflow-hidden border border-white/10 shadow-lg relative bg-[#245B4A]/25 group">
                    <iframe
                      title="Google Map - Linh Trang Home"
                      src="https://maps.google.com/maps?q=81%20H%C3%B9ng%20V%C6%B0%C6%A1ng%2C%20Ph%C6%B0%E1%BB%9Dng%20L%C3%A2m%20Vi%C3%AAn%2C%20TP.%20%C4%90%C3%A0%20L%E1%BA%A1t%2C%20L%C3%A2m%20%C4%90%E1%BB%93ng&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter invert-[90%] hue-rotate-[180deg] contrast-[90%]"
                      allowFullScreen={true}
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright and credits */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-text-secondary uppercase tracking-wider font-semibold">
            <p>© {currentYear} LINH TRANG HOME, All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Thiết kế &amp; phát triển bởi</span>
              <span className="text-white font-bold text-glow">Linh Trang Home</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
