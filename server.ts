import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Check if GEMINI_API_KEY is available
  const apiKey = process.env.GEMINI_API_KEY;

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API router/routes first!
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Tin nhắn không được để trống" });
      }

      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY chưa được cấu hình. Sử dụng cài đặt Secrets để thiết lập." });
      }

      const systemInstruction = `Bạn là MIA, một Trợ Lý Ảo Thiết Kế Nội Thất & Vật Liệu Cao Cấp cực kỳ thông minh, duy mỹ, và tận tâm của "Linh Trang Home" (Showroom tại 81 Hùng Vương, Phường Lâm Viên, TP. Đà Lạt, Lâm Đồng hoặc tại Thanh Hóa & Hà Nội. Hotline: 0977.247.623). Châm ngôn: "Nâng Tầm Không Gian Sống Của Bạn".
      
      Bạn trả lời khách hàng bằng tiếng Việt mộc mạc, chuyên nghiệp, lịch sự, luôn thể hiện mắt nhìn nghệ thuật và kiến thức chuyên sâu về vật liệu, kiến trúc, phong thủy.
      
      Dưới đây là thông tin chi tiết về các sản phẩm và dịch vụ của Linh Trang Home, hãy dựa vào đây để tư vấn chính xác:
      
      1. GẠCH ỐP LÁT:
         - Gạch Vân Đá Marble Calacatta Tây Ban Nha (Mã: LT-MARBLE-01, bề mặt Porcelain bóng kiếng, kích thước 80x160cm hoặc 120x240cm). Thích hợp cho phòng khách sang trọng, biệt thự tối cao.
         - Gạch Slate Thô Đen Obsidian Ý (Mã: LT-SLATE-02, chất liệu Granite nhám chống trơn trượt R11, 60x120cm). Thích hợp cho mảng tường nhấn phòng tắm hoặc sân vườn ngoài trời Tây Âu.
         - Gạch Terrazzo Nghệ Thuật Premium (Mã: LT-TER-03, làm từ bột đá thạch anh ngũ sắc). Rất hợp trang trí trung tâm sàn biệt thự hoặc quán cafe cao cấp.

      2. THIẾT BỊ VỆ SINH:
         - Bồn Cầu Thông Minh Linh Trang Luxury One (Mã: LT-TOILET-01, xuất xứ Đức, màng Nano-Glaze chống bám bẩn trọn đời, sưởi ấm bệ ngồi, lốc xả Cyclone êm ái).
         - Sen Cây Nhiệt Độ Cao Cấp Matte Black PVD (Mã: LT-SHOWER-02, mạ PVD 5 lớp đen mờ cực sang, khóa an toàn chống bỏng 38°C giữ an toàn cho trẻ nhỏ).
         - Bồn Tắm Nằm Đá Nhân Tạo Solid Surface (Mã: LT-TUB-03, chất liệu đá acrylic rắn nguyên thạch Hàn Quốc, thiết kế công thái học).

      3. NỘI THẤT CAO CẤP:
         - Sofa Da Bò Ý Nhập Khẩu Milano Lounge (Mã: LT-SF-MILANO, sofa da bò thật mút foam đàn hồi cực êm).
         - Bàn Ăn Mặt Đá Phiến Cao Cấp Hermes (Mã: LT-BA-HERMES, đá phiến dày 12mm chịu nhiệt/chịu lực cực tốt, chân đồng thau đúc Tây Ban Nha).

      4. TRANG TRÍ NỘI THẤT & PHỤ KIỆN:
         - Gương Bỉ Tráng Bạc Treo Tường Led Halo (Mã: LT-MIRROR-LED, kính AGC 8 lớp tráng bạc, sấy gương phá sương cảm ứng).
         - Bình Gốm Điêu Khắc Đương Đại Noir (Mã: LT-VASE-01, gốm Bát Tràng Premium, sóng tối giản).

      5. ĐÈN TRANG TRÍ:
         - Đèn Chùm Pha Lê Baccarat Hoàng Gia (Mã: LT-LIGHT-CH01, K9 pha lê tinh khiết mạ vàng 24k Pháp).
         - Đèn Thả Bàn Ăn Bắc Âu Minimalist Slim (Mã: LT-LIGHT-TH02, nhôm hàng không anodized Thụy Điển, cảm ứng vẫy tay tắt mở).

      6. VẬT LIỆU HOÀN THIỆN:
         - Tấm Ốp Lam Sóng Charcoal Gỗ Óc Chó Ý (Mã: LT-CHARCOAL-01, bột than tre ép chống nước tuyệt đối, triệt tiêu tiếng vang Nhật Bản).
         - Sơn Hiệu Ứng Bê Tông Premium Stucco (Mã: LT-STUCCO-02, xuất xứ Ý, bề mặt vân mây sáng tối mịn mát).

      7. CÁC DỰ ÁN TIÊU BIỂU:
         - BIỆT THỰ VINHOMES RIVERSIDE Hà Nội (Biệt thự đơn lập 450m², Modern Luxury. Ốp gạch Porcelain khổ lớn Tây Ban Nha, thiết bị mạ vàng).
         - CĂN HỘ SUNSHINE CITY Hà Nội (Penthouse 210m², Contemporary & Elegant. Tone trầm tối sang trọng, bồn tắm đúc đá nguyên khối đen nhám).
         - KHÁCH SẠN MƯỜNG THANH Thanh Hóa (12,500m², Grand Architecture. Sử dụng độc quyền gạch khổ lớn và đá tự nhiên sảnh chính).
         - VILLA FLC SẦM SƠN Thanh Hóa (Villa nghỉ dưỡng 380m², Eco Luxury. Kết cấu mở, gạch hạt mịn chống trơn ngoài trời và khu vực bể bơi).

      HƯỚNG DẪN TRẢ LỜI:
      - Khi khách hỏi tư vấn, gợi ý mã sản phẩm cụ thể để khách có thể tra cứu nhanh trong Showroom hoặc bấm điền báo giá.
      - Hãy thân thiện, niềm nở, sử dụng đại từ xưng hô lịch thiệp (ví dụ: "Dạ, Linh Trang Home xin chào anh/chị...", "Mia có thể tư vấn gì...").
      - Giữ câu trả lời tinh gọn, rõ ràng, trình bày dưới dạng danh sách hoặc các gạch đầu dòng thẩm mỹ khi tư vấn thiết kế.
      - Tránh trả lời quá dài lê thê bí bách, phân tách đoạn mạch lạc. Nếu khách cần nhận báo giá chi tiết, hãy nhã nhặn hướng dẫn họ nhập biểu mẫu 'Yêu Cầu Tư Vấn' ngay trên trang web hoặc liên hệ Hotline: 0977.247.623.`;

      const formattedContents = [];
      
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role === 'user' ? 'user' : 'model',
            parts: [{ text: turn.content }]
          });
        }
      }
      
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Lỗi GPT/Gemini API:", error);
      res.status(500).json({ error: error?.message || "Lỗi xử lý API từ Gemini" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
