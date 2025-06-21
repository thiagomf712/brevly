import { zodResolver } from '@hookform/resolvers/zod'
import { CopyIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { Button } from './components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form'
import { Input } from './components/ui/input'

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  disabled: z.string(),
})
type FormSchema = z.input<typeof formSchema>

export function App() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: 'Teste',
      disabled: 'Value',
    },
  })

  function handleSubmit(data: FormSchema) {
    console.log('Form submitted:', data)
  }

  return (
    <>
      <div className="flex flex-col gap-2 p-4 justify-center items-center bg-gray-100">
        <p className="text-xl">Inputs</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disabled"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disabled Input</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="This input is disabled"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <div className="flex flex-col gap-2 p-4 justify-center items-center bg-gray-100 mt-2">
        <p className="text-xl">Buttons</p>

        <Button>Primary</Button>
        <Button disabled>Primary Disabled</Button>

        <Button variant="secondary">
          <CopyIcon /> Secondary
        </Button>
        <Button variant="secondary" disabled>
          <CopyIcon />
          Secondary Disabled
        </Button>

        <Button variant="icon">
          <CopyIcon />
        </Button>
        <Button variant="icon" disabled>
          <CopyIcon />
        </Button>
      </div>
    </>
  )
}
