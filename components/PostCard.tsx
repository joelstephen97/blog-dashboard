import { Card, CardContent, Typography, CardActions, Button, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { BlogPost } from '../store/apiSlice';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderRadius: 3, 
        boxShadow: 2, 
        transition: 'transform 0.3s ease-in-out',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 },
        borderColor: 'grey.300'
      }}
    >
      <CardContent>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          gutterBottom 
          sx={{ fontWeight: 'bold', color: 'primary.dark' }}
        >
          {post.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {post.author || 'Unknown Author'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body.substring(0, 150)}...
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Link href={`/posts/${post.id}`} passHref>
          <Button 
            variant="contained" 
            color="secondary" 
            size="small"
            sx={{
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: 2
            }}
          >
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
