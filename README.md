# Project Blog Dashboard README overview

## Install all requirements 

```bash
npm install
```

## Launch local dev server

```bash
npm run dev
```

## Open localhost to check preview

Open [http://localhost:3000](http://localhost:3000) 


## Design Decisions and Challenges

1. Initially, i had gone with jsonplaceholder, but i noticed for pagination/ infinite scroll, i had to mock my own backend. 
2. I decided with the go with a 3 pages in a minimalist fashion. Page 1 consists of all blog posts paginated. Page 2 is adding a new post. Page 3 is a dynamic page for each post.
3. I did a few tweaks to make the UI more pleasant to look at and use, and made it responsive so mobile use will be possible as well. 
4. The code is structured keeping in mind code seperation and seperation of concerns. 
5. Mocked API is under the data/ folder with api implementations of the mocked output in pages/api/ 
5. store/ consists of the global object as well as the api calls
6. components/ consists of the Layout as well as the Posts Card and all tweaks for UI can be done here

