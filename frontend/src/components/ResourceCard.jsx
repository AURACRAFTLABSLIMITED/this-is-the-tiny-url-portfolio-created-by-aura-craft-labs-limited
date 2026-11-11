import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

/**
 * ResourceCard Component
 * Renders an educational article card with category tag, title, excerpt, and link.
 */
export default function ResourceCard({ article }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group">
      
      {/* Card Content */}
      <div className="p-6 sm:p-7">
        
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#00a651] transition-colors leading-snug mb-3">
          <Link to={`/resources/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-6 sm:px-7 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{article.date}</span>
        </span>

        <Link
          to={`/resources/${article.slug}`}
          className="font-bold text-[#00a651] hover:text-[#008f45] inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
        >
          <span>Read article</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </article>
  );
}
