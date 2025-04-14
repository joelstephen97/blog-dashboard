import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Grid, Container, Typography, Button } from '@mui/material'
import PostCard from '../components/PostCard'
import { BlogPost } from '../store/apiSlice'

interface HomeProps {
  posts: BlogPost[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/add-post">
        Add New Post
      </Button>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: BlogPost[] = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
