
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2dfae320-8323-49c0-b233-01d2cdfba036

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2dfae320-8323-49c0-b233-01d2cdfba036) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Environment variables

Create a `.env` file in the project root (or use your hosting provider's settings) based on the provided `.env.example` file.

Copy `.env.example` to `.env` and fill in your actual values:

```sh
cp .env.example .env
```

Required variables:
- `VITE_SUPABASE_URL` – URL of your Supabase instance used by the frontend
- `VITE_SUPABASE_ANON_KEY` – public anon key for the frontend client
- `SUPABASE_URL` – same Supabase URL for edge functions
- `SUPABASE_ANON_KEY` – key used by edge functions
- `OPENAI_API_KEY` – your OpenAI API key for content generation
- `OPENAI_MODEL` – OpenAI model to use (defaults to gpt-4o-mini if not set)

Optional variables:
- `UNSPLASH_ACCESS_KEY` – for fetching images from Unsplash

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2dfae320-8323-49c0-b233-01d2cdfba036) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
