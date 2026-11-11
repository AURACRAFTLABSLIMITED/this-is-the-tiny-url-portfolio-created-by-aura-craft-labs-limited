import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Button Component
 * Supports standard button actions and React Router Link behavior.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  // Base styling for all buttons
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0';

  // Variant color styles
  const variants = {
    // TinyURL Signature Green CTA
    primary: 'bg-[#00a651] hover:bg-[#008f45] active:bg-[#007b3b] text-white shadow-sm focus-visible:ring-[#00a651]',
    // Dark Navy / Secondary
    secondary: 'bg-[#0a2540] hover:bg-[#081f36] active:bg-[#06182a] text-white shadow-sm focus-visible:ring-[#0a2540]',
    // Translucent light button for dark navy backgrounds
    outlineLight: 'border-2 border-white/80 hover:border-white hover:bg-white/10 active:bg-white/20 text-white focus-visible:ring-white',
    // White card action button
    outlineDark: 'border border-slate-300 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100 text-slate-800 focus-visible:ring-slate-400',
    // Clean text / ghost button
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300',
  };

  // Size configurations
  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  // If internal router link
  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  // If external web link
  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  // Standard interactive button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
