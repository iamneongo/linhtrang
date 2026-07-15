import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LINH TRANG HOME | Nâng Tầm Không Gian Sống',
  description:
    'Linh Trang Home cung cấp giải pháp gạch ốp lát, thiết bị vệ sinh mạ PVD và nội thất cao cấp từ các thương hiệu châu Âu.',
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
