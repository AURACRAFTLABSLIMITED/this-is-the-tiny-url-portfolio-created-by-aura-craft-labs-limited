import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqList } from '../data/faqs';

/**
 * FAQAccordion Component
 * Recreates the FAQ accordion section with smooth click-to-expand behavior.
 */
export default function FAQAccordion() {
  // Store currently open item ID (defaults to first item open)
  const [openId, setOpenId] = useState('faq-1');

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-2 block">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 mt-3 max-w-xl mx-auto">
            Find answers to common questions about URL shortening, branded domains, link analytics, and plan features.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqList.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 text-base sm:text-lg font-bold text-slate-900 hover:text-[#00a651] transition-colors cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{item.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-emerald-50 text-[#00a651] rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3 pr-8 text-sm sm:text-base text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <h4 className="text-base font-bold text-slate-900 mb-1">
            Still have questions about our plans or custom solutions?
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            Our team is here to assist with enterprise setups, bulk migrations, and branded links.
          </p>
          <a
            href="https://auracraftlabs.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#00a651] hover:bg-[#008f45] rounded-lg transition-colors shadow-xs"
          >
            Contact TinyURL Support
          </a>
        </div>

      </div>
    </section>
  );
}
