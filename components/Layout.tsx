import { ReactNode } from 'react'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Typography variant="h6" component="a" sx={{ color: 'inherit', textDecoration: 'none' }}>
              Blog Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
