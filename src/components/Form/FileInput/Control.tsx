'use client'

import { ChangeEvent, ComponentProps, forwardRef } from 'react'
import { useFileInput } from './Root'

export type ControlProps = Omit<ComponentProps<'input'>, 'multiple'>

export const Control = forwardRef<HTMLInputElement, ControlProps>(
  ({ onChange, ...props }, ref) => {
    const { id, onFilesSelected, multiple } = useFileInput()

    function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
      if (!event.target.files?.length) {
        return
      }

      const newFiles = Array.from(event.target.files)

      onFilesSelected(newFiles)
    }

    return (
      <input
        ref={ref}
        type="file"
        className="sr-only"
        id={id}
        onChange={handleFilesSelected}
        multiple={multiple}
        {...props}
      />
    )
  },
)

Control.displayName = 'Control'
