export type PayloadLocale = 'he' | 'en';

export interface MediaSize {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
  filesize?: number | null;
  filename?: string | null;
}

export interface Media {
  id: string | number;
  alt?: string | null;
  url?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
  filename?: string | null;
  sizes?: {
    thumbnail?: MediaSize;
    square?: MediaSize;
    small?: MediaSize;
    medium?: MediaSize;
    large?: MediaSize;
    xlarge?: MediaSize;
    og?: MediaSize;
  } | null;
}

export interface Category {
  id: string | number;
  title?: string | null;
  slug?: string | null;
}

export interface Meta {
  title?: string | null;
  description?: string | null;
  image?: Media | string | null;
}

/**
 * Payload Lexical rich-text root value. The structure is intentionally loose
 * because we only consume a known subset of node types when serializing.
 */
export interface LexicalNode {
  type?: string;
  tag?: string | number;
  text?: string;
  format?: number | string;
  listType?: 'number' | 'bullet' | 'check';
  url?: string;
  newTab?: boolean;
  fields?: {
    url?: string;
    newTab?: boolean;
    linkType?: 'custom' | 'internal';
    [key: string]: unknown;
  };
  children?: LexicalNode[];
  [key: string]: unknown;
}

export interface RichTextValue {
  root?: {
    children?: LexicalNode[];
    [key: string]: unknown;
  };
}

export interface Post {
  id: string | number;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  heroImage?: Media | string | null;
  content?: RichTextValue | null;
  categories?: (Category | string | number)[] | null;
  meta?: Meta | null;
  publishedAt?: string | null;
  _status?: 'draft' | 'published' | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedDocs<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}
