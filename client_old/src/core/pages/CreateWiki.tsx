import React, { useState } from 'react'
import { Container, Title, Paper, TextInput, Button, Textarea, Box, Space } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios, { AxiosError, type AxiosResponse } from 'axios'
import { redirect, useNavigate } from 'react-router'

type ErrObject = Record<string, string>

function CreateWiki() {

  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()

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

  function postNewWiki() {
    const data = form.getValues()
    axios.post("/api/core/wiki/", {
            name: data["name"],
            subdomain: data["subdomain"],
            description: data["description"],
        })
        .then(() => {
            const newWikiUrl = "/wiki/" + data["subdomain"]
            navigate(newWikiUrl)
        })
        .catch((error: AxiosError<ErrObject>) => {
            if (error.response) {
              const errorData = error.response.data
              if (errorData) {
                let errorMessage = ""
                Object.keys(errorData).forEach((key) => {
                  errorMessage += errorData[key]
                })
                setErrMsg(errorMessage)
              }
            }
        })
  }

  return (
    <Container size="lg">
          <Title order={1}>Create Wiki</Title>
            <Paper withBorder shadow="md" p={22} mt={30} radius="md">
              {errMsg.length > 0 && 
                <Paper withBorder bg="var(--mantine-color-gray-light)" shadow="sm" p={22} radius="lg">
                  {errMsg}
                </Paper>}
                <Space h="md" />
                <form onSubmit={form.onSubmit(postNewWiki)}>
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