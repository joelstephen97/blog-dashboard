import { NextApiRequest, NextApiResponse } from 'next'
import { getPost } from '../../../data/posts'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const id = parseInt(query.id as string);

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  const post = getPost(id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  return res.status(200).json(post);
}
