export interface BlogPost {
    id: number;
    title: string;
    author: string;
    body: string;
  }
  
  let posts: BlogPost[] = [
    { id: 1, title: 'First Post 1', author: 'Admin 1', body: 'Welcome to the blog!' },
    { id: 2, title: 'First Post 2', author: 'Admin 2', body: 'Welcome to the blog!' },
    { id: 3, title: 'First Post 3', author: 'Admin 3', body: 'Welcome to the blog!' },
    { id: 4, title: 'First Post 4', author: 'Admin 4', body: 'Welcome to the blog!' },
    { id: 5, title: 'First Post 5', author: 'Admin 5', body: 'Welcome to the blog!' },
    { id: 6, title: 'First Post 6', author: 'Admin 6', body: 'Welcome to the blog!' },
  ];
  
  export const getPosts = (page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const paginatedPosts = posts.slice(startIndex, startIndex + limit);
    return { posts: paginatedPosts, total: posts.length, page, limit };
  };
  
  export const getPost = (id: number) => posts.find((post) => post.id === id);
  
  export const addPost = (post: Omit<BlogPost, 'id'>): BlogPost => {
    const newPost = { ...post, id: posts.length + 1 };
    posts.push(newPost);
    return newPost;
  };
  