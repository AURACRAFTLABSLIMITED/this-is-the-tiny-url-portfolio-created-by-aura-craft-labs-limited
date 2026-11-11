import React from 'react';
import { ArrowRight, MousePointerClick, Sparkles, TrendingUp, Zap, ShieldCheck, FolderTree } from 'lucide-react';
import Button from './Button';
const analyticsDashboardImg = '/images/analytics_dashboard_1793766390217.webp';

const benefitIcons = {
  clicks: MousePointerClick,
  'custom-links': Sparkles,
  'analytics-benefit': TrendingUp,
  'bulk-benefit': Zap,
  'branded-domains-benefit': ShieldCheck,
  'management-benefit': FolderTree,
};

/**
 * BenefitsSection Component
 * Recreates the "Your One-Stop Solution for Branding and Managing Links" section
 * with central dashboard illustration surrounded by the 6 primary benefits.
 */
export default function BenefitsSection() {
  const leftBenefits = [
    {
      id: 'clicks',
      title: 'Unlimited Tracked Clicks',
      description: 'Track every single link engagement with zero caps or overage charges across all your campaigns.',
      metric: '100% Tracked',
    },
    {
      id: 'custom-links',
      title: 'Fully Custom Links',
      description: 'Create memorable, brand-safe custom aliases that drive user confidence and verbal recall.',
      metric: 'Custom Slugs',
    },
    {
      id: 'analytics-benefit',
      title: 'Detailed Link Analytics',
      description: 'Gain rich audience intelligence with real-time geo heatmaps, referring sources, and device types.',
      metric: 'Real-Time Insights',
    },
  ];

  const rightBenefits = [
    {
      id: 'bulk-benefit',
      title: 'Bulk Short URLs',
      description: 'Generate, tag, and export thousands of shortened links in seconds using CSV or high-speed API.',
      metric: 'High Throughput',
    },
    {
      id: 'branded-domains-benefit',
      title: 'Branded Domains',
      description: 'Deploy your company domain to increase click-through rates by up to 34% and build brand equity.',
      metric: '+34% CTR',
    },
    {
      id: 'management-benefit',
      title: 'Link Management',
      description: 'Update target destinations on the fly, organize campaigns with tags, and set link expirations.',
      metric: 'Dynamic Editing',
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & CTA */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-2 block">
            Complete Link Control
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Your One-Stop Solution for Branding and Managing Links
          </h2>
          <p className="text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            TinyURL empowers creators, digital marketers, and enterprise brands to deliver concise, trustworthy, and measurable web links at global scale.
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              to="/plans"
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="shadow-md shadow-emerald-500/20"
            >
              View Plans
            </Button>
          </div>
        </div>

        {/* 3-Column Layout: Left Benefits | Central Illustration | Right Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3 Benefits */}
          <div className="lg:col-span-4 space-y-6">
            {leftBenefits.map((item) => {
              const Icon = benefitIcons[item.id] || Sparkles;
              return (
                <div
                  key={item.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a651] flex items-center justify-center group-hover:bg-[#00a651] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#00a651] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Center Column: High-Fidelity Central SaaS Interface Visual */}
          <div className="lg:col-span-4 flex justify-center order-first lg:order-none">
            <div className="relative w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <img
                src={analyticsDashboardImg}
                alt="TinyURL Analytics and Link Management Dashboard"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="p-4 bg-slate-900 text-white text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Interactive Intelligence
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-0.5">
                  Real-Time Link Clicks & Geographic Insights
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Benefits */}
          <div className="lg:col-span-4 space-y-6">
            {rightBenefits.map((item) => {
              const Icon = benefitIcons[item.id] || Zap;
              return (
                <div
                  key={item.id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00a651] flex items-center justify-center group-hover:bg-[#00a651] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.metric}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#00a651] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
