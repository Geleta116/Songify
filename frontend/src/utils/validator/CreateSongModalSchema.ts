import { z, ZodError } from "zod"

export const CreateSongSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  singerName: z.string().min(1, "Singer name cannot be empty"),
  file: z.instanceof(File).optional(),
})
