import '@mantine/core/styles.css';
import './App.css'
import { createTheme, MantineProvider } from '@mantine/core';
import { Route, Routes} from 'react-router';
import Dashboard from './core/pages/Dashboard';
import Home from './core/pages/Home';
import RenShell from './core/pages/RenShell';
import { LoginRequired } from './core/utils/LoginRequired';
import MyWikis from './core/pages/MyWikis';
import Login from './core/pages/Login';
import { AuthCtxProvider } from './core/context/AuthContext';
import CreateWiki from './core/pages/CreateWiki';
import axios from 'axios';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'yellow',
});

function App() {

  axios.defaults.baseURL = "http://localhost:8000";

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AuthCtxProvider>
        <Routes>
          <Route path="/" element={<RenShell />}>
              <Route index element={<Home />} />  
              <Route path="/login" element={<Login />} />
                <Route element={<LoginRequired />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/wikis" element={<MyWikis />} />
                  <Route path="/dashboard/create" element={<CreateWiki />} />
                </Route>
          </Route>
        </Routes>
      </AuthCtxProvider>
    </MantineProvider>
  )
}

export default App
