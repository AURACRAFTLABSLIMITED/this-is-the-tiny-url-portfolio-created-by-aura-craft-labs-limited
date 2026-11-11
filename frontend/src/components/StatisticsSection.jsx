import React from 'react';
import { statisticsData } from '../data/features';
const transformationTeamImg = '/images/transformation_team_1793766389776.webp';

/**
 * StatisticsSection Component
 * Recreates the dark navy "Transforming the Digital Landscape Since '02" section
 * with 3 core statistics and the business/team photograph on the right.
 */
export default function StatisticsSection() {
  return (
    <section className="w-full py-20 bg-[#07162b] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Heading, Paragraph, and 3 Large Statistics */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-2 block">
                Proven Reliability
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Transforming the Digital Landscape Since '02
              </h2>
              <p className="text-base text-slate-300 mt-4 leading-relaxed">
                As the pioneer of URL shortening, TinyURL has been simplifying web links, enhancing brand authority, and powering billions of seamless redirects worldwide since 2002.
              </p>
            </div>

            {/* 3 Key Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              {statisticsData.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#00a651]">
                    {stat.number}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side: Business/Team Photograph */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800/80 bg-slate-800 group">
              <img
                src={transformationTeamImg}
                alt="TinyURL Global Technology and Strategy Team"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-slate-900/80 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                <span className="font-semibold text-emerald-400">Global Infrastructure:</span> Enterprise-grade redirect nodes across North America, Europe, and Asia-Pacific.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
