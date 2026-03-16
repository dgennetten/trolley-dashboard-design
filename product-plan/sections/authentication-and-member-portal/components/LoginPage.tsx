import { useState } from 'react'
import type {
  LoginCredentials,
  RegisterData,
} from '../types'
import {
  TramFront,
  Mail,
  Lock,
  Sparkles,
  User,
  Phone,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'

export interface LoginPageProps {
  onLogin?: (credentials: LoginCredentials) => void
  onMagicLink?: (email: string) => void
  onRegister?: (data: RegisterData) => void
  onForgotPassword?: (email: string) => void
  onNavigate?: (href: string) => void
}

type View = 'login' | 'register' | 'forgot' | 'magic-sent' | 'registered'

export function LoginPage({
  onLogin,
  onMagicLink,
  onRegister,
  onForgotPassword,
}: LoginPageProps) {
  const [view, setView] = useState<View>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regForm, setRegForm] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin?.({ email, password })
  }

  const handleMagicLink = () => {
    if (email) {
      onMagicLink?.(email)
      setView('magic-sent')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister?.(regForm)
    setView('registered')
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    onForgotPassword?.(email)
    setView('magic-sent')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-400/30 mb-4">
            <TramFront className="w-7 h-7 text-emerald-400" strokeWidth={1.25} />
          </div>
          <h1 className="text-2xl font-bold text-white font-['DM_Sans']">
            Fort Collins Trolley
          </h1>
          <p className="text-sm text-emerald-300/50 mt-1">Member Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
          {/* Login view */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-6">
                Sign In
              </h2>

              <div className="space-y-4">
                <AuthField icon={<Mail className="w-4 h-4" strokeWidth={1.5} />} label="Email">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    placeholder="you@example.com"
                  />
                </AuthField>

                <AuthField icon={<Lock className="w-4 h-4" strokeWidth={1.5} />} label="Password">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    placeholder="••••••••"
                  />
                </AuthField>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
                >
                  Sign In
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200 dark:border-stone-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-stone-900 px-3 text-stone-400 dark:text-stone-500">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleMagicLink}
                className="w-full py-3 border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
                Send Magic Link
              </button>

              <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Register
                </button>
              </p>
            </form>
          )}

          {/* Register view */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setView('login')}
                className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 mb-4 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                Back to sign in
              </button>

              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-2">
                Create Account
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                Register for member portal access. An admin will review and link your account to your membership.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <AuthField icon={<User className="w-4 h-4" strokeWidth={1.5} />} label="First Name">
                    <input
                      type="text"
                      required
                      value={regForm.firstName}
                      onChange={(e) => setRegForm((p) => ({ ...p, firstName: e.target.value }))}
                      className="auth-input"
                      placeholder="Jane"
                    />
                  </AuthField>
                  <AuthField label="Last Name">
                    <input
                      type="text"
                      required
                      value={regForm.lastName}
                      onChange={(e) => setRegForm((p) => ({ ...p, lastName: e.target.value }))}
                      className="auth-input"
                      placeholder="Smith"
                    />
                  </AuthField>
                </div>

                <AuthField icon={<Mail className="w-4 h-4" strokeWidth={1.5} />} label="Email">
                  <input
                    type="email"
                    required
                    value={regForm.email}
                    onChange={(e) => setRegForm((p) => ({ ...p, email: e.target.value }))}
                    className="auth-input"
                    placeholder="you@example.com"
                  />
                </AuthField>

                <AuthField icon={<Phone className="w-4 h-4" strokeWidth={1.5} />} label="Phone">
                  <input
                    type="tel"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm((p) => ({ ...p, phone: e.target.value }))}
                    className="auth-input"
                    placeholder="(970) 555-0123"
                  />
                </AuthField>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
                >
                  Register
                </button>
              </div>
            </form>
          )}

          {/* Forgot password view */}
          {view === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setView('login')}
                className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 mb-4 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                Back to sign in
              </button>

              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-2">
                Reset Password
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                Enter your email and we&apos;ll send a reset link.
              </p>

              <div className="space-y-4">
                <AuthField icon={<Mail className="w-4 h-4" strokeWidth={1.5} />} label="Email">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    placeholder="you@example.com"
                  />
                </AuthField>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          )}

          {/* Success: magic link sent / password reset sent */}
          {view === 'magic-sent' && (
            <div className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.25} />
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-2">
                Check Your Email
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                We&apos;ve sent a link to <strong className="text-stone-700 dark:text-stone-300">{email}</strong>. Click it to continue.
              </p>
              <button
                onClick={() => setView('login')}
                className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                Back to sign in
              </button>
            </div>
          )}

          {/* Success: registration pending */}
          {view === 'registered' && (
            <div className="p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.25} />
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-2">
                Registration Received
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                Your account is pending admin approval. You&apos;ll receive an email once your account is linked to your membership.
              </p>
              <button
                onClick={() => setView('login')}
                className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .auth-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid;
          font-size: 0.875rem;
          line-height: 1.25rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
          border-color: var(--color-stone-200);
          background: var(--color-stone-50);
          color: var(--color-stone-900);
        }
        .dark .auth-input {
          border-color: var(--color-stone-700);
          background: var(--color-stone-800);
          color: var(--color-stone-100);
        }
        .auth-input:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.1);
        }
        .dark .auth-input:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.15);
        }
        .auth-input::placeholder {
          color: var(--color-stone-400);
        }
        .dark .auth-input::placeholder {
          color: var(--color-stone-500);
        }
      `}</style>
    </div>
  )
}

function AuthField({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
        {icon && <span className="text-stone-400 dark:text-stone-500">{icon}</span>}
        {label}
      </span>
      {children}
    </label>
  )
}
