import React, {useEffect, useRef} from 'react'
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import '@/app/styles/SimpleEditor.css' // for basic toolbar styling
import ImageResize from 'tiptap-extension-resize-image'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'

//<div data-type="svgControl"></div>
const SimpleEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Link, Highlight, ImageResize, SVGBlock3, SvgControl],
    content: `<p>Welcome to <strong>SimpleEditor</strong>!</p>
    <img src="https://img.freepik.com/free-vector/butterfly-colorful-logo-template_361591-1587.jpg" />
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
  <!-- Axes -->
  <line x1="30" y1="10" x2="30" y2="180" stroke="black" />
  <line x1="30" y1="180" x2="280" y2="180" stroke="black" />

  <!-- Bars -->
  <rect x="50" y="80" width="30" height="100" fill="#4CAF50" />
  <rect x="100" y="60" width="30" height="120" fill="#2196F3" />
  <rect x="150" y="40" width="30" height="140" fill="#FFC107" />
  <rect x="200" y="100" width="30" height="80" fill="#F44336" />

  <!-- Labels -->
  <text x="50" y="195" font-size="12" text-anchor="middle">A</text>
  <text x="100" y="195" font-size="12" text-anchor="middle">B</text>
  <text x="150" y="195" font-size="12" text-anchor="middle">C</text>
  <text x="200" y="195" font-size="12" text-anchor="middle">D</text>

  <!-- Values -->
  <text x="50" y="75" font-size="10" text-anchor="middle">100</text>
  <text x="100" y="55" font-size="10" text-anchor="middle">120</text>
  <text x="150" y="35" font-size="10" text-anchor="middle">140</text>
  <text x="200" y="95" font-size="10" text-anchor="middle">80</text>
</svg>
`
  })

  if (!editor) return null

  const buttons = [
    { cmd: 'toggleBold', label: 'Bold', active: editor.isActive('bold') },
    { cmd: 'toggleItalic', label: 'Italic', active: editor.isActive('italic') },
    { cmd: 'toggleUnderline', label: 'Underline', active: editor.isActive('underline') },
    { cmd: 'toggleStrike', label: 'Strike', active: editor.isActive('strike') },
    { cmd: 'toggleHighlight', label: 'Highlight', active: editor.isActive('highlight') },
    { cmd: 'toggleBulletList', label: '• List', active: editor.isActive('bulletList') },
    { cmd: 'toggleOrderedList', label: '1. List', active: editor.isActive('orderedList') },
    { cmd: 'setLink', label: 'Link', active: editor.isActive('link') },
    { cmd: 'unsetLink', label: 'Unlink' },
  ]

  return (
    <>
        <div className="simple-editor">
      <div className="toolbar">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => {
              editor.chain().focus();
              if (btn.cmd === 'setLink') {
                const url = window.prompt('Enter URL')
                if (url) editor.chain().extendMarkRange('link').setLink({ href: url }).run()
              } else if (btn.cmd === 'unsetLink') {
                editor.chain().focus().unsetLink().run()
              } else {
                (editor.chain() as any)[btn.cmd]().run()
              }
            }}
            className={btn.active ? 'active' : ''}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <EditorContent editor={editor} />
    </div>
    <button
  onClick={() => {
    let html = editor.getHTML();
    html = cleanSVGWrappers(html);
    console.log("Exported HTML:", html);

    // Optionally trigger a download
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
  }}
>
  Export as HTML
</button>

    </>    
  )
}


// extensions/SVGBlock.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const SVGBlock = Node.create({
  name: 'svgBlock',
  group: 'block',
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      svgContent: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="svg-block"]',
        getAttrs: element => ({
          svgContent: (element as HTMLElement).innerHTML,
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'svg-block' }),
      0,
    ]
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement('div')
      wrapper.setAttribute('data-type', 'svg-block')
      wrapper.innerHTML = node.attrs.svgContent
      return { dom: wrapper }
    }
  },
})

export const SVGBlock2 = Node.create({
  name: 'svgBlock',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      svgContent: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'svg',
        getAttrs: (element) => {
          return {
            svgContent: (element as HTMLElement).outerHTML,
          }
        },
      },
    ]
  },

  renderHTML({ node }) {
    // This renders a placeholder div, actual SVG rendered by NodeView
    return ['div', { 'data-type': 'svgBlock' }]
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = node.attrs.svgContent
      return { dom: wrapper }
    }
  },
})

