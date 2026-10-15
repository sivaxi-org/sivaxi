export type ContentBlockType =
  | 'TEXT'
  | 'HEADING'
  | 'IMAGE'
  | 'RICH_TEXT'
  | 'SKILLS'
  | 'TITLE_BULLETS'
  | 'CUSTOM';


export interface TextBlockData {
  content: string;
}


export interface HeadingBlockData {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}


export interface ImageBlockData {
  url: string;
  alt: string;
}


export interface RichTextBlockData {
  content: string;
}


export interface SkillsBlockData {
  title: string;
  skills: string[];
}


export interface TitleBulletsBlockData {
  title: string;
  items: string[];
}


export interface CustomBlockData {
  [key: string]: unknown;
}


export interface ContentBlockDataMap {
  TEXT: TextBlockData;
  HEADING: HeadingBlockData;
  IMAGE: ImageBlockData;
  RICH_TEXT: RichTextBlockData;
  SKILLS: SkillsBlockData;
  TITLE_BULLETS: TitleBulletsBlockData;
  CUSTOM: CustomBlockData;
}


export interface ContentBlockDto<T extends ContentBlockType = ContentBlockType> {
  id?: string;
  blockType: T;
  data: ContentBlockDataMap[T];
  sortOrder: number;
}


export type ContentBlock =
  {
    [K in ContentBlockType]: ContentBlockDto<K>
  }[ContentBlockType];