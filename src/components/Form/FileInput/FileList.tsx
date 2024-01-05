'use client'

import { FileItem } from './FileItem'
import { useFileInput } from './Root'

export function FileList() {
  const { files, handleDeleteFile } = useFileInput()

  if (files.length === 0) {
    return null
  }

  return (
    <div className="mt-4 flex flex-col gap-3">
      {files.map((file, index) => {
        return (
          <FileItem
            key={file.name}
            name={file.name}
            size={file.size}
            type={file.type}
            handleDeleteFile={() => handleDeleteFile(index)}
            state="progress"
          />
        )
      })}
    </div>
  )
}
