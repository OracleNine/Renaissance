import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from '../assets/css/AuthenticationTitle.module.css';
import { useForm } from '@mantine/form';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const authCtx = useContext(AuthContext)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string) => (value.length < 255 ? null : 'Invalid password'),
    },
  })
  function postLoginData() {
    const data = form.getValues();
    authCtx?.login(data)
    
  }
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet? <Anchor>Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(postLoginData)}>
          <TextInput label="Email" placeholder="you@renaissance.md" required radius="md" key={form.key('email')} {...form.getInputProps('email')} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" key={form.key('password')} {...form.getInputProps('password')}/>
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" radius="md" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;