// data/posts.ts
export interface BlogPost {
    id: number;
    title: string;
    author: string;
    body: string;
  }
  
  let posts: BlogPost[] = [
    { id: 1, title: 'First Post', author: 'Admin', body: 'Welcome to the blog!' },
    // Add more initial posts as needed
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
  