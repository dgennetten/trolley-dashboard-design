import type { AboutContent } from '@/../product/sections/public-website/types'
import {
  Award,
  Mail,
  MapPin,
  Clock,
  FileText,
  ExternalLink,
  Users,
  Landmark,
} from 'lucide-react'

export interface AboutPageProps {
  aboutContent: AboutContent
  onNavigate?: (href: string) => void
}

export function AboutPage({ aboutContent }: AboutPageProps) {
  const {
    orgDescription,
    missionPoints,
    volunteerRoles,
    recognition,
    newsletters,
    officers,
    contact,
    hours,
  } = aboutContent

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen">
      {/* Page header */}
      <div className="bg-emerald-900 dark:bg-emerald-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase">
              Who We Are
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-['DM_Sans'] tracking-tight">
            About Us
          </h1>
          <p className="mt-4 text-emerald-200/70 text-lg max-w-xl">
            Learn about the people and mission behind the Fort Collins Trolley.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Organization description */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
            <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
              Our Mission
            </h2>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/40">
                <Landmark className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.25} />
              </div>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[15px]">
                {orgDescription}
              </p>
            </div>

            <h3 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-4">
              We strive to
            </h3>
            <ul className="space-y-3">
              {missionPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mt-0.5">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">{i + 1}</span>
                  </div>
                  <span className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Volunteer roles */}
        <section className="mt-12 lg:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
            <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
              All-Volunteer Organization
            </h2>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40 p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-5">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-emerald-800 dark:text-emerald-200/80 leading-relaxed">
                The FCMRS is an all-volunteer, not-for-profit 501(c)(3) organization staffing these functions:
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-9">
              {volunteerRoles.map((role, i) => (
                <div
                  key={i}
                  className="bg-white/60 dark:bg-stone-900/50 rounded-lg px-4 py-3 text-sm text-stone-700 dark:text-stone-300 border border-emerald-100/60 dark:border-emerald-900/30"
                >
                  {role}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="mt-12 lg:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-amber-500 dark:bg-amber-400" />
            <h2 className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-[0.2em] uppercase">
              Recognition
            </h2>
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8">
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              Our work restoring Car 21 and the Mountain Avenue line has earned both local and national recognition:
            </p>
            <ul className="space-y-4">
              {recognition.map((award, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {award}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Newsletter */}
        {newsletters.length > 0 && (
          <section className="mt-12 lg:mt-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
              <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
                Trolley Fare Newsletter
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {newsletters.map((nl, i) => (
                <a
                  key={i}
                  href={nl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200/80 dark:border-stone-800 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {nl.title}
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500">PDF</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0 group-hover:text-emerald-500 transition-colors" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Officers & Directors */}
        <section className="mt-12 lg:mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-emerald-500 dark:bg-emerald-400" />
            <h2 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
              Officers &amp; Directors
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {officers.map((officer, i) => {
              const isOfficer = !officer.title.includes('Director')
              return (
                <div
                  key={i}
                  className={`
                    rounded-xl border p-4 text-center
                    ${isOfficer
                      ? 'bg-white dark:bg-stone-900 border-emerald-200/60 dark:border-emerald-900/40'
                      : 'bg-white dark:bg-stone-900 border-stone-200/80 dark:border-stone-800'
                    }
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-bold
                    ${isOfficer
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                    }
                  `}>
                    {officer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <p className="font-medium text-sm text-stone-900 dark:text-stone-100 font-['DM_Sans']">
                    {officer.name}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {officer.title}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Contact & Hours */}
        <section className="mt-12 lg:mt-16 pb-8">
          <div className="bg-emerald-900 dark:bg-emerald-950 rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                  Contact
                </h3>
                <div className="space-y-3">
                  <p className="text-white font-semibold font-['DM_Sans']">
                    {contact.orgName}
                  </p>
                  <div className="flex items-center gap-2.5 text-sm text-emerald-200/70">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                    {contact.address}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-emerald-200/70">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={1.5} />
                    <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors underline-offset-2 hover:underline">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
                  Hours
                </h3>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-emerald-200/70 leading-relaxed">
                    {hours}
                  </p>
                </div>
                <p className="mt-4 text-xs text-emerald-300/40">
                  City of Fort Collins Liaison: {contact.cityLiaison}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
