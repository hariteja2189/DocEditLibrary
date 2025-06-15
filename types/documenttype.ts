// ----- STYLE -----
export interface Style {
  padding?: string;
  margin?: string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  display?: 'block' | 'flex' | 'grid';
  flexDirection?: 'row' | 'column';
  width?: string;
  height?: string;

  backgroundColor?: string;
  backgroundImage?: string;

  border?: string;
  borderWidth?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderColor?: string;
  borderRadius?: string;

  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  color?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';

  boxShadow?: string;
  opacity?: number;
  zIndex?: number;

  columnCount?: number;
  columnGap?: string;
  columnRule?: string;
}

// ----- CONTENT BLOCKS -----
export interface BaseContentBlock {
  style?: Style;
}

export interface TextBlock extends BaseContentBlock {
  type: 'text';
  value: string;
}

export interface ParagraphBlock extends BaseContentBlock {
  type: 'paragraph';
  value: string;
}

export interface BulletListBlock extends BaseContentBlock {
  type: 'bulletlist';
  items: string[];
}

export interface SpacerBlock extends BaseContentBlock {
  type: 'spacer';
  size: number;
}

export interface DividerBlock extends BaseContentBlock {
  type: 'divider';
}

export interface ImageBlock extends BaseContentBlock {
  type: 'image';
  url: string;
  alt?: string;
}

export interface GraphBlock extends BaseContentBlock {
  type: 'graph';
  graphType: string;
  data: any;
}

export interface TableHeader {
  label: string;
  style?: Style;
}

export interface TableCell {
  value: string;
  style?: Style;
}

export interface TableRow {
  cells: TableCell[];
  style?: Style;
}

export interface TableBlock extends BaseContentBlock {
  type: 'table';
  headers: TableHeader[];
  rows: TableRow[];
}

export type ContentBlock =
  | TextBlock
  | ParagraphBlock
  | BulletListBlock
  | SpacerBlock
  | DividerBlock
  | ImageBlock
  | TableBlock
  | GraphBlock;

// ----- SUBSECTIONS -----
export interface BaseSubsection {
  id: string;
  title?: string;
  style?: Style;
}

export interface ContentSubsection extends BaseSubsection {
  type: 'content';
  prompt?: string;
  content: ContentBlock;
}

export interface ColumnSubsection extends BaseSubsection {
  type: 'column';
  columns: Subsection[];       // List of subsections
  columnWidths?: string[];     // Widths by index (e.g., ['30%', '70%'])
}

export interface GroupSubsection extends BaseSubsection {
  type: 'group';
  children: Subsection[];
}

export interface RawContentSubsection extends BaseSubsection {
  type: 'rawcontent';
  prompt?: string;
  value: string;
}

export type Subsection =
  | ContentSubsection
  | ColumnSubsection
  | GroupSubsection
  | RawContentSubsection;

// ----- SECTION AND DOCUMENT -----
export interface Section {
  id: string;
  title?: string;
  style?: Style;
  subsections: Subsection[];
}

export interface DocumentTemplate {
  title: string;
  description?: string;
  style?: Style;
  sections: Section[];
}
