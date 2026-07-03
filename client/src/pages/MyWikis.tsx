import React, { useContext, useEffect, useState } from 'react'
import axios, { AxiosError, type AxiosResponse } from "axios";
import { AuthContext } from '../context/AuthContext';
import { Card, Image, Text, Button, Group, Container, SimpleGrid, Title } from '@mantine/core';


function MyWikis() {
  const AuthCtx = useContext(AuthContext)
  const [WikiList, updateWikis] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/core/mywikis", {
        })
        .then(response => {
            updateWikis(response.data)
        })
  }, [])
  return (
    <Container size="lg">
      <Title order={1}>My Wikis</Title>
      <SimpleGrid cols={3}>
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
                  <Text fw={80}>Create a New Wiki</Text>
                </Group>

                <Text size="sm" c="dimmed">
                  Start something beautiful.
                </Text>

                <Button color="blue" fullWidth mt="md">
                  Create
                </Button>
              </Card>
              
      </SimpleGrid>
    </Container>
  )
}

export default MyWikis