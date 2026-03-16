import { useState, useEffect } from 'react'
import type { HeroContent } from '@/../product/sections/public-website/types'
import { ChevronRight } from 'lucide-react'

interface HeroSectionProps {
  content: HeroContent
  onNavigate?: (href: string) => void
}

export function HeroSection({ content, onNavigate }: HeroSectionProps) {
  const { headline, subtitle, heroImages, ctaButtons, noticeBanner } = content
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const hasImages = heroImages && heroImages.length > 0

  useEffect(() => {
    if (!hasImages || heroImages.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [hasImages, heroImages.length])

  return (
    <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        {hasImages ? (
          heroImages.map((img, i) => (
            <div
              key={img.url}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${img.url})`,
                opacity: i === currentImageIndex ? 1 : 0,
              }}
              role="img"
              aria-label={img.alt}
            />
          ))
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-stone-900/95" />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Notice Banner */}
      {noticeBanner?.enabled && (
        <div className="relative z-10 bg-amber-400 dark:bg-amber-500">
          <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-medium">
            <span className="text-amber-950">{noticeBanner.text}</span>
            {noticeBanner.linkText && noticeBanner.linkHref && (
              <button
                onClick={() => onNavigate?.(noticeBanner.linkHref!)}
                className="inline-flex items-center gap-0.5 text-amber-800 font-bold hover:text-amber-950 underline underline-offset-2 transition-colors"
              >
                {noticeBanner.linkText}
                <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 lg:py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
                Since 1984 &middot; Heritage Railway
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-['DM_Sans'] leading-[1.05]">
              {headline}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-emerald-100/80 leading-relaxed max-w-xl">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {ctaButtons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate?.(btn.href)}
                  className={
                    btn.variant === 'primary'
                      ? 'px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]'
                      : 'px-7 py-3.5 border-2 border-white/25 hover:border-white/50 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/10 active:scale-[0.98]'
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative track motif */}
      <div className="relative z-10 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 opacity-30">
            <div className="h-[2px] w-16 bg-gradient-to-r from-amber-400 to-amber-400/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1 h-1 rounded-full bg-amber-400/60" />
            <div className="w-1 h-1 rounded-full bg-amber-400/40" />
          </div>
        </div>
      </div>

      {/* Angled bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12"
        >
          <path
            d="M0 48h1440V24L0 48z"
            className="fill-stone-50 dark:fill-stone-950"
          />
        </svg>
      </div>
    </section>
  )
}
