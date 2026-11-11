import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import ResourceCard from '../components/ResourceCard';
import { resourceArticles } from '../data/resources';
import { Search, BookOpen, Sparkles, Filter } from 'lucide-react';

/**
 * Resources Page Component
 * Filterable directory of educational articles, best practice guides, and case studies.
 */
export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Guides', 'Branding', 'Analytics', 'Link Management'];

  // Filter articles by category and search query
  const filteredArticles = resourceArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Page Header */}
      <PageHeader
        badge="Knowledge Base"
        title="Resources, Guides & Link Strategies"
        description="Master link shortening, custom domain optimization, CTR improvement techniques, and marketing attribution analytics."
      />

      {/* Filter and Search Bar Section */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#00a651] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:bg-white transition-all"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-14 sm:py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-xs">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No articles found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching with different keywords or switch back to the 'All' category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#00a651] text-white text-xs font-semibold hover:bg-[#008f45] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ResourceCard key={article.slug} article={article} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Newsletter / Stay Ahead Callout */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Aura Craft Labs Knowledge Network
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Elevate Your Multichannel Digital Strategy
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Gain weekly insights into link optimization, campaign attribution, and marketing automation directly from our senior engineering team.
          </p>
        </div>
      </section>

    </div>
  );
}
