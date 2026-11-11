import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, Link as LinkIcon, Globe, BarChart2, QrCode, Layers, Sliders, BookOpen, FileText, Compass, CheckCircle, TrendingUp } from 'lucide-react';
import { navigationLinks } from '../data/navigation';
import { siteConfig } from '../config/siteConfig';
import Button from './Button';
import MobileMenu from './MobileMenu';

const iconMap = {
  Link: LinkIcon,
  Globe: Globe,
  BarChart2: BarChart2,
  QrCode: QrCode,
  Layers: Layers,
  Sliders: Sliders,
  BookOpen: BookOpen,
  FileText: FileText,
  Compass: Compass,
  CheckCircle: CheckCircle,
  TrendingUp: TrendingUp,
};

/**
 * Top Navigation Bar
 * Exact reproduction of TinyURL's teal-to-navy gradient header, dropdowns, and responsive navigation.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Subtle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-gradient-to-r from-[#003c4f] via-[#052945] to-[#07162b] text-white transition-all duration-200 ${
          scrolled ? 'shadow-lg border-b border-white/10' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Left: TINYURL Logo & Wordmark */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group select-none">
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#00a651] text-white font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
                T
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                TINY<span className="text-[#00a651]">URL</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navigationLinks.map((item) => {
                const hasDropdown = item.dropdown && item.dropdown.length > 0;
                const isDropdownOpen = activeDropdown === item.name;

                if (!hasDropdown) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                        location.pathname === item.href
                          ? 'text-white bg-white/10'
                          : 'text-slate-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isDropdownOpen ? null : item.name)}
                      className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                        isDropdownOpen || location.pathname.startsWith(item.href)
                          ? 'text-white bg-white/10'
                          : 'text-slate-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180 text-white' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Desktop Dropdown Popover */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-80 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="space-y-1">
                          {item.dropdown.map((subItem) => {
                            const SubIcon = iconMap[subItem.icon] || LinkIcon;
                            return (
                              <Link
                                key={subItem.title}
                                to={subItem.href}
                                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                              >
                                <div className="p-2 rounded-md bg-emerald-50 text-[#00a651] group-hover:bg-[#00a651] group-hover:text-white transition-colors shrink-0">
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-slate-900 group-hover:text-[#00a651] transition-colors">
                                    {subItem.title}
                                  </div>
                                  <div className="text-xs text-slate-500 leading-relaxed mt-0.5">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right: Auth Controls & Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-bold text-white bg-[#0070ba] hover:bg-[#005f9e] active:bg-[#004e82] rounded-md transition-colors shadow-sm whitespace-nowrap"
            >
              Sign Up
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-colors lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
