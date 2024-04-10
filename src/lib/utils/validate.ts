import { ZodObject, ZodRawShape } from 'zod'

export const validate = <T extends ZodRawShape>(schema: ZodObject<T>, data: FormData) => {
  const result = schema.parse({
    ...Object.fromEntries(data.entries()),
  })
  return result
}
