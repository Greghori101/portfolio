'use client'

import { MilkdownProvider, useEditor } from '@milkdown/react'
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'

const ViewerInner = ({ content }: { content: unknown }) => {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: typeof content === 'string' ? content : JSON.stringify(content),
    })
    return crepe
  }, [content])

  return <div className="milkdown-editor-wrapper pointer-events-none select-none" />
}

export function RichTextViewer({ content }: { content: unknown }) {
  return (
    <MilkdownProvider>
      <ViewerInner content={content} />
    </MilkdownProvider>
  )
}