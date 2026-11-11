import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Trash2, Link2, Sparkles, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

/**
 * Recent Links Component
 * Renders the user's history of shortened links with 1-click copy, deletion,
 * QR modal preview, and empty state notification.
 */
export default function RecentLinks({ links = [], onRemoveLink, onClearAll }) {
  const [copiedId, setCopiedId] = useState(null);
  const [activeQrModal, setActiveQrModal] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="w-full py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Your Recent Links
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Instant access to links you have shortened in this session.
            </p>
          </div>

          {links.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Empty History State Container */}
        {links.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00a651] flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              No shortened URLs yet
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Shorten your first link above to start tracking clicks, generating custom QR codes, and managing your shortened URLs!
            </p>
          </div>
        ) : (
          /* Recent Links List */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {links.map((link) => (
              <div
                key={link.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                {/* Link Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={link.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-bold text-[#00a651] hover:underline truncate"
                    >
                      {link.shortUrl}
                    </a>
                    <span className="text-xs text-slate-400 shrink-0">
                      · {link.createdAt}
                    </span>
                  </div>
                  <div
                    className="text-xs text-slate-500 truncate max-w-2xl"
                    title={link.originalUrl}
                  >
                    Destination: {link.originalUrl}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {/* View QR Code */}
                  <button
                    type="button"
                    onClick={() => setActiveQrModal(link)}
                    className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    title="View QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  {/* Visit Link */}
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Open Destination"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(link.id, link.shortUrl)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#00a651] hover:bg-[#00a651] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedId === link.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemoveLink(link.id)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove from history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* QR Code Modal Popup */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100">
            <h4 className="text-lg font-bold text-slate-900 mb-1">
              QR Code Preview
            </h4>
            <p className="text-xs text-slate-500 mb-4 truncate">
              {activeQrModal.shortUrl}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block mb-4">
              <QRCodeSVG
                value={activeQrModal.shortUrl}
                size={180}
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
                className="flex-1 py-2 px-3 text-xs font-semibold bg-[#00a651] text-white rounded-lg hover:bg-[#008f45] transition-colors cursor-pointer"
              >
                Copy Link
              </button>
              <button
                type="button"
                onClick={() => setActiveQrModal(null)}
                className="py-2 px-4 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
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
