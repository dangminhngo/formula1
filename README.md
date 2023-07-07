# FRONTEND CANDIDATE ASSIGNMENT - VRILLAR VIETNAM | BY DANG MINH NGO

### Table of Contents

- [Overview](#overview)
- [Technologies/Libraries](#technologies-libraries)
- [Implementation](#implementation)

## Overview

This app has been developed by [Dang Minh Ngo](https://dangminhngo.github.io). It follows the requirements from [Vrillar Vietnam's assignment](https://github.com/dangminhngo/formula1/assets/ASSIGNMENT.md).

- Crawling data from [formula1.com](https://formula1.com/en) race results.
- Allowing users to filter and search the informations about races, drivers and teams with tables and graphics.

## Technologies/Libraries

- [React.js](https://react.dev)/[TypeScript](https://typescriptlang.org) (for frontend development)
- [tRPC](https://trpc.io) (Typesafe APIs)
- [Prisma](https://www.prisma.io) + Sqlite (for ORM)
- [React Query](https://tanstack.com/query/latest) integration with tRPC (for asynchronous state management)
- [Chart.js](https://www.chartjs.org) (for graphics & charts)
- [Puppeteer](https://pptr.dev) (for crawling data)
- [Docker](https://www.docker.com) (for deployment)

## Implementations

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
```

- Step 2: Install dependencies with `pnpm`

```bash
pnpm i
```

- Step 3: Start the local development server, the app will be running at `http://localhost:3000`

```bash
pnpm run start
```

### Run production server with Docker

- Step 1: Clone this repository:

```bash
git clone https://github.com/dangminhngo/formula1.git

```

- Step 2: Build and run docker containers with Docker Compose. After build process, the app will be running at `http://localhost:3000`

```bash
cd formula1
docker-compose up
```
