import Link from 'next/link';

import { Icons } from '@admin/components/icons';
import { Badge } from '@admin/components/ui/badge';
import { Button } from '@admin/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@admin/components/ui/card';

import { contentWorkspaces } from './content-data';

const workspaceEntries = Object.values(contentWorkspaces);

export default function ContentHub() {
  const totalItems = workspaceEntries.reduce((sum, workspace) => sum + workspace.items.length, 0);
  const totalCategories = workspaceEntries.reduce(
    (sum, workspace) => sum + workspace.categories.length,
    0
  );
  const totalDrafts = workspaceEntries.reduce(
    (sum, workspace) => sum + workspace.items.filter((item) => item.status === 'Bản nháp').length,
    0
  );

  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden border-0 bg-gradient-to-r from-emerald-950 via-slate-950 to-zinc-950 text-white shadow-2xl'>
        <CardContent className='grid gap-6 p-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center'>
          <div className='space-y-4'>
            <Badge className='bg-white/10 text-white hover:bg-white/10' variant='outline'>
              <Icons.dashboard />
              Linh Trang Content Hub
            </Badge>
            <div className='space-y-2'>
              <h1 className='text-3xl font-semibold tracking-tight'>Quản lý toàn bộ nội dung</h1>
              <p className='max-w-2xl text-sm leading-6 text-white/75'>
                Tập trung sản phẩm, danh mục, dự án và tin tức vào một khu admin riêng để dễ biên
                tập, sắp xếp và đẩy ra landing page tương ứng.
              </p>
            </div>
            <div className='flex flex-wrap gap-2'>
              <Button asChild variant='secondary'>
                <Link href='/dashboard/content/products'>
                  <Icons.product />
                  Quản lý sản phẩm
                </Link>
              </Button>
              <Button asChild variant='outline' className='border-white/20 bg-white/5 text-white hover:bg-white/10'>
                <Link href='/dashboard/content/posts'>
                  <Icons.post />
                  Soạn tin tức
                </Link>
              </Button>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-3 lg:grid-cols-1'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-sm text-white/60'>Tổng mục</div>
              <div className='mt-2 text-3xl font-semibold'>{totalItems}</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-sm text-white/60'>Danh mục</div>
              <div className='mt-2 text-3xl font-semibold'>{totalCategories}</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-sm text-white/60'>Bản nháp</div>
              <div className='mt-2 text-3xl font-semibold'>{totalDrafts}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {workspaceEntries.map((workspace) => (
          <Card key={workspace.key} className='border-border/60 bg-card/90 shadow-xs backdrop-blur'>
            <CardHeader>
              <CardTitle>{workspace.title}</CardTitle>
              <CardDescription>{workspace.description}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-wrap gap-2'>
                {workspace.categories.slice(0, 3).map((category) => (
                  <Badge key={category} variant='outline' className='rounded-full'>
                    {category}
                  </Badge>
                ))}
              </div>
              <div className='text-muted-foreground text-sm'>
                {workspace.items.length} mục • {workspace.actionLabel.toLowerCase()}
              </div>
              <Button asChild className='w-full'>
                <Link href={`/dashboard/content/${workspace.key}`}>Mở khu {workspace.title}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
