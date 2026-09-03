import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowBadge,
  CallToAction,
  DOCTOR,
  PHOTO_SWEEP,
  REASONS,
  SECTION_SWEEP,
  SERVICES,
  ServiceIcon,
  SiteFooter,
  SiteHeader,
  useScrollProgress,
  VALUES,
  ValueIcon,
} from './site.jsx'
import './home.css'

/* Swap this for your own clinic photography — anything wide and bright, with the
   subject sitting right of centre so the headline keeps the left half to itself. */
const HERO_IMAGE = '/hero-room.jpg'

/* One entry per section that actually exists on the page — every href here has a
   matching id below, so nothing in the nav scrolls to nowhere. */
const ABOUT_TEXT =
  'We believe movement is the measure of a good life, and we are here to keep yours steady. ' +
  'Whether you come to us for a second opinion, a stubborn ache, or the joint replacement ' +
  'you have been putting off.'

const CHIPS = ['Orthopaedics', 'Physiotherapy', 'Spine Care', 'Sports Injury', 'Joint Replacement']

const HEADLINE = ['Strong Bones,', 'Healthy Joints.']

const STATS = [
  ['15+', 'Years of practice'],
  ['25,000+', 'Patients treated'],
  ['12', 'Specialist consultants'],
  ['98%', 'Would recommend us'],
]

/* How far the page has scrolled away from the top, 0 → 1 over one viewport. The hero
   uses it to drift its photo and let the copy recede — measured from the window rather
   than an element, since the hero starts flush against the top of the page. */
function useViewportScroll(property) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0

    const update = () => {
      frame = 0
      const vh = window.innerHeight || 1
      el.style.setProperty(property, Math.min(1, Math.max(0, window.scrollY / vh)).toFixed(4))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [property])

  return ref
}

function RevealText({ text }) {
  const words = text.split(' ')

  return (
    <p className="reveal" style={{ '--total': words.length }}>
      {words.map((word, i) => (
        <span className="reveal-word" key={`${word}-${i}`} style={{ '--i': i }}>
          {word}{' '}
        </span>
      ))}
    </p>
  )
}

/* Same stroked-glyph treatment as the service icons, at a larger size. */

