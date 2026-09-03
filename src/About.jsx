import {
  ArrowBadge,
  BookingModal,
  CallToAction,
  CLINIC,
  CONTACT,
  DOCTOR,
  Reveal,
  SiteFooter,
  SiteHeader,
  telHref,
  VALUES,
  ValueIcon,
} from './site.jsx'
import './home.css'
import './about.css'

/* What the homepage's About panel only gestures at: who runs the clinic, what it stands
   for, what the rooms actually look like, and how to find them. */
export default function About() {
  return (
    <div className="home subpage">
      <SiteHeader page="About" />

      <main>
        <section className="page-head">
          <div className="shell">
            <p className="pill-label">About Us</p>
            <h1>A specialist clinic, not a department you get passed around</h1>
            <p className="section-lede">
              Bone Care Centre is the orthopaedic and pain practice of Dr. Sohail Iqbal Sheikh,
              at Iqbal Medical Complex in F-10 Markaz, Islamabad. One consultant, one plan, and
              a clinic small enough that you are not a file number in it.
            </p>
          </div>
        </section>

        <section className="story">
          <Reveal className="shell story-inner stagger" prop="--reveal">
            <div className="story-copy" style={{ '--i': 0 }}>
              <h2>Movement is the measure of a good life</h2>
              <p>
                Most people arrive here having already been somewhere else. A knee that was
                supposed to settle and did not. A back that has been managed with painkillers for
                years. A fracture that healed, but not quite straight. What they usually want
                first is a straight answer about what is actually wrong.
              </p>
              <p>
                That is where every appointment starts. The assessment is done by the consultant
                himself, the imaging is read in front of you, and the options are laid out with
                the honest trade-offs attached. Surgery is one of those options. So are
                injections, nerve blocks, casting and physiotherapy, and they are offered in that
                order whenever they will do the job.
              </p>
              <p>
                Whether you come for a second opinion, a stubborn ache, or the joint replacement
                you have been putting off, the person who assesses you is the person who treats
                you and the person who follows you up.
              </p>

              <a className="btn btn-primary btn-lg" href="/why-us">
                <ArrowBadge />
                See the credentials behind that
              </a>
            </div>

            <figure className="story-photo" style={{ '--i': 1 }}>
              <img src={DOCTOR.photo} alt={DOCTOR.name} loading="lazy" />
              <figcaption>
                <span className="story-photo-name">{DOCTOR.name}</span>
                <span className="story-photo-role">{DOCTOR.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <section className="about-values">
          <div className="shell">
            <p className="pill-label">Core Values</p>
            <h2>What that looks like in practice</h2>

            <Reveal className="about-values-grid" prop="--reveal">
              {VALUES.map((value, i) => (
                <article className="value-card" key={value.title} style={{ '--i': i }}>
                  <ValueIcon name={value.icon} />
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Photographs of the actual rooms, rather than stock interiors. */}
        <section className="clinic">
          <div className="shell">
            <p className="pill-label">The Clinic</p>
            <h2>What you walk into</h2>
            <p className="section-lede clinic-lede">
              The entrance on F-10 Markaz, the waiting area, and the rooms you are actually seen
              in. Photographed as they are, on an ordinary day.
            </p>

            <Reveal className="clinic-grid stagger" prop="--reveal">
              {CLINIC.map((shot, i) => (
                <figure key={shot.src} style={{ '--i': i }}>
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="find-us">
          <Reveal className="shell find-us-inner stagger" prop="--reveal">
            <div style={{ '--i': 0 }}>
              <p className="pill-label">Find Us</p>
              <h2>Iqbal Medical Complex</h2>
              <address>
                {CONTACT.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div className="phone-list" style={{ '--i': 1 }}>
              <p className="phone-label">Call the clinic</p>
              <ul>
                {CONTACT.phones.map((phone) => (
                  <li key={phone}>
                    <a href={telHref(phone)}>{phone}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <CallToAction />
      </main>

      <BookingModal />
      <SiteFooter page="About" />
    </div>
  )
}
