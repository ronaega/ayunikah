# Ayunikah

Ayunikah is a premium AI-powered marriage preparation dashboard built with Next.js, React, Tailwind CSS, Framer Motion, and Recharts.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Keep the defaults:
   - Framework Preset: `Next.js`
   - Install Command: `npm install`
   - Build Command: `npm run build`
4. Add environment variables from `.env.example` if you connect Supabase or a live AI provider.
5. Deploy.

## Supabase Setup

Run `supabase/schema.sql` in the Supabase SQL Editor. Then add these keys to Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The current application ships with local demo persistence so the full product experience works before Supabase is connected.

## Production Check

```bash
npm run build
```

The build has been verified locally for Vercel.
