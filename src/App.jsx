import { useEffect, useMemo, useState } from 'react'
import { portfolioData } from './content/portfolioData'

const LANG_KEY = 'portfolio-language'
const THEME_KEY = 'portfolio-theme'

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem(LANG_KEY) || 'pt')
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language)
  }, [language])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const locale = useMemo(() => portfolioData.translations[language], [language])
  const ui = useMemo(() => portfolioData.ui[language], [language])

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-4 text-[var(--text)] sm:px-5 md:px-10 md:pb-16 md:pt-5">
      <header className="panel sticky top-3 z-20 mb-6 rounded-3xl md:top-4 md:mb-8 md:rounded-full">
        <nav className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-3">
          <div className="flex items-center justify-between gap-3 md:justify-start">
            <a href="#home" className="text-sm font-semibold tracking-[0.14em] text-[var(--olive-soft)]">
              {portfolioData.brand}
            </a>

            <div className="grid w-full grid-cols-2 gap-2 md:hidden">
              <SwitchControl
                leftLabel="PT"
                rightLabel="EN"
                checked={language === 'en'}
                onToggle={() => setLanguage((prev) => (prev === 'en' ? 'pt' : 'en'))}
                ariaLabel="Toggle language"
                compact
              />
              <SwitchControl
                leftLabel={ui.themeLight}
                rightLabel={ui.themeDark}
                checked={theme === 'dark'}
                onToggle={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                ariaLabel="Toggle theme"
                compact
              />
            </div>
          </div>

          <ul className="-mx-1 flex gap-2 overflow-x-auto pb-1 text-xs text-[var(--muted)] md:mx-0 md:flex-1 md:justify-center md:gap-5 md:overflow-visible md:text-sm">
            {ui.nav.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="inline-flex rounded-full border border-[var(--line)] px-3 py-1.5 transition hover:border-[var(--olive-soft)] hover:text-[var(--text)] md:border-0 md:px-0 md:py-0"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <SwitchControl
              leftLabel="PT"
              rightLabel="EN"
              checked={language === 'en'}
              onToggle={() => setLanguage((prev) => (prev === 'en' ? 'pt' : 'en'))}
              ariaLabel="Toggle language"
            />
            <SwitchControl
              leftLabel={ui.themeLight}
              rightLabel={ui.themeDark}
              checked={theme === 'dark'}
              onToggle={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              ariaLabel="Toggle theme"
            />
          </div>
        </nav>
      </header>

      <main className="space-y-6 md:space-y-8" id="home">
        <section className="grid gap-4 lg:grid-cols-5">
          <div className="panel rounded-3xl p-6 sm:p-8 md:p-12 lg:col-span-3">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-[var(--olive-soft)]">
              {locale.role}
            </div>
            <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl md:text-6xl">
              {locale.hero.headline}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)] sm:text-lg md:mt-5 md:text-xl">
              {locale.hero.subheadline}
            </p>
            <p className="mt-6 text-sm text-[var(--olive-soft)]">{locale.location}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#experience"
                className="inline-flex items-center justify-center rounded-full bg-[var(--olive)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--olive-soft)]"
              >
                {ui.ctaExperience}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--olive-soft)] hover:text-[var(--olive-soft)]"
              >
                {ui.ctaContact}
              </a>
            </div>
          </div>

          <aside className="panel rounded-3xl p-5 sm:p-6 lg:col-span-2">
            <div className="h-56 w-full overflow-hidden rounded-2xl sm:h-64">
              <img
                src={portfolioData.profileImage}
                alt={ui.profileAlt}
                className="h-full w-full object-cover object-[center_24%] scale-110 sm:scale-125"
                loading="lazy"
              />
            </div>
            <div className="mt-4 space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--olive-soft)] sm:text-base sm:normal-case sm:tracking-normal">
                  {ui.photoTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{ui.photoText}</p>
              </div>

              <div className="rounded-2xl border border-[var(--line)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--olive-soft)]">
                  {ui.photoSummary}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                  {locale.education.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--line)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--olive-soft)]">
                  {ui.sectionLabels.contact}
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                  <li>
                    <span className="text-[var(--text)]">{ui.phoneLabel}:</span> {locale.contact.phone}
                  </li>
                  <li>
                    <span className="text-[var(--text)]">{ui.emailLabel}:</span> {locale.contact.email}
                  </li>
                  <li>
                    <span className="text-[var(--text)]">{ui.addressLabel}:</span> {locale.contact.address}
                  </li>
                  <li>
                    <span className="text-[var(--text)]">{ui.linkedinLabel}:</span> {locale.contact.linkedin}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {locale.hero.highlights.map((highlight) => (
            <article key={highlight} className="panel rounded-2xl p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-[var(--text)]">{highlight}</p>
            </article>
          ))}
        </section>

        <section id="about" className="panel rounded-3xl p-6 sm:p-8 md:p-10">
          <SectionLabel>{ui.sectionLabels.about}</SectionLabel>
          <div className="space-y-4 text-[0.98rem] leading-relaxed text-[var(--muted)] sm:text-[1.02rem]">
            {locale.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section id="experience" className="panel rounded-3xl p-6 sm:p-8 md:p-10">
          <SectionLabel>{ui.sectionLabels.experience}</SectionLabel>
          <div className="space-y-6">
            {locale.experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="rounded-2xl border border-[var(--line)] p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-[-0.01em] sm:text-xl">{job.title}</h3>
                  <span className="text-sm text-[var(--olive-soft)]">{job.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--text)]">{job.company}</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--olive-soft)]" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="panel rounded-3xl p-6 sm:p-8 md:p-10">
          <SectionLabel>{ui.sectionLabels.skills}</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(locale.skills).map(([category, items]) => (
              <article key={category} className="rounded-2xl border border-[var(--line)] p-4 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--olive-soft)]">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="tag rounded-full px-3 py-1.5 text-sm text-[var(--text)]">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="panel rounded-3xl p-6 sm:p-8 md:p-10">
          <SectionLabel>{ui.selectedProjects}</SectionLabel>
          <div className="grid gap-4 lg:grid-cols-3">
            {locale.projects.map((project) => (
              <article key={project.name} className="rounded-2xl border border-[var(--line)] p-5 sm:p-6">
                <h3 className="text-lg font-semibold tracking-[-0.01em] sm:text-xl">{project.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  <span className="text-[var(--olive-soft)]">{ui.contextLabel}</span> {project.context}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  <span className="text-[var(--olive-soft)]">{ui.impactLabel}</span> {project.impact}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="olive-chip rounded-full px-3 py-1 text-xs font-medium text-[var(--olive-text)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-5">
          <div className="panel rounded-3xl p-6 sm:p-8 lg:col-span-3">
            <SectionLabel>{ui.sectionLabels.differentials}</SectionLabel>
            <ul className="space-y-3 text-sm leading-relaxed text-[var(--muted)]">
              {locale.differentials.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--olive-soft)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact" className="panel rounded-3xl p-6 sm:p-8 lg:col-span-2">
            <SectionLabel>{ui.sectionLabels.contact}</SectionLabel>
            <p className="text-sm leading-relaxed text-[var(--muted)]">{locale.contact.message}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {portfolioData.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[var(--olive-soft)] hover:text-[var(--olive-soft)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="mailto:rodrigoelyelcb@gmail.com"
              className="mt-6 inline-flex rounded-full bg-[var(--olive)] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[var(--olive-soft)]"
            >
              {ui.contactButton}
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--olive-soft)]">
      {children}
    </h2>
  )
}

function SwitchControl({ leftLabel, rightLabel, checked, onToggle, ariaLabel }) {
  const buttonClasses = checked
    ? 'border-[var(--olive-soft)] bg-[color:color-mix(in_srgb,var(--olive-soft)_10%,transparent)]'
    : 'border-[var(--line)]'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onToggle}
      className={`inline-flex min-w-0 items-center justify-between rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)] transition hover:border-[var(--olive-soft)] ${buttonClasses}`}
    >
      <span className={`min-w-0 flex-1 text-center leading-none ${checked ? 'text-[var(--muted)]' : 'text-[var(--olive-soft)]'}`}>
        {leftLabel}
      </span>
      <span className="relative mx-1.5 h-5 w-10 shrink-0 rounded-full bg-[var(--line)] p-0.5">
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-[var(--olive-soft)] transition-all duration-200 ${
            checked ? 'left-[1.3rem]' : 'left-0.5'
          }`}
        />
      </span>
      <span className={`min-w-0 flex-1 text-center leading-none ${checked ? 'text-[var(--olive-soft)]' : 'text-[var(--muted)]'}`}>
        {rightLabel}
      </span>
    </button>
  )
}

export default App
