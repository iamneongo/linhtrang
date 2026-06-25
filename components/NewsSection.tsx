import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Send, X, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { ConsultationRequest, BlogPost } from '../types';
import { blogPosts } from '../data';

interface NewsSectionProps {
  quoteFillProduct: string;
  quoteFillCode: string;
  onClearQuoteFill: () => void;
}

export default function NewsSection({
  quoteFillProduct,
  quoteFillCode,
  onClearQuoteFill
}: NewsSectionProps) {
  const [formData, setFormData] = useState<ConsultationRequest>({
    fullName: '',
    phone: '',
    message: ''
  });
  
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle auto-fill when user requests a product quotation
  useEffect(() => {
    if (quoteFillProduct && quoteFillCode) {
      setFormData((prev) => ({
        ...prev,
        message: `Tôi muốn nhận báo giá, thông tin khuyến mãi và tư vấn lắp đặt chi tiết cho sản phẩm: "${quoteFillProduct}" (Mã SP: ${quoteFillCode}). Xin cảm ơn!`
      }));
      
      // Select the textarea and highlight it if possible
      const element = document.getElementById('consultation-textarea');
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [quoteFillProduct, quoteFillCode]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validity checks
    if (!formData.fullName.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (formData.fullName.trim().length < 2) {
      setErrorMessage('Họ và tên tối thiểu phải có 2 ký tự.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Vui lòng nhập số điện thoại để liên hệ.');
      return;
    }
    
    // Simple phone match
    const cleanPhone = formData.phone.trim().replace(/\s+/g, '');
    if (cleanPhone.length < 9 || isNaN(Number(cleanPhone))) {
      setErrorMessage('Số điện thoại không hợp lệ (vui lòng nhập ít nhất 9 chữ số).');
      return;
    }

    setIsSubmitting(true);

    // Simulate server ingestion
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      setFormData({ fullName: '', phone: '', message: '' });
      onClearQuoteFill();
    }, 1200);
  };

  return (
    <section id="consultation" className="py-20 bg-[#245B4A] relative overflow-hidden">
      {/* Dynamic light effects */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary-red/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Block (8 Cols): Blog News & Trends */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-8">
              <div>
                <span className="font-headline text-xs font-bold tracking-widest text-text-secondary uppercase">
                  BLOG THIẾT KẾ VÀ KIẾN TRÚC
                </span>
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold uppercase mt-1 text-white">
                  Tin tức - <span className="text-primary-red">Xu hướng</span>
                </h2>
              </div>
              <button
                onClick={() => setSelectedPost(blogPosts[0])}
                className="text-xs font-headline font-semibold text-white/75 hover:text-primary-red transition-colors uppercase tracking-wider"
              >
                Nhật ký thiết kế
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer flex flex-col bg-white border border-slate-100 p-4 rounded-xl shadow-md hover:shadow-xl hover:border-primary-red/20 transition-all duration-300"
                >
                  <div className="rounded-lg overflow-hidden mb-4 aspect-video bg-black/20">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary-red" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#245B4A]" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="font-headline text-base font-bold text-[#245B4A] group-hover:text-primary-red transition-colors mb-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed flex-1">
                    {post.summary}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-primary-red font-bold uppercase tracking-wider">
                    <span>Đọc tiếp</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block (4 Cols): Glass consultation box */}
          <div className="lg:col-span-4">
            <div className="bg-[#327863]/30 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl h-full flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/10 blur-[50px] pointer-events-none rounded-full"></div>
              
              <h3 className="font-headline text-xl font-bold tracking-tight text-white mb-2 text-glow">
                TƯ VẤN MIỄN PHÍ
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Để lại thông tin bên dưới, thiết kế sư hàng đầu từ Linh Trang Home sẽ chủ động kết nối để tư vấn trọn gói thiết kế nhà 3D miễn phí cho bạn.
              </p>

              {/* Consultation Submit Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Họ và tên chủ đầu tư *"
                      className="w-full bg-[#245B4A]/25 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary-red transition-all"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Số điện thoại di động *"
                      className="w-full bg-[#245B4A]/25 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary-red transition-all"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      id="consultation-textarea"
                      name="message"
                      placeholder="Yêu cầu cụ thể (Mã sản phẩm, Phong cách thiết kế mong muốn, Địa điểm xây dựng...)"
                      rows={3}
                      className="w-full bg-[#245B4A]/25 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary-red transition-all resize-none"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    {quoteFillProduct && (
                      <button
                        type="button"
                        onClick={onClearQuoteFill}
                        className="absolute bottom-3 right-3 text-[10px] text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 py-1 px-2 rounded border border-white/10 flex items-center gap-1 transition-all"
                        title="Bỏ tự động điền sản phẩm"
                      >
                        <X className="w-3 h-3" /> Bỏ gắn SP
                      </button>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="text-glow text-[11px] text-primary-red font-semibold py-1">
                      * {errorMessage}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary-red hover:bg-[#c0000c] text-white font-headline font-bold text-xs tracking-widest rounded-xl shadow-lg shadow-primary-red/15 uppercase flex items-center justify-center gap-2 tracking-wide disabled:opacity-50 transition-all cursor-pointer mt-4"
                >
                  {isSubmitting ? (
                    'ĐANG GỬI THƯ...'
                  ) : (
                    <>
                      GỬI YÊU CẦU <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Consultation Footer credentials */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center text-primary-red">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-text-secondary">Đại sứ: </span>
                  <span className="text-white font-bold">0977 247 623</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-full flex items-center justify-center text-primary-red">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-text-secondary">info@linhtranghome.vn</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Success Modal popping on form sent */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            id="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              id="success-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#327863] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm text-center relative"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
              
              <h4 className="font-headline text-lg font-bold text-white uppercase mb-2">
                ĐĂNG KÝ THÀNH CÔNG!
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed mb-6">
                Cảm ơn quý khách đã tin cậy nâng tầm không gian sống cùng Linh Trang Home. 
                Đội ngũ đại sứ thương hiệu từ chi nhánh gần nhất sẽ trực tiếp liên hệ tư vấn chuyên môn trong vòng 15-30 phút nữa.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 rounded-xl bg-primary-red text-white text-xs font-headline font-bold uppercase hover:bg-[#c0000c] transition-all cursor-pointer"
              >
                Đồng ý / Quay lại trang chủ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Broad Content Blog Article Modal (High-Fidelity Reader) */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            id="blog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#245B4A]/48 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              id="blog-modal"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="bg-[#327863] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-w-3xl w-full max-h-[85vh] flex flex-col relative"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-black/40 text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto pr-1">
                {/* Visual Cover Header */}
                <div className="rounded-xl overflow-hidden aspect-video bg-black/20 mb-6 border border-white/5 relative">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                    <div>
                      <span className="px-2.5 py-1 text-[9px] font-bold font-headline rounded bg-primary-red text-white uppercase tracking-widest">
                        KIẾN THỨC NỘI THẤT
                      </span>
                      <h3 className="font-headline text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-2 text-glow">
                        {selectedPost.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-6 border-b border-white/5 pb-4 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary-red" />
                    Đăng ngày {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-brand-blue" />
                    Viết bởi {selectedPost.author}
                  </span>
                </div>

                {/* Article Content with gorgeous style */}
                <div className="text-text-secondary text-xs md:text-sm leading-relaxed whitespace-pre-line pr-1 space-y-4">
                  {/* Since content has custom rich formatting we can display it clearly */}
                  <div className="prose prose-invert max-w-none">
                    {selectedPost.content}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-text-secondary">Đóng góp bài viết? Hãy liên hệ qua mail chúng tôi.</span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-1.5 font-headline font-bold text-primary-red uppercase"
                  >
                    <span>Quay lại</span> <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
