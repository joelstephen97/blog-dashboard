import { useState, FormEvent } from 'react'
import { Container, TextField, Button, Typography, Box } from '@mui/material'
import { useAddPostMutation } from '../store/apiSlice'
import { useRouter } from 'next/router'

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [addPost, { isLoading, error }] = useAddPostMutation();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addPost({ title, author, body }).unwrap();
      router.push('/');
    } catch (err) {
      console.error('Failed to add post: ', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography 
        variant="h4" 
        textAlign="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', letterSpacing: 1, color: 'primary.main' }}
      >
        ADD NEW BLOG POST
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        {error && <Typography color="error">Error adding post</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={isLoading} sx={{ mt: 2 }}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </Box>
    </Container>
  );
}
