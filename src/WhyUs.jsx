import {
  ArrowBadge,
  BookingModal,
  CallToAction,
  DOCTOR,
  REASONS,
  Reveal,
  SiteFooter,
  openBooking,
  SiteHeader,
} from './site.jsx'
import './home.css'
import './why-us.css'

/* The homepage panel makes the case in five lines; this page makes it in full, and puts
   the consultant's own record in front of it rather than after it. */
export default function WhyUs() {
  return (
    <div className="home subpage">
      <SiteHeader page="Why Us" />

      <main>
        <section className="page-head">
          <div className="shell">
            <p className="pill-label">Why Us</p>
            <h1>One consultant, and a record you can check</h1>
            <p className="section-lede">
              Most clinics ask you to take their word for it. Everything on this page is a
              qualification, a post or a practice you can verify before you book.
            </p>
          </div>
        </section>

        {/* The credentials belong next to the face they belong to. */}
        <section className="consultant">
          <Reveal className="shell consultant-inner stagger" prop="--reveal">
            <figure className="consultant-photo" style={{ '--i': 0 }}>
              <img src={DOCTOR.photo} alt={DOCTOR.name} />
            </figure>

            <div className="consultant-body" style={{ '--i': 1 }}>
              <p className="pill-label">Your consultant</p>
              <h2>{DOCTOR.name}</h2>
              <p className="consultant-role">{DOCTOR.role}</p>
              <p className="consultant-post">{DOCTOR.post}</p>

              <ul className="qual-list">
                {DOCTOR.quals.map((qual) => (
                  <li key={qual}>{qual}</li>
                ))}
              </ul>

              <p className="consultant-note">
                Practising at Iqbal Medical Complex, F-10 Markaz, Islamabad.
              </p>

              <button type="button" className="btn btn-primary btn-lg" onClick={openBooking}>
                <ArrowBadge />
                Book an appointment
              </button>
            </div>
          </Reveal>
        </section>

        <section className="detail-list">
          <div className="shell">
            <ol>
              {REASONS.map((reason, i) => (
                <Reveal as="li" className="detail rise" id={reason.slug} key={reason.slug}>
                  <div className="detail-head">
                    <span className="detail-num detail-num-lg">{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="detail-body">
                    <h2>{reason.title}</h2>
                    <p className="detail-copy">{reason.more}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <CallToAction />
      </main>

      <BookingModal />
      <SiteFooter page="Why Us" />
    </div>
  )
}
