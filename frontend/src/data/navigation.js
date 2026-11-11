/**
 * Navigation Data
 * Defines main menu items, dropdowns, and footer navigation structure.
 */

export const navigationLinks = [
  {
    name: 'Plans',
    href: '/plans',
  },
  {
    name: 'Features',
    href: '/features',
    dropdown: [
      {
        title: 'URL Shortener',
        description: 'Create memorable, reliable short links instantly',
        href: '/features#shortener',
        icon: 'Link',
      },
      {
        title: 'Branded Domains',
        description: 'Use your own domain to boost trust and CTR by 34%',
        href: '/domains',
        icon: 'Globe',
      },
      {
        title: 'Link Analytics',
        description: 'Track clicks, geographic locations, and referrers in real time',
        href: '/features#analytics',
        icon: 'BarChart2',
      },
      {
        title: 'QR Code Generator',
        description: 'Generate dynamic, high-resolution QR codes for physical media',
        href: '/features#qr-codes',
        icon: 'QrCode',
      },
      {
        title: 'Bulk Short URLs',
        description: 'Shorten thousands of links at once via CSV or fast API',
        href: '/features#bulk',
        icon: 'Layers',
      },
      {
        title: 'Link Management',
        description: 'Edit destinations, organize campaigns, and tag links',
        href: '/features#management',
        icon: 'Sliders',
      },
    ],
  },
  {
    name: 'Domains',
    href: '/domains',
    dropdown: [
      {
        title: 'Custom Branded Domains',
        description: 'Connect your business domain for authoritative links',
        href: '/domains',
        icon: 'Globe',
      },
      {
        title: 'Domain Setup Guide',
        description: 'Quick 3-step DNS CNAME and auto-SSL setup instructions',
        href: '/domains#setup-guide',
        icon: 'CheckCircle',
      },
      {
        title: 'Domain ROI Calculator',
        description: 'Discover how branded domains increase link click rates',
        href: '/domains#benefits',
        icon: 'TrendingUp',
      },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    dropdown: [
      {
        title: 'All Resources & Guides',
        description: 'Educational articles, best practices, and link strategies',
        href: '/resources',
        icon: 'BookOpen',
      },
      {
        title: 'URL Shortening Best Practices',
        description: 'How to maximize click-through rates across channels',
        href: '/resources/url-shortener-best-practices',
        icon: 'FileText',
      },
      {
        title: 'Branded Links Guide',
        description: 'Building audience trust with custom branded domains',
        href: '/resources/branded-links-complete-guide',
        icon: 'Compass',
      },
    ],
  },
];

export const footerSections = [
  {
    title: 'Products',
    links: [
      { name: 'URL Shortener', href: '/#shortener' },
      { name: 'Branded Domains', href: '/domains' },
      { name: 'Link Management', href: '/features#management' },
      { name: 'Detailed Analytics', href: '/features#analytics' },
      { name: 'QR Code Generator', href: '/#qr-generator' },
      { name: 'Bulk Short URLs', href: '/features#bulk' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Enterprise Link Platform', href: '/plans' },
      { name: 'Digital Marketing & Social', href: '/resources' },
      { name: 'Small Business Growth', href: '/plans' },
      { name: 'Developers & API Access', href: '/features' },
      { name: 'Customer Engagement', href: '/features' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Articles & Guides', href: '/resources' },
      { name: 'Branded Links Guide', href: '/resources/branded-links-complete-guide' },
      { name: 'Link Analytics Guide', href: '/resources/link-analytics-essential-metrics' },
      { name: 'Bulk Shortening Tutorial', href: '/resources/bulk-url-shortening-campaigns' },
      { name: 'System Status', href: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About TinyURL', href: '/features' },
      { name: 'Pricing & Plans', href: '/plans' },
      { name: 'Portfolio Showcase', href: 'https://auracraftlabs.com' },
      { name: 'Contact Aura Craft Labs', href: 'https://auracraftlabs.com' },
      { name: 'Privacy & Terms', href: '/plans' },
    ],
  },
];
