import React from 'react'
import { Container, Title, Paper, TextInput, Button, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'

function CreateWiki() {

  const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        name: '',
        subdomain: '',
        description: '',
      },
  
      validate: {
        name: (value: string) => (value.length < 25 ? null : 'Name is too long.'),
        subdomain: (value: string) => (/^[0-9a-z\-]*$/.test(value) ? null : 'Only alphanumeric characters and dashes are allowed.'),
        description: (value: string) => (value.length < 255 ? null : 'Description is too long.'),
      },
    })
  return (
    <Container size="lg">
          <Title order={1}>Create Wiki</Title>
            <Paper withBorder shadow="md" p={22} mt={30} radius="md">
                <form onSubmit={form.onSubmit(console.log)}>
                  <TextInput label="Name" key={form.key('name')} placeholder="Give your wiki a name..." description="Your wiki's name." required {...form.getInputProps('name')}/>
                  <TextInput label="Subdomain" key={form.key('subdomain')} placeholder="Give your wiki a url..." 
                  description="The URL which people will use to access your wiki. Only alphanumeric characters and dashes are allowed." 
                  required 
                  {...form.getInputProps('subdomain')}/>
                  <Textarea
                    label="Description"
                    description="Tell people what your wiki is about."
                    placeholder="Give your wiki a description..."
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                    required
                  />
                  <Button mt="xl" radius="md" type="submit">
                    Create
                  </Button>
                </form>
            </Paper>
    </Container>
  )
}

export default CreateWiki