function Hero() {
  const ref = useViewportScroll('--scrolled')

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-media">
        <img src={HERO_IMAGE} alt="" fetchpriority="high" />
        <div className="hero-scrim" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="asterisk">
              <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span>
              We invite you to take pride in
              <br />
              how freely you move.
            </span>
          </p>

          {/* Each line is masked by its own overflow, so it can slide up from nothing. */}
          <h1>
            {HEADLINE.map((line, i) => (
              <span className="line" key={line}>
                <span className="line-in" style={{ '--i': i }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <ul className="chips">
            {CHIPS.map((chip, i) => (
              <li key={chip} style={{ '--i': i }}>
                {chip}
              </li>
            ))}
          </ul>

          <p className="hero-lede">
            Specialist orthopaedic, spine and joint care from consultants who treat the whole
            person, because getting back to your life matters more than the scan.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#book">
              <ArrowBadge />
              Book an appointment
            </a>
            <a className="btn btn-ghost btn-lg" href="#services">
              Explore treatments
            </a>
          </div>
        </div>

        <aside className="rating-card" aria-label="Patient rating">
          <p className="rating-score">
            4.9
            <span className="star" aria-hidden="true">
              ★
            </span>
          </p>
          <div className="rating-foot">
            <span className="avatars" aria-hidden="true">
              <i className="a1">RK</i>
              <i className="a2">SM</i>
              <i className="a3">AH</i>
              <i className="a-plus">+</i>
            </span>
            <span className="rating-label">
              Happy
              <br />
              Patients
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}

function About() {
  const sectionRef = useScrollProgress('--reveal', 0.84, SECTION_SWEEP)
  const leftPhotoRef = useScrollProgress('--p', 0.96, PHOTO_SWEEP)
  const rightPhotoRef = useScrollProgress('--p', 0.96, PHOTO_SWEEP)

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="shell about-inner">
        <p className="pill-label">About Us</p>
        <RevealText text={ABOUT_TEXT} />
        <a className="btn btn-primary btn-lg" href="/about">
          <ArrowBadge />
          Learn more about us
        </a>
      </div>

      {/* Absolutely placed on wide screens; the wrapper only becomes a real row on narrow ones. */}
      <div className="about-photos">
        <figure className="about-photo about-photo-left" ref={leftPhotoRef}>
          <img
            src="/about-clinic-1.jpg"
            alt="A consulting room, with the examination couch alongside the consultant's desk"
            loading="lazy"
          />
        </figure>
        <figure className="about-photo about-photo-right" ref={rightPhotoRef}>
          <img
            src="/about-clinic-2.jpg"
            alt="A consultation desk looking out to the patient chairs and examination couch"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  )
}

function Values() {
  const ref = useScrollProgress('--reveal', 0.84, SECTION_SWEEP)

  return (
    <section className="values" id="values" ref={ref}>
      <div className="shell values-inner">
        <div className="values-copy">
          <p className="pill-label">Core Values</p>
          <h2>The principles behind every recovery we support</h2>
          <p className="section-lede">
            Everything we do follows from the same commitments: careful diagnosis, treatment you
            understand, and a team that stays with you until you are back on your feet.
          </p>
        </div>

        <div className="values-grid">
          {VALUES.map((value, i) => (
            <article className="value-card" key={value.title} style={{ '--i': i }}>
              <ValueIcon name={value.icon} />
              <div>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="shell stats-grid">
        {STATS.map(([value, label]) => (
          <div className="stat" key={label}>
            <p className="stat-value">{value}</p>
            <p className="stat-label">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* The pinned and scroller layouts are chosen in CSS (viewport width, reduced motion),
   so the script asks the track which one is live rather than re-testing the queries. */
const isPinned = (track) => getComputedStyle(track).overflowX !== 'auto'

function Services() {
  const sectionRef = useScrollProgress('--reveal', 0.84, SECTION_SWEEP)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const [bounds, setBounds] = useState({ start: true, end: false })
  const lastBounds = useRef(bounds)

  // The rAF handler runs on every scroll frame, so only re-render when a bound flips.
  const applyBounds = useCallback((next) => {
    if (lastBounds.current.start === next.start && lastBounds.current.end === next.end) return
    lastBounds.current = next
    setBounds(next)
  }, [])

  /* Wide screens pin the section and pull the track sideways as the page scrolls: the
     wrapper is one viewport tall plus the track's overflow, so the fraction of it that
     has passed the top of the window is the fraction of the track to slide. Narrow
     screens and reduced-motion fall back to a plain horizontal scroller (see home.css),
     which is what the `pinned` check below reads off the track's own overflow. */
  useEffect(() => {
    const pin = pinRef.current
    const track = trackRef.current
    if (!pin || !track) return
    let frame = 0

    // Pinned, the track is wider than the window and nothing scrolls it; unpinned, it is
    // a scroller and its own overflow is the travel.
    const travelOf = () =>
      Math.max(
        0,
        track.scrollWidth - (isPinned(track) ? track.parentElement.clientWidth : track.clientWidth),
      )

    const measure = () => {
      pin.style.setProperty('--travel', `${travelOf()}px`)
    }

    const update = () => {
      frame = 0
      if (isPinned(track)) {
        const rect = pin.getBoundingClientRect()
        const distance = rect.height - (window.innerHeight || 1)
        const progress = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : 0
        pin.style.setProperty('--pin', progress.toFixed(4))
        applyBounds({ start: progress <= 0.002, end: progress >= 0.998 })
      } else {
        const max = track.scrollWidth - track.clientWidth
        applyBounds({ start: track.scrollLeft <= 1, end: track.scrollLeft >= max - 1 })
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [applyBounds])

  /* One card either way — while pinned that means scrolling the page by the slice of the
     pin that moves the track that far. */
  const step = (direction) => {
    const track = trackRef.current
    const pin = pinRef.current
    if (!track || !pin) return

    const card = track.firstElementChild
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const distance = direction * ((card?.offsetWidth || track.clientWidth) + gap)
    const behavior = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

    if (isPinned(track)) {
      const travel = track.scrollWidth - track.parentElement.clientWidth
      if (travel <= 0) return
      const pinHeight = pin.getBoundingClientRect().height - (window.innerHeight || 1)
      window.scrollBy({ top: (distance / travel) * pinHeight, behavior })
    } else {
      track.scrollBy({ left: distance, behavior })
    }
  }

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services-pin" ref={pinRef}>
        <div className="services-sticky">
          <div className="shell">
            <header className="services-head">
              <div>
                <p className="pill-label">Our Services</p>
                <h2>Comprehensive care for every bone, joint and muscle</h2>
              </div>
              <div className="carousel-nav">
                <button type="button" onClick={() => step(-1)} disabled={bounds.start} aria-label="Previous services">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 12H6M11.5 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button type="button" onClick={() => step(1)} disabled={bounds.end} aria-label="More services">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h13M12.5 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </header>
          </div>

          <div className="svc-track" ref={trackRef} tabIndex={0} role="group" aria-label="Services, scrollable">
            {SERVICES.map((service, i) => (
              <article className="svc-card" key={service.title} style={{ '--i': i }}>
                <ServiceIcon name={service.icon} className="svc-watermark" />
                <span className="svc-badge">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a className="btn btn-outline-teal" href={`/services#${service.slug}`}>
                  <ArrowBadge />
                  View details
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChooseUs() {
  const ref = useScrollProgress('--reveal', 0.84, SECTION_SWEEP)
  const photoRef = useScrollProgress('--p', 0.96, PHOTO_SWEEP)
  /* The list and the trust card sit well down the section — timing them off the section's
     own progress finished them while they were still below the fold, so each is measured
     where it actually is. */
  const listRef = useScrollProgress('--list', 0.92, PHOTO_SWEEP)
  const cardRef = useScrollProgress('--card', 0.98, PHOTO_SWEEP)

  return (
    <section className="choose" id="why" ref={ref}>
      <div className="shell">
        <header className="section-head choose-head">
          <p className="pill-label">Choose Us</p>
          <h2>Experience, judgement and recoveries you can trust</h2>
          <p className="section-lede">
            One team, one plan, and the same consultant from the first scan to the last
            physio session, in a clinic built to be easy to come back to.
          </p>
        </header>

        <div className="choose-grid">
          {/* One grid cell, so the button stays with the list it belongs to. */}
          <div className="choose-reasons" ref={listRef}>
            <ol className="reasons">
              {REASONS.map((reason, i) => (
                <li key={reason.title} style={{ '--i': i }}>
                  <span className="reason-num">{String(i + 1).padStart(2, '0')}/</span>
                  <span className="reason-body">
                    <span className="reason-title">{reason.title}</span>
                    <span className="reason-detail">{reason.detail}</span>
                  </span>
                </li>
              ))}
            </ol>

            <a className="btn btn-primary btn-lg choose-cta" href="/why-us">
              <ArrowBadge />
              Why patients choose us
            </a>
          </div>

          <figure className="choose-media" ref={photoRef}>
            <img src={DOCTOR.photo} alt={DOCTOR.name} loading="lazy" />
            <p className="trust-pill">
              <span className="trust-value">25,000+</span>
              <span>patients treated</span>
            </p>
            <figcaption className="doctor-card" ref={cardRef}>
              <p className="doctor-name">{DOCTOR.name}</p>
              <p className="doctor-role">{DOCTOR.role}</p>
              <p className="doctor-quals">{DOCTOR.quals.join(' \u00b7 ')}</p>
              <p className="doctor-post">{DOCTOR.post}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="home">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Values />
        <Stats />
        <Services />
        <ChooseUs />
        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  )
}
