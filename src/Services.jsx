import {
  ArrowBadge,
  BookingModal,
  CallToAction,
  Reveal,
  SERVICES,
  ServiceIcon,
  SiteFooter,
  openBooking,
  SiteHeader,
} from './site.jsx'
import './home.css'

/* The eleven services from the clinic's own list, each with the fuller write-up the
   homepage carousel has no room for. Anchors match the slugs the homepage cards link to,
   so "View details" lands on the right entry. */
export default function Services() {
  return (
    <div className="home subpage">
      <SiteHeader page="Services" />

      <main>
        <section className="page-head">
          <div className="shell">
            <p className="pill-label">Our Services</p>
            <h1>Orthopaedic and pain care, from the first X-ray to the last review</h1>
            <p className="section-lede">
              Everything below is carried out by Dr. Sohail Iqbal Sheikh, an orthopaedic surgeon
              with a Master in Pain Medicine, at both clinics: Iqbal Medical Complex in F-10
              Markaz, Islamabad, and Bone Care Centre in Rawalpindi. Surgery is only ever one of
              the options on the table.
            </p>

            {/* A dedicated page for eleven services is long, so the index is a way in
                rather than a decoration. */}
            <nav className="chip-nav" aria-label="Services on this page">
              {SERVICES.map((service, i) => (
                <a key={service.slug} href={`#${service.slug}`} style={{ '--i': i }}>
                  <ServiceIcon name={service.icon} className="chip-nav-icon" />
                  {service.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="detail-list">
          <div className="shell">
            <ol>
              {SERVICES.map((service, i) => (
                <Reveal as="li" className="detail rise" id={service.slug} key={service.slug}>
                  <div className="detail-head">
                    <span className="svc-badge">
                      <ServiceIcon name={service.icon} />
                    </span>
                    <span className="detail-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="detail-body">
                    <h2>{service.title}</h2>
                    <p className="detail-copy">{service.detail}</p>
                    <ul className="detail-points">
                      {service.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <button type="button" className="btn btn-outline-teal" onClick={openBooking}>
                      <ArrowBadge />
                      Book this treatment
                    </button>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <CallToAction />
      </main>

      <BookingModal />
      <SiteFooter page="Services" />
    </div>
  )
}
