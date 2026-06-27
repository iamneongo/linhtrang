'use client';

import * as React from 'react';

import { Icons } from '@admin/components/icons';
import { Button } from '@admin/components/ui/button';
import { cn } from '@admin/lib/utils';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Bắt đầu viết nội dung ở đây...',
  className
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  const applyFormat = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current?.innerHTML ?? '');
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className='bg-muted/40 flex flex-wrap items-center gap-2 rounded-lg border p-2'>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat('bold')}
        >
          <Icons.bold />
          Đậm
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat('italic')}
        >
          <Icons.italic />
          Nghiêng
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat('underline')}
        >
          <Icons.underline />
          Gạch chân
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat('insertUnorderedList')}
        >
          Danh sách
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat('formatBlock', 'blockquote')}
        >
          Trích dẫn
        </Button>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => applyFormat('removeFormat')}
        >
          Xóa format
        </Button>
      </div>

      <div className='bg-background min-h-[280px] rounded-xl border'>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          className='prose prose-sm dark:prose-invert min-h-[280px] max-w-none rounded-xl px-4 py-3 outline-none'
          data-placeholder={placeholder}
          onInput={() => onChange(editorRef.current?.innerHTML ?? '')}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>

      <p className='text-muted-foreground text-xs'>
        Editor hỗ trợ định dạng nhanh. Nội dung được lưu dưới dạng HTML để dùng lại cho landing
        page, SEO và trang chi tiết.
      </p>
    </div>
  );
}
