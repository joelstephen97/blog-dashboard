import { NextApiRequest, NextApiResponse } from 'next'
import { getPosts, addPost, BlogPost } from '../../../data/posts'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET': {
      const page = parseInt(query.page as string) || 1;
      const limit = parseInt(query.limit as string) || 10;
      const data = getPosts(page, limit);
      return res.status(200).json(data);
    }
    case 'POST': {
      const { title, author, body } = req.body;
      if (!title || !author || !body) {
        return res.status(400).json({ error: 'Missing fields' });
      }
      const newPost: BlogPost = addPost({ title, author, body });
      return res.status(201).json(newPost);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}