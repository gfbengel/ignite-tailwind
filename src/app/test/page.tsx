'use client'

import { Button } from '@/components/Button'
import * as FileInput from '@/components/Form/FileInput'
import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const zodFileType = z.custom<File>((value) => value instanceof File)

const tmpFormSchema = z.object({
  photo: z.array(zodFileType).refine(
    (v) => v.length === 1,
    (v) => ({
      message:
        v.length === 0 ? 'A foto é obrigatória' : 'Selecione apenas uma foto.',
    }),
  ),
  projects: z.array(zodFileType).refine((value) => value.length > 0, {
    message: 'Selecione ao menos um projeto.',
  }),
})

type FormData = z.infer<typeof tmpFormSchema>

export default function Test() {
  const hookFormMethods = useForm<FormData>({
    resolver: zodResolver(tmpFormSchema),
  })

  const handleSubmit = hookFormMethods.handleSubmit(async (data) => {
    console.log({ data })
  })

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id="settings"
        className="mt-6 flex w-full flex-col gap-5 divide-y divide-zinc-200 dark:divide-zinc-800"
      >
        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label
            htmlFor="photo"
            className="flex flex-col text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-100"
          >
            Your photo
            <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
              This will be displayed on your profile.
            </span>
          </label>
          <Controller
            control={hookFormMethods.control}
            name={`photo` as const}
            render={({
              field: { onChange, value, name },
              fieldState: { error },
            }) => (
              <FileInput.Root
                onValueChange={onChange}
                value={value}
                id="photo"
                className=""
              >
                <div className="flex flex-col items-start gap-5 lg:flex-row">
                  <FileInput.ImagePreview />
                  <FileInput.Trigger />
                  <FileInput.Control accept="image/*" />
                </div>
                {error ? (
                  <span className="text-red-500">{error.message}</span>
                ) : null}
              </FileInput.Root>
            )}
          />
        </div>

        <div className="grid gap-3 pt-5 lg:grid-cols-form">
          <label
            htmlFor="projects"
            className="flex flex-col text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-100"
          >
            Portfolio projects
            <span className="text-sm font-normal text-zinc-500">
              Share a few snippets of your work.
            </span>
          </label>
          <Controller
            control={hookFormMethods.control}
            name={`projects` as const}
            render={({
              field: { onChange, value, ref, name },
              fieldState: { error },
            }) => (
              <FileInput.Root
                id="projects"
                multiple
                value={value}
                onValueChange={onChange}
              >
                <FileInput.Trigger />
                <FileInput.FileList />
                <FileInput.Control />
                {error ? (
                  <span className="text-red-500">{error.message}</span>
                ) : null}
              </FileInput.Root>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-5">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" form="settings" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </>
  )
}
