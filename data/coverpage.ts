// templates/coverTemplate.ts
import { Column, Doc } from '../types/doctypes';

export const coverPage: Doc = {
  documentTitle: "Cover Page Template",
  author: "Placeholder Author",
  date: "2025-06-08",
  sections: [
    {
      title: "",
      backgroundColor: "navy",
      color: "white",
      fontFamily: "Arial",
      fontWeight: "normal",
      fontSize: "16px",
      subsections: [
        {
          type: "normal",
          title: "Logo",
          content: {
            type: "image",
            src: "placeholder_logo.png",
            alt: "Brand Logo",
            width: 100,
            height: 100,
            alignment: "left"
          }
        },
        {
          type: "normal",
          title: "Main Title",
          content: {
            type: "text",
            text: "Main Title Placeholder",
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "36pt",
            fontColor: "black",
            alignment: "left"
          }
        },
        {
          type: "normal",
          title: "Spacer",
          content: {
            type: "spacer",
            lines: 3
          }
        },
        {
          type: "normal",
          title: "Subheading",
          content: {
            type: "text",
            text: "Subheading Placeholder",
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "24pt",
            fontColor: "black",
            alignment: "left"
          }
        },
        {
          type: "normal",
          title: "Blue Divider",
          content: {
            type: "divider",
            color: "#0074D9",
            thickness: "4px",
            width: "10%",
            alignment: "left"
          }
        },
        {
          type: "normal",
          title: "Description Text",
          content: {
            type: "paragraph",
            columns: 2,
            text: [
              "The sun peeked through the forest canopy, casting golden light on the mossy floor. Birds sang sweetly in the branches above.",
              "A gentle stream meandered through the valley, its water glistening like glass. Pebbles clinked softly beneath its flow.",
              "Wind danced across the open meadow, stirring the tall grass into waves. Butterflies flitted lazily among wildflowers.",
              "Rain tapped gently on the leaves, creating a rhythmic lullaby. The earth drank deeply, refreshed and renewed."
            ],
            fontFamily: "Arial",
            fontSize: "14pt",
            alignment: "left"
          }
        },
        {
          type: "normal",
          title: "Second Subheading",
          content: {
            type: "text",
            text: "Another Subheading",
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "20pt",
            alignment: "left"
          }
        },
        {
          type: "normal",
          title: "Bullet Points",
          content: {
            type: "bullet-list",
            columns: 2,
            items: [
              "First bullet point placeholder skjdf adskkfj  sd;lfjadsfj adslk;fj adsjljf j;adskjf ",
              "Second bullet point placeholder asdjfds fkjadsj fsdaj fkdasj fdash fadsh fkdsajh fjh",
              "Third bullet point placeholder asdkjfhds fsa dhfhdasfkj adshfuh dsfkhads kfh dsajkfh",
              "Fourth bullet point placeholder kjsdafjh fdah sfkjdsh fkjdash fkjadhfkadsjh fkjsadh jhdsf"
            ],
            listStyleType: "disc",
            alignment: "left"
          }
        }
      ]
    }
  ]
};

export const sampleDoc: Doc = {
  documentTitle: "Sample Document",
  author: "Jane Doe",
  date: "2025-06-09",
  sections: [
    {
      title: "Introduction",
      backgroundColor: "navy",
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      fontSize: "18px",
      color: "white",
      subsections: [
        {
          type: "text",
          title: "Welcome",
          content: {
            type: "text",
            text: "Welcome to this sample document.",
            fontSize: "16px",
            fontColor: "white",
          },
        },
        {
          type: "column",
          title: "Two Columns Example",
          columnPercentage: [60, 40],
          subsections: [
            {
              type: "paragraph",
              title: "Left Column Paragraph",
              content: {
                type: "paragraph",
                text: [
                  "This is the first paragraph in the left column.",
                  "It has multiple lines.",
                ],
                fontSize: "14px",
              },
            },
            {
              type: "bullet-list",
              title: "Right Column List",
              content: {
                type: "bullet-list",
                items: ["Item 1", "Item 2", "Item 3"],
                listStyleType: "disc",
                fontSize: "14px",
              },
            },
          ],
        },
      ],
    },
    {
      title: "Gallery",
      subsections: [
        {
          type: "image",
          title: "Sample Image",
          content: {
            type: "image",
            src: "https://example.com/sample.jpg",
            alt: "Sample",
            caption: "This is a sample image.",
            width: 300,
            height: 200,
          },
        },
        {
          type: "divider",
          title: "Divider Example",
          content: {
            type: "divider",
            color: "gray",
            thickness: "2px",
            width: "80%",
          },
        },
        {
          type: "spacer",
          title: "Spacer Example",
          content: {
            type: "spacer",
            lines: 2,
          },
        },
      ],
    },
  ],
};
