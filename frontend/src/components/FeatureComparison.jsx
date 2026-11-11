import React from 'react';
import { Check, Minus, HelpCircle } from 'lucide-react';
import { comparisonCategories } from '../data/pricing';

/**
 * FeatureComparison Component
 * Recreates the comprehensive Feature Breakdown comparison table across
 * Free, Pro, Bulk 50K, and Enterprise tiers.
 */
export default function FeatureComparison({ billingCycle }) {
  // Helper to render boolean checkmarks or text values
  const renderValue = (val) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#00a651] flex items-center justify-center mx-auto">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      ) : (
        <div className="w-5 h-5 flex items-center justify-center mx-auto text-slate-300">
          <Minus className="w-3.5 h-3.5" />
        </div>
      );
    }
    return <span className="font-medium text-slate-800 text-xs sm:text-sm">{val}</span>;
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-2 block">
            Plan Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare TinyURL Features & Capabilities
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Find the right balance of link volume, branded domains, analytics retention, and enterprise support.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              
              {/* Table Sticky Header */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-sm font-bold text-slate-900 w-2/5">
                    Plan Features
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-slate-700 w-[15%]">
                    <div>Free</div>
                    <div className="text-[11px] font-normal text-slate-500">$0 / month</div>
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-[#00a651] w-[15%] bg-emerald-50/50">
                    <div>Pro</div>
                    <div className="text-[11px] font-normal text-emerald-800">
                      {billingCycle === 'annual' ? '$9 / mo' : '$12 / mo'}
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-slate-900 w-[15%]">
                    <div>Bulk 50K</div>
                    <div className="text-[11px] font-normal text-slate-500">
                      {billingCycle === 'annual' ? '$69 / mo' : '$79 / mo'}
                    </div>
                  </th>
                  <th className="py-4 px-4 text-center text-sm font-bold text-slate-900 w-[15%]">
                    <div>Enterprise</div>
                    <div className="text-[11px] font-normal text-slate-500">Custom</div>
                  </th>
                </tr>
              </thead>

              {/* Table Body Categories & Rows */}
              <tbody className="divide-y divide-slate-100">
                {comparisonCategories.map((cat) => (
                  <React.Fragment key={cat.category}>
                    
                    {/* Category Title Row */}
                    <tr className="bg-slate-100/70">
                      <td
                        colSpan={5}
                        className="py-3 px-6 text-xs font-extrabold uppercase tracking-wider text-slate-700"
                      >
                        {cat.category}
                      </td>
                    </tr>

                    {/* Feature Rows */}
                    {cat.features.map((feat) => (
                      <tr key={feat.name} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-6 text-xs sm:text-sm font-medium text-slate-800">
                          {feat.name}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feat.free)}
                        </td>
                        <td className="py-3.5 px-4 text-center bg-emerald-50/30">
                          {renderValue(feat.pro)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feat.bulk)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {renderValue(feat.enterprise)}
                        </td>
                      </tr>
                    ))}

                  </React.Fragment>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
