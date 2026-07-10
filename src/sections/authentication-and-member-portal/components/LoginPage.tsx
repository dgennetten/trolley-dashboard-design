import { useState, useRef, useEffect, useCallback } from 'react'
import type {
  OtpVerification,
  RegisterData,
} from '@/../product/sections/authentication-and-member-portal/types'
import {
  TramFront,
  Mail,
  User,
  Phone,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react'

export interface LoginPageProps {
  /** Request a one-time login code be emailed to this address */
  onRequestCode?: (email: string) => void
  /** Verify the one-time code the member entered */
  onVerifyCode?: (data: OtpVerification) => void
  /** Resend the one-time login code */
  onResendCode?: (email: string) => void
  /** Register a new member account (pending admin approval) */
  onRegister?: (data: RegisterData) => void
  onNavigate?: (href: string) => void
}

type View = 'email' | 'code' | 'register' | 'registered'

const CODE_LENGTH = 6
const RESEND_COOLDOWN = 30

export function LoginPage({
  onRequestCode,
  onVerifyCode,
  onResendCode,
  onRegister,
}: LoginPageProps) {
  const [view, setView] = useState<View>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const [regForm, setRegForm] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  // Resend cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  const startCodeStep = () => {
    setCode('')
    setCooldown(RESEND_COOLDOWN)
    setView('code')
  }

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    onRequestCode?.(email)
    startCodeStep()
  }

  const handleVerify = (submittedCode?: string) => {
    const value = submittedCode ?? code
    if (value.length !== CODE_LENGTH) return
    onVerifyCode?.({ email, code: value })
  }

  const handleResend = () => {
    if (cooldown > 0) return
    onResendCode?.(email)
    setCode('')
    setCooldown(RESEND_COOLDOWN)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister?.(regForm)
    setView('registered')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-400/30 mb-4">
            <TramFront className="w-7 h-7 text-emerald-400" strokeWidth={1.25} />
          </div>
          <h1 className="text-2xl font-bold text-white font-['DM_Sans']">Fort Collins Trolley</h1>
          <p className="text-sm text-emerald-300/50 mt-1">Member Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
          {/* Step 1 — Email entry */}
          {view === 'email' && (
            <form onSubmit={handleRequestCode} className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-2">
                Sign In
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                Enter your email and we&apos;ll send you a one-time login code. No password needed.
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
                    autoFocus
                  />
                </AuthField>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
                >
                  Send Code
                </button>
              </div>

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

          {/* Step 2 — Code entry */}
          {view === 'code' && (
            <div className="p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setView('email')}
                className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 mb-4 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2} />
                Use a different email
              </button>

              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-100 dark:ring-emerald-900/50 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-['DM_Sans'] mb-2">
                Enter Your Code
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
                We sent a {CODE_LENGTH}-digit code to{' '}
                <strong className="text-stone-700 dark:text-stone-300">{email}</strong>. It expires in 10 minutes.
              </p>

              <CodeInput
                length={CODE_LENGTH}
                value={code}
                onChange={setCode}
                onComplete={(full) => handleVerify(full)}
              />

              <button
                type="button"
                onClick={() => handleVerify()}
                disabled={code.length !== CODE_LENGTH}
                className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-600/25 active:scale-[0.98]"
              >
                Verify &amp; Sign In
              </button>

              <p className="mt-5 text-center text-sm text-stone-500 dark:text-stone-400">
                Didn&apos;t get it?{' '}
                {cooldown > 0 ? (
                  <span className="text-stone-400 dark:text-stone-500">Resend in {cooldown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    Resend code
                  </button>
                )}
              </p>
            </div>
          )}

          {/* Register view */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="p-6 sm:p-8">
              <button
                type="button"
                onClick={() => setView('email')}
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
                Your account is pending admin approval. You&apos;ll receive an email once your account is linked to your membership — then you can sign in with a one-time code.
              </p>
              <button
                onClick={() => setView('email')}
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
        .code-box {
          width: 100%;
          aspect-ratio: 1 / 1;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          border-radius: 0.625rem;
          border: 1px solid;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          border-color: var(--color-stone-200);
          background: var(--color-stone-50);
          color: var(--color-stone-900);
        }
        .dark .code-box {
          border-color: var(--color-stone-700);
          background: var(--color-stone-800);
          color: var(--color-stone-100);
        }
        .code-box:focus {
          border-color: var(--color-emerald-500);
          box-shadow: 0 0 0 3px rgb(16 185 129 / 0.15);
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

interface CodeInputProps {
  length: number
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
}

/** Segmented one-time-code input with auto-advance, backspace, and paste support. */
function CodeInput({ length, value, onChange, onComplete }: CodeInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const focusAt = useCallback((i: number) => {
    inputs.current[i]?.focus()
    inputs.current[i]?.select()
  }, [])

  const setDigit = (i: number, digit: string) => {
    const next = digits.slice()
    next[i] = digit
    const joined = next.join('').slice(0, length)
    onChange(joined)
    return joined
  }

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    if (!digit) return
    const joined = setDigit(i, digit)
    if (i < length - 1) focusAt(i + 1)
    if (joined.length === length && !joined.includes('')) onComplete?.(joined)
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (digits[i]) {
        setDigit(i, '')
      } else if (i > 0) {
        setDigit(i - 1, '')
        focusAt(i - 1)
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      focusAt(i - 1)
    } else if (e.key === 'ArrowRight' && i < length - 1) {
      focusAt(i + 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    onChange(pasted)
    const nextIndex = Math.min(pasted.length, length - 1)
    focusAt(nextIndex)
    if (pasted.length === length) onComplete?.(pasted)
  }

  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-2.5" role="group" aria-label="One-time code">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className="code-box"
          aria-label={`Digit ${i + 1}`}
          autoFocus={i === 0}
        />
      ))}
    </div>
  )
}
