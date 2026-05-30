'use client'

import { useRef, useCallback } from 'react'
import { Crepe } from '@milkdown/crepe'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { imageInlineComponent, inlineImageConfig } from '@milkdown/components/image-inline'
import "@milkdown/crepe/theme/common/style.css"
import "@milkdown/crepe/theme/frame.css"
import { cn } from '@/lib/utils'
import { mediaApi } from '@/lib/api'

interface RichTextEditorProps {
  name: string
  defaultValue?: string
  placeholder?: string
  className?: string
  minHeight?: string
}

const CrepeEditor = ({
  defaultValue,
  placeholder,
  onUpdate
}: {
  defaultValue: string
  placeholder: string
  onUpdate: (markdown: string) => void
}) => {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue,
      featureConfigs: {
        // @ts-ignore - Crepe types might not expose Feature directly in some versions
        'placeholder': {
          text: placeholder
        },
        'image-block': {
          onUpload: async (file: File) => {
            const { data, error } = await mediaApi.upload(file)
            if (error || !data) {
              throw new Error(error || 'Upload failed')
            }
            return data.url
          }
        }
      }
    })

    crepe.editor
      .config((ctx) => {
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
          onUpdate(markdown)
        })

        ctx.update(inlineImageConfig.key, (defaultConfig) => ({
          ...defaultConfig,
          imageIcon: '🌌',
          uploadButton: 'Upload',
          confirmButton: 'Confirm',
          uploadPlaceholderText: 'Paste URL',
          onUpload: async (file: File) => {
            const { data, error } = await mediaApi.upload(file)
            if (error || !data) {
              throw new Error(error || 'Upload failed')
            }
            return data.url
          }
        }))
      })
      .use(listener)
      .use(imageInlineComponent)

    return crepe
  }, [defaultValue, placeholder, onUpdate])

  return <Milkdown />
}

export function RichTextEditor({
  name,
  defaultValue = '',
  placeholder = 'Enter text...',
  className,
  minHeight = '150px',
}: RichTextEditorProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const handleUpdate = useCallback((markdown: string) => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = markdown
    }
  }, [])

  return (
    <div className={cn('rounded-lg border border-input bg-background overflow-hidden flex flex-col group', className)}>
      <MilkdownProvider>
        <div className="min-h-full milkdown-editor-wrapper" style={{ minHeight }}>
          <CrepeEditor
            defaultValue={defaultValue}
            placeholder={placeholder}
            onUpdate={handleUpdate}
          />
        </div>
      </MilkdownProvider>
      <input
        ref={hiddenInputRef}
        type="hidden"
        name={name}
        defaultValue={defaultValue}
      />
    </div>
  )
}
