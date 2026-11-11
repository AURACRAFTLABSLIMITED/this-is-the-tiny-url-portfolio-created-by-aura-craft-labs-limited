import React from 'react';

/**
 * PageHeader Component
 * Unified top banner across subpages matching TinyURL's dark navy branding.
 */
export default function PageHeader({
  badge,
  title,
  description,
  children,
}) {
  return (
    <section className="relative w-full bg-[#07162b] text-white py-16 sm:py-20 overflow-hidden border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold tracking-wide border border-white/10 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00a651]" />
            {badge}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          {title}
        </h1>

        {description && (
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            {description}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
