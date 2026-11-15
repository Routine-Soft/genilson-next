# CEST Training — Backend (API)

REST API for the online training platform of **CEST Segurança do Trabalho**, a workplace safety training company. It stores courses, exams, answer keys and student history, and validates the access passwords that students use to take the exams. It serves the admin panel ([`GenilsonFrontReact`](../GenilsonFrontReact)) and the exam pages embedded in the company's WordPress website ([`GenilsonParteDoSiteWordpress`](../GenilsonParteDoSiteWordpress)).

![Next.js](https://img.shields.io/badge/next.js-API_routes-000000?logo=next.js)
![TypeScript](https://img.shields.io/badge/typescript-5-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/mongodb-mongoose-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-vercel-000000?logo=vercel)

## Demo

- **API (production):** https://genilson-next.vercel.app/api
- **Admin panel:** https://app.cestsegtrabalho.com.br
- **Company website:** https://cestsegtrabalho.com.br

## Features

- **Users:** admin login with JWT.
- **Courses:** create, search, edit and delete courses, each with a public URL.
- **Exams and answer keys:** exam content per course (`prova/[nameUrl]`) and answer keys by title.
- **Student history:** course and exam results (name, document, score, date).
- **Access passwords:** passwords that release an exam to a student, validated by the API and managed by the developer panel.
- **Developer area:** separate login to manage the access passwords.
- **Training records:** workout plans and skinfold measurements (`treino`, `dobracutanea`).
- **Monitoring:** `server-info` (server resources) and `check-domain` routes.
- **CORS** limited to the company's domains (see `middleware.ts`).

## Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router, API routes) |
| Language | TypeScript (routes) and JavaScript (models) |
| Database | MongoDB Atlas + Mongoose |
| Auth | jsonwebtoken, argon2, bcrypt |
| Others | systeminformation, Tailwind CSS |
| Hosting | Vercel |

## Prerequisites

- **Node.js 26.13.1** (see `.nvmrc`; with nvm, run `nvm use`)
- **npm**
- Access to a **MongoDB Atlas** cluster

## Installation

```bash
git clone <repository-url> genilson-next
cd genilson-next
nvm use
npm install
```

Create a `.env` file (see the next section) and start the dev server:

```bash
npm run dev
```

The API runs at `http://localhost:3000/api`.

## Configuration (environment variables)

Never commit the `.env` file. Use placeholder values only in documentation.

| Variable | Required | Description |
|---|---|---|
| `MONGODB_USERNAME` / `MONGODB_PASSWORD` | Yes | MongoDB Atlas credentials |
| `JWT_SECRET` | Yes | Secret used to sign the tokens |

Allowed origins (CORS) are listed in `middleware.ts`. Add new domains there.

## Usage

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js dev server |
| `npm run build` | Builds for production |
| `npm start` | Serves the production build |
| `npm run lint` | Runs ESLint |

### Main routes

| Area | Routes |
|---|---|
| Users | `/api/user` |
| Courses | `/api/curso/criar`, `/api/curso/buscar`, `/api/curso/[id]`, `/api/curso/url` |
| Exams | `/api/prova/[nameUrl]` |
| Answer keys | `/api/gabarito/criar`, `/api/gabarito/buscar`, `/api/gabarito/[id]`, `/api/gabarito/titulo` |
| Course history | `/api/historicocurso/criar`, `/api/historicocurso/get` |
| Exam history | `/api/historicoprova/criar`, `/api/historicoprova/get` |
| Access passwords | `/api/senha-acesso/validar` |
| Developer | `/api/desenvolvedor/login`, `/api/desenvolvedor/senhas` |
| Training | `/api/treino/criar`, `/api/treino/buscar`, `/api/treino/[id]` |
| Monitoring | `/api/server-info`, `/api/check-domain` |

## Folder structure

```
genilson-next/
├── middleware.ts         # CORS (allowed origins)
├── app/
│   ├── api/              # One folder per resource, with route.ts files
│   ├── middlewares/      # authenticateToken, authenticateDesenvolvedor
│   ├── layout.tsx
│   └── page.tsx
├── models/               # Mongoose models
├── database/             # MongoDB connection
└── public/
```

## Deployment

- Hosted on **Vercel**. Every push to `main` publishes automatically.
- Set `MONGODB_USERNAME`, `MONGODB_PASSWORD` and `JWT_SECRET` in the Vercel project settings.

## Contributing

1. Create a branch from `main`: `feature/<name>` (or `fix/<name>`).
2. One folder per resource in `app/api/`, protected routes using the middlewares in `app/middlewares/`.
3. When a new website or panel domain calls the API, add it to `middleware.ts`.
4. Write commit messages in Portuguese and open a pull request to `main`.

## License and author

**Private and proprietary.** All rights reserved. Developed for CEST Segurança do Trabalho.

Developed by **Stanley Andrade**.
