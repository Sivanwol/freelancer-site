import { Fragment, type ReactNode } from 'react';
import type { LexicalNode, RichTextValue } from '@/lib/payload/types';

const IS_BOLD = 1;
const IS_ITALIC = 1 << 1;
const IS_STRIKETHROUGH = 1 << 2;
const IS_UNDERLINE = 1 << 3;
const IS_CODE = 1 << 4;

function renderText(node: LexicalNode, key: number): ReactNode {
  let content: ReactNode = node.text ?? '';
  const format = typeof node.format === 'number' ? node.format : 0;

  if (format & IS_BOLD) content = <strong>{content}</strong>;
  if (format & IS_ITALIC) content = <em>{content}</em>;
  if (format & IS_UNDERLINE) content = <span className="underline">{content}</span>;
  if (format & IS_STRIKETHROUGH) content = <span className="line-through">{content}</span>;
  if (format & IS_CODE) {
    content = <code className="rounded bg-[#eef3fb] px-1.5 py-0.5 text-[0.9em] text-[#1d72d2]">{content}</code>;
  }

  return <Fragment key={key}>{content}</Fragment>;
}

function renderChildren(children: LexicalNode[] | undefined): ReactNode {
  if (!children?.length) return null;
  return children.map((child, index) => renderNode(child, index));
}

function renderNode(node: LexicalNode, key: number): ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key);

    case 'linebreak':
      return <br key={key} />;

    case 'paragraph': {
      const inner = renderChildren(node.children);
      if (!inner) return null;
      return (
        <p key={key} className="mb-4 leading-7 text-[#33414f]">
          {inner}
        </p>
      );
    }

    case 'heading': {
      const tag = (typeof node.tag === 'string' ? node.tag : 'h2') as
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6';
      const sizes: Record<string, string> = {
        h1: 'text-3xl md:text-4xl',
        h2: 'text-2xl md:text-3xl',
        h3: 'text-xl md:text-2xl',
        h4: 'text-lg md:text-xl',
        h5: 'text-base md:text-lg',
        h6: 'text-base',
      };
      const Tag = tag;
      return (
        <Tag key={key} className={`mb-3 mt-8 font-extrabold text-[#0d1626] ${sizes[tag] ?? sizes.h2}`}>
          {renderChildren(node.children)}
        </Tag>
      );
    }

    case 'quote':
      return (
        <blockquote
          key={key}
          className="my-6 border-s-4 border-[#4c9df2] bg-[#f4f9ff] px-5 py-3 italic text-[#33414f]"
        >
          {renderChildren(node.children)}
        </blockquote>
      );

    case 'list': {
      const isOrdered = node.listType === 'number';
      const ListTag = isOrdered ? 'ol' : 'ul';
      return (
        <ListTag
          key={key}
          className={`mb-4 ms-6 space-y-1 text-[#33414f] ${isOrdered ? 'list-decimal' : 'list-disc'}`}
        >
          {renderChildren(node.children)}
        </ListTag>
      );
    }

    case 'listitem':
      return (
        <li key={key} className="leading-7">
          {renderChildren(node.children)}
        </li>
      );

    case 'link':
    case 'autolink': {
      const href = node.fields?.url ?? node.url ?? '#';
      const newTab = node.fields?.newTab ?? node.newTab;
      return (
        <a
          key={key}
          href={href}
          className="font-semibold text-[#1d72d2] underline underline-offset-2 hover:text-[#0d1626]"
          {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {renderChildren(node.children)}
        </a>
      );
    }

    default: {
      const inner = renderChildren(node.children);
      return inner ? <Fragment key={key}>{inner}</Fragment> : null;
    }
  }
}

export default function RichText({ content }: { content: RichTextValue | null | undefined }) {
  const children = content?.root?.children;
  if (!children?.length) return null;

  return <div className="blog-content">{children.map((node, index) => renderNode(node, index))}</div>;
}
