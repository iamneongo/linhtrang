import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ShieldCheck, Truck, Sparkles, DollarSign, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'product' | 'shipping' | 'warranty' | 'general';
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'product' | 'shipping' | 'warranty'>('all');

  const faqs: FAQItem[] = [
    {
      category: 'product',
      question: 'Linh Trang Home cung cấp những thương hiệu thiết bị vệ sinh và gạch ốp lát nào?',
      answer: 'Chúng tôi phân phối chính hãng các dòng bồn cầu thông minh, tủ chậu, sen vòi mạ màu PVD cao cấp của các thương hiệu hàng đầu châu Âu (Đức, Tây Ban Nha) và châu Á. Toàn bộ gạch ốp lát nghệ thuật, gạch giả đá tinh thạch đều được kiểm định chất lượng nghiêm ngặt và nhập khẩu nguyên đại nguyên kiện.'
    },
    {
      category: 'product',
      question: 'Thiết bị vệ sinh mạ màu PVD có dễ bị bong tróc hay bay màu không?',
      answer: 'Công nghệ mạ PVD (Physical Vapor Deposition) là phương pháp bay hơi lắng đọng vật lý tiên tiến nhất hiện nay, tạo ra lớp phủ titan bám chặt vào bề mặt kim loại ở cấp độ nguyên tử. Thiết bị vòi và sen mạ PVD của Linh Trang Home có độ cứng cực cao, chống ăn mòn tuyệt đối, không lo bong tróc và bền bỉ hơn gấp nhiều lần so với các loại xi mạ thông thường.'
    },
    {
      category: 'warranty',
      question: 'Chính sách bảo hành tại Linh Trang Home đối với bồn cầu và sen vòi ra sao?',
      answer: 'Tất cả sản phẩm thiết bị vệ sinh cao cấp chính hãng tại Linh Trang Home đều có chính sách bảo hành rõ ràng từ 3 đến 5 năm trở lên (men sứ bảo hành vĩnh viễn không ố vàng, ố mốc). Chúng tôi cam kết 1 đổi 1 trong vòng 30 ngày đầu tiên nếu phát sinh bất kỳ lỗi nào từ nhà sản xuất.'
    },
    {
      category: 'shipping',
      question: 'Linh Trang Home có hỗ trợ giao hàng và khảo sát thi công ở các tỉnh khác không?',
      answer: 'Chúng tôi hỗ trợ vận chuyển an toàn tuyệt đối tận công trình trên toàn quốc. Đặc biệt, đội ngũ kỹ thuật giàu kinh nghiệm sẵn sàng hỗ trợ đo đạc, khảo sát thực tế mặt bằng 3D hoàn toàn miễn phí tại khu vực TP. Đà Lạt, Lâm Đồng và các vùng lân cận để tối ưu hóa việc phân chia gạch và định vị hộp kỹ thuật bồn tắm.'
    },
    {
      category: 'warranty',
      question: 'Làm sao để đăng ký và kích hoạt bảo hành điện tử tại showroom?',
      answer: 'Khi mua hàng tại Linh Trang Home, hệ thống sẽ tự động đăng ký thông tin bảo hành điện tử dựa trên số điện thoại mua hàng của quý khách. Bạn có thể dễ dàng kiểm tra thời hạn và trạng thái bảo hành trực tiếp từ website của chúng tôi hoặc liên hệ tổng đài hỗ trợ kỹ thuật nhanh chóng.'
    },
    {
      category: 'shipping',
      question: 'Thời gian vận chuyển trung bình cho đơn hàng gạch ốp lát và bồn tắm lớn là bao lâu?',
      answer: 'Với các đơn hàng nội tỉnh Lâm Đồng hoặc Đà Lạt, chúng tôi giao trong ngày hoặc từ 24 - 48 giờ làm việc theo thỏa thuận. Các đơn hàng liên tỉnh đi miền Trung, miền Nam sẽ được đóng kiện gỗ pallet chuyên dụng để chống nứt vỡ tuyệt đối và bàn giao trong 3 - 5 ngày làm việc.'
    },
    {
      category: 'general',
      question: 'Công trình xây dựng lớn có được hưởng chính sách chiết khấu đặc biệt không?',
      answer: 'Linh Trang Home luôn có chính sách giá ưu đãi, chiết khấu sâu đặc biệt hấp dẫn dành riêng cho các chủ đầu tư, kiến trúc sư, nhà thầu dự án lớn và các đối tác thiết kế nội thất liên kết lâu dài. Xin vui lòng để lại thông tin tại biểu mẫu Nhận tư vấn hoặc liên hệ Hotline 0977 247 623 để nhận bảng báo giá tốt nhất.'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = [
    { id: 'all', name: 'Tất Cả Câu Hỏi', icon: HelpCircle },
    { id: 'product', name: 'Về Sản Phẩm', icon: Sparkles },
    { id: 'shipping', name: 'Vận Chuyển & Giao Hàng', icon: Truck },
    { id: 'warranty', name: 'Chính Sách Bảo Hành', icon: ShieldCheck }
  ];

  return (
    <section id="faq" className="py-24 bg-[#245B4A] relative overflow-hidden border-t border-white/5 scroll-mt-20">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-[#005BBB]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-headline text-xs font-black tracking-widest text-text-secondary uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
            HỎI ĐÁP & HỖ TRỢ KHÁCH HÀNG
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl font-black text-white leading-tight">
            GIẢI ĐÁP <span className="text-primary-red text-glow">THẮC MẮC</span> THƯỜNG GẶP
          </h2>
          <div className="w-16 h-1 bg-primary-red mx-auto rounded-full"></div>
          <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
            Chúng tôi tổng hợp các câu hỏi phổ biến nhất về thiết bị vệ sinh cao cấp, gạch tinh thạch nghệ thuật, chính sách bảo hành chuyên nghiệp và lộ trình bàn giao.
          </p>
        </div>

        {/* Category Filters Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setActiveIndex(null); // Reset open accordion index to avoid visual glitch
                }}
                className={`px-5 py-3 rounded-full text-xs font-headline font-semibold flex items-center gap-2.5 transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-primary-red text-white border-primary-red shadow-lg shadow-primary-red/20'
                    : 'bg-[#327863]/20 text-text-secondary border-white/5 hover:border-white/15 hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Smooth Interactive FAQ Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  key={`${faq.category}-${index}`}
                  className="rounded-2xl bg-[#327863]/25 border border-white/5 hover:border-white/10 overflow-hidden transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <HelpCircle className="w-5 h-5 text-primary-red flex-shrink-0 mt-0.5" />
                      <span className="font-headline text-sm sm:text-base font-bold text-white leading-snug group-hover:text-primary-red">
                        {faq.question}
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-text-secondary">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-primary-red' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-text-secondary border-t border-white/5 bg-[#327863]/10 leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Still Have Questions? Call to Action Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-red/10 to-[#005BBB]/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary-red/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-headline text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <MessageCircle className="w-5 h-5 text-primary-red" />
              Bạn còn câu hỏi khác cần giải đáp?
            </h4>
            <p className="text-text-secondary text-sm max-w-md">
              Liên hệ ngay bộ phận hỗ trợ dự án 24/7 của chúng tôi để được giải đáp cặn kẽ cũng như tư vấn thiết kế trọn gói bồn tắm, gạch ốp lát.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="tel:0977247623"
              className="px-6 py-3 bg-primary-red hover:bg-[#c0000c] text-white text-xs font-headline font-bold uppercase tracking-wider rounded-xl text-center transition-all duration-300 shadow-md shadow-primary-red/15 cursor-pointer"
            >
              ☎️ Gọi 0977 247 623
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
