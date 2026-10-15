import {
  ContentBlockType
} from './content-block.model';


export interface ContentBlockDefinition {

  type: ContentBlockType;

  label: string;

  description: string;

}


export const CONTENT_BLOCK_DEFINITIONS: ContentBlockDefinition[] = [

  {
    type: 'TEXT',

    label: 'Text',

    description: 'Simple text content'
  },


  {
    type: 'HEADING',

    label: 'Heading',

    description: 'Section heading'
  },


  {
    type: 'IMAGE',

    label: 'Image',

    description: 'Display an image'
  },


  {
    type: 'RICH_TEXT',

    label: 'Rich Text',

    description: 'Formatted text content'
  },


  {
    type: 'SKILLS',

    label: 'Skills',

    description: 'Display a list of skills'
  },


  {
    type: 'TITLE_BULLETS',

    label: 'Title & Bullet Points',

    description: 'A title followed by bullet points'
  },


  {
    type: 'CUSTOM',

    label: 'Custom',

    description: 'Custom structured content'
  }

];