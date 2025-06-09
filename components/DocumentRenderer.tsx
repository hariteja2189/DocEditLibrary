import React from 'react';
import {
  Doc,
  Section,
  Subsection,
  AllContentBlocks,
  Text,
  Paragraph,
  BulletList,
  Image,
  HorizontalDivider,
  Spacer,
  Column,
} from '@/app/types/doctypes'; // adjust path as needed

interface DocumentRendererProps {
  document: Doc;
}

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({ document }) => {
  return (
    <div>
      {document.sections.map((section, si) => (
        <SectionRenderer key={si} section={section} />
      ))}
    </div>
  );
};

const SectionRenderer: React.FC<{ section: Section }> = ({ section }) => {
  const {
    backgroundColor,
    fontFamily,
    fontWeight,
    fontSize,
    color = 'inherit',
    title,
    subsections,
  } = section;

  const sectionStyle: React.CSSProperties = {
    backgroundColor,
    color,
    fontFamily,
    fontWeight,
    fontSize,
    padding: '20px',
    border: '2px solid black'
  };

  return (
    <section style={sectionStyle}>
      <h2>{title}</h2>
      {subsections.map((sub, i) => (
        <SubsectionRenderer key={i} subsection={sub} sectionTextColor={color} />
      ))}
    </section>
  );
};

interface SubsectionRendererProps {
  subsection: Subsection | Column;
  sectionTextColor?: string;
}

const SubsectionRenderer: React.FC<SubsectionRendererProps> = ({ subsection, sectionTextColor }) => {
  const { title, content, subsections, width } = subsection;
  const containerStyle: React.CSSProperties = {
    margin: '1rem 0',
    width: width || 'auto',
  };

  if (subsection.type === 'column') {
  // Cast to Column to access column-specific props
  const columnSubsection = subsection as Column;

  // Style for the columns container
  const columnsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',  // Optional space between columns
    width: width || '100%',
  };

  return (
    <div style={containerStyle}>
      {title && <h3>{title}</h3>}

      <div style={columnsContainerStyle}>
        {columnSubsection.subsections?.map((colSubsection, idx) => {
          const colWidth = columnSubsection.columnPercentage?.[idx] 
            ? `${columnSubsection.columnPercentage[idx]}%` 
            : `${100 / (columnSubsection.columns || columnSubsection.subsections?.length)}%`;

          return (
            <div key={idx} style={{ width: colWidth }}>
              <SubsectionRenderer subsection={colSubsection} sectionTextColor={sectionTextColor} />
            </div>
          );
        })}
      </div>
    </div>
  );
  }

  return (
    <div style={containerStyle}>
      {content && <ContentBlockRenderer content={content} defaultTextColor={sectionTextColor} />}
      {subsections &&
        subsections.map((sub, i) => (
          <SubsectionRenderer key={i} subsection={sub} sectionTextColor={sectionTextColor} />
        ))}
    </div>
  );
};

interface ContentBlockRendererProps {
  content: AllContentBlocks;
  defaultTextColor?: string;
}

const ContentBlockRenderer: React.FC<ContentBlockRendererProps> = ({ content, defaultTextColor }) => {
  const baseStyle: React.CSSProperties = {
    textAlign: 'left',
    color: defaultTextColor,
  };

  switch (content.type) {
      case 'text': {
      const p = content as Text;
      const style: React.CSSProperties = {
        ...baseStyle,
        textAlign: p.alignment,
        fontFamily: p.fontFamily,
        fontWeight: p.fontWeight,
        fontStyle: p.fontStyle,
        fontSize: p.fontSize,
      };
      return (
        <div
          style={{
            columnCount: p.columns || 1,
            columnGap: '2rem',
            textAlign: 'justify',
          }}
        >
          <p style={style}>
            {p.text}
          </p>
        </div>
      );
    }
    case 'paragraph': {
      const p = content as Paragraph;
      return (
        <div
          style={{
            columnCount: p.columns || 1,
            columnGap: '2rem',
            textAlign: 'justify',
          }}
        >
      {p.text.map((para, idx) => (
        <p key={idx} style={{ textIndent: '2em' }}>
          {para}
        </p>
      ))}
        </div>
      );
    }
    case 'bullet-list': {
      const list = content as BulletList;

    const columnCount = list.columns || 1;
    const listStyle = 'decimal';

    return (
      <ul
        style={{
          listStyleType: listStyle,
          columns: columnCount,
          columnGap: '2rem',
          paddingLeft: '1.5rem',
          margin: 0,
        }}
      >
        {list.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
    }
    case 'image': {
      const img = content as Image;
        const figureStyle: React.CSSProperties = {
          ...baseStyle,
          margin: 0,
          padding: 0,
          display: 'inline-block',
          width: img.width ? `${img.width}px` : 'auto',
          height: img.height ? `${img.height}px` : 'auto',
          overflow: 'hidden',
          textAlign: img.alignment,
        };
      return (
        <figure style={{ ...figureStyle }}>
          <img
            src={img.src}
            alt={img.alt || ''}
            width={img.width}
            height={img.height}
            style={{ display: 'block', margin: '0 auto' }}
          />
          {img.caption && <figcaption>{img.caption}</figcaption>}
        </figure>
      );
    }
    case 'divider': {
      const div = content as HorizontalDivider;
      return (
        <hr
          style={{
            border: 'none',
            borderTop: `${div.thickness || '2px'} solid ${div.color || defaultTextColor || '#000'}`,
            width: div.width || '100%',
          }}
        />
      );
    }
    case 'spacer': {
      const sp = content as Spacer;
      return <div style={{ marginTop: `${sp.lines * 1.5}em` }} />;
    }
    default:
      return null;
  }
};

export default DocumentRenderer;