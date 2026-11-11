import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import { loginUser } from '../config/api';

/**
 * ============================================================
 * Login Page
 * ============================================================
 * Logs a user in by checking email + password against MongoDB.
 *
 * Flow:
 *   1. User types email & password
 *   2. Frontend calls POST /api/auth/login with Axios
 *   3. Backend finds the user and compares the hashed password
 *   4. On success we show a message and redirect to Home
 */
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ---------- Client-side validation ----------
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    // ---------- Call the real backend ----------
    setLoading(true);
    try {
      const data = await loginUser({
        email: email.trim(),
        password: password,
      });

      if (!data.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Optional: save user info in localStorage so other pages can use it
      if (rememberMe && data.user) {
        localStorage.setItem('tinyurl_user', JSON.stringify(data.user));
      }

      setIsSuccess(true);

      // Redirect to home after a short success message
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data?.error || `Server error ${err.response.status}`);
      } else if (err.request) {
        setError('Cannot reach the backend. Is it running on port 5050?');
      } else {
        setError('Unexpected error while logging in');
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
            Log in to your account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Access your shortened links, real-time analytics, and branded domains.
          </p>
        </div>

        {/* Success state */}
        {isSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-[#00a651] mx-auto" />
            <div className="font-bold text-sm">Login successful!</div>
            <div className="text-xs text-emerald-700">
              Redirecting you to the homepage…
            </div>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

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
                  placeholder="Your password"
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#00a651] focus:ring-[#00a651]"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <span className="text-slate-400">Forgot password?</span>
            </div>

{/* Submit button */}
<Button
  type="submit"
  disabled={loading}
  className="w-full flex items-center justify-center py-4 mt-2 text-base font-semibold"
>
  <span
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
    }}
  >
    {loading ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Logging in…</span>
      </>
    ) : (
      <>
        <span>Log In</span>
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
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#00a651] hover:underline">
              Sign up free
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
