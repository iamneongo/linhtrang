import KBar from '@admin/components/kbar';
import AppSidebar from '@admin/components/layout/app-sidebar';
import Header from '@admin/components/layout/header';
import { InfoSidebar } from '@admin/components/layout/info-sidebar';
import { InfobarProvider } from '@admin/components/ui/infobar';
import { SidebarInset, SidebarProvider } from '@admin/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Linh Trang Admin',
  description: 'Khu quản trị nội dung cho sản phẩm, dự án và tin tức Linh Trang',
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <InfobarProvider defaultOpen={false}>
            {children}
            <InfoSidebar side='right' />
          </InfobarProvider>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}

