import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import Link from 'next/link'
import { BlogPost } from '../store/apiSlice'

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {post.author || 'Unknown Author'}
        </Typography>
        <Typography variant="body2">
          {post.body.substring(0, 100)}...
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/posts/${post.id}`} passHref>
          <Button size="small">Read More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
