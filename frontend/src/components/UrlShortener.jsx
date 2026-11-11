import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link2, QrCode, Copy, Check, ExternalLink, Download, AlertCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { createShortUrl } from '../config/api';

/**
 * ============================================================
 * UrlShortener Component
 * ============================================================
 * Interactive card with two tabs:
 *   1. Shorten a Link  – talks to the real backend via Axios
 *   2. Generate QR Code – can also use a backend short URL
 *
 * Flow for "Shorten a Link":
 *   User types long URL → clicks button →
 *   Axios POST /api/urls/save → backend returns shortURL →
 *   We show the result + copy button.
 *
 * Everything is commented so a beginner can follow easily.
 */
export default function UrlShortener({ onLinkCreated }) {
  // Which tab is active: 'shorten' or 'qr'
  const [activeTab, setActiveTab] = useState('shorten');

  // Form inputs
  const [urlInput, setUrlInput] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(siteConfig.domains[0].value);
  const [customAlias, setCustomAlias] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Result after successful shorten / QR
  const [createdResult, setCreatedResult] = useState(null);
  const [copied, setCopied] = useState(false);

  /**
   * Make sure the user input becomes a proper URL
   * (adds https:// if the user forgot it)
   */
  const formatUrl = (input) => {
    let trimmed = input.trim();
    if (!trimmed) return '';
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    return trimmed;
  };

  /**
   * Main submit handler for both tabs
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCreatedResult(null);

    if (!urlInput.trim()) {
      setError(
        activeTab === 'shorten'
          ? 'Please enter a long URL to shorten'
          : 'Please enter a destination URL to generate QR code'
      );
      return;
    }

    const validUrl = formatUrl(urlInput);

    // Basic browser-side URL validation
    try {
      new URL(validUrl);
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com/page)');
      return;
    }

    // --------------------------------------------------------
    // SHORTEN TAB → call the real backend with Axios
    // --------------------------------------------------------
    if (activeTab === 'shorten') {
      setIsLoading(true);
      try {
        // This is the Axios call defined in src/config/api.js
        const data = await createShortUrl(validUrl);

        if (!data.ok) {
          setError(data.error || 'Something went wrong on the server');
          return;
        }

        // Build the object that the UI and RecentLinks expect
        const newLinkItem = {
          id: data.shortId || Date.now().toString(),
          originalUrl: data.longUrl || validUrl,
          shortUrl: data.shortURL,               // real backend short link
          domain: selectedDomain,
          alias: data.shortId,
          type: 'shorten',
          createdAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          clicks: 0,
        };

        setCreatedResult(newLinkItem);

        // Tell the parent (Home page) so it can update Recent Links
        if (onLinkCreated) {
          onLinkCreated(newLinkItem);
        }
      } catch (err) {
        // Network error, CORS error, or backend down
        console.error('Shorten error:', err);
        if (err.response) {
          // Backend replied with an error status
          setError(err.response.data?.error || `Server error ${err.response.status}`);
        } else if (err.request) {
          // Request was sent but no response (backend not running?)
          setError('Cannot reach the backend. Is it running on port 5050?');
        } else {
          setError('Unexpected error while shortening the URL');
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // --------------------------------------------------------
    // QR TAB → still generate a short link via backend so the
    // QR points to a real redirectable URL
    // --------------------------------------------------------
    setIsLoading(true);
    try {
      const data = await createShortUrl(validUrl);

      if (!data.ok) {
        setError(data.error || 'Something went wrong on the server');
        return;
      }

      const newLinkItem = {
        id: data.shortId || Date.now().toString(),
        originalUrl: data.longUrl || validUrl,
        shortUrl: data.shortURL,
        domain: selectedDomain,
        alias: data.shortId,
        type: 'qr',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        clicks: 0,
      };

      setCreatedResult(newLinkItem);
      if (onLinkCreated) {
        onLinkCreated(newLinkItem);
      }
    } catch (err) {
      console.error('QR error:', err);
      if (err.response) {
        setError(err.response.data?.error || `Server error ${err.response.status}`);
      } else if (err.request) {
        setError('Cannot reach the backend. Is it running on port 5050?');
      } else {
        setError('Unexpected error while generating QR code');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Copy the short URL to clipboard
   */
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Download the QR code as a PNG image
   */
  const handleDownloadQr = () => {
    const svgElement = document.getElementById('tinyurl-card-qr-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 320;
      canvas.height = 320;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 320, 320);
      ctx.drawImage(img, 0, 0, 320, 320);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `tinyurl-qr-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100 text-slate-800">
      
      {/* Top Tabs – inactive = deep teal, active = white */}
      <div className="grid grid-cols-2 bg-[#005973]">
        <button
          type="button"
          onClick={() => {
            setActiveTab('shorten');
            setError('');
            setCreatedResult(null);
          }}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold transition-colors cursor-pointer select-none ${
            activeTab === 'shorten'
              ? 'bg-white text-slate-900 rounded-tl-xl'
              : 'bg-[#005973] text-white hover:bg-[#004e66]'
          }`}
        >
          <Link2 className={`w-4 h-4 ${activeTab === 'shorten' ? 'text-slate-800' : 'text-white'}`} />
          <span>Shorten a Link</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('qr');
            setError('');
            setCreatedResult(null);
          }}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold transition-colors cursor-pointer select-none ${
            activeTab === 'qr'
              ? 'bg-white text-slate-900 rounded-tr-xl'
              : 'bg-[#005973] text-white hover:bg-[#004e66]'
          }`}
        >
          <QrCode className={`w-4 h-4 ${activeTab === 'qr' ? 'text-slate-800' : 'text-white'}`} />
          <span>Generate QR Code</span>
        </button>
      </div>

      {/* Form body */}
      <div className="p-5 sm:p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Long URL input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              * {activeTab === 'shorten' ? 'Long URL' : 'Destination URL'}
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/my-long-page"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:border-transparent transition"
              disabled={isLoading}
            />
          </div>

          {/* Optional domain + alias (kept for visual match; backend currently uses nanoid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651] bg-white"
                disabled={isLoading}
              >
                {siteConfig.domains.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Custom alias (optional)
              </label>
              <input
                type="text"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="my-link"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651]"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#00a651] hover:bg-[#008f45] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Working…</span>
              </>
            ) : activeTab === 'shorten' ? (
              <>
                <Link2 className="w-4 h-4" />
                <span>Shorten Link</span>
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4" />
                <span>Generate QR Code</span>
              </>
            )}
          </button>
        </form>

        {/* Success result card */}
        {createdResult && (
          <div className="mt-2 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-800">
              {createdResult.type === 'qr' ? 'QR Code Ready' : 'Your Short Link'}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <a
                href={createdResult.shortUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-sm font-medium text-[#00a651] hover:underline break-all"
              >
                {createdResult.shortUrl}
              </a>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopy(createdResult.shortUrl)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#00a651] hover:bg-[#008f45] text-white text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <a
                  href={createdResult.originalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-md border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
                  title="Open original link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* QR preview + download (only on QR tab) */}
            {createdResult.type === 'qr' && (
              <div className="mt-2 p-4 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="bg-white p-2.5 rounded-md border border-slate-200 shrink-0">
                  <QRCodeSVG
                    id="tinyurl-card-qr-svg"
                    value={createdResult.shortUrl}
                    size={110}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-800">
                    High-Resolution Dynamic QR Code
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Scan with any smartphone camera to visit the short link
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadQr}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PNG</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