export const SVGBlock3 = Node.create({
  name: 'svgBlock',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      svgContent: { default: '' },
      width: { default: 300 },
      height: { default: 200 },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'svg',
        getAttrs: (element: HTMLElement) => ({
          svgContent: element.outerHTML,
          width: element.getAttribute('width') || 300,
          height: element.getAttribute('height') || 200,
        }),
      },
    ]
  },

  renderHTML({ node }) {
    return ['div', { 'data-type': 'svgBlock' }, node.attrs.svgContent]
  },

  addNodeView() {
    // return ({ node }: NodeViewRendererProps) => {
    //   const wrapper = document.createElement('div')
    //   wrapper.style.position = 'relative'
    //   wrapper.style.display = 'inline-block'
    //   wrapper.style.resize = 'both'
    //   wrapper.style.overflow = 'hidden'
    //   wrapper.style.border = '1px dashed #ccc'
    //   wrapper.style.width = `${node.attrs.width}px`
    //   wrapper.style.height = `${node.attrs.height}px`
    //   wrapper.contentEditable = 'false'

    //   const svgContainer = document.createElement('div')
    //   svgContainer.innerHTML = node.attrs.svgContent

    //   const svgEl = svgContainer.querySelector('svg')
    //   if (svgEl) {
    //     svgEl.setAttribute('width', `${node.attrs.width}`)
    //     svgEl.setAttribute('height', `${node.attrs.height}`)
    //     svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    //     svgEl.setAttribute('viewBox', `0 0 ${node.attrs.width} ${node.attrs.height}`)
    //   }

    //   const observer = new ResizeObserver(() => {
    //     const width = wrapper.offsetWidth
    //     const height = wrapper.offsetHeight

    //     if (
    //       svgEl &&
    //       (width !== node.attrs.width || height !== node.attrs.height)
    //     ) {
    //       svgEl.setAttribute('width', `${width}`)
    //       svgEl.setAttribute('height', `${height}`)
    //     }
    //   })

    //   observer.observe(wrapper)
    //   wrapper.appendChild(svgContainer)

    //   return {
    //     dom: wrapper,
    //     contentDOM: null,
    //   }
    // }
    return ReactNodeViewRenderer(SVGBlockView)
  },
})

export function SVGBlockView({ node, updateAttributes }: any) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const svgEl = wrapper.querySelector('svg')
    if (!svgEl) return

    const observer = new ResizeObserver(() => {
      const width = wrapper.offsetWidth
      const height = wrapper.offsetHeight

      if (
        width !== node.attrs.width ||
        height !== node.attrs.height
      ) {
        svgEl.setAttribute('width', `${width}`)
        svgEl.setAttribute('height', `${height}`)

        updateAttributes({
          width,
          height,
          svgContent: svgEl.outerHTML,
        })
      }
    })

    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [])

  return (
    <NodeViewWrapper as="div"
      ref={wrapperRef}
      style={{
        position: 'relative',
        resize: 'both',
        overflow: 'hidden',
        border: '1px dashed #ccc',
        width: `${node.attrs.width}px`,
        height: `${node.attrs.height}px`,
      }}
      data-type="svgBlock"
      contentEditable={false}
      dangerouslySetInnerHTML={{ __html: node.attrs.svgContent }}
    />
  )
}

export const SvgControl = Node.create({
  name: 'svgControl',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      svgContent: {
        default: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="skyblue" /></svg>',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="svgControl"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'svgControl' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(SvgControlComponent)
  },
})

export const SvgControlComponent: React.FC<NodeViewProps> = ({ node, updateAttributes }) => {
  const handleColorChange = () => {
    const newSvg = `<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="tomato" /></svg>`
    updateAttributes({ svgContent: newSvg })
  }

  return (
    <NodeViewWrapper className="svg-control">
      <div dangerouslySetInnerHTML={{ __html: node.attrs.svgContent }} />
      <button onClick={handleColorChange} className="mt-2 px-2 py-1 bg-blue-500 text-white rounded">
        Change Color
      </button>
    </NodeViewWrapper>
  )
}

function decodeHTMLEntities(encodedStr: string) {
  const txt = document.createElement('textarea')
  txt.innerHTML = encodedStr
  return txt.value
}

function cleanSVGWrappers(html: string) {
  const container = document.createElement('div')
  container.innerHTML = decodeHTMLEntities(html)

  // Find all SVGBlock divs and unwrap them
  container.querySelectorAll('div[data-type="svgBlock"]').forEach(div => {
    const svg = div.querySelector('svg')
    if (svg) {
      div.replaceWith(svg.cloneNode(true)) // Replace div with svg directly
    }
  })

  return container.innerHTML
}
export default SimpleEditor
