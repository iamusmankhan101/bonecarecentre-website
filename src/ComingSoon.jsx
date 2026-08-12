import { useEffect, useState } from 'react'
import logo from './assets/logo.jpg'

// Target launch date — change this to your real launch.
const LAUNCH_DATE = new Date('2026-10-01T09:00:00+04:00')

function getRemaining(target) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff === 0,
  }
}

function Countdown() {
  const [time, setTime] = useState(() => getRemaining(LAUNCH_DATE))

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(LAUNCH_DATE)), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    ['Days', time.days],
    ['Hours', time.hours],
    ['Minutes', time.minutes],
    ['Seconds', time.seconds],
  ]

  return (
    <div className="countdown" aria-label="Time until launch">
      {units.map(([label, value]) => (
        <div className="unit" key={label}>
          <span className="value">{String(value).padStart(2, '0')}</span>
          <span className="label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function NotifyForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  // No backend yet — swap this for a real POST when the endpoint exists.
  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  if (sent) {
    return (
      <p className="notice" role="status">
        Thank you — we&rsquo;ll let you know the moment we go live.
      </p>
    )
  }

  return (
    <form className="notify" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="email">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Notify me</button>
    </form>
  )
}

export default function ComingSoon() {
  return (
    <main className="page">
      <div className="glow" aria-hidden="true" />

      <header className="brand">
        <img
          className="logo"
          src={logo}
          alt="Bone Care Centre — stronger bones, better life"
          width="1254"
          height="1254"
        />
      </header>

      <section className="hero">
        <p className="eyebrow">Something strong is on the way</p>
        <h1>
          Our new home for
          <br />
          <em>orthopaedic care</em> is coming soon.
        </h1>
        <p className="lede">
          Specialist bone, joint and spine care — from diagnosis to rehabilitation. We&rsquo;re
          building a better place to book, learn and recover.
        </p>

        <Countdown />
        <NotifyForm />

        <ul className="pillars">
          <li>
            <strong>Orthopaedics</strong>
            <span>Fracture &amp; joint care</span>
          </li>
          <li>
            <strong>Spine</strong>
            <span>Back &amp; neck treatment</span>
          </li>
          <li>
            <strong>Physiotherapy</strong>
            <span>Guided rehabilitation</span>
          </li>
        </ul>
      </section>
    </main>
  )
}
