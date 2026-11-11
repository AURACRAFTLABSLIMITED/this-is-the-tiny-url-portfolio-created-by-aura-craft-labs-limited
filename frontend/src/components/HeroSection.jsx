import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, ExternalLink, Trash2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import UrlShortener from './UrlShortener';

/**
 * HeroSection Component
 * Exact reproduction of the reference video:
 * - Left: Headline, introductory paragraphs, View Plans / Create Free Account buttons,
 *         and "Your Recent Links:" container with "No links in your history".
 * - Right: Interactive URL shortener and QR Code generator card.
 */
export default function HeroSection({
  recentLinks = [],
  onLinkCreated,
  onRemoveLink,
  onClearAll,
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [activeQrModal, setActiveQrModal] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative w-full bg-[#0a1e32] text-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading, Paragraphs, Buttons, and Your Recent Links */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              URL Shortener, Branded<br className="hidden sm:inline" /> Short Links & Analytics
            </h1>

            {/* Paragraph 1 */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Welcome to the original link shortener — simplifying the internet through the power of the URL since 2002.
            </p>

            {/* Paragraph 2 */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              You can use branded domains for fully custom links, track link analytics, and enjoy other powerful features with our paid plans.
            </p>

            {/* Buttons: Dark Navy 'View Plans' & Cyan 'Create Free Account' matching video */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/plans"
                className="px-5 py-2.5 rounded-md bg-[#0e2c48] hover:bg-[#133a5f] active:bg-[#0a2238] border border-white/20 text-white text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
              >
                View Plans
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-md bg-[#00a3c4] hover:bg-[#0091af] active:bg-[#007f9a] text-white text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
              >
                Create Free Account
              </Link>
            </div>

            {/* Your Recent Links Container (Exact Video Match) */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Your Recent Links:
                </h3>
                {recentLinks.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    className="text-xs text-slate-400 hover:text-red-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* White Box for Recent Links */}
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-slate-800">
                {recentLinks.length === 0 ? (
                  /* Empty state exactly as shown in video */
                  <div className="p-4 sm:p-5 text-center sm:text-left text-xs sm:text-sm text-slate-500 font-medium">
                    No links in your history
                  </div>
                ) : (
                  /* Generated links list */
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {recentLinks.map((link) => (
                      <div
                        key={link.id}
                        className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <a
                              href={link.shortUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-bold text-[#00a651] hover:underline truncate"
                            >
                              {link.shortUrl}
                            </a>
                            <span className="text-[11px] text-slate-400 shrink-0">
                              · {link.createdAt}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 truncate" title={link.originalUrl}>
                            {link.originalUrl}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => setActiveQrModal(link)}
                            className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="Show QR Code"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>

                          <a
                            href={link.originalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="Visit destination"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleCopy(link.id, link.shortUrl)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-[#00a651] hover:bg-[#00a651] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            {copiedId === link.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => onRemoveLink(link.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive White URL Shortener Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <UrlShortener onLinkCreated={onLinkCreated} />
          </div>

        </div>
      </div>

      {/* QR Code Modal for Recent Links */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-slate-900">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              QR Code Preview
            </h4>
            <p className="text-xs text-slate-500 mb-4 truncate">
              {activeQrModal.shortUrl}
            </p>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 inline-block mb-4">
              <QRCodeSVG
                value={activeQrModal.shortUrl}
                size={160}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(activeQrModal.shortUrl);
                  handleCopy(activeQrModal.id, activeQrModal.shortUrl);
                }}
                className="flex-1 py-2 px-3 text-xs font-semibold bg-[#00a651] text-white rounded-md hover:bg-[#008f45] transition-colors cursor-pointer"
              >
                Copy Link
              </button>
              <button
                type="button"
                onClick={() => setActiveQrModal(null)}
                className="py-2 px-4 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
