import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, RotateCcw, Bot, User, Check, Copy, PhoneCall, CalendarPlus, ArrowUp, Camera } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  image?: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize with greeting if there are no messages
  useEffect(() => {
    const saved = localStorage.getItem('linhtrang_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map timestamps back to Date objects
        const formatted = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }));
        setMessages(formatted);
      } catch (e) {
        setMessages([getInitialGreeting()]);
      }
    } else {
      setMessages([getInitialGreeting()]);
    }
  }, []);

  // Save history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('linhtrang_chat_history', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  function getInitialGreeting(): Message {
    return {
      id: 'greet-1',
      role: 'model',
      content: `Dạ, Linh Trang Home kính chào Quý khách!\n\nTôi là **MIA**, trợ lý tư vấn của showroom. Tôi có thể hỗ trợ Quý khách hôm nay về:\n\n- 💎 **Tư vấn gạch ốp lát** nhập khẩu Tây Ban Nha và Ý\n- 🛁 **Báo giá thiết bị vệ sinh** và phụ kiện phòng tắm\n- 🛋️ **Gợi ý nội thất** và đèn trang trí phù hợp không gian\n- 🏡 **Tham khảo dự án tiêu biểu** và phong cách thiết kế phù hợp\n\nQuý khách muốn tìm hiểu hạng mục nào trước ạ?`,
      timestamp: new Date()
    };
  }

  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || inputValue).trim();
    if (!content && !selectedImage) return;

    if (!textToSend) {
      setInputValue('');
    }

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: content || 'Đã gửi một hình ảnh không gian để AI phối cảnh.',
      timestamp: new Date(),
      image: selectedImage || undefined
    };

    const currentImg = selectedImage;
    setSelectedImage(null);

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    if (currentImg) {
      // Simulate AI visual analysis
      setTimeout(() => {
        const botMsg: Message = {
          id: `msg-${Date.now()}-model`,
          role: 'model',
          content: `Dạ, MIA đã nhận được hình ảnh không gian của Quý khách! 📸

Qua hình ảnh sơ bộ, MIA gợi ý một số hướng triển khai để hoàn thiện phối cảnh:
- 💎 **Về gạch ốp lát:** Có thể tham khảo **Gạch Vân Đá Marble Calacatta Tây Ban Nha (LT-MARBLE-01)** khổ lớn để tạo cảm giác rộng và sáng hơn cho không gian.
- 🪵 **Về mảng tường nhấn:** Có thể kết hợp **Tấm Ốp Lam Sóng Charcoal Gỗ Óc Chó Ý (LT-CHARCOAL-01)** tại vách TV hoặc đầu giường để tăng chiều sâu và cảm giác ấm cúng.
- 🛁 **Nếu đây là phòng tắm:** **Bồn Cầu Thông Minh Linh Trang Luxury One (LT-TOILET-01)** kết hợp với **Bồn Tắm Nằm Đá Nhân Tạo Solid Surface (LT-TUB-03)** là một phương án đáng cân nhắc cho không gian cao cấp.

Quý khách có muốn MIA đăng ký để đội ngũ Linh Trang Home liên hệ khảo sát và tư vấn phối cảnh 3D chi tiết hơn không ạ?`,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 2000);
      return;
    }

    try {
      // Build simplified history structure for API consumption
      const apiHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: content,
          history: apiHistory
        })
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        const botMsg: Message = {
          id: `msg-${Date.now()}-model`,
          role: 'model',
          content: data.reply,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errMsg: Message = {
          id: `msg-${Date.now()}-err`,
          role: 'model',
          content: `Dạ, xin lỗi Quý khách. Hệ thống đang bận phản hồi hoặc kết nối gặp chút gián đoạn. Anh/chị có thể liên hệ trực tiếp Hotline **0977.247.623** để Linh Trang Home phục vụ ngay lập tức ạ!`,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    } catch (error) {
      console.error(error);
      const errMsg: Message = {
        id: `msg-${Date.now()}-err`,
        role: 'model',
          content: `Dạ, xin lỗi Quý khách. Cổng kết nối tư vấn đang gặp chút gián đoạn. Anh/chị có thể liên hệ Hotline **0977.247.623** để Linh Trang Home hỗ trợ nhanh nhất ạ!`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    if (window.confirm('Quý khách muốn đặt lại đoạn hội thoại?')) {
      const initial = [getInitialGreeting()];
      setMessages(initial);
      localStorage.setItem('linhtrang_chat_history', JSON.stringify(initial));
    }
  };

  const copyToClipboard = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Quick action suggestions
  const suggestions = [
    { label: 'Chọn gạch lát phòng khách', text: 'Tư vấn cho tôi mẫu gạch lát sàn phòng khách biệt thự sang trọng.' },
    { label: 'Báo giá bồn cầu thông minh', text: 'Tôi muốn báo giá và tìm hiểu mã bồn cầu thông minh LT-TOILET-01.' },
    { label: 'Sản phẩm mạ vàng PVD', text: 'Giới thiệu các thiết bị vệ sinh mạ PVD cao cấp.' },
    { label: 'Xem dự án tiêu biểu', text: 'Gợi ý các dự án biệt thự hoặc căn hộ tiêu biểu mà Linh Trang đã triển khai.' }
  ];

  // Micro markdown formatting for bold, bullets, list items, emojis and numbers
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, pairIdx) => {
      let content = line;
      
      // Inline simple bold replacements (e.g. **text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-extrabold text-[#E50914] text-glow-sm">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const formattedLine = parts.length > 0 ? parts : content;

      // Unordered list bullet
      if (line.trim().startsWith('- ')) {
        return (
          <li key={pairIdx} className="list-none pl-4 relative my-1 text-xs leading-relaxed text-slate-700 font-medium">
            <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-[#E50914] rounded-full"></span>
            {line.trim().substring(2)}
          </li>
        );
      }

      // Keep spacing or empty line as small gap
      if (line.trim() === '') {
        return <div key={pairIdx} className="h-2" />;
      }

      return (
        <p key={pairIdx} className="text-xs sm:text-[13px] leading-relaxed text-slate-800 font-medium my-1.5">
          {formattedLine}
        </p>
      );
    });
  };

  return (
    <div id="ai-chatbot-system" className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Floating Notification Speech Bubble Badge */}
      <AnimatePresence>
        {!isOpen && messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ delay: 3, duration: 0.4 }}
            className="absolute bottom-2 right-16 bg-gradient-to-r from-[#245B4A] to-[#327863] border border-white/10 text-white py-2 px-4 rounded-2xl rounded-br-none shadow-2xl mr-2 text-xs font-semibold flex items-center gap-2 whitespace-nowrap pointer-events-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E50914] animate-bounce" />
            <span>MIA đang sẵn sàng tư vấn cho bạn!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-[350px] sm:w-[410px] h-[550px] max-h-[85vh] bg-[#245B4A]/95 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-40 absolute bottom-20 right-0 sm:right-16 pointer-events-auto"
          >
            {/* Header section matching corporate green visual block */}
            <div className="bg-gradient-to-r from-[#245B4A] to-[#122D24] p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-red flex items-center justify-center text-white relative shadow-md shadow-primary-red/20">
                  <Bot className="w-5 h-5 text-white animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#245B4A] block"></span>
                </div>
                <div>
                  <h3 className="text-sm font-headline font-bold text-white uppercase tracking-wider flex items-center gap-1.5 leading-none">
                    MIA Trợ Lý Ảo
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-full font-sans lowercase font-normal border border-emerald-500/20">Online</span>
                  </h3>
                  <p className="text-[10px] text-text-secondary mt-1">Linh Trang Home • Thiết kế & Báo giá</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="p-2 text-white/50 hover:text-white transition-all rounded-lg hover:bg-white/5 cursor-pointer"
                  title="Đặt lại đoạn hội thoại"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/50 hover:text-white transition-all rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body messages area */}
            <div 
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#245B4A]/30"
            >
              {messages.map((msg) => {
                const isBot = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {/* Bot icon avatar */}
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-[#E50914]/15 border border-primary-red/30 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-[#E50914]" />
                      </div>
                    )}

                    <div className="flex flex-col max-w-[80%]">
                      {/* Message Bubble with beautiful glass gradient */}
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm border relative shadow-md group ${
                          isBot
                            ? 'bg-white border-white text-slate-800 rounded-tl-none shadow-sm'
                            : 'bg-[#E50914]/20 border-[#E50914]/30 text-white rounded-tr-none'
                        }`}
                      >
                        {/* Copy button for model responses */}
                        {isBot && (
                          <button
                            onClick={() => copyToClipboard(msg.content, msg.id)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-black/60 hover:bg-black text-white/70 hover:text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 cursor-pointer"
                            title="Sao chép câu trả lời"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        )}
                        
                        {/* Embedded image preview if exists */}
                        {msg.image && (
                          <div className="mb-2 max-w-full rounded-lg overflow-hidden border border-white/10 max-h-48 bg-black/20">
                            <img src={msg.image} alt="Không gian đã gửi" className="w-full h-full object-cover" />
                          </div>
                        )}

                        <div className="whitespace-pre-line">
                          {isBot ? renderMessageContent(msg.content) : <p className="text-xs sm:text-[13px] leading-relaxed text-white">{msg.content}</p>}
                        </div>
                      </div>
                      
                      {/* Message timestamp metadata */}
                      <span className={`text-[9px] text-text-secondary mt-1 px-1 ${!isBot ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* User icon avatar */}
                    {!isBot && (
                      <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-text-secondary" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loader animation when waiting for responses */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-[#E50914]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-white border border-white text-slate-500 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#E50914] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="text-[11px] text-slate-400 ml-1 font-medium">MIA AI đang phân tích...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Micro Scroll Suggestions panel list */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-3.5 py-2 bg-black/10 border-t border-b border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug.text)}
                    className="px-3 py-1.5 bg-[#327863]/30 hover:bg-[#327863]/60 border border-white/5 hover:border-white/15 text-white rounded-full text-[10px] font-semibold cursor-pointer transition-all shrink-0 max-w-xs truncate"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            {/* Image Preview Panel */}
            {selectedImage && (
              <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex items-center gap-2 relative">
                <div className="w-12 h-9 rounded overflow-hidden border border-white/15 relative">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] text-white/40 uppercase">Ảnh đã chọn</p>
                  <p className="text-[10px] text-white/80 font-medium truncate max-w-[180px]">Đang chờ gửi phối cảnh...</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="w-5 h-5 rounded-full bg-black/60 hover:bg-black text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Input area Form block */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="p-3 bg-gradient-to-b from-transparent to-[#122D24] border-t border-white/10 flex gap-2 items-center"
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setSelectedImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                title="Tải ảnh không gian lên"
                className="w-9 h-9 shrink-0 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Camera className="w-4.5 h-4.5" />
              </button>

              <input
                type="text"
                placeholder={selectedImage ? "Nhập yêu cầu phối cảnh..." : "Nhập câu hỏi tại đây..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-[#245B4A]/40 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary-red focus:ring-1 focus:ring-primary-red disabled:opacity-55 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || (!inputValue.trim() && !selectedImage)}
                className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-[#9B0000] to-[#E50914] hover:brightness-110 active:scale-95 text-white flex items-center justify-center shadow-lg transition-transform disabled:opacity-40 disabled:scale-100 cursor-pointer"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified Floating Actions Stack */}
      <div className="flex flex-col gap-3 items-center pointer-events-auto z-50">
        
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10 }}
              onClick={handleScrollToTop}
              title="Cuộn lên đầu trang"
              className="w-12 h-12 rounded-full bg-primary-red hover:bg-[#c0000c] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer border border-white/10"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Design Consultation Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNavigateToConsultation}
          title="Nhận tư vấn thiết kế miễn phí"
          className="w-12 h-12 rounded-full bg-[#245B4A] hover:bg-primary-red text-white flex items-center justify-center shadow-lg border border-white/10 cursor-pointer transition-all"
        >
          <CalendarPlus className="w-5 h-5" />
        </motion.button>

        {/* Hotline Call Button */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href="tel:0977247623"
          title="Gọi Hotline tư vấn"
          className="w-12 h-12 rounded-full bg-[#245B4A] hover:bg-primary-red text-white flex items-center justify-center shadow-lg border border-white/10 cursor-pointer transition-all"
        >
          <PhoneCall className="w-5 h-5" />
        </motion.a>

        {/* Chat Launcher Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl relative cursor-pointer border border-white/20 z-50 group overflow-hidden"
          title="Trò chuyện với trợ lý thiết kế MIA"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#9B0000] to-[#E50914] opacity-80 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Decorative pulsating waves behind */}
          <span className="absolute inset-0 rounded-full bg-[#E50914]/40 scale-110 animate-ping opacity-70 pointer-events-none"></span>

          <span className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6 animate-pulse" />
            )}
          </span>
        </motion.button>
      </div>

    </div>
  );
}
