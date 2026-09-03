import {
  ArrowBadge,
  CallToAction,
  CLINIC,
  CONTACT,
  DOCTOR,
  SiteFooter,
  SiteHeader,
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
          <div className="shell story-inner">
            <div className="story-copy">
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

            <figure className="story-photo">
              <img src={DOCTOR.photo} alt={DOCTOR.name} loading="lazy" />
              <figcaption>
                <span className="story-photo-name">{DOCTOR.name}</span>
                <span className="story-photo-role">{DOCTOR.role}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="about-values">
          <div className="shell">
            <p className="pill-label">Core Values</p>
            <h2>What that looks like in practice</h2>

            <div className="about-values-grid">
              {VALUES.map((value) => (
                <article className="value-card" key={value.title}>
                  <ValueIcon name={value.icon} />
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Photographs of the actual rooms, rather than stock interiors. */}
        <section className="clinic">
          <div className="shell">
            <p className="pill-label">The Clinic</p>
            <h2>What you walk into</h2>

            <div className="clinic-grid">
              {CLINIC.map((shot) => (
                <figure key={shot.src}>
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="find-us">
          <div className="shell find-us-inner">
            <div>
              <p className="pill-label">Find Us</p>
              <h2>Iqbal Medical Complex</h2>
              <address>
                {CONTACT.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </div>

            <div className="phone-list">
              <p className="phone-label">Call the clinic</p>
              <ul>
                {CONTACT.phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:+92${phone.replace(/\D/g, '').replace(/^0/, '')}`}>{phone}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>

      <SiteFooter page="About" />
    </div>
  )
}
