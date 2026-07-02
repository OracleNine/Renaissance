import '@mantine/core/styles.css';
import './App.css'
import { NavbarMinimal } from './components/Nav'
import { AppShell, createTheme, MantineProvider, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router';
import { AuthContext, AuthCtxProvider } from './context/AuthContext';
import { useContext } from 'react';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'yellow',
});

function App() {
  const [opened, { toggle }] = useDisclosure();
  const authCtx = useContext(AuthContext)

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AuthCtxProvider>
        <AppShell
          padding="md"
          header={{ height: 60 }}
          navbar={{
            width: 80,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          >
          <AppShell.Header>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </AppShell.Header>

          <AppShell.Navbar>
            <NavbarMinimal></NavbarMinimal>
          </AppShell.Navbar>

          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
          </AppShell>
      </AuthCtxProvider>
    </MantineProvider>
  )
}

export default App
