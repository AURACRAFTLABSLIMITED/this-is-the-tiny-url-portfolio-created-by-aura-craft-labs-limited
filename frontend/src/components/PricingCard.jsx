import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Button from './Button';

/**
 * PricingCard Component
 * Displays a pricing tier with interactive volume selectors, dynamic price,
 * features checklist, and green CTA button.
 */
export default function PricingCard({ plan, billingCycle, isFeatured = false }) {
  // Volume selection index for plans with multiple tiers (e.g. Pro, Bulk)
  const [selectedVolumeIndex, setSelectedVolumeIndex] = useState(0);

  const isEnterprise = plan.id === 'enterprise';
  const currentVolumeTier = plan.volumeTiers ? plan.volumeTiers[selectedVolumeIndex] : null;

  // Calculate displayed price
  let displayPrice = '';
  if (isEnterprise) {
    displayPrice = 'Custom';
  } else if (currentVolumeTier) {
    displayPrice = billingCycle === 'annual'
      ? `$${currentVolumeTier.annualPrice}`
      : `$${currentVolumeTier.monthlyPrice}`;
  }

  return (
    <div
      className={`rounded-2xl flex flex-col justify-between transition-all duration-200 relative ${
        isFeatured
          ? 'bg-white border-2 border-[#00a651] shadow-xl ring-4 ring-emerald-500/10'
          : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00a651] text-white text-xs font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
          {plan.badge}
        </div>
      )}

      {/* Card Header & Body */}
      <div className="p-6 sm:p-8">
        
        {/* Tier Name */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-extrabold text-slate-900">
            {plan.name}
          </h3>
          {!isFeatured && (
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {plan.badge}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 mb-6 min-h-[36px] leading-relaxed">
          {plan.description}
        </p>

        {/* Price Display */}
        <div className="mb-6 pb-6 border-b border-slate-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {displayPrice}
            </span>
            {!isEnterprise && (
              <span className="text-xs text-slate-500 font-medium">
                /month {billingCycle === 'annual' && 'billed annually'}
              </span>
            )}
          </div>
          {isEnterprise && (
            <div className="text-xs text-slate-500 mt-1">
              Custom terms for enterprise scale
            </div>
          )}
        </div>

        {/* Link-Volume Selector (If tiered plan) */}
        {plan.volumeTiers && (
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Monthly Link Volume:
            </label>
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-200">
              {plan.volumeTiers.map((tier, idx) => (
                <button
                  key={tier.volume}
                  type="button"
                  onClick={() => setSelectedVolumeIndex(idx)}
                  className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedVolumeIndex === idx
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tier.volume}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5 flex justify-between">
              <span>Selected capacity:</span>
              <span className="font-semibold text-slate-700">{currentVolumeTier?.volume} links / mo</span>
            </div>
          </div>
        )}

        {/* Features Checklist */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            What's included:
          </div>
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
              <div className="w-4 h-4 rounded-full bg-emerald-50 text-[#00a651] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Card CTA Footer */}
      <div className="p-6 sm:p-8 pt-0">
        <Button
          to={isEnterprise ? '/plans#contact-sales' : '/signup'}
          variant={isFeatured ? 'primary' : 'outlineDark'}
          size="lg"
          className="w-full justify-center shadow-xs text-sm font-bold"
          icon={ArrowRight}
          iconPosition="right"
        >
          {plan.ctaText}
        </Button>
      </div>

    </div>
  );
}
