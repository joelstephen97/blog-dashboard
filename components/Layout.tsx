import { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: 'primary.main',
          boxShadow: 3,
          py: 1
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Link href="/" passHref>
            <Typography 
              variant="h6" 
              component="a" 
              sx={{ 
                color: 'white', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                letterSpacing: 1.2 
              }}
            >
              Blog Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 6 }}>
        {children}
      </Container>
    </>
  );
}