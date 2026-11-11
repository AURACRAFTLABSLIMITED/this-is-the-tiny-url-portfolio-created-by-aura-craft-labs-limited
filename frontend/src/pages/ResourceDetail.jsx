import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resourceArticles } from '../data/resources';
import { ArrowLeft, Clock, Calendar, User, Share2, Copy, Check, ChevronRight, Bookmark } from 'lucide-react';
import ResourceCard from '../components/ResourceCard';
import Button from '../components/Button';

/**
 * ResourceDetail Component
 * Dynamic article view for educational guides and case studies.
 */
export default function ResourceDetail() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  // Find article matching slug
  const article = resourceArticles.find((a) => a.slug === slug);

  // Related articles (excluding current)
  const relatedArticles = resourceArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  if (!article) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Article Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">
            The guide or article you requested does not exist or has been moved.
          </p>
          <Button to="/resources" variant="primary" size="md">
            Return to Resources
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Top Header / Breadcrumb */}
      <div className="bg-[#07162b] text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-400 font-medium truncate">{article.category}</span>
          </nav>

          {/* Category Tag */}
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-md inline-block mb-3">
            {article.category}
          </span>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
            {article.title}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-400" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{article.readTime}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Article Content & Sidebar */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full flex-1">
        
        {/* Key Takeaways Box */}
        {article.keyTakeaways && (
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-7 mb-10 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
              <Bookmark className="w-4 h-4 text-[#00a651]" />
              <span>Key Takeaways at a Glance</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
              {article.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00a651] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body */}
        <div 
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-code:text-emerald-700 prose-code:bg-emerald-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Share & Actions Toolbar */}
        <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Resources</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Article'}</span>
            </button>
            <Button to="/plans" variant="primary" size="sm">
              Try TinyURL Pro
            </Button>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Related Articles & Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <ResourceCard key={rel.slug} article={rel} />
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
