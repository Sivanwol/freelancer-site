# Sivan Wolberg - Portfolio Website

A modern, bilingual (Hebrew/English) freelancer portfolio site built with Next.js 16.

## Features

- **Bilingual Support**: Hebrew (default, RTL) and English (LTR)
- **Dynamic Hero Section**: Interactive particle background effect
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, structured data, sitemap
- **Modern UI**: Dark theme with glass-morphism effects and smooth animations
- **Floating Social Bar**: Quick access to Upwork and LinkedIn profiles

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + tsParticles
- **Icons**: react-icons
- **i18n**: next-intl

## Sections

1. **Hero** - Animated intro with Upwork badges (100% Job Success, Top Rated Plus, Verified)
2. **About** - Brief introduction and experience highlights
3. **Services** - Full-Stack, AI Development, Backend APIs
4. **Skills** - Animated skill meters (Next.js, NestJS, Claude AI, Cursor, Python/LangChain, PHP)
5. **Testimonials** - Client reviews from Upwork
6. **Experience Timeline** - Work history with hover-reveal descriptions and skill badges
7. **Contact** - Email, Upwork, and LinkedIn links

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy environment template and update with your domain
cp .env.template .env.local

# Edit .env.local and set your site URL
# NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

Create a `.env.local` file (use `.env.template` as a reference) with:

- `NEXT_PUBLIC_SITE_URL` - Your site's full URL (e.g., `https://www.devco-solution.online`)

This variable is used for:
- SEO metadata (Open Graph, Twitter Cards)
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt

**Note**: `.env.local` is gitignored and should not be committed. Use `.env.template` as a reference for deployment platforms.

## Deployment

Optimized for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Contact

- **Email**: fastwings@gmail.com
- **Upwork**: https://upwork.com/freelancers/swolberg
- **LinkedIn**: https://www.linkedin.com/in/swolberg

---

© 2025 Sivan Wolberg. All Rights Reserved.
