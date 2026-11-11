import React from 'react';

/**
 * PricingToggle Component
 * Allows switching between Monthly and Annual billing with a savings indicator.
 */
export default function PricingToggle({ billingCycle, onChange }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => onChange('monthly')}
          className={`py-2 px-5 text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer ${
            billingCycle === 'monthly'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Monthly
        </button>

        <button
          type="button"
          onClick={() => onChange('annual')}
          className={`py-2 px-5 text-sm font-bold rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer ${
            billingCycle === 'annual'
              ? 'bg-[#00a651] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Annually</span>
          <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
            billingCycle === 'annual'
              ? 'bg-emerald-800 text-white'
              : 'bg-emerald-100 text-emerald-800'
          }`}>
            Save up to 20%
          </span>
        </button>
      </div>
    </div>
  );
}
