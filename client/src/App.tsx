import '@mantine/core/styles.css';
import './App.css'
import { createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes} from 'react-router';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import RenShell from './pages/RenShell';
import { LoginRequired } from './utils/LoginRequired';
import MyWikis from './pages/MyWikis';
import Login from './pages/Login';
import { AuthCtxProvider } from './context/AuthContext';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'yellow',
});

function App() {

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AuthCtxProvider>
        <Routes>
          <Route path="/" element={<RenShell />}>
              <Route index element={<Home />} />  
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
                <Route element={<LoginRequired />}>
                  <Route path="/dashboard/wikis" element={<MyWikis />} />
                </Route>
          </Route>
        </Routes>
      </AuthCtxProvider>
    </MantineProvider>
  )
}

export default App
