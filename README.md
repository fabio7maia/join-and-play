This is a source code of Join and Play website.

# Features

-   [x] Nextjs 13 (https://nextjs.org)
-   [x] Prisma (https://www.prisma.io)
-   [x] tRPC (https://trpc.io)
-   [x] NextAuth.js (https://next-auth.js.org)
-   [x] Chakra UI (https://chakra-ui.com/)
-   [x] husky (https://github.com/typicode/husky)
-   [x] much more ...

# Folder structure

All source code of full stack app is inside src folder, except database model that's is in prisma/schema.prisma

-   app: contains all pages, layouts, etc of new folder structure of nextjs pages
-   components: contains all components, client and server to reuse in APP, identified in filename that's specific environment
-   hooks: contains hooks to reuse in APP
-   i18n: mock folder for i18n; the objective is store in DB and cache for small time in redis to improve time responses
-   lib: contains all files of third-party libs used in APP
-   pages: contain api and all pages in old structure of nextjs
-   server: contains all server API operations to get data or doing changes in DB
-   styles: all styles used in APP based on Tailwind css
-   utils: contains all utilities to use in APP

# Principal utilities tasks

## Nextjs

### Start up a local development environment

-   npm run dev

## Database

### Create initial remote database

-   npx prisma migrate dev

### Based on source code in prisma/schema.prisma, running prisma to propagate changes to remote database

-   npx prisma migrate dev --name <filename-migration>

## Git

### Commit

-   git commit -m "feat: added a new feature"
-   git commit -m "fix: fixed bug x"
