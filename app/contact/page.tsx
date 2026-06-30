'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import { ConsultationRequest } from '@/types';

export default function ContactPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<ConsultationRequest>({
    fullName: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const contactInfo = [
    {
      id: 'ci-1',
      icon: MapPin,
      title: 'Showroom',
      lines: ['Đà Lạt, Lâm Đồng, Việt Nam'],
    },
    {
      id: 'ci-2',
      icon: Phone,
      title: 'Hotline tư vấn',
      lines: ['0977 247 623'],
      href: 'tel:0977247623',
    },
    {
      id: 'ci-3',
      icon: Mail,
      title: 'Email',
      lines: ['linhtranghome@gmail.com'],
      href: 'mailto:linhtranghome@gmail.com',
    },
    {
      id: 'ci-4',
      icon: Clock,
      title: 'Giờ làm việc',
      lines: ['Thứ 2 – Chủ Nhật: 8:00 – 18:00'],
    },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

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
    const cleanPhone = formData.phone.trim().replace(/\s+/g, '');
    if (cleanPhone.length < 9 || isNaN(Number(cleanPhone))) {
      setErrorMessage('Số điện thoại không hợp lệ (vui lòng nhập ít nhất 9 chữ số).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ fullName: '', phone: '', message: '' });
    }, 1200);
  };

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
        activeSection="consultation"
      />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-[#1a4535] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4535] via-[#245B4A] to-[#327863]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-red/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="font-headline text-[10px] font-black tracking-widest text-white bg-primary-red px-3 py-1 rounded-full uppercase mb-4 inline-block shadow-sm shadow-primary-red/20">
              TƯ VẤN & HỖ TRỢ MIỄN PHÍ
            </span>
            <h1 className="font-headline text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-6">
              LIÊN HỆ<br />
              <span className="text-primary-red">VỚI CHÚNG TÔI</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
              Để lại thông tin, đội ngũ chuyên gia Linh Trang Home sẽ chủ động liên hệ tư vấn trọn gói — từ lựa chọn vật liệu đến thiết kế 3D hoàn toàn miễn phí.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-[#245B4A] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary-red/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left: Contact Info + Map */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  const content = (
                    <motion.div
                      key={info.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.5 }}
                      className="p-5 rounded-2xl bg-[#327863]/30 border border-white/10 hover:border-primary-red/30 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-red flex items-center justify-center text-white mb-4 shadow-md shadow-primary-red/20 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-2">{info.title}</h4>
                      {info.lines.map((line, i) => (
                        <p key={i} className="text-sm text-white/60">{line}</p>
                      ))}
                    </motion.div>
                  );

                  return info.href ? (
                    <a key={info.id} href={info.href}>{content}</a>
                  ) : (
                    <div key={info.id}>{content}</div>
                  );
                })}
              </div>

              {/* Embedded Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-video"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62762.12490316827!2d108.39697095!3d11.94008975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef5ef6b8d%3A0x6d92ab511c5bdecc!2zxJDDoCBM4bqhdCwgTMOibSDEkOG7k25n!5e0!3m2!1svi!2svn!4v1719345600000!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Linh Trang Home - Vị trí showroom"
                />
              </motion.div>

              {/* Quick Call CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-primary-red/10 border border-primary-red/20 flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-full bg-primary-red flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-primary-red/30">
                  <Phone className="w-7 h-7 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider font-headline font-bold mb-1">Hotline tư vấn 24/7</p>
                  <a href="tel:0977247623" className="font-headline text-2xl font-black text-white hover:text-primary-red transition-colors">
                    0977 247 623
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Consultation Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#327863]/30 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-red/10 blur-[80px] pointer-events-none rounded-full" />

                <div className="mb-8">
                  <h2 className="font-headline text-2xl font-bold tracking-tight text-white mb-2">
                    NHẬN TƯ VẤN MIỄN PHÍ
                  </h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Điền thông tin bên dưới, kiến trúc sư hàng đầu từ Linh Trang Home sẽ liên hệ trong vòng 24 giờ làm việc.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 py-16 text-center"
                    >
                      <CheckCircle className="w-16 h-16 text-[#4CAF50]" />
                      <h3 className="font-headline text-xl font-bold text-white">Yêu cầu đã được ghi nhận!</h3>
                      <p className="text-white/60 text-sm max-w-sm">
                        Cảm ơn bạn đã liên hệ. Đội ngũ chuyên gia Linh Trang Home sẽ gọi điện tư vấn cho bạn trong thời gian sớm nhất.
                      </p>
                      <button
                        onClick={() => setShowSuccess(false)}
                        className="mt-4 px-6 py-3 bg-primary-red hover:bg-[#c0000c] text-white text-xs font-headline font-bold uppercase tracking-wider rounded-xl transition-all duration-300"
                      >
                        Gửi yêu cầu mới
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-5 relative z-10"
                    >
                      {/* Name */}
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Họ và tên chủ đầu tư *"
                          className="w-full bg-[#245B4A]/25 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary-red transition-all"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Số điện thoại di động *"
                          className="w-full bg-[#245B4A]/25 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary-red transition-all"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-white/30 pointer-events-none" />
                        <textarea
                          name="message"
                          placeholder="Yêu cầu cụ thể (Mã sản phẩm, phong cách thiết kế mong muốn, địa điểm thi công...)"
                          rows={5}
                          className="w-full bg-[#245B4A]/25 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary-red transition-all resize-none"
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* Service interest checkboxes */}
                      <div>
                        <p className="text-xs font-headline font-bold text-white/50 uppercase tracking-wider mb-3">Dịch vụ quan tâm</p>
                        <div className="grid grid-cols-2 gap-2">
                          {['Gạch ốp lát cao cấp', 'Thiết bị vệ sinh nhập khẩu', 'Nội thất châu Âu', 'Tư vấn thiết kế 3D'].map((service) => (
                            <label key={service} className="flex items-center gap-2 cursor-pointer group">
                              <div className="w-4 h-4 rounded border border-white/20 bg-white/5 group-hover:border-primary-red/50 transition-colors flex-shrink-0" />
                              <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {errorMessage && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-primary-red bg-primary-red/10 border border-primary-red/20 rounded-xl px-4 py-3"
                          >
                            {errorMessage}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-xl font-headline font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
                          isSubmitting
                            ? 'bg-white/10 text-white/40 cursor-not-allowed'
                            : 'bg-primary-red hover:bg-[#c0000c] text-white shadow-lg shadow-primary-red/20 hover:shadow-primary-red/30 hover:-translate-y-0.5'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Gửi yêu cầu tư vấn miễn phí
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] text-white/30 leading-relaxed">
                        Bằng cách gửi form, bạn đồng ý để Linh Trang Home liên hệ tư vấn theo thông tin đã cung cấp.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
