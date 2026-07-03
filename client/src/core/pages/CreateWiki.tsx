import React from 'react'
import { Container, Title, Paper, TextInput, Button, Textarea } from '@mantine/core'

const CreateWiki = () => {
  return (
    <Container size="lg">
          <Title order={1}>Create Wiki</Title>
            <Paper withBorder shadow="md" p={22} mt={30} radius="md">
                <form>
                  <TextInput label="Name" placeholder="Give your wiki a name..." description="Your wiki's name." required />
                  <TextInput label="Subdomain" placeholder="Give your wiki a url..." description="The URL which people will use to access your wiki. Only alphanumeric characters and dashes are allowed." required />
                  <Textarea
                    label="Description"
                    description="Tell people what your wiki is about."
                    placeholder="Give your wiki a description..."
                    required
                  />
                  <Button fullWidth mt="xl" radius="md" type="submit">
                    Create
                  </Button>
                </form>
            </Paper>
    </Container>
  )
}

export default CreateWiki