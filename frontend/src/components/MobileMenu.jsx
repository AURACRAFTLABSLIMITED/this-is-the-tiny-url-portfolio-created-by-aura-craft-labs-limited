import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronUp, Link as LinkIcon, Globe, BarChart2, QrCode, Layers, Sliders, BookOpen, FileText, Compass, CheckCircle, TrendingUp } from 'lucide-react';
import { navigationLinks } from '../data/navigation';
import Button from './Button';

// Icon mapper helper
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
 * Mobile Navigation Drawer
 */
export default function MobileMenu({ isOpen, onClose }) {
  const [expandedDropdown, setExpandedDropdown] = useState(null);

  if (!isOpen) return null;

  const toggleDropdown = (name) => {
    setExpandedDropdown(expandedDropdown === name ? null : name);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#081729] text-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link to="/" onClick={onClose} className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#00a651] text-white font-bold text-lg">
                T
              </span>
              <span className="text-xl font-extrabold tracking-tight text-white">
                TINY<span className="text-[#00a651]">URL</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav list */}
          <nav className="py-6 space-y-2">
            {navigationLinks.map((item) => {
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              const isExpanded = expandedDropdown === item.name;

              return (
                <div key={item.name} className="border-b border-white/5 pb-2">
                  {hasDropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full flex items-center justify-between py-2.5 text-base font-medium text-slate-200 hover:text-white transition-colors"
                      >
                        <span>{item.name}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="pl-3 py-2 space-y-2.5 bg-white/5 rounded-lg my-1">
                          {item.dropdown.map((subItem) => {
                            const SubIcon = iconMap[subItem.icon] || LinkIcon;
                            return (
                              <Link
                                key={subItem.title}
                                to={subItem.href}
                                onClick={onClose}
                                className="flex items-start gap-2.5 py-1.5 px-2 rounded-md text-sm text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                <SubIcon className="w-4 h-4 text-[#00a651] mt-0.5 shrink-0" />
                                <div>
                                  <div className="font-medium text-white">{subItem.title}</div>
                                  <div className="text-xs text-slate-400 line-clamp-1">{subItem.description}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className="block py-2.5 text-base font-medium text-slate-200 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA group */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            to="/login"
            onClick={onClose}
            className="block w-full py-2.5 text-center text-sm font-semibold text-slate-200 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={onClose}
            className="block w-full py-2.5 text-center text-sm font-bold text-white bg-[#0070ba] hover:bg-[#005f9e] rounded-md transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
