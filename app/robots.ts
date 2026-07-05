import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pdf-metadata-editor-theta.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers including AI bots for citation eligibility
        userAgent: [
          '*',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Bingbot',
          'OAI-SearchBot',
        ],
        allow: '/',
      },
      {
        // Block training-only crawler
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
