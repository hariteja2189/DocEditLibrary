// types.ts
export interface Doc {
  documentTitle: string;
  author: string;
  date: string;
  sections: Section[];
}

export interface Section {
  title: string;
  backgroundColor?: string;     // e.g. "navy"
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
  color?: string;               // text color
  subsections: (Subsection | Column)[];
}

export interface Subsection {
  type: string;
  title: string;
  content?: AllContentBlocks;
  subsections?: Subsection[];
  width?: string;
}

export interface ContentBlock {
  type: string;
  alignment?: 'left' | 'right' | 'center' | 'justify';
}

export interface Text extends ContentBlock {
  type: 'text';
  text: string;
  columns?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontSize?: string;
  fontColor?: string;
}

export interface Paragraph extends ContentBlock {
  type: 'paragraph';
  text: string[];
  columns?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontSize?: string;
  fontColor?: string;
}

export interface BulletList extends ContentBlock {
  type: 'bullet-list';
  columns?: number;
  items: string[];
  listStyleType?: 'disc' | 'circle' | 'square' | 'decimal';
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  fontSize?: string;
  fontColor?: string;
}

export interface Image extends ContentBlock {
  type: 'image';
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface HorizontalDivider extends ContentBlock {
  type: 'divider';
  color?: string;
  thickness?: string;
  width?: string;
}

export interface Spacer extends ContentBlock {
  type: 'spacer';
  lines: number;
}

export interface Column extends Subsection {
  type: 'column',
  columns: number,
  columnPercentage: number[],
  subsections: Subsection[]
}

export type AllContentBlocks = Text | Paragraph | BulletList | Image | HorizontalDivider | Spacer;