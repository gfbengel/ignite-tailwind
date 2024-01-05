'use client'

import * as FileInput from '@/components/Form/FileInput'
import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const tmpFormSchema = z.object({
  photo: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
      }),
    )
    .refine((value) => value.length > 0, {
      message: 'A foto é obrigatória',
    })
    .refine((value) => value.length !== 0, {
      message: 'Selecione apenas uma foto.',
    })
    .transform((value) =>
      value.map(
        (file) =>
          new File(
            [new Blob([JSON.stringify(file)], { type: file.type })],
            file.name,
          ),
      ),
    ),
  projects: z
    .array(
      z.object({
        name: z.string(),
        size: z.number(),
        type: z.string(),
      }),
    )
    .refine((value) => value.length > 0, {
      message: 'O arquivo é obrigatório',
    })
    .transform((value) =>
      value.map(
        (file) =>
          new File(
            [new Blob([JSON.stringify(file)], { type: file.type })],
            file.name,
          ),
      ),
    ),
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
                ) : (
                  name
                )}
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
                <FileInput.Control accept="image/*" />
                {error ? (
                  <span className="text-red-500">{error.message}</span>
                ) : (
                  name
                )}
              </FileInput.Root>
            )}
          />
        </div>

        <button type="submit" form="settings">
          Save
        </button>
      </form>
    </>
  )
}
