import { useCallback, useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'
import './home.css'

/* Swap this for your own clinic photography — anything wide and bright, with the
   subject sitting right of centre so the headline keeps the left half to itself. */
const HERO_IMAGE = '/hero-room.jpg'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
]

const MORE = [
  { label: 'Patient Stories', href: '#stories' },
  { label: 'Insurance', href: '#insurance' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const ABOUT_TEXT =
  'We believe movement is the measure of a good life — and we are here to keep yours steady. ' +
  'Whether you come to us for a second opinion, a stubborn ache, or the joint replacement ' +
  'you have been putting off.'

const CHIPS = ['Orthopaedics', 'Physiotherapy', 'Spine Care', 'Sports Injury', 'Joint Replacement']

const HEADLINE = ['Strong Bones,', 'Healthy Joints.']

const VALUES = [
  {
    title: 'Compassionate Care',
    copy: 'Kindness, patience and respect — nobody is rushed through an appointment here.',
    icon: 'heart',
  },
  {
    title: 'Clinical Excellence',
    copy: 'Consultant-led treatment, current evidence, and equipment we keep genuinely current.',
    icon: 'bulb',
  },
  {
    title: 'Personalised Plans',
    copy: 'No two recoveries are alike — neither are the plans we build around them.',
    icon: 'person',
  },
  {
    title: 'Honest Advice',
    copy: 'You will always know what we recommend and why, including when not to operate.',
    icon: 'shield',
  },
]

const REASONS = [
  'Consultant-led from your first appointment',
  'Imaging, surgery and rehab under one roof',
  'An operation only when it is genuinely the answer',
  'Recovery plans built around your week, not ours',
  'A team that already knows your history',
]

const STATS = [
  ['15+', 'Years of practice'],
  ['25,000+', 'Patients treated'],
  ['12', 'Specialist consultants'],
  ['98%', 'Would recommend us'],
]

const SERVICES = [
  {
    title: 'Pediatric Limb Deformities',
    copy: 'Clubfoot (CTEV) and hip dysplasia (DDH) caught early and corrected with serial casting, bracing and surgery where it is needed.',
    icon: 'pediatric',
  },
  {
    title: 'Children Fracture Management',
    copy: 'Growing bones heal differently. Gentle reduction, child-sized casts and follow-up that keeps an eye on the growth plate.',
    icon: 'childfracture',
  },
  {
    title: 'Fracture Management',
    copy: 'Same-day assessment, reduction and fixation — from a straightforward wrist break to complex multi-fragment trauma.',
    icon: 'trauma',
  },
  {
    title: 'Joint Replacement Surgery',
    copy: 'Hip and knee replacement by a consultant surgeon, with early mobilisation and a clear rehab plan from day one.',
    icon: 'joint',
  },
  {
    title: 'Arthroscopic Keyhole Surgery',
    copy: 'Knee and shoulder repaired through two small ports — less pain, a smaller scar and a quicker return to work.',
    icon: 'arthroscopy',
  },
  {
    title: 'Pain Management',
    copy: 'A dedicated clinic led by a Master in Pain Medicine, for back, neck and joint pain that has refused to settle.',
    icon: 'pain',
  },
  {
    title: 'Joint Injuries',
    copy: 'Ligament, cartilage and rotator cuff injuries assessed, repaired and rehabilitated under one roof.',
    icon: 'sport',
  },
  {
    title: 'Intra-Articular Injections',
    copy: 'PRP and gel placed directly into the joint to calm inflammation, restore glide and put off surgery.',
    icon: 'injection',
  },
  {
    title: 'Nerve Blocks for Pain',
    copy: 'Targeted blocks that interrupt the pain signal, so you can move again while the cause is treated.',
    icon: 'nerve',
  },
  {
    title: 'Manipulation & POP Casting',
    copy: 'Closed manipulation under anaesthesia and plaster casting, with X-ray checks until the bone has set.',
    icon: 'manipulation',
  },
  {
    title: 'Osteoporosis & Arthritis',
    copy: 'Bone-density testing, medication and long-term arthritis plans that keep you steady on your feet.',
    icon: 'bone',
  },
]

/* Small stroked glyphs — one <path> set per service, kept inline so there is no icon dependency. */
function ServiceIcon({ name, className = 'svc-icon' }) {
  const paths = {
    pediatric: 'M12 3.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4M12 7.2v5.3M8.5 9.8h7M12 12.5l-2.6 3.4.8 4.9M12 12.5l2.6 3.4-.8 4.9',
    childfracture: 'M12 3.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4M12 7.2v6.2M8 10.6l4 1.6 4-1.6M8 10.6l1.2 4.2h4.4M10.4 13.6L9.4 20.8M13.6 13.6l1 7.2',
    trauma: 'M6 18a2.5 2.5 0 1 1 2-4l6-6a2.5 2.5 0 1 1 4 2 2.5 2.5 0 1 1-2 4l-6 6a2.5 2.5 0 1 1-4-2M9.6 9.6l4.8 4.8',
    joint: 'M8 3v5a4 4 0 0 0 8 0M8 21v-5a4 4 0 0 1 8 0M6 12h12',
    arthroscopy: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18M12 8.4a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4M10.7 12.4 10 17h4l-.7-4.6',
    pain: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M13.2 7 9.8 12.2h4L10.6 17',
    sport: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M4 8c4 1 12 1 16 0M4 16c4-1 12-1 16 0',
    injection: 'M15.6 2.6 21.4 8.4M20 5.2l-3 3M18 7.2 6.6 18.6l-4 1.4 1.4-4L15.4 4.6M11.2 10.4l3 3',
    nerve: 'M3 12h3l2.4-5 3.2 10 2.4-5H21M6.5 4.5l11 15',
    manipulation: 'M9 21v-5l-2.8-2.8a1.6 1.6 0 0 1 2.2-2.2L10 12.3V4.4a1.4 1.4 0 0 1 2.8 0v5M12.8 9.6V8.2a1.4 1.4 0 0 1 2.8 0v1.8M15.6 10.6V9.4a1.4 1.4 0 0 1 2.8 0V15a6 6 0 0 1-2 4.5V21',
    bone: 'M6 18a2.5 2.5 0 1 1 2-4l6-6a2.5 2.5 0 1 1 4 2 2.5 2.5 0 1 1-2 4l-6 6a2.5 2.5 0 1 1-4-2',
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* How far an element travels between starting and finishing its sweep. The text
   sweep is paced off the whole section; a photo is much shorter than the section,
   so it gets its own, tighter window — measured from the photo itself, or it would
   finish while still below the fold. */
const SECTION_SWEEP = (rect, vh) => rect.height * 0.75 + vh * 0.4
const PHOTO_SWEEP = (rect, vh) => rect.height * 0.6 + vh * 0.3

/* Writes an element's progress through the viewport (0 → 1) to a custom property.
   `start` is the point, as a fraction of viewport height, where the element's top
   begins the sweep. That property is all the scroll handler touches, so React never
   re-renders and everything underneath works out its own opacity and transform in CSS.
   Under prefers-reduced-motion nothing is written and the CSS resting state stands. */
function useScrollProgress(property, start, sweep) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0

    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const progress = (vh * start - rect.top) / sweep(rect, vh)
      el.style.setProperty(property, Math.min(1, Math.max(0, progress)).toFixed(3))
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
  }, [property, start, sweep])

  return ref
}

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
function ValueIcon({ name }) {
  const paths = {
    heart: [
      'M12 20.2S4.4 15.6 4.4 10.6A3.9 3.9 0 0 1 12 8.9a3.9 3.9 0 0 1 7.6 1.7c0 5-7.6 9.6-7.6 9.6Z',
    ],
    bulb: ['M9.2 17.5h5.6M10.4 21h3.2', 'M12 3.4a5.9 5.9 0 0 0-3.4 10.7c.5.4.8 1 .8 1.6h5.2c0-.6.3-1.2.8-1.6A5.9 5.9 0 0 0 12 3.4Z'],
    person: ['M12 12.2a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2', 'M4.8 20.2c1.5-3.4 4-5.1 7.2-5.1s5.7 1.7 7.2 5.1'],
    shield: ['M12 3.2 19 6v5.6c0 4.3-2.9 7.7-7 8.7-4.1-1-7-4.4-7-8.7V6l7-2.8Z', 'm8.9 12 2.3 2.3 4.1-4.4'],
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="value-icon">
      {paths[name].map((d) => (
        <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  )
}

function ArrowBadge() {
  return (
    <span className="arrow-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M5 12h13M12.5 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function SiteHeader() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}>
      <div className="header-inner">
        <a className="site-brand" href="#home">
          {/* The logo artwork carries its own wordmark, so we crop to the emblem and set the name in type. */}
          <span className="brand-mark">
            <img src={logo} alt="" />
          </span>
          <span className="brand-name">Bone Care Centre</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.label}>
                <a href={item.href} className={i === 0 ? 'is-active' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="has-menu">
              <button type="button" aria-haspopup="true">
                All Pages
                <svg viewBox="0 0 24 24" aria-hidden="true" className="caret">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul className="submenu">
                {MORE.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        <a className="btn btn-primary header-cta" href="#book">
          <ArrowBadge />
          Book Now
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="mobile-panel" hidden={!open}>
        {[...NAV, ...MORE].map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="btn btn-primary" href="#book" onClick={() => setOpen(false)}>
          <ArrowBadge />
          Book Now
        </a>
      </div>
    </header>
  )
}

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
            person — because getting back to your life matters more than the scan.
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
        <a className="btn btn-primary btn-lg" href="#story">
          <ArrowBadge />
          Learn more about us
        </a>
      </div>

      {/* Absolutely placed on wide screens; the wrapper only becomes a real row on narrow ones. */}
      <div className="about-photos">
        <figure className="about-photo about-photo-left" ref={leftPhotoRef}>
          <img src="/about-1.jpg" alt="A consultant talking a patient through her results" loading="lazy" />
        </figure>
        <figure className="about-photo about-photo-right" ref={rightPhotoRef}>
          <img src="/about-2.jpg" alt="A patient working through a rehab session in our gym" loading="lazy" />
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
                <a className="btn btn-outline-teal" href="#services">
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
            physio session — in a clinic built to be easy to come back to.
          </p>
        </header>

        <div className="choose-grid">
          <ol className="reasons" ref={listRef}>
            {REASONS.map((reason, i) => (
              <li key={reason} style={{ '--i': i }}>
                <span className="reason-num">{String(i + 1).padStart(2, '0')}/</span>
                <span>{reason}</span>
              </li>
            ))}
          </ol>

          <figure className="choose-media" ref={photoRef}>
            <img src="/dr-sohail.jpg" alt="Dr. Sohail Iqbal Sheikh" loading="lazy" />
            <p className="trust-pill">
              <span className="trust-value">25,000+</span>
              <span>patients treated</span>
            </p>
            <figcaption className="doctor-card" ref={cardRef}>
              <p className="doctor-name">Dr. Sohail Iqbal Sheikh</p>
              <p className="doctor-role">Orthopaedic Surgeon &amp; Pain Specialist</p>
              <p className="doctor-quals">
                MBBS &middot; MS Orth &middot; D. Orth (Aust) &middot; PhD Sports Medicine &middot; Master in
                Pain Medicine
              </p>
              <p className="doctor-post">
                Professor &amp; Consultant, Islamic International Medical College
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="cta" id="book">
      <div className="shell cta-inner">
        <div>
          <h2>Ready to move without thinking about it?</h2>
          <p>
            Same-week consultant appointments. Bring your scans, or we will take them here.
          </p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-primary btn-lg" href="tel:+97100000000">
            <ArrowBadge />
            Call the clinic
          </a>
          <a className="btn btn-outline btn-lg" href="#contact">
            Request a callback
          </a>
        </div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">
            <img src={logo} alt="" />
          </span>
          <div>
            <p className="brand-name">Bone Care Centre</p>
            <p className="footer-tag">Strong bones · Healthy joints · Better life</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {[...NAV.slice(1), ...MORE].map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="footer-legal">© {new Date().getFullYear()} Bone Care Centre. All rights reserved.</p>
      </div>
    </footer>
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
