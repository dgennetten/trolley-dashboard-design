import { useState } from 'react'
import type {
  PaymentMethod,
  ProcessingFeeConfig,
  ZelleConfig,
} from '@/../product/sections/authentication-and-member-portal/types'
import { Check, CreditCard, Lock, Copy, Landmark, Info } from 'lucide-react'
import { computeProcessingFee, formatUsd } from './paymentUtils'

const METHODS: { id: PaymentMethod; label: string; tag?: string }[] = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'venmo', label: 'Venmo' },
  { id: 'zelle', label: 'Zelle', tag: 'No processing fee' },
]

interface PaymentMethodsProps {
  /** Base amount before any optional fee — the selected membership level's price. */
  baseAmount: number
  method: PaymentMethod | null
  onMethodChange: (method: PaymentMethod) => void
  coverFee: boolean
  onCoverFeeChange: (value: boolean) => void
  processingFeeConfig: ProcessingFeeConfig
  zelleConfig: ZelleConfig
  /** Reference code the member includes in the Zelle memo (generated per transaction). */
  zelleReferenceCode: string
}

/**
 * Shared payment step for the renewal / upgrade flow.
 * A radio list of methods (Card / PayPal / Venmo / Zelle); the panel below swaps
 * to match. Braintree methods reveal a Drop-in mock plus an optional
 * "cover the processing fee" checkbox (with the exact amount). Zelle reveals the
 * Society's recipient details, the amount to send, and a copyable reference code.
 */
