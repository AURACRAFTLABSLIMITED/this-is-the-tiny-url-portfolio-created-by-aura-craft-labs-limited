import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Link2 } from 'lucide-react';
import Button from '../components/Button';

/**
 * NotFound Page Component
 * Handles invalid URLs gracefully with redirection back to the homepage.
 */
export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 text-center shadow-lg">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#00a651] flex items-center justify-center mx-auto mb-6">
          <Link2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-[#00a651] mb-1 block">
          404 Error
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          The link or page you are looking for doesn't exist or might have been relocated.
        </p>

        <div className="space-y-3">
          <Button to="/" variant="primary" size="lg" className="w-full justify-center" icon={Home}>
            Return to Homepage
          </Button>
          <Button to="/plans" variant="outlineDark" size="md" className="w-full justify-center">
            View Plans & Pricing
          </Button>
        </div>
      </div>
    </div>
  );
}
