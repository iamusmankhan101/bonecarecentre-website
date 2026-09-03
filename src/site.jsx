import { useEffect, useRef, useState } from 'react'
import logo from './assets/logo.png'

/* Chrome and content shared by every page. Each page owns its own sections; the header,
   footer, call to action and the service list itself all live here so the two pages
   cannot drift apart. */

/* `hash` is used when the link points at a section of the page you are already on, so
   the homepage keeps its in-page anchors instead of reloading itself; `href` is the
   cross-page form. Contact is the same either way because the footer is on every page. */
export const NAV = [
  { label: 'Home', hash: '#home', href: '/home' },
  { label: 'About', href: '/about' },
  { label: 'Values', hash: '#values', href: '/home#values' },
  { label: 'Services', href: '/services' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Contact', hash: '#contact', href: '#contact' },
]

export const VALUES = [
  {
    title: 'Compassionate Care',
    copy: 'Kindness, patience and respect. Nobody is rushed through an appointment here.',
    icon: 'heart',
  },
  {
    title: 'Clinical Excellence',
    copy: 'Consultant-led treatment, current evidence, and equipment we keep genuinely current.',
    icon: 'bulb',
  },
  {
    title: 'Personalised Plans',
    copy: 'No two recoveries are alike, and neither are the plans we build around them.',
    icon: 'person',
  },
  {
    title: 'Honest Advice',
    copy: 'You will always know what we recommend and why, including when not to operate.',
    icon: 'shield',
  },
]

/* The clinic's own rooms, shown on /about. Nothing staged: this is what you walk into. */
export const CLINIC = [
  { src: '/clinic/entrance.jpg', alt: 'The entrance to Iqbal Medical Complex on F-10 Markaz', caption: 'The entrance' },
  { src: '/clinic/reception.jpg', alt: 'The reception desk inside the building', caption: 'Reception' },
  { src: '/clinic/waiting.jpg', alt: 'Seating in the waiting area', caption: 'Waiting area' },
  { src: '/clinic/corridor.jpg', alt: 'The corridor running between the consulting rooms', caption: 'The corridor' },
  { src: '/clinic/consulting-room.jpg', alt: 'A consulting room with the examination couch alongside the desk', caption: 'Consulting room' },
  { src: '/clinic/treatment-room.jpg', alt: 'A treatment room with the examination couch and stools', caption: 'Treatment room' },
]

/* Straight off the clinic banner. */
export const CONTACT = {
  address: ['Iqbal Medical Complex', 'F-10 Markaz, Islamabad'],
  phones: ['0333-5128377', '0333-5118234', '0345-4396533', '0333-5618753'],
}

/* Rendered on the homepage and again on /about. */
export function ValueIcon({ name }) {
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

/* Used by the homepage's Choose Us panel and again, at length, on /why-us. */
export const DOCTOR = {
  name: 'Dr. Sohail Iqbal Sheikh',
  role: 'Orthopaedic Surgeon & Pain Specialist',
  post: 'Professor & Consultant, Islamic International Medical College',
  photo: '/dr-sohail.jpg',
  quals: ['MBBS', 'MS Orth', 'D. Orth (Aust)', 'PhD Sports Medicine', 'Master in Pain Medicine'],
}

/* Every line here is checkable against Dr. Sheikh's own qualifications rather than the
   soft claims any clinic could make. `detail` is the homepage one-liner; `more` is the
   argument in full on /why-us. */
export const REASONS = [
  {
    slug: 'trained-in-australia',
    title: 'Trained in Australia',
    detail: 'A D. Orth (Aust) on top of MBBS and MS Orth, overseas orthopaedic training few clinics here can offer.',
    more: 'The Diploma in Orthopaedics was taken in Australia, on top of an MBBS and an MS in Orthopaedics earned here. It means the standard you are treated to was set in two health systems rather than one, and that techniques arrive in this clinic without waiting to become common locally.',
  },
  {
    slug: 'phd-sports-medicine',
    title: 'A PhD in sports medicine',
    detail: 'Research-level grounding in how injuries actually heal, not just how they are operated on.',
    more: 'A doctorate is not a requirement for practising orthopaedics, and most surgeons do not have one. It means the reading behind a recommendation goes past the textbook, and that how an injury heals is understood as well as how it is operated on.',
  },
  {
    slug: 'pain-as-a-specialty',
    title: 'Pain treated as its own specialty',
    detail: 'A Master in Pain Medicine, which is why nerve blocks and PRP are core practice here rather than a sideline.',
    more: 'Most orthopaedic clinics treat pain as something that follows the surgery. A Master in Pain Medicine puts it the other way round: pain is worked up as a condition in its own right, which is why nerve blocks, PRP and intra-articular injections are core practice here and not an afterthought.',
  },
  {
    slug: 'teaching',
    title: 'Teaches the next generation',
    detail: 'Professor and Consultant at Islamic International Medical College.',
    more: 'Teaching keeps a surgeon current in a way private practice on its own does not, because every recommendation has to stand up in front of a room of students who will ask why. What you are told here is what is taught at the medical college.',
  },
  {
    slug: 'one-surgeon',
    title: 'One surgeon, start to finish',
    detail: 'The consultant who assesses you is the one who operates and the one who sees you afterwards.',
    more: 'The consultant who assesses you is the one who operates, and the one who sees you at every follow-up. Nothing is handed between juniors, nothing has to be explained twice to a stranger, and there is exactly one person accountable for how your recovery goes.',
  },
]

/* `copy` is the one-liner on the homepage carousel; `detail` and `points` are the fuller
   treatment on /services. `slug` is the anchor a homepage card links through to. */
export const SERVICES = [
  {
    slug: 'pediatric-limb-deformities',
    title: 'Pediatric Limb Deformities',
    icon: 'pediatric',
    copy: 'Clubfoot (CTEV) and hip dysplasia (DDH) caught early and corrected with serial casting, bracing and surgery where it is needed.',
    detail:
      'Clubfoot and hip dysplasia respond best to treatment that starts in the first weeks of life. We assess the limb, stage the correction, and stay with the child through every cast change until the foot or the hip is where it should be.',
    points: [
      'Ponseti serial casting for CTEV',
      'Screening and bracing for DDH',
      'Corrective surgery where casting alone is not enough',
    ],
  },
  {
    slug: 'children-fracture-management',
    title: 'Children Fracture Management',
    icon: 'childfracture',
    copy: 'Growing bones heal differently. Gentle reduction, child-sized casts and follow-up that keeps an eye on the growth plate.',
    detail:
      "A child's bone is not a small adult's bone. It heals faster, it remodels more, and it carries a growth plate that has to be protected. Fractures are reduced gently, cast to the child's size, and followed until growth is back on track.",
    points: [
      'Closed reduction under sedation',
      'Growth-plate injury assessment',
      'Follow-up X-rays until union is confirmed',
    ],
  },
  {
    slug: 'fracture-management',
    title: 'Fracture Management',
    icon: 'trauma',
    copy: 'Same-day assessment, reduction and fixation, from a straightforward wrist break to complex multi-fragment trauma.',
    detail:
      'Broken bones are seen the same day. Simple breaks are reduced and cast; unstable or multi-fragment injuries are fixed with plates, screws or nails. Either way you leave knowing how long the recovery will take.',
    points: [
      'Same-day assessment and reduction',
      'Plating, nailing and external fixation',
      'Cast and brace management through to union',
    ],
  },
  {
    slug: 'joint-replacement',
    title: 'Joint Replacement Surgery',
    icon: 'joint',
    copy: 'Hip and knee replacement by a consultant surgeon, with early mobilisation and a clear rehab plan from day one.',
    detail:
      'When a hip or a knee is worn past the point where injections and physiotherapy can help, replacement gives the joint back. Surgery is consultant-led from consent to discharge, with walking started the same day wherever it is safe to do so.',
    points: [
      'Total hip and total knee replacement',
      'Rapid-recovery protocol with day-one mobilisation',
      'Revision surgery for loosened or failed implants',
    ],
  },
  {
    slug: 'arthroscopy',
    title: 'Arthroscopic Keyhole Surgery',
    icon: 'arthroscopy',
    copy: 'Knee and shoulder repaired through two small ports, with less pain, a smaller scar and a quicker return to work.',
    detail:
      'A camera and fine instruments go in through two small ports, so the joint is repaired without being opened. Far less tissue is disturbed, which means less pain afterwards, a smaller scar and a shorter time away from work.',
    points: [
      'Knee arthroscopy for meniscus, ACL and cartilage',
      'Shoulder arthroscopy for rotator cuff and impingement',
      'Diagnostic scopes where imaging is inconclusive',
    ],
  },
  {
    slug: 'pain-management',
    title: 'Pain Management',
    icon: 'pain',
    copy: 'A dedicated clinic led by a Master in Pain Medicine, for back, neck and joint pain that has refused to settle.',
    detail:
      'Pain that has outlasted its cause is a condition in its own right, and with a Master in Pain Medicine behind the clinic it is treated as one. It is worked up properly first, then managed with the least invasive option that actually works.',
    points: [
      'Chronic back, neck and joint pain',
      'Sciatica and nerve-related pain',
      'Non-surgical options considered before surgery',
    ],
  },
  {
    slug: 'joint-injuries',
    title: 'Joint Injuries',
    icon: 'sport',
    copy: 'Ligament, cartilage and rotator cuff injuries assessed, repaired and rehabilitated under one roof.',
    detail:
      'Ligaments, cartilage and tendons torn in sport or in a fall. Assessment, repair and rehabilitation all happen in one place, so nothing gets lost handing you back and forth between a surgeon and a therapist.',
    points: [
      'ACL and meniscus injuries',
      'Rotator cuff tears and shoulder instability',
      'Return-to-sport rehabilitation planning',
    ],
  },
  {
    slug: 'intra-articular-injections',
    title: 'Intra-Articular Injections',
    icon: 'injection',
    copy: 'PRP and gel placed directly into the joint to calm inflammation, restore glide and put off surgery.',
    detail:
      'Medication placed inside the joint itself, where it works directly on the surfaces that hurt. PRP uses your own platelets to encourage healing; gel restores the glide between worn surfaces. Both can hold surgery off for years.',
    points: [
      'PRP prepared from your own blood',
      'Hyaluronic acid (gel) viscosupplementation',
      'Steroid injections for acute flare-ups',
    ],
  },
  {
    slug: 'nerve-blocks',
    title: 'Nerve Blocks for Pain',
    icon: 'nerve',
    copy: 'Targeted blocks that interrupt the pain signal, so you can move again while the cause is treated.',
    detail:
      'A block interrupts the pain signal at the nerve carrying it. It buys the window in which rehabilitation becomes possible, and it also answers a question: whether that nerve was the source of the pain in the first place.',
    points: [
      'Diagnostic blocks to confirm the source of pain',
      'Therapeutic blocks for sciatica and neuralgia',
      'Image-guided placement for accuracy',
    ],
  },
  {
    slug: 'manipulation-pop',
    title: 'Manipulation & POP Casting',
    icon: 'manipulation',
    copy: 'Closed manipulation under anaesthesia and plaster casting, with X-ray checks until the bone has set.',
    detail:
      'Some fractures and stiff joints can be put right without an incision. Under anaesthesia the bone is manipulated back into position and held in plaster, then checked on X-ray until the alignment has held.',
    points: [
      'Closed manipulation under anaesthesia',
      'Plaster of Paris casting and cast changes',
      'Manipulation for frozen shoulder and stiff joints',
    ],
  },
  {
    slug: 'osteoporosis-arthritis',
    title: 'Osteoporosis & Arthritis',
    icon: 'bone',
    copy: 'Bone-density testing, medication and long-term arthritis plans that keep you steady on your feet.',
    detail:
      'Long-term bone and joint conditions need a long-term plan. Bone density is measured and treatment started before the first fracture rather than after it, and arthritis is managed to keep you moving for as long as possible.',
    points: [
      'Bone-density testing and osteoporosis treatment',
      'Osteoarthritis management plans',
      'Fracture-prevention advice for older patients',
    ],
  },
]

/* How far an element travels between starting and finishing its sweep. The text
   sweep is paced off the whole section; a photo is much shorter than the section,
   so it gets its own, tighter window — measured from the photo itself, or it would
   finish while still below the fold. */
export const SECTION_SWEEP = (rect, vh) => rect.height * 0.75 + vh * 0.4
export const PHOTO_SWEEP = (rect, vh) => rect.height * 0.6 + vh * 0.3

/* Writes an element's progress through the viewport (0 → 1) to a custom property.
   `start` is the point, as a fraction of viewport height, where the element's top
   begins the sweep. That property is all the scroll handler touches, so React never
   re-renders and everything underneath works out its own opacity and transform in CSS.
   Under prefers-reduced-motion nothing is written and the CSS resting state stands. */
export function useScrollProgress(property, start, sweep) {
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

/* Wraps one element in its own scroll progress, so a long page can have every entry time
   its own arrival instead of sharing one value that finishes before the last one is seen.
   Add `rise` to className for the default fade-and-lift, or write `--reveal` and let the
   children stagger themselves off it. */
export function Reveal({ as: Tag = 'div', prop = '--p', start = 0.9, sweep = PHOTO_SWEEP, ...rest }) {
  const ref = useScrollProgress(prop, start, sweep)
  return <Tag ref={ref} {...rest} />
}

/* Small stroked glyphs, one <path> set per service, kept inline so there is no icon dependency. */
export function ServiceIcon({ name, className = 'svc-icon' }) {
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

export function ArrowBadge() {
  return (
    <span className="arrow-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M5 12h13M12.5 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

/* `page` is the label of the nav entry for the page being rendered. It marks that entry
   active, and it is what lets the homepage's own section links stay as plain anchors. */
export function SiteHeader({ page = 'Home' }) {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkTo = (item) => (page === 'Home' && item.hash ? item.hash : item.href)

  return (
    <header className={`site-header${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}>
      <div className="header-inner">
        <a className="site-brand" href={page === 'Home' ? '#home' : '/home'}>
          {/* The logo artwork carries its own wordmark, so we crop to the emblem and set the name in type. */}
          <span className="brand-mark">
            <img src={logo} alt="" />
          </span>
          <span className="brand-name">Bone Care Centre</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={linkTo(item)}
                  className={item.label === page ? 'is-active' : undefined}
                  aria-current={item.label === page ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
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
        {NAV.map((item) => (
          <a key={item.label} href={linkTo(item)} onClick={() => setOpen(false)}>
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

export function CallToAction() {
  return (
    <section className="cta" id="book">
      <div className="shell cta-inner">
        <div>
          <h2>Ready to move without thinking about it?</h2>
          <p>Same-week consultant appointments. Bring your scans, or we will take them here.</p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-primary btn-lg" href="tel:+923335128377">
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

export function SiteFooter({ page = 'Home' }) {
  const linkTo = (item) => (page === 'Home' && item.hash ? item.hash : item.href)

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
          {NAV.slice(1).map((item) => (
            <a key={item.label} href={linkTo(item)}>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="footer-legal">© {new Date().getFullYear()} Bone Care Centre. All rights reserved.</p>
      </div>
    </footer>
  )
}
