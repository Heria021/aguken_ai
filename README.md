# AgukenAI

A Next.js application for AgukenAI, an AI Agent helping with reception and support calls using GenAI-based phone call automation.

## Project Structure

The project follows a modular structure with individual folders for each feature:

```
app/
├── (onboarding)/           # Onboarding flow group
│   ├── layout.tsx          # Shared layout for onboarding pages
│   ├── page.tsx            # Root onboarding page
│   ├── welcome/            # Welcome page feature
│   │   ├── page.tsx        # Welcome page
│   │   └── welcome-container.tsx  # Container with all welcome components
│   └── business-type/      # Business type selection feature
│       ├── page.tsx        # Business type page
│       └── business-type-container.tsx  # Container with all business type components
├── (dashboard)/            # Dashboard flow group
│   ├── layout.tsx          # Shared layout for dashboard pages
│   └── dashboard/          # Dashboard feature
│       ├── page.tsx        # Dashboard page
│       └── dashboard-container.tsx  # Container with all dashboard components
└── page.tsx                # Root page (redirects to onboarding)
```

## Architecture

The application follows a component-based architecture with a clear separation of concerns:

- **Container Components**: Each feature has a single container component that includes:
  - UI Components: Responsible for rendering the UI
  - Business Logic: Handles state management and user interactions
  - Data: Contains any static data needed by the feature
  - Types: Defines TypeScript interfaces used by the feature

## Technologies Used

- Next.js 15 with App Router
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zod for form validation
- React Hook Form for form handling

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
