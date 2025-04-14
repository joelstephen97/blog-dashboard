import { useRouter } from 'next/router'
import { Container, Typography, CircularProgress } from '@mui/material'
import { useGetPostQuery } from '../../store/apiSlice'

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: post, error, isLoading } = useGetPostQuery(Number(id), {
    skip: !id,
  });

  if (isLoading) return <CircularProgress />;
  if (error || !post) return <Typography>Error loading post.</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {post.author || 'Unknown Author'}
      </Typography>
      <Typography variant="body1">
        {post.body}
      </Typography>
    </Container>
  );
}
