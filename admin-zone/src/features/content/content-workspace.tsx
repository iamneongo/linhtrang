'use client';

import * as React from 'react';
import Image from 'next/image';

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
import { Input } from '@admin/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@admin/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@admin/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@admin/components/ui/tabs';
import { Textarea } from '@admin/components/ui/textarea';
import { cn } from '@admin/lib/utils';

import type { ContentItem, ContentStatus, ContentWorkspaceConfig } from './content-data';
import RichTextEditor from './rich-text-editor';

type ContentWorkspaceProps = {
  config: ContentWorkspaceConfig;
};

const statusOptions: ContentStatus[] = ['Đã xuất bản', 'Bản nháp', 'Chờ duyệt'];

function createDraftItem(config: ContentWorkspaceConfig): ContentItem {
  const now = new Date();
  const fallbackTitle = `${config.itemLabel} mới`;

  return {
    id: `${config.key}-${now.getTime()}`,
    title: fallbackTitle,
    slug: '',
    category: config.categories[0] ?? config.itemLabel,
    status: 'Bản nháp',
    updatedAt: 'Vừa xong',
    author: 'Linh Trang',
    excerpt: '',
    body: `<p>Soạn ${config.itemLabel.toLowerCase()} mới ở đây.</p>`,
    cover:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
  };
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getStatusStyle(status: ContentStatus) {
  switch (status) {
    case 'Đã xuất bản':
      return 'default';
    case 'Bản nháp':
      return 'secondary';
    case 'Chờ duyệt':
      return 'outline';
  }
}

function SummaryCard({
  title,
  value,
  description
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card className='border-border/60 bg-card/90 shadow-xs backdrop-blur'>
      <CardHeader className='pb-3'>
        <CardDescription>{title}</CardDescription>
        <CardTitle className='text-2xl'>{value}</CardTitle>
      </CardHeader>
      <CardContent className='text-muted-foreground text-sm'>{description}</CardContent>
    </Card>
  );
}

function ContentItemTable({
  items,
  activeId,
  onSelect
}: {
  items: ContentItem[];
  activeId: string;
  onSelect: (item: ContentItem) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[34%]'>Tên nội dung</TableHead>
          <TableHead>Danh mục</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Cập nhật</TableHead>
          <TableHead>Tác giả</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item.id}
            className={cn('cursor-pointer', activeId === item.id && 'bg-muted/70')}
            onClick={() => onSelect(item)}
          >
            <TableCell>
              <div className='space-y-1'>
                <div className='font-medium'>{item.title}</div>
                <div className='text-muted-foreground text-xs'>{item.slug}</div>
              </div>
            </TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>
              <Badge variant={getStatusStyle(item.status)}>{item.status}</Badge>
            </TableCell>
            <TableCell>{item.updatedAt}</TableCell>
            <TableCell>{item.author}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ContentWorkspace({ config }: ContentWorkspaceProps) {
  const [items, setItems] = React.useState<ContentItem[]>(() =>
    config.items.map((item) => ({ ...item }))
  );
  const [selectedId, setSelectedId] = React.useState(config.items[0]?.id ?? '');
  const [search, setSearch] = React.useState('');
  const [draft, setDraft] = React.useState<ContentItem>(() =>
    config.items[0] ? { ...config.items[0] } : createDraftItem(config)
  );

  React.useEffect(() => {
    setItems(config.items.map((item) => ({ ...item })));
    const firstItem = config.items[0];
    setSelectedId(firstItem?.id ?? '');
    setDraft(firstItem ? { ...firstItem } : createDraftItem(config));
    setSearch('');
  }, [config]);

  const filteredItems = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return items;
    }

    return items.filter((item) =>
      [item.title, item.slug, item.category, item.author, item.status, item.excerpt]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [items, search]);

  const categoryOptions = React.useMemo(() => {
    return Array.from(
      new Set([config.itemLabel, ...config.categories, ...items.map((item) => item.category), draft.category])
    );
  }, [config.categories, config.itemLabel, draft.category, items]);

  const activeItem = items.find((item) => item.id === selectedId) ?? draft;
  const publishedCount = items.filter((item) => item.status === 'Đã xuất bản').length;
  const draftCount = items.filter((item) => item.status === 'Bản nháp').length;

  const syncDraftField = <K extends keyof ContentItem>(field: K, value: ContentItem[K]) => {
    setDraft((current) => {
      const next = { ...current, [field]: value };

      if (field === 'title' && (!current.slug || current.slug === slugify(current.title))) {
        next.slug = slugify(String(value));
      }

      if (field === 'slug' && !String(value).trim()) {
        next.slug = slugify(next.title);
      }

      return next;
    });
  };

  const loadItem = (item: ContentItem) => {
    setSelectedId(item.id);
    setDraft({ ...item });
  };

  const handleNewDraft = () => {
    const nextDraft = createDraftItem(config);
    setSelectedId(nextDraft.id);
    setDraft(nextDraft);
  };

  const handleSave = () => {
    setItems((current) => {
      const exists = current.some((item) => item.id === draft.id);
      const next = exists
        ? current.map((item) => (item.id === draft.id ? { ...draft, updatedAt: 'Vừa lưu' } : item))
        : [{ ...draft, updatedAt: 'Vừa lưu' }, ...current];

      return next;
    });
    setSelectedId(draft.id);
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='border-border/60 overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-zinc-950 text-white shadow-2xl'>
        <CardContent className='grid gap-6 p-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center'>
          <div className='space-y-4'>
            <div className='flex flex-wrap items-center gap-2'>
              <Badge className='bg-white/10 text-white hover:bg-white/10' variant='outline'>
                <Icons.text />
                Content studio
              </Badge>
              <Badge className='bg-emerald-500/20 text-emerald-50 hover:bg-emerald-500/20' variant='outline'>
                {config.itemLabel}
              </Badge>
            </div>
            <div className='space-y-2'>
              <h1 className='text-3xl font-semibold tracking-tight'>{config.title}</h1>
              <p className='max-w-2xl text-sm leading-6 text-white/75'>{config.description}</p>
            </div>
            <div className='flex flex-wrap gap-2'>
              <Button variant='secondary' onClick={handleNewDraft}>
                <Icons.add />
                {config.actionLabel}
              </Button>
              <Button variant='outline' className='border-white/20 bg-white/5 text-white hover:bg-white/10'>
                <Icons.edit />
                Chỉnh nội dung
              </Button>
            </div>
          </div>

          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-sm text-white/60'>Tổng mục</div>
              <div className='mt-2 text-3xl font-semibold'>{items.length}</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-sm text-white/60'>Đã xuất bản</div>
              <div className='mt-2 text-3xl font-semibold'>{publishedCount}</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-sm text-white/60'>Bản nháp</div>
              <div className='mt-2 text-3xl font-semibold'>{draftCount}</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-sm text-white/60'>Danh mục</div>
              <div className='mt-2 text-3xl font-semibold'>{config.categories.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList className='w-full justify-start rounded-xl p-1'>
          <TabsTrigger value='overview'>Tổng quan</TabsTrigger>
          <TabsTrigger value='editor'>Soạn thảo</TabsTrigger>
          <TabsTrigger value='preview'>Xem trước</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            <SummaryCard
              title='Tổng số mục'
              value={String(items.length)}
              description={`Đang quản lý ${config.itemLabel.toLowerCase()} trong khu admin.`}
            />
            <SummaryCard
              title='Trạng thái xuất bản'
              value={String(publishedCount)}
              description='Các nội dung đã sẵn sàng dùng cho landing page.'
            />
            <SummaryCard
              title='Nội dung nháp'
              value={String(draftCount)}
              description='Bản nháp cần hoàn thiện trước khi đưa lên site.'
            />
            <SummaryCard
              title='Danh mục'
              value={String(config.categories.length)}
              description='Nhóm nội dung hiển thị trên menu và bộ lọc.'
            />
          </div>

          <div className='grid gap-4 xl:grid-cols-[1.5fr_0.5fr]'>
            <Card>
              <CardHeader>
                <CardTitle>Danh sách {config.itemLabel.toLowerCase()}</CardTitle>
                <CardDescription>Click vào một dòng để mở editor và chỉnh sửa.</CardDescription>
              </CardHeader>
              <CardContent className='overflow-x-auto'>
                <ContentItemTable items={items} activeId={activeItem.id} onSelect={loadItem} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Danh mục đang dùng</CardTitle>
                <CardDescription>Đây là nhóm nội dung gợi ý cho landing page.</CardDescription>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                {config.categories.map((category) => (
                  <Badge key={category} variant='outline' className='rounded-full px-3 py-1'>
                    {category}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='editor' className='grid gap-4 xl:grid-cols-[0.95fr_1.05fr]'>
          <Card className='h-fit'>
            <CardHeader>
              <CardTitle>Chọn {config.itemLabel.toLowerCase()}</CardTitle>
              <CardDescription>Tìm nhanh rồi mở mục cần chỉnh sửa.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Tìm ${config.itemLabel.toLowerCase()}...`}
              />
              <div className='space-y-2'>
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => loadItem(item)}
                    className={cn(
                      'border-border/60 bg-background/60 hover:bg-muted/70 flex w-full items-start justify-between rounded-xl border p-3 text-left transition',
                      selectedId === item.id && 'border-primary bg-primary/5'
                    )}
                  >
                    <div className='space-y-1'>
                      <div className='font-medium'>{item.title}</div>
                      <div className='text-muted-foreground text-xs'>{item.category}</div>
                    </div>
                    <Badge variant={getStatusStyle(item.status)}>{item.status}</Badge>
                  </button>
                ))}
                {filteredItems.length === 0 && (
                  <div className='text-muted-foreground rounded-xl border border-dashed p-4 text-sm'>
                    Không tìm thấy mục phù hợp.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Biên tập {config.itemLabel.toLowerCase()}</CardTitle>
              <CardDescription>{config.helperNote}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-5'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Tiêu đề</label>
                  <Input
                    value={draft.title}
                    onChange={(event) => syncDraftField('title', event.target.value)}
                    placeholder='Nhập tiêu đề'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Slug</label>
                  <Input
                    value={draft.slug}
                    onChange={(event) => syncDraftField('slug', event.target.value)}
                    placeholder='slug-thu-gon'
                  />
                </div>
              </div>

              <div className='grid gap-4 md:grid-cols-3'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Danh mục</label>
                  <Select
                    value={draft.category}
                    onValueChange={(value) => syncDraftField('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn danh mục' />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Trạng thái</label>
                  <Select
                    value={draft.status}
                    onValueChange={(value) => syncDraftField('status', value as ContentStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Chọn trạng thái' />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Tác giả</label>
                  <Input
                    value={draft.author}
                    onChange={(event) => syncDraftField('author', event.target.value)}
                    placeholder='Tên người biên tập'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Mô tả ngắn</label>
                <Textarea
                  value={draft.excerpt}
                  onChange={(event) => syncDraftField('excerpt', event.target.value)}
                  placeholder='Mô tả ngắn cho thẻ bài viết / sản phẩm'
                  className='min-h-24'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Ảnh đại diện</label>
                <Input
                  value={draft.cover}
                  onChange={(event) => syncDraftField('cover', event.target.value)}
                  placeholder='https://...'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Nội dung</label>
                <RichTextEditor
                  value={draft.body}
                  onChange={(value) => syncDraftField('body', value)}
                />
              </div>

              <div className='flex flex-wrap gap-3'>
                <Button onClick={handleSave}>
                  <Icons.check />
                  Lưu thay đổi
                </Button>
                <Button variant='outline' onClick={handleNewDraft}>
                  <Icons.add />
                  Bản nháp mới
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='preview'>
          <Card>
            <CardHeader>
              <CardTitle>Xem trước nội dung</CardTitle>
              <CardDescription>
                Đang preview mục {draft.title || activeItem.title} trước khi xuất bản.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-6 lg:grid-cols-[0.95fr_1.05fr]'>
                <div className='relative min-h-[280px] overflow-hidden rounded-2xl border'>
                  <Image src={draft.cover} alt={draft.title} fill className='object-cover' />
                </div>
                <div className='space-y-4'>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant={getStatusStyle(draft.status)}>{draft.status}</Badge>
                    <Badge variant='outline'>{draft.category}</Badge>
                    <Badge variant='outline'>{draft.author}</Badge>
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-2xl font-semibold'>{draft.title}</h3>
                    <p className='text-muted-foreground'>{draft.excerpt}</p>
                  </div>
                  <div
                    className='prose prose-sm dark:prose-invert max-w-none rounded-xl border p-4'
                    dangerouslySetInnerHTML={{ __html: draft.body }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
