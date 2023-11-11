# DEV x MISSION 🚀

Welcome to DEV x MISSION, an exciting Next.js platform where to share project ideas, seek partners, and receive peer feedback 🌟

# [Demo](https://dev-x-mission.vercel.app/)

## Features

🔒 **Authentication with NextAuth.js**: Secure your application with ease using NextAuth.js, supporting various authentication providers.

🚀 **Next.js 14**: Utilize the power of Next.js for server-rendered React applications, making your app fast and SEO-friendly.

💎 **Prisma**: Connect to your database seamlessly with Prisma, enabling you to work with your data using a type-safe query builder.

🐘 **Neon db**: Serverless Postgres.

🎨 **Tailwind CSS**: Craft beautiful and responsive UIs effortlessly with the help of Tailwind CSS.

💻 **TypeScript:**
Enhance your development experience with TypeScript.

🧹 **ESLint, Prettier:**
Maintain code quality and style consistency in your project.

🐶 **Husky:**
Leverage Husky for Git hooks and enforce code quality checks.

🃏 **Jest and RTL for Testing:**
Ensure the reliability of your application with Jest and React Testing Library.

🚀 **GitHub Actions:**
Automate your workflow with GitHub Actions.

## Getting Started

Follow these steps to get DEV x MISSION up and running on your local machine:

1. Clone the repository:

```bash
git clone https://github.com/ZinoChan/DEV-x-MISSION
```

2. install dependencies

```bash
cd dev-x-mission
npm install
```

## Step 4: 🛠 Set up the Database

- There are two ways to set up the database:

  1.  ### Go to a PostgreSQL database like Neon and create two databases - one as the main and the other as the shadow.
  2.  ### Set Up Local Database Using Docker Compose

      a. **Install Docker:**
      Ensure that Docker is installed on your machine.

      b. **Run Docker Compose:**
      Execute the following command in the root directory of your project:

      ```bash
      docker-compose up
      ```

      c. **Database URL:**
      Your DATABASE_URL is now:

      ```bash
      postgres://postgres:postgres@localhost:5433
      ```

      _Note_: If you are using a local database, you don't need a shadow_db URL.

      d.**Customize Database Setup**(optional):

      - Adjust database settings as needed in the `docker-compose.yml` file.

## Step 3: 🌐 Set the Environment Variable

Rename `.env.example` to `.env` and fill in the necessary environment variables.

## Step 5: 🚀 Run Prisma Migration to Set Up Database

```bash
npx prisma migrate dev
```

## Step 6: 🏃‍♂️ Run the Application

```bash
npm run dev
```

Happy coding! 🚀✨
