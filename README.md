# blog-dashboard

A small blog dashboard built with Next.js (pages router), Redux Toolkit Query and MUI: a paginated list of posts, a detail page per post, and a form to add a new one. The API is a pair of Next.js API routes backed by an in-memory array.

![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![License](https://img.shields.io/badge/license-MIT-green)

Live demo: https://blog-dashboard-phi-nine.vercel.app

## Why

I wrote this in April 2025 as a take-home style exercise. The brief was a three-page blog dashboard with pagination. I started on jsonplaceholder, but it does not paginate or accept new posts in a way the UI could reflect, so I replaced it with my own API routes and a mock data module. What is left is a compact, honest example of RTK Query wired to Next.js API routes, with cache tags so that adding a post refreshes the list without a manual refetch.

Realistic use today: a starting point when you need a Next.js pages-router app with RTK Query, a mock backend, and MUI in dark mode, and you want to see the whole loop (list, detail, create, cache invalidation) in under 400 lines.

## Quickstart

```bash
git clone https://github.com/joelstephen97/blog-dashboard.git
cd blog-dashboard
npm ci
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## Usage

Pages:

| Route | What it does |
|---|---|
| `/` | Paginated list of posts, newest first, 6 per page, with Previous/Next |
| `/add-post` | Form (title, author, body) that POSTs a new post and returns to the list |
| `/posts/[id]` | Full view of a single post |

API routes (same ones the UI uses):

```bash
curl "http://localhost:3000/api/posts?page=1&limit=2"
# {"posts":[{"id":6,...},{"id":5,...}],"total":6,"page":1,"limit":2}

curl -X POST -H 'content-type: application/json' \
  -d '{"title":"Hello","author":"Joel","body":"First real post"}' \
  http://localhost:3000/api/posts
# {"title":"Hello","author":"Joel","body":"First real post","id":7}

curl http://localhost:3000/api/posts/7
```

## How it works

- `data/posts.ts` holds the posts array in memory and exposes `getPosts(page, limit)`, `getPost(id)` and `addPost(post)`.
- `pages/api/posts/index.ts` (GET list, POST create) and `pages/api/posts/[id].ts` (GET one) are thin Next.js API routes over that module.
- `store/apiSlice.ts` is an RTK Query `createApi` with three endpoints. The list query provides a `Posts/LIST` tag and the add mutation invalidates it, so the list refetches after a successful post.
- `pages/_app.tsx` wraps the app in the Redux Provider and a dark MUI theme.

## Project structure

```
components/   Layout (app bar + container) and PostCard
data/         in-memory posts store and helpers
pages/        index, add-post, posts/[id], and api/posts routes
store/        RTK Query api slice and the Redux store
styles/       global CSS
```

## Status and limitations

- Done and deployed; not actively developed.
- Posts live in process memory. Restarting the dev server, or a cold start on Vercel, resets them to the six seed posts. Adding a post on the live demo may not survive a reload. Swapping `data/posts.ts` for a real database is the obvious next step.
- No auth, no edit or delete, no validation beyond "all three fields required".
- Next.js 15.3, React 19, MUI 7, Redux Toolkit 2.6.

## License

MIT, see [LICENSE](LICENSE).
