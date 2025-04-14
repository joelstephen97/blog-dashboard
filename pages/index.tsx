import { useState } from 'react'
import Link from 'next/link'
import { Grid, Container, Typography, Button, Box } from '@mui/material'
import PostCard from '../components/PostCard'
import { useGetPostsQuery } from '../store/apiSlice'

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetPostsQuery({ page, limit: POSTS_PER_PAGE });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error || !data) return <Typography>Error loading posts.</Typography>;

  const totalPages = Math.ceil(data.total / POSTS_PER_PAGE);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/add-post">
        Add New Post
      </Button>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {data.posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>

      {}
      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
        <Button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))} 
          disabled={page === 1}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Typography>
          Page {page} of {totalPages}
        </Typography>
        <Button 
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
