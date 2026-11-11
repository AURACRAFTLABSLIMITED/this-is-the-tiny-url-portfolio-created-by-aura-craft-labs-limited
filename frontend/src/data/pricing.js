/**
 * Pricing and Plans Data
 * Exact reproduction of TinyURL plans, volume selectors, and comparison matrix.
 */

export const pricingPlans = {
  pro: {
    id: 'pro',
    name: 'Pro',
    badge: 'Most Popular',
    description: 'Perfect for professionals, creators, and growing businesses needing custom links and analytics.',
    // Volume choices and corresponding monthly / annual prices (annual is per month when billed annually)
    volumeTiers: [
      { volume: '125', monthlyPrice: 12, annualPrice: 9 },
      { volume: '250', monthlyPrice: 22, annualPrice: 18 },
      { volume: '500', monthlyPrice: 42, annualPrice: 34 },
      { volume: '1K', monthlyPrice: 79, annualPrice: 65 },
      { volume: '2K', monthlyPrice: 139, annualPrice: 119 },
    ],
    features: [
      'Unlimited tracked clicks',
      '3 branded domains included',
      'Detailed click & geo analytics',
      'Editable link destinations',
      'Custom URL aliases',
      'High-resolution QR code generator',
      'Tagging & campaign organization',
      'Standard email support',
    ],
    ctaText: 'Get Started with Pro',
  },
  bulk: {
    id: 'bulk',
    name: 'Bulk 50K',
    badge: 'High Volume',
    description: 'Tailored for large campaigns, SMS marketing, high-traffic agencies, and API integrations.',
    volumeTiers: [
      { volume: '50K', monthlyPrice: 79, annualPrice: 69 },
      { volume: '100K', monthlyPrice: 149, annualPrice: 129 },
      { volume: '250K', monthlyPrice: 299, annualPrice: 259 },
      { volume: '500K', monthlyPrice: 549, annualPrice: 479 },
      { volume: '1M', monthlyPrice: 999, annualPrice: 879 },
    ],
    features: [
      '50,000 tracked clicks / month',
      '3 branded domains included',
      'Fast CSV bulk link creation',
      'Full REST API access & webhooks',
      'Advanced traffic & device reports',
      'Dynamic QR code generation',
      'Team link management',
      'Priority email & chat support',
    ],
    ctaText: 'Get Started with Bulk',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Full Scale',
    description: 'Custom infrastructure, maximum security, and dedicated SLA for high-volume enterprise brands.',
    priceText: 'Custom',
    billingNote: 'Tailored billing & terms',
    features: [
      'Custom number of links',
      'Custom number of tracked clicks',
      'Custom branded domains',
      '99.9% SLA-backed uptime guarantees',
      'Custom compliance solutions (SOC2, GDPR, HIPAA)',
      'Dedicated Customer Success Manager',
      'Single Sign-On (SSO / SAML 2.0)',
      'Custom data retention & export pipelines',
      '24/7 Phone & premium priority support',
    ],
    ctaText: 'Talk to an Expert',
  },
};

// Feature Comparison Matrix
export const comparisonCategories = [
  {
    category: 'Link Creation & Customization',
    features: [
      {
        name: 'TinyURL short links',
        free: 'Unlimited',
        pro: '125 to 2,000 / mo',
        bulk: '50K to 1M / mo',
        enterprise: 'Unlimited custom',
      },
      {
        name: 'Custom aliases (tinyurl.com/custom)',
        free: true,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Editable destination URLs',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Link expiration dates',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Password protected links',
        free: false,
        pro: false,
        bulk: true,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Branded Domains',
    features: [
      {
        name: 'Branded domain support',
        free: '0',
        pro: '3 domains',
        bulk: '3 domains',
        enterprise: 'Custom unlimited',
      },
      {
        name: 'Automated free SSL certificates',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Custom 404 error redirect handling',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Root domain forwarding',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Analytics & Reporting',
    features: [
      {
        name: 'Tracked clicks',
        free: 'None',
        pro: 'Unlimited',
        bulk: '50,000+ / mo',
        enterprise: 'Custom unlimited',
      },
      {
        name: 'Real-time click statistics',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Geographic visitor location data',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Referring sites & social channels',
        free: false,
        pro: true,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Data export (CSV / Excel)',
        free: false,
        pro: 'Last 30 days',
        bulk: 'Full history',
        enterprise: 'Real-time API / S3 sync',
      },
    ],
  },
  {
    category: 'Bulk & Developer API',
    features: [
      {
        name: 'CSV bulk link generation',
        free: false,
        pro: false,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'REST API link creation',
        free: false,
        pro: false,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'Webhook notifications',
        free: false,
        pro: false,
        bulk: true,
        enterprise: true,
      },
      {
        name: 'API rate limits',
        free: 'Standard',
        pro: 'Standard',
        bulk: '5,000 req / min',
        enterprise: 'Dedicated pipeline',
      },
    ],
  },
  {
    category: 'Security, Support & SLA',
    features: [
      {
        name: 'Uptime guarantee',
        free: 'Best effort',
        pro: '99.5%',
        bulk: '99.9%',
        enterprise: '99.99% SLA backed',
      },
      {
        name: 'Support channels',
        free: 'Community forum',
        pro: 'Email support',
        bulk: 'Priority email & chat',
        enterprise: 'Dedicated CSM & 24/7 Phone',
      },
      {
        name: 'SSO & SAML 2.0 authentication',
        free: false,
        pro: false,
        bulk: false,
        enterprise: true,
      },
      {
        name: 'Custom compliance (SOC 2, GDPR)',
        free: false,
        pro: false,
        bulk: false,
        enterprise: true,
      },
    ],
  },
];
