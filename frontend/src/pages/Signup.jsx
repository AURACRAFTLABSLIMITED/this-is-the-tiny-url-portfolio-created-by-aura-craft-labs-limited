import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { signupUser } from '../config/api';

/**
 * ============================================================
 * Signup Page
 * ============================================================
 * Creates a real account in MongoDB via the backend.
 *
 * Flow:
 *   1. User fills name, email, password
 *   2. Frontend calls POST /api/auth/signup with Axios
 *   3. Backend hashes the password and saves the user
 *   4. We show success and redirect to Login (or Home)
 */
export default function Signup() {
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ---------- Client-side validation ----------
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // ---------- Call the real backend ----------
    setLoading(true);
    try {
      const data = await signupUser({
        name: name.trim(),
        email: email.trim(),
        password: password,
      });

      if (!data.ok) {
        setError(data.error || 'Could not create account');
        return;
      }

      // Success!
      setIsSuccess(true);

      // After a short delay, send the user to the Login page
      setTimeout(() => {
        navigate('/login');
      }, 1800);
    } catch (err) {
      console.error('Signup error:', err);
      if (err.response) {
        // Backend returned an error (400, 409, 500…)
        setError(err.response.data?.error || `Server error ${err.response.status}`);
      } else if (err.request) {
        // No response → backend is probably not running
        setError('Cannot reach the backend. Is it running on port 5050?');
      } else {
        setError('Unexpected error while creating account');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl">

        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[#00a651] text-white font-black text-lg shadow-sm">
              T
            </span>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              TINY<span className="text-[#00a651]">URL</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create your free account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Shorten URLs, generate QR codes, and start tracking clicks in seconds.
          </p>
        </div>

        {/* Success state */}
        {isSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#00a651] mx-auto" />
            <div className="font-bold text-sm">Account created successfully!</div>
            <div className="text-xs text-emerald-700">
              Your data is saved in MongoDB. Redirecting to login…
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit button */}
<Button
  type="submit"
  disabled={loading}
  className="w-full flex items-center justify-center py-4 mt-2 text-base font-semibold"
>
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}
  >
    {loading ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Creating account…</span>
      </>
    ) : (
      <>
        <span>Create Account</span>
        <ArrowRight className="w-5 h-5" />
      </>
    )}
  </span>
</Button>
          </form>
        )}

        {/* Footer link */}
        {!isSuccess && (
          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#00a651] hover:underline">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
