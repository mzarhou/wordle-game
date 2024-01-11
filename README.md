# Wordle Game
A web-based Wordle game implemented in React
## Tech Stack
- [Next.js](https://nextjs.org)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Features
- Authentication
- profile management
- Leaderboard

## How to Run the App
1. Copy the .env.example file to create a new .env file:
```
cp .env.example .env
```

2. Create an app on [Clerk](https://clerk.com) and obtain the required keys. Copy and paste these keys into the .env file.
3. Ensure the necessary environment variables are set in the .env file.
4. Build and run the app using Docker Compose:
```bash
docker compose up --build -d
```
5. The app will be accessible at http://localhost:3000
