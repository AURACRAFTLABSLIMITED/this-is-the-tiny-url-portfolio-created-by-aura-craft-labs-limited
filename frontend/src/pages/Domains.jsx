import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  Server, 
  Lock, 
  Smartphone,
  MessageSquare
} from 'lucide-react';
const brandedDomainImg = '/images/branded_domain_1793766390998.webp';

/**
 * Domains Page Component
 * Showcases custom branded domains, benefits, interactive link previewer, and setup guide.
 */
export default function Domains() {
  // Interactive custom link generator state
  const [customDomain, setCustomDomain] = useState('brand.co');
  const [customSlug, setCustomSlug] = useState('summer-sale');
  const [copied, setCopied] = useState(false);

  const fullCustomUrl = `https://${customDomain || 'yourbrand.link'}/${customSlug || 'link'}`;

  const benefits = [
    {
      title: 'Up to 34% Higher Click-Through Rates',
      description: 'Audiences are inherently cautious of generic or anonymous short links. When people recognize your brand in the link, engagement rises dramatically.',
      icon: TrendingUp,
      stat: '+34%',
      statLabel: 'Average CTR Boost',
    },
    {
      title: 'End-to-End Brand Protection',
      description: 'Owning your shortened domain ensures bad actors cannot impersonate your brand or redirect your customers to counterfeit landing pages.',
      icon: ShieldCheck,
      stat: '100%',
      statLabel: 'Reputation Control',
    },
    {
      title: 'Automated Free SSL Encryption',
      description: 'Every custom domain connected to TinyURL receives an automatically renewed HTTPS SSL certificate, ensuring seamless security on every browser.',
      icon: Lock,
      stat: 'A+',
      statLabel: 'SSL Security Rating',
    },
  ];

  const setupSteps = [
    {
      step: '01',
      title: 'Choose or Register Your Domain',
      description: 'Acquire a short, memorable version of your brand name (e.g., brand.co, amzn.to, nytimes.to) from any standard domain registrar.',
    },
    {
      step: '02',
      title: 'Add a Simple CNAME Record',
      description: 'In your DNS management dashboard, create a CNAME record pointing your domain or subdomain to tinyurl.com routing nodes.',
    },
    {
      step: '03',
      title: 'Instant SSL & Verification',
      description: 'TinyURL automatically validates your DNS record, provisions your SSL certificate, and activates your branded short link engine within minutes.',
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCustomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Page Header */}
      <PageHeader
        badge="Custom Branding"
        title="Elevate Your Brand with Custom Short Domains"
        description="Replace tinyurl.com with your official domain. Build consumer trust, maximize marketing ROI, and command respect on every link you share."
      >
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/plans" variant="primary" size="lg">
            Get Started with Branded Domains
          </Button>
          <a
            href="#setup-guide"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white/80 hover:border-white hover:bg-white/10 text-white font-semibold text-sm transition-colors"
          >
            How Setup Works
          </a>
        </div>
      </PageHeader>

      {/* Interactive Link Previewer Sandbox */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-1 block">
              Interactive Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              See How Your Branded Short Link Looks
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Type your desired branded domain and campaign alias below to see how it renders on customer devices.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            
            {/* Input Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Branded Domain
                </label>
                <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#00a651]">
                  <Globe className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value.toLowerCase().trim())}
                    placeholder="e.g. brand.link"
                    className="w-full text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Custom Campaign Slug
                </label>
                <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#00a651]">
                  <span className="text-slate-400 text-sm font-medium mr-1.5">/</span>
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                    placeholder="e.g. VIP-Launch"
                    className="w-full text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Result Display */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#00a651] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Your Custom Link</div>
                  <div className="text-lg font-extrabold text-[#00a651] truncate">
                    {fullCustomUrl}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#00a651] text-white hover:bg-[#008f45] text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Preview'}</span>
              </button>
            </div>

            {/* Mobile & SMS Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              
              {/* SMS Simulation Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Smartphone className="w-4 h-4 text-slate-500" />
                  <span>SMS & Mobile Notification Preview</span>
                </div>
                <div className="bg-slate-100 p-3.5 rounded-xl text-xs text-slate-800 leading-relaxed">
                  <p className="font-semibold text-slate-900 mb-1">Flash Announcement!</p>
                  <p>Your exclusive subscriber preview is now live. Tap to claim early access:</p>
                  <span className="text-[#00a651] font-bold underline block mt-1">
                    {fullCustomUrl}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Notice how branded links eliminate recipient suspicion and drive click confidence.
                </p>
              </div>

              {/* Social Card Simulation */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>Social Media & Community Preview</span>
                </div>
                <div className="bg-slate-100 p-3.5 rounded-xl text-xs text-slate-800 leading-relaxed">
                  <div className="font-bold text-slate-900 flex items-center justify-between mb-1">
                    <span>Aura Craft Official</span>
                    <span className="text-slate-400 font-normal">2m</span>
                  </div>
                  <p>Check out our brand new release notes and architectural breakdown:</p>
                  <span className="text-[#00a651] font-bold block mt-1">
                    {fullCustomUrl}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Clean URLs fit gracefully inside character restrictions without looking like spam.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3 Core Benefits of Branded Domains */}
      <section id="benefits" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-2 block">
              Why Branded Links Outperform
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Turn Every Link into a High-ROI Brand Asset
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00a651] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[#00a651]">{b.stat}</div>
                      <div className="text-[11px] font-semibold text-slate-400">{b.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3-Step Setup Guide */}
      <section id="setup-guide" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-2 block">
              Easy Integration
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Connect Your Custom Domain in 3 Simple Steps
            </h2>
            <p className="text-base text-slate-600 mt-3">
              No technical expertise required. Our automated DNS verification and SSL engine take care of the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {setupSteps.map((step) => (
              <div key={step.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative">
                <span className="text-3xl font-black text-slate-300">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white">DNS CNAME Record Target:</div>
              <code className="text-xs text-emerald-400 font-mono">cname.tinyurl.com</code>
            </div>
            <Button to="/plans" variant="primary" size="md">
              Upgrade to Connect Domain
            </Button>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#07162b] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Ready to claim your branded short domain?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            All TinyURL Pro, Bulk, and Enterprise plans come standard with branded domain connectivity and free automated SSL.
          </p>
          <div className="pt-2">
            <Button to="/plans" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              View Plans with Custom Domains
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
