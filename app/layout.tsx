import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LINH TRANG HOME | Nâng Tầm Không Gian Sống',
  description:
    'Linh Trang Home mang đến giải pháp hoàn hảo về gạch ốp lát tiên phong, thiết bị vệ sinh thông minh mạ màu PVD và dòng nội thất cao cấp của các thương hiệu châu Âu.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Arimo:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#245B4A] text-[#ffdad5] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
