import React from 'react';
import { BarChart3, Globe2, Layers, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  BarChart3: BarChart3,
  Globe2: Globe2,
  Layers: Layers,
  SlidersHorizontal: SlidersHorizontal,
};

/**
 * FeatureCard Component
 * Displays a single plan feature with top visual icon, heading, and description.
 */
export default function FeatureCard({ feature }) {
  const IconComponent = iconMap[feature.icon] || BarChart3;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Icon Badge */}
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#00a651] flex items-center justify-center mb-5 group-hover:bg-[#00a651] group-hover:text-white transition-colors duration-200">
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Feature Tag */}
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mb-2">
          {feature.badge}
        </span>

        {/* Heading */}
        <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#00a651] transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Learn More link */}
      <div className="pt-5 mt-4 border-t border-slate-100">
        <Link
          to="/features"
          className="text-xs font-bold text-[#00a651] hover:text-[#008443] inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
        >
          <span>Learn more</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
