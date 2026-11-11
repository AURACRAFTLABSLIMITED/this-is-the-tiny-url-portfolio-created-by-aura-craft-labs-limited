/**
 * Central Site Configuration
 * 
 * All brand names, company information, URLs, navigation items,
 * and copyright statements are managed here.
 * Easy to customize for Aura Craft Labs Limited portfolio presentation.
 */

export const siteConfig = {
  brand: {
    name: 'TinyURL',
    wordmark: 'TINYURL',
    tagline: 'URL Shortener, Branded Short Links & Analytics',
    establishedYear: 2002,
    domain: 'tinyurl.com',
  },
  company: {
    name: 'Aura Craft Labs Limited',
    websiteUrl: 'https://auracraftlabs.com',
    email: 'contact@auracraftlabs.com',
    supportEmail: 'support@tinyurl.com',
  },
  copyright: {
    year: 2026,
    text: '© 2026 TINYURL Portfolio Recreation. All Rights Reserved. Website Designed & Developed by Aura Craft Labs Limited.',
  },
  domains: [
    { label: 'tinyurl.com', value: 'tinyurl.com', isDefault: true },
    { label: 'tiny.one', value: 'tiny.one', isDefault: false },
    { label: 'rotf.lol', value: 'rotf.lol', isDefault: false },
  ],
  socialLinks: {
    twitter: 'https://twitter.com/tinyurl',
    linkedin: 'https://linkedin.com/company/tinyurl',
    facebook: 'https://facebook.com/tinyurl',
    instagram: 'https://instagram.com/tinyurl',
    github: 'https://github.com/auracraftlabs',
  },
};
