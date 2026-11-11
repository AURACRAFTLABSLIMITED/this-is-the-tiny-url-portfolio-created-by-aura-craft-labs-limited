import React from 'react';
import { plansIncludeFeatures } from '../data/features';
import FeatureCard from './FeatureCard';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

/**
 * FeatureGrid Component
 * Recreates the 4-column "TinyURL Plans Include" section.
 */
export default function FeatureGrid() {
  return (
    <section className="w-full py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            TinyURL Plans Include:
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
            Everything your team needs to shorten, brand, analyze, and scale links across every marketing and communication channel.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {plansIncludeFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <Button
            to="/plans"
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
          >
            Explore All Features & Pricing
          </Button>
        </div>

      </div>
    </section>
  );
}