export function PaymentMethods({
  baseAmount,
  method,
  onMethodChange,
  coverFee,
  onCoverFeeChange,
  processingFeeConfig,
  zelleConfig,
  zelleReferenceCode,
}: PaymentMethodsProps) {
  const fee = computeProcessingFee(baseAmount, processingFeeConfig)
  const isBraintree = method === 'card' || method === 'paypal' || method === 'venmo'

  return (
    <div className="space-y-2.5">
      {METHODS.map((m) => {
        const active = method === m.id
        return (
          <div
            key={m.id}
            className={`rounded-xl border transition-all ${
              active
                ? 'border-emerald-400 dark:border-emerald-500 ring-1 ring-emerald-200 dark:ring-emerald-800/50'
                : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
            } bg-white dark:bg-stone-900 overflow-hidden`}
          >
            {/* Radio row */}
            <button
              type="button"
              onClick={() => onMethodChange(m.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left"
            >
              <span
                className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  active ? 'border-emerald-500 bg-emerald-500' : 'border-stone-300 dark:border-stone-600'
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <span className="flex-1 flex items-center gap-2">
                <MethodMark method={m.id} />
                <span className="text-sm font-medium text-stone-800 dark:text-stone-200">{m.label}</span>
              </span>
              {m.tag && (
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full ring-1 ring-emerald-100 dark:ring-emerald-900/50">
                  {m.tag}
                </span>
              )}
            </button>

            {/* Expanded panel */}
            {active && (
              <div className="px-4 pb-4 pt-1 animate-in fade-in duration-150">
                {m.id === 'card' && <CardFields />}
                {m.id === 'paypal' && (
                  <RedirectNote brand="PayPal">
                    You&apos;ll confirm your payment securely with PayPal after submitting.
                  </RedirectNote>
                )}
                {m.id === 'venmo' && (
                  <RedirectNote brand="Venmo">
                    You&apos;ll confirm your payment securely with Venmo after submitting.
                  </RedirectNote>
                )}
                {m.id === 'zelle' && (
                  <ZellePanel config={zelleConfig} amount={baseAmount} referenceCode={zelleReferenceCode} />
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* Cover-the-fee checkbox (Braintree methods only) */}
      {isBraintree && baseAmount > 0 && (
        <label className="flex items-start gap-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={coverFee}
            onChange={(e) => onCoverFeeChange(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-stone-600 dark:text-stone-300">
            Add <span className="font-semibold text-stone-900 dark:text-stone-100">{formatUsd(fee)}</span>{' '}
            so the Society receives the full{' '}
            <span className="font-semibold text-stone-900 dark:text-stone-100">{formatUsd(baseAmount)}</span>{' '}
            <span className="text-stone-400 dark:text-stone-500">(covers the payment processing fee)</span>
          </span>
        </label>
      )}

      {/* Secure badge for Braintree */}
      {isBraintree && (
        <div className="flex items-center justify-center gap-1.5 pt-1">
          <Lock className="w-3 h-3 text-stone-400" strokeWidth={1.5} />
          <span className="text-[11px] text-stone-400 dark:text-stone-500">Secured by PayPal Braintree</span>
        </div>
      )}
    </div>
  )
}

/** Small brand wordmark shown beside each method label. */
function MethodMark({ method }: { method: PaymentMethod }) {
  if (method === 'card') return <CreditCard className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
  if (method === 'zelle')
    return (
      <span className="inline-flex items-center justify-center w-5 h-4 rounded bg-[#6D1ED4]">
        <span className="text-white text-[10px] font-bold leading-none">Z</span>
      </span>
    )
  if (method === 'paypal')
    return (
      <svg width="46" height="14" viewBox="0 0 46 14" aria-label="PayPal">
        <text x="0" y="11" fontSize="11" fontWeight="700" fill="#003087" fontFamily="Arial">Pay</text>
        <text x="19" y="11" fontSize="11" fontWeight="700" fill="#009CDE" fontFamily="Arial">Pal</text>
      </svg>
    )
  return (
    <svg width="44" height="14" viewBox="0 0 44 14" aria-label="Venmo">
      <text x="0" y="11" fontSize="11" fontWeight="700" fill="#008CFF" fontFamily="Arial">Venmo</text>
    </svg>
  )
}

/** Visual mock of Braintree Drop-in card fields.
 *  In production, replace with the Braintree SDK Drop-in hosted fields. */
function CardFields() {
  return (
    <div className="space-y-2.5">
      <input type="text" placeholder="Card number" maxLength={19} className="dropin-card-input" />
      <div className="grid grid-cols-2 gap-2">
        <input type="text" placeholder="MM / YY" maxLength={7} className="dropin-card-input" />
        <input type="text" placeholder="CVV" maxLength={4} className="dropin-card-input" />
      </div>
      <input type="text" placeholder="Name on card" className="dropin-card-input" />
    </div>
  )
}

function RedirectNote({ brand, children }: { brand: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 px-3.5 py-3 text-sm text-stone-600 dark:text-stone-300">
      <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" strokeWidth={1.5} />
      <span>
        <span className="font-medium text-stone-800 dark:text-stone-200">{brand}.</span> {children}
      </span>
    </div>
  )
}

function ZellePanel({
  config,
  amount,
  referenceCode,
}: {
  config: ZelleConfig
  amount: number
  referenceCode: string
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">{config.instructions}</p>

      <div className="rounded-lg border border-stone-200 dark:border-stone-700 divide-y divide-stone-100 dark:divide-stone-800 bg-stone-50/60 dark:bg-stone-800/40">
        <ZelleRow label="Send to" value={config.recipientEmail} copyable />
        {config.recipientPhone && <ZelleRow label="or phone" value={config.recipientPhone} copyable />}
        <ZelleRow label="Recipient" value={config.recipientName} />
        <ZelleRow label="Amount" value={amount > 0 ? formatUsd(amount) : '—'} emphasize />
        <ZelleRow label="Reference code" value={referenceCode} copyable emphasize />
      </div>

      <div className="flex items-start gap-2 text-xs text-stone-500 dark:text-stone-400">
        <Landmark className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={1.5} />
        <span>
          Include the reference code in your transfer memo. Your renewal stays{' '}
          <span className="font-medium">pending</span> until our treasurer confirms it.
        </span>
      </div>
    </div>
  )
}

function ZelleRow({
  label,
  value,
  copyable,
  emphasize,
}: {
  label: string
  value: string
  copyable?: boolean
  emphasize?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="flex items-center justify-between gap-3 px-3.5 py-2.5">
      <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0">{label}</span>
      <span className="flex items-center gap-2 min-w-0">
        <span
          className={`truncate ${
            emphasize
              ? 'font-mono text-sm font-semibold text-stone-900 dark:text-stone-100'
              : 'text-sm text-stone-700 dark:text-stone-300'
          }`}
        >
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={copy}
            className="shrink-0 p-1 rounded text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.5} />
            ) : (
              <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
          </button>
        )}
      </span>
    </div>
  )
}
