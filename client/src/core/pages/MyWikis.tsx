import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthContext } from '../context/AuthContext';
import { Card, Image, Text, Button, Group, Container, SimpleGrid, Title, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type WikiCardProps = {
  name: string;
  subdomain: string;
  description: string;
}


function WikiCard({name, subdomain, description}: WikiCardProps) {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={80}
          width={50}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={80}>{name}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button component="a" href={`/wiki/` + subdomain} color="yellow" fullWidth mt="md">
        Visit
      </Button>
    </Card>
  )
}

function MyWikis() {
  const [WikiList, updateWikis] = useState([])
  const [isLoading, setLoading] = useDisclosure(true)

  const WikiCards = WikiList.map((wiki: WikiCardProps) => (
    <WikiCard 
    {...wiki}
    key={wiki.name}
    />
  ))

  useEffect(() => {
    axios.get("/api/core/wiki", {
        })
        .then(response => {
          updateWikis(response.data)
        })
        .catch(error => {
          console.warn(error)
        })
        .finally(() => {
          setLoading.close()
        })
  }, [])

  return (
    <Container size="lg">
      <Title order={1}>My Wikis</Title>
      <SimpleGrid cols={3} pos="relative">
        <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          {WikiCards}
          <Card shadow="sm" padding="lg" withBorder radius="md">
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={80}
                    width={50}
                    alt="Norway"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={80}>Create a New Wiki</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Start something beautiful.
                </Text>

                <Button component="a" href="/dashboard/create" color="yellow" fullWidth mt="md">
                  Create
                </Button>
              </Card>
              
      </SimpleGrid>
    </Container>
  )
}

export default MyWikis