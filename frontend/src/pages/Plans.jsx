import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import PricingToggle from '../components/PricingToggle';
import PricingCard from '../components/PricingCard';
import FeatureComparison from '../components/FeatureComparison';
import FAQAccordion from '../components/FAQAccordion';
import { pricingPlans } from '../data/pricing';

/**
 * Plans & Pricing Page Component
 * Dedicated page for subscription tiers, volume choices, and feature comparison.
 */
export default function Plans() {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Page Header */}
      <PageHeader
        badge="Transparent Pricing"
        title="Find a plan that meets your needs"
        description="Whether you are shortening individual links or orchestrating enterprise-wide campaigns, TinyURL has a plan tailored for your scale."
      >
        {/* Monthly / Annual Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <PricingToggle
            billingCycle={billingCycle}
            onChange={setBillingCycle}
          />
        </div>
      </PageHeader>

      {/* Pricing Cards Section */}
      <section className="py-16 sm:py-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Pro Card */}
          <PricingCard
            plan={pricingPlans.pro}
            billingCycle={billingCycle}
            isFeatured={true}
          />

          {/* Bulk 50K Card */}
          <PricingCard
            plan={pricingPlans.bulk}
            billingCycle={billingCycle}
            isFeatured={false}
          />

          {/* Enterprise Card */}
          <PricingCard
            plan={pricingPlans.enterprise}
            billingCycle={billingCycle}
            isFeatured={false}
          />

        </div>
      </section>

      {/* Comprehensive Feature Comparison Matrix */}
      <FeatureComparison billingCycle={billingCycle} />

      {/* Enterprise Contact & Custom Needs Callout */}
      <section id="contact-sales" className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Enterprise Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Need custom link volumes, SLA guarantees, or dedicated SSO?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Our enterprise architects partner with Fortune 500 brands to deliver ultra-low-latency redirect networks, dedicated IP pools, and compliance-certified deployments.
          </p>
          <div className="pt-4 flex justify-center">
            <a
              href="https://auracraftlabs.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#00a651] hover:bg-[#008f45] text-white text-sm font-bold shadow-md transition-colors"
            >
              Contact Aura Craft Labs Team
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion />

    </div>
  );
}
