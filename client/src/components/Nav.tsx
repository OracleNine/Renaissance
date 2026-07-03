import { useContext, useState } from 'react';
import {
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconUser,
  IconBook,
  IconLogin
} from '@tabler/icons-react';
import { Center, Stack, Tooltip, Anchor } from '@mantine/core';
import classes from '../assets/css/NavbarMinimal.module.css';
import { Link } from 'react-router';
import { AuthContext, AuthCtxProvider } from '../context/AuthContext';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
  href: string;
}

function NavbarLink({ icon: Icon, label, active, onClick, href }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Anchor
        component={Link}
        to={href}
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        aria-label={label}
      >
        <Icon size={20} stroke={1.5} />
      </Anchor>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', href: "/" },
  { icon: IconGauge, label: 'Dashboard', href: "/dashboard"},
  { icon: IconBook, label: 'My Wikis', href: "/dashboard/wikis"},
  { icon: IconUser, label: 'Account', href: "#"},
  { icon: IconSettings, label: 'Settings', href: "#"},
];

export function NavbarMinimal() {
  const [active, setActive] = useState(0);
  const AuthCtx = useContext(AuthContext)

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
      <nav className={classes.navbar}>
        <Center>
          
        </Center>

        <div className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </div>
          <Stack justify="center" gap={0}>
            {AuthCtx?.isAuthenticated ? <NavbarLink href="/#" icon={IconLogout} label="Logout" onClick={AuthCtx.logout}/> : <NavbarLink href="/login" icon={IconLogin} label="Login" /> } 
          </Stack>
      </nav>
  );
}