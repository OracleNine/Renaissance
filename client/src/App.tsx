import '@mantine/core/styles.css';
import './App.css'
import { NavbarMinimal } from './components/Nav'
import { AppShell, createTheme, MantineProvider, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter } from 'react-router';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'yellow',
});

function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <AppShell
        padding="md"
        navbar={{
          width: 80,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        >

        <AppShell.Navbar>
          <NavbarMinimal></NavbarMinimal>
        </AppShell.Navbar>

        <AppShell.Main>Main</AppShell.Main>
        </AppShell>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
