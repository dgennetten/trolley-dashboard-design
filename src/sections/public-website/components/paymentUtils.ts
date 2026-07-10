import type { ProcessingFeeConfig } from '@/../product/sections/public-website/types'

/** Compute the processing fee a payer can opt to cover, rounded to cents.
 *  Simple additive model (rate × base + fixed) — matches the plan's example
 *  ("Add $1.75 so the Society receives the full $50.00"). */
export function computeProcessingFee(base: number, cfg: ProcessingFeeConfig): number {
  if (base <= 0) return 0
  return Math.round((base * cfg.percentRate + cfg.fixedFee) * 100) / 100
}

export function formatUsd(n: number): string {
  return `$${n.toFixed(2)}`
}
