import { useState } from 'react'
import Link from 'next/link'
import { Stack, Container, Typography, Button, Box } from '@mui/material'
import PostCard from '../components/PostCard'
import { useGetPostsQuery } from '../store/apiSlice'

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetPostsQuery({ page, limit: POSTS_PER_PAGE });

  if (isLoading) return <Typography align="center" sx={{ mt: 4 }}>Loading...</Typography>;
  if (error || !data) return <Typography align="center" sx={{ mt: 4 }}>Error loading posts.</Typography>;

  const totalPages = Math.ceil(data.total / POSTS_PER_PAGE);

  const sortedPosts = [...data.posts].sort((a, b) => b.id - a.id);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', letterSpacing: 1, color: 'primary.main' }}
      >
        BLOG POSTS
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/add-post"
        fullWidth
        sx={{
          mb: 4,
          borderRadius: '50px',
          textTransform: 'none',
          boxShadow: 3,
          py: 1.5,
          fontSize: '1rem'
        }}
      >
        ADD A NEW POST
      </Button>
      <Stack spacing={3}>
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        mt={6}
      >
        <Button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1}
          sx={{
            mr: 2,
            borderRadius: '50px',
            textTransform: 'none',
            boxShadow: 2,
            px: 3
          }}
        >
          Previous
        </Button>
        <Typography sx={{ fontWeight: 'medium' }}>
          Page {page} of {totalPages}
        </Typography>
        <Button 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          sx={{
            ml: 2,
            borderRadius: '50px',
            textTransform: 'none',
            boxShadow: 2,
            px: 3
          }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
