<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Linh Trang Home

Website giới thiệu sản phẩm, dự án và tin tức của Linh Trang Home, hiện dùng `Payload CMS` để quản trị nội dung admin ngay trong cùng ứng dụng Next.js.

## Chạy local

Yêu cầu:
- Node.js 22+
- MongoDB local hoặc Docker

1. Cài dependency:
   `npm install`
2. Tạo file môi trường từ mẫu:
   `cp .env.example .env.local`
3. Khởi động MongoDB.
   Nếu dùng Docker:
   `docker compose up -d`
4. Nạp dữ liệu mẫu ban đầu vào Payload:
   `npm run seed:payload`
5. Chạy app:
   `npm run dev`

## Truy cập

- Website: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`
- Payload API REST: `http://localhost:3000/cms-api`

Lần đầu vào `/admin`, Payload sẽ cho tạo tài khoản quản trị đầu tiên nếu collection `users` chưa có dữ liệu.
