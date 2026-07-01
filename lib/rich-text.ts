import { defaultRichTextValue } from '@payloadcms/richtext-lexical';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';

const BOLD_FORMAT = 1;
const EMPTY_RICH_TEXT = defaultRichTextValue as SerializedEditorState;

type RichTextBlockNode = Extract<SerializedLexicalNode, { children?: SerializedLexicalNode[] }>;

function isSerializedEditorState(value: unknown): value is SerializedEditorState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const maybeState = value as SerializedEditorState;

  return !!maybeState.root && Array.isArray(maybeState.root.children);
}

function createTextNode(text: string, format = 0): SerializedLexicalNode {
  return {
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  } as SerializedLexicalNode;
}

function createFormattedTextNodes(text: string): SerializedLexicalNode[] {
  const content = text.trim();

  if (!content) {
    return [createTextNode('')];
  }

  const nodes: SerializedLexicalNode[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;

  for (const match of content.matchAll(pattern)) {
    const index = match.index ?? 0;
    const [raw, boldText] = match;

    if (index > lastIndex) {
      nodes.push(createTextNode(content.slice(lastIndex, index)));
    }

    if (boldText) {
      nodes.push(createTextNode(boldText, BOLD_FORMAT));
    } else {
      nodes.push(createTextNode(raw));
    }

    lastIndex = index + raw.length;
  }

  if (lastIndex < content.length) {
    nodes.push(createTextNode(content.slice(lastIndex)));
  }

  return nodes.length > 0 ? nodes : [createTextNode(content)];
}

function createParagraphNode(text: string): RichTextBlockNode {
  return {
    children: createFormattedTextNodes(text),
    direction: null,
    format: '',
    indent: 0,
    textFormat: 0,
    textStyle: '',
    type: 'paragraph',
    version: 1,
  } as RichTextBlockNode;
}

function createHeadingNode(text: string, tag: 'h1' | 'h2' | 'h3' | 'h4'): RichTextBlockNode {
  return {
    children: createFormattedTextNodes(text),
    direction: null,
    format: '',
    indent: 0,
    tag,
    type: 'heading',
    version: 1,
  } as RichTextBlockNode;
}

function createListItemNode(text: string, value: number): RichTextBlockNode {
  return {
    children: createFormattedTextNodes(text),
    direction: null,
    format: '',
    indent: 0,
    value,
    type: 'listitem',
    version: 1,
  } as RichTextBlockNode;
}

function createListNode(items: string[], listType: 'bullet' | 'number'): RichTextBlockNode {
  return {
    children: items.map((item, index) => createListItemNode(item, index + 1)),
    direction: null,
    format: '',
    indent: 0,
    listType,
    start: 1,
    tag: listType === 'number' ? 'ol' : 'ul',
    type: 'list',
    version: 1,
  } as RichTextBlockNode;
}

function createEditorState(children: SerializedLexicalNode[]): SerializedEditorState {
  return {
    root: {
      ...EMPTY_RICH_TEXT.root,
      children,
    },
  };
}

function isOrderedListItem(line: string): RegExpMatchArray | null {
  return line.match(/^\d+\.\s+(.+)$/);
}

function isBulletListItem(line: string): RegExpMatchArray | null {
  return line.match(/^[-*]\s+(.+)$/);
}

export function textToRichText(value: string): SerializedEditorState {
  const source = value.replace(/\r\n/g, '\n').trim();

  if (!source) {
    return createEditorState([]);
  }

  const lines = source.split('\n');
  const children: SerializedLexicalNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = (lines[index] ?? '').trim();

    if (!line) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1]?.length ?? 1;
      const tag = `h${Math.min(level, 4)}` as 'h1' | 'h2' | 'h3' | 'h4';
      children.push(createHeadingNode(headingMatch[2] || '', tag));
      index += 1;
      continue;
    }

    if (isOrderedListItem(line)) {
      const items: string[] = [];

      while (index < lines.length) {
        const currentLine = (lines[index] ?? '').trim();
        const match = isOrderedListItem(currentLine);

        if (!match) {
          break;
        }

        items.push(match[1] || '');
        index += 1;
      }

      children.push(createListNode(items, 'number'));
      continue;
    }

    if (isBulletListItem(line)) {
      const items: string[] = [];

      while (index < lines.length) {
        const currentLine = (lines[index] ?? '').trim();
        const match = isBulletListItem(currentLine);

        if (!match) {
          break;
        }

        items.push(match[1] || '');
        index += 1;
      }

      children.push(createListNode(items, 'bullet'));
      continue;
    }

    const paragraphLines: string[] = [line];
    index += 1;

    while (index < lines.length) {
      const nextLine = (lines[index] ?? '').trim();

      if (!nextLine || nextLine.match(/^(#{1,4})\s+/) || isOrderedListItem(nextLine) || isBulletListItem(nextLine)) {
        break;
      }

      paragraphLines.push(nextLine);
      index += 1;
    }

    children.push(createParagraphNode(paragraphLines.join(' ')));
  }

  return createEditorState(children);
}

export function normalizeRichText(value: unknown): SerializedEditorState {
  if (isSerializedEditorState(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return textToRichText(value);
  }

  return createEditorState([]);
}

function cleanPlainText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function escapeHTML(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function getRichTextContent(value: unknown): { html: string; text: string } {
  const richText = normalizeRichText(value);

  try {
    const text = cleanPlainText(convertLexicalToPlaintext({ data: richText }));
    const html = convertLexicalToHTML({
      data: richText,
      disableContainer: true,
    });

    return { html, text };
  } catch {
    const fallbackText = cleanPlainText(typeof value === 'string' ? value : '');

    return {
      html: fallbackText ? `<p>${escapeHTML(fallbackText)}</p>` : '',
      text: fallbackText,
    };
  }
}
