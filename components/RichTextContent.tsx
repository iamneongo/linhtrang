type RichTextContentProps = {
  className?: string;
  fallbackText?: string;
  html?: string;
};

export default function RichTextContent({ className, fallbackText, html }: RichTextContentProps) {
  if (!html && !fallbackText) {
    return null;
  }

  if (!html) {
    return <div className={className}>{fallbackText}</div>;
  }

  return (
    <div
      className={['rich-text-content', className].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
