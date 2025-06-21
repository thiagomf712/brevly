import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod/v4'
import { apiRequests } from '@/api'
import type { ApiListAllLinksResponse } from '@/api/links/list-all'
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
import { queryClient } from '@/lib/query-client'
import { QueryKeys } from '@/lib/query-keys'

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
  const mutation = useMutation({
    mutationFn: (newTodo: CreateLinkData) => {
      return apiRequests.links.create({
        code: newTodo.shortLink,
        originalUrl: newTodo.originalLink,
      })
    },
    onSuccess: data => {
      queryClient.setQueryData(
        [QueryKeys.links],
        (oldData: ApiListAllLinksResponse | undefined) => {
          return {
            links: oldData ? [...oldData.links, data.link] : [data.link],
          }
        }
      )

      form.reset()

      toast.success('Link criado com sucesso')
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const form = useForm<CreateLinkData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalLink: '',
      shortLink: '',
    },
    disabled: mutation.isPending,
  })

  const inputs = form.watch()

  const isFormEmpty = inputs.originalLink === '' || inputs.shortLink === ''

  return (
    <section className="md-gap-6 flex flex-col justify-center gap-5 rounded-lg bg-gray-100 p-6 md:p-8">
      <h2 className="text-gray-600 text-lg">Novo link</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(data => mutation.mutate(data))}
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

          <Button type="submit" disabled={isFormEmpty || mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : 'Salvar link'}
          </Button>
        </form>
      </Form>
    </section>
  )
}
