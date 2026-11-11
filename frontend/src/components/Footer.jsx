import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Instagram, Github, ArrowUpRight } from 'lucide-react';
import { footerSections } from '../data/navigation';
import { siteConfig } from '../config/siteConfig';

/**
 * Footer Component
 * Dark navy footer featuring multi-column navigation, social connections,
 * and the Aura Craft Labs Limited portfolio recreation copyright statement.
 */
export default function Footer() {
  return (
    <footer className="bg-[#051121] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Section: Brand info + 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 columns wide on desktop) */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#00a651] text-white font-black text-lg">
                T
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                TINY<span className="text-[#00a651]">URL</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              The world's original and most reliable URL shortener since 2002.
              Create branded links, dynamic QR codes, and track real-time click analytics.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#00a651] hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#00a651] hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#00a651] hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#00a651] hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-[#00a651] hover:text-white flex items-center justify-center text-slate-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 4 Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => {
                  const isExternal = link.href.startsWith('http');
                  return (
                    <li key={link.name}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                        >
                          <span>{link.name}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Section: Portfolio statement and Aura Craft Labs Limited link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {siteConfig.copyright.year} TINYURL Portfolio Recreation. All Rights Reserved. Website Designed & Developed by{' '}
            <a
              href={siteConfig.company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00a651] hover:underline font-semibold transition-colors"
            >
              {siteConfig.company.name}
            </a>.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/plans" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/plans" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <a
              href={siteConfig.company.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              Portfolio
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
