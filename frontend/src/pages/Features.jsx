import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { 
  Link as LinkIcon, 
  Globe, 
  BarChart2, 
  QrCode, 
  Layers, 
  Sliders, 
  ArrowRight, 
  Check, 
  Sparkles,
  MousePointer,
  Shield,
  Zap
} from 'lucide-react';
const analyticsDashboardImg = '/images/analytics_dashboard_1793766390217.webp';
const brandedDomainImg = '/images/branded_domain_1793766390998.webp';

/**
 * Features Page Component
 * Detailed showcase of URL shortening, custom domains, analytics, QR codes, bulk tools, and link management.
 */
export default function Features() {
  const [activeTab, setActiveTab] = useState('analytics');

  const detailedFeatures = [
    {
      id: 'shortener',
      title: 'Lightning-Fast URL Shortening',
      subtitle: 'Create memorable, brand-safe short links in milliseconds',
      description: 'Convert long, cumbersome web addresses into streamlined, click-friendly URLs. Customize your alias to communicate destination intent, boost social engagement, and eliminate ugly link clutter.',
      icon: LinkIcon,
      benefits: [
        'Instant HTTP 301/302 redirects with <20ms server latency',
        'Human-readable custom aliases (e.g. tinyurl.com/ProductDemo)',
        'Built-in phishing scanning and automated malware blocking',
        'Permanent link lifespan on all tiers',
      ],
      image: analyticsDashboardImg,
    },
    {
      id: 'domains',
      title: 'Custom Branded Domains',
      subtitle: 'Replace tinyurl.com with your official corporate identity',
      description: 'Unleash the full potential of your brand authority. Use your own branded domain to turn ordinary links into trustworthy assets that drive up to 34% higher click-through rates across SMS, email, and social media.',
      icon: Globe,
      benefits: [
        'Connect up to 3 domains on Pro & Bulk, or unlimited on Enterprise',
        'Free, automated SSL encryption provisioned instantly',
        'Custom 404 error destination fallback rules',
        'Preserve domain authority and shield customer data',
      ],
      image: brandedDomainImg,
    },
    {
      id: 'analytics',
      title: 'Real-Time Click Analytics & Insights',
      subtitle: 'Understand your audience and optimize campaign ROI',
      description: 'Go beyond raw click counts with deep audience intelligence. Monitor click velocity, world heatmaps, referring channels, operating systems, and device breakdowns in real-time.',
      icon: BarChart2,
      benefits: [
        'Real-time click tracking across 190+ countries',
        'Granular breakdown by device (Mobile, Desktop, Tablet)',
        'Channel attribution (Social media, Direct, Email, Ads)',
        'One-click CSV and Excel data export for reporting',
      ],
      image: analyticsDashboardImg,
    },
    {
      id: 'qr-codes',
      title: 'Dynamic High-Resolution QR Codes',
      subtitle: 'Bridge physical and digital marketing touchpoints',
      description: 'Generate customizable, high-resolution QR codes that pair seamlessly with your shortened URLs. Perfect for product packaging, billboards, restaurant menus, and trade show banners.',
      icon: QrCode,
      benefits: [
        'Scalable SVG and PNG formats for high-resolution print',
        'Dynamic destination updates without reprinting collateral',
        'Track QR scan metrics independently from standard clicks',
        'Instant download and one-click clipboard sharing',
      ],
      image: brandedDomainImg,
    },
    {
      id: 'bulk',
      title: 'High-Throughput Bulk Shortener',
      subtitle: 'Shorten thousands of links at once via CSV or REST API',
      description: 'Designed for marketing teams and developer pipelines handling thousands of localized SMS campaigns, affiliate links, and automated customer notifications.',
      icon: Layers,
      benefits: [
        'Upload CSV files with up to 50,000 URLs per batch',
        'High-speed REST API with 5,000 requests/minute capacity',
        'Automated duplicate detection and error reporting',
        'Webhooks for real-time link creation event notifications',
      ],
      image: analyticsDashboardImg,
    },
    {
      id: 'management',
      title: 'Centralized Link Management',
      subtitle: 'Organize, edit, and audit links with team collaboration',
      description: 'Maintain absolute command over your brand’s digital footprint. Edit destinations on published links, tag campaigns, set expiration dates, and control team member permissions.',
      icon: Sliders,
      benefits: [
        'Edit destination URLs anytime—even after print publication',
        'Organize links into campaign folders and searchable tags',
        'Set automated link expiration dates or click thresholds',
        'Role-based permissions and team access controls',
      ],
      image: brandedDomainImg,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Page Header */}
      <PageHeader
        badge="Platform Capabilities"
        title="Enterprise Link Management Features"
        description="Discover the full suite of link shortening, custom domain branding, real-time analytics, and bulk generation tools built into TinyURL."
      >
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/plans" variant="primary" size="lg">
            View Plans & Pricing
          </Button>
          <Button to="/signup" variant="outlineLight" size="lg">
            Start Free Trial
          </Button>
        </div>
      </PageHeader>

      {/* Feature Navigation Tabs */}
      <section className="bg-white border-b border-slate-200 sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {detailedFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <a
                  key={f.id}
                  href={`#${f.id}`}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 text-[#00a651]" />
                  <span>{f.title.split(' ')[0]} {f.title.split(' ')[1]}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alternating Feature Sections */}
      <section className="py-16 sm:py-24 space-y-24">
        {detailedFeatures.map((feature, index) => {
          const isEven = index % 2 === 0;
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              id={feature.id}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-36"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Text Content */}
                <div className={`lg:col-span-6 space-y-6 ${!isEven ? 'lg:order-last' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00a651] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] block mb-1">
                      {feature.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {feature.title}
                    </h2>
                  </div>

                  <p className="text-base text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-3 pt-2">
                    {feature.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-3 text-sm text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#00a651] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button to="/plans" variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                      Get Started with {feature.title.split(' ')[0]}
                    </Button>
                  </div>
                </div>

                {/* Feature Graphic / Mockup */}
                <div className="lg:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-[340px] sm:h-[400px] object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="p-4 bg-slate-900/90 backdrop-blur-xs text-white flex items-center justify-between">
                      <div className="text-xs font-medium text-slate-300">
                        TinyURL Enterprise Infrastructure
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        Production Ready
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA Box */}
      <section className="py-20 bg-[#07162b] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to experience the next evolution in link management?
          </h2>
          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            Join millions of businesses and creators who trust TinyURL for high-speed, branded, and analytical link routing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button to="/plans" variant="primary" size="lg">
              View All Plans
            </Button>
            <Button to="/signup" variant="outlineLight" size="lg">
              Create Free Account
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
