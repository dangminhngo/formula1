# FRONTEND CANDIDATE ASSIGNMENT - VRILLAR VIETNAM | BY DANG MINH NGO

### Table of Contents

- [Overview](#overview)
- [Technologies/Libraries](#technologieslibraries)
- [Implementation](#implementation)

## Overview

This app has been developed by [Dang Minh Ngo](https://dangminhngo.github.io). It follows the requirements from [Vrillar Vietnam's assignment](https://github.com/dangminhngo/formula1/assets/ASSIGNMENT.md).

- Crawling data from [formula1.com](https://formula1.com/en) race results.
- Allowing users to filter and search the informations about Formula One races, drivers and teams with data tables and graphics.
- The app is living at: [http://8.222.192.185:3000](http://8.222.192.185:3000)

## Technologies/Libraries

- [React.js](https://react.dev)/[TypeScript](https://typescriptlang.org) (for frontend development)
- [tRPC](https://trpc.io) (Typesafe APIs)
- [Prisma](https://www.prisma.io) + Sqlite (for ORM)
- [React Query](https://tanstack.com/query/latest) integration with tRPC (for asynchronous state management)
- [Chart.js](https://www.chartjs.org) (for graphics & charts)
- [Puppeteer](https://pptr.dev) (for crawling data)
- [Docker](https://www.docker.com) (for deployment)

## Implementation

### Prerequisites

Before you take the following steps, you need to install these stuff to run the app normally:

- [Node.js\*](https://nodejs.org/en) v18
- [pnpm\*](https://pnpm.io) v8.6.6
- [Docker](https://www.docker.com/) v24.0.2
- [Docker Compose](https://docs.docker.com/compose/) v3.8

### Run local development server

- Step 1: Clone this repository:

```bash
git clone https://github.com/dangminhngo/formula1.git
cd formula1
```

- Step 2: Install dependencies with `pnpm`

```bash
pnpm i
```

- Step 3: Set environment variables

```bash
echo 'DATABASE_URL=file:./database.db\nCLIENT_ORIGIN=http://localhost:3000' > ./server/.env.development.local
echo 'VITE_API_SERVER_URL=http://localhost:8000' > ./client/.env.development.local
```

- Step 4: Start the local development server, the app will be running at `http://localhost:3000`

```bash
pnpm run start
```

### Run production server with Docker on local machine

- Step 1: Clone this repository:

```bash
git clone https://github.com/dangminhngo/formula1.git
cd formula1
```

- Step 2: Set environment variables in .env files

```bash
echo 'DATABASE_URL=file:./database.db\nCLIENT_ORIGIN=http://localhost:3000' > ./server/.env
echo 'VITE_API_SERVER_URL=http://localhost:8000' > ./client/.env
```

- Step 2: Build and run docker containers with Docker Compose. After the build process, the app will be running at `http://localhost:3000`

```bash
docker-compose up -d
```

## Features

This app has very simple UI. But it will be more easier to use if we have the following tutorials.

- It allows users to filter race results, drivers or teams with the selects

<div align="center">
  <img src="https://github.com/dangminhngo/proxima.nvim/blob/main/docs/media/filter.png" />
</div>

- Beside that, users can directly specific the results by accessing with the routes. For example, to see all the races in 2023, type `<DOMAIN>/2023/races`.

- Users can search with the search form. The maximum number of search results is 10. Clicking an item on the search results popup will navigate to a grand prix results, or a driver/team standings by year.

<div align="center">
  <img src="https://github.com/dangminhngo/proxima.nvim/blob/main/docs/media/search.png" />
</div>

- Switching between the tabs to see other information or data that described in charts.

<div align="center">
  <img src="https://github.com/dangminhngo/proxima.nvim/blob/main/docs/media/tabs.png" />
</div>

- The charts allow users to interact by hovering or clicking.

<div align="center">
  <img src="https://github.com/dangminhngo/proxima.nvim/blob/main/docs/media/line-charts.png" />
</div>

<div align="center">
  <img src="https://github.com/dangminhngo/proxima.nvim/blob/main/docs/media/bar-charts.png" />
</div>
