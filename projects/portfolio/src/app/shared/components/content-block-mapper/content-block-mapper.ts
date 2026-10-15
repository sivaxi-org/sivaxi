


export interface ApiContentBlock {

  blockType: string;

  data: Record<string, unknown>;

  sortOrder: number;

}


export function mapContentBlock(
  block: ApiContentBlock
): ApiContentBlock {

  switch (block.blockType.toUpperCase()) {

    case 'TEXT':

      return {
        blockType: 'TEXT',

        data: {
          content: String(
            block.data['content']
            ?? block.data['description']
            ?? ''
          )
        },

        sortOrder: block.sortOrder
      };


    case 'HEADING':

      return {
        blockType: 'HEADING',

        data: {
          text: String(
            block.data['text']
            ?? ''
          ),

          level: Number(
            block.data['level']
            ?? 2
          ) as 1 | 2 | 3 | 4 | 5 | 6
        },

        sortOrder: block.sortOrder
      };


    case 'IMAGE':

      return {
        blockType: 'IMAGE',

        data: {
          url: String(
            block.data['url']
            ?? ''
          ),

          alt: String(
            block.data['alt']
            ?? ''
          )
        },

        sortOrder: block.sortOrder
      };


    case 'RICH_TEXT':

      return {
        blockType: 'RICH_TEXT',

        data: {
          content: String(
            block.data['content']
            ?? ''
          )
        },

        sortOrder: block.sortOrder
      };


    case 'SKILLS':

      return {
        blockType: 'SKILLS',

        data: {
          title: String(
            block.data['title']
            ?? ''
          ),

          skills: Array.isArray(
            block.data['skills']
          )
            ? block.data['skills'].map(
                skill => String(skill)
              )
            : []
        },

        sortOrder: block.sortOrder
      };


    case 'TITLE_BULLETS':

      return {
        blockType: 'TITLE_BULLETS',

        data: {
          title: String(
            block.data['title']
            ?? ''
          ),

          items: Array.isArray(
            block.data['items']
          )
            ? block.data['items'].map(
                item => String(item)
              )
            : []
        },

        sortOrder: block.sortOrder
      };


    case 'CUSTOM':

      return {
        blockType: 'CUSTOM',

        data: block.data,

        sortOrder: block.sortOrder
      };

  }


  throw new Error(
    `Unsupported content block type: ${block.blockType}`
  );

}


export function mapContentBlocks(
  blocks: ApiContentBlock[]
): ApiContentBlock[] {

  return blocks
    .map(mapContentBlock)
    .sort(
      (a, b) => a.sortOrder - b.sortOrder
    );

}