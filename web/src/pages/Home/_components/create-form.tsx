import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const createLinkSchema = z.object({
  originalLink: z.url({ error: 'Informe uma URL válida' }),
  shortLink: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, {
      error: 'O link encurtado deve conter apenas letras, números e hifens',
    })
    .min(3, { error: 'O link encurtado deve ter pelo menos 3 caracteres' })
    .max(100, { error: 'O link encurtado deve ter no máximo 100 caracteres' }),
})
type CreateLinkData = z.input<typeof createLinkSchema>

export function CreateNewLinkForm() {
  const form = useForm<CreateLinkData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalLink: '',
      shortLink: '',
    },
  })

  const inputs = form.watch()

  const isFormEmpty = inputs.originalLink === '' || inputs.shortLink === ''

  function handleSubmit(data: CreateLinkData) {
    console.log('Form submitted:', data)
  }

  return (
    <section className="md-gap-6 flex flex-col justify-center gap-5 rounded-lg bg-gray-100 p-6 md:p-8">
      <h2 className="text-gray-600 text-lg">Novo link</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-5 md:gap-6"
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="originalLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>link original</FormLabel>

                  <FormControl>
                    <Input placeholder="www.exemplo.com.br" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>link encurtado</FormLabel>

                  <FormControl>
                    <Input prefix="brev.ly/" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isFormEmpty}>
            Salvar link
          </Button>
        </form>
      </Form>
    </section>
  )
}
