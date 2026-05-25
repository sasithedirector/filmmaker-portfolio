import { useState, useEffect } from 'react';
import React from 'react';
import './css/global.css';
import './css/hero.css';
import './css/navbar.css';
import './css/films.css';
import './css/about.css';
import './css/contact.css';
import './css/footer.css';
import './css/cursor.css';

// ─── Types ──────────────────────────────────────────────
interface Film {
  id: number;
  title: string;
  year: string;
  role: string;
  genre: string;
  description: string;
  awards?: string[];
}

// ─── Data ──────────────────────────────────────────────
const FILMS: Film[] = [
  {
    id: 1,
    title: 'Needhi naadhi oke Katha',
    year: '2024',
    role: 'Writer & Director',
    genre: 'Rom-Com',
    description: 'A deaf musician navigates a world of sound she can never hear, uncovering a conspiracy that threatens her city. Shot entirely in monochrome with a single color accent.',
    awards: ['Best Narrative Feature — Indie Film Fest 2024', 'Audience Choice — CineVision Awards'],
  },
  {
    id: 2,
    title: 'The Last Signal',
    year: '2023',
    role: 'Director',
    genre: 'Sci-Fi / Mystery',
    description: 'A deep-space radio operator receives a transmission that shouldn\'t exist — a voice from a civilization that died a thousand years ago. But the message is addressed to her by name.',
    awards: ['Best Sci-Fi Short — Nebula Film Festival'],
  },
  {
    id: 3,
    title: 'Borrowed Time',
    year: '2022',
    role: 'Writer & Director',
    genre: 'Romance / Fantasy',
    description: 'Two strangers discover they\'re living the same day on loop — but in different centuries. A meditation on fate, connection, and the courage to break cycles.',
  },
  {
    id: 4,
    title: 'Concrete Garden',
    year: '2021',
    role: 'Director & Cinematographer',
    genre: 'Documentary',
    description: 'An intimate portrait of urban farmers transforming abandoned lots into thriving green spaces across three cities. Four years in the making.',
    awards: ['Best Documentary — Green Lens Film Festival'],
  },
];

// ─── Navbar ─────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a className="navbar__logo" onClick={() => scrollTo('hero')}>
          <span className="navbar__logo-mark">◈</span>
          <span className="navbar__logo-text">Sasi Kaladhar</span>
        </a>
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {['Films', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <a onClick={() => scrollTo(item.toLowerCase())}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ─── Custom Cursor ──────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;
  return (
    <>
      <div className="cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-ring" style={{ left: pos.x, top: pos.y }} />
    </>
  );
}

// ─── Hero Section ───────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  // Film reel counter animation
  useEffect(() => {
    const target = 247;
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= target) { clearInterval(interval); return target; }
        return prev + Math.ceil((target - prev) / 12);
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Film grain overlay */}
      <div className="hero__grain" />

      {/* Animated background lines */}
      <div className="hero__bg-lines">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="hero__bg-line" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Floating particles */}
      <div className="hero__particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{
            '--x': Math.random() * 100,
            '--delay': Math.random() * 8,
            '--size': Math.random() * 3 + 1,
            '--duration': Math.random() * 6 + 4,
          } as React.CSSProperties} />
        ))}
      </div>

      <div className="hero__content">
        <div className={`hero__subtitle hero__item ${loaded ? 'visible' : ''}`}>
          <span className="hero__subtitle-line" />
          Writer · Director · Visual Storyteller
          <span className="hero__subtitle-line" />
        </div>

        <h1 className={`hero__title hero__item ${loaded ? 'visible' : ''}`}>
          <span className="hero__title-line">Crafting Worlds</span>
          <span className="hero__title-line hero__title-line--accent">Frame by Frame</span>
        </h1>

        <p className={`hero__description hero__item ${loaded ? 'visible' : ''}`}>
          I believe every story deserves to be told with intention, beauty, and truth.
          From intimate character studies to epic visions — I create cinema that lingers.
        </p>

        <div className={`hero__cta hero__item ${loaded ? 'visible' : ''}`}>
          <button className="btn btn--primary" onClick={() => document.getElementById('films')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Explore My Work</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </button>
          <button className="btn btn--ghost" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            About Me
          </button>
        </div>

        <div className={`hero__stats hero__item ${loaded ? 'visible' : ''}`}>
          <div className="stat">
            <span className="stat__number">{counter}</span>
            <span className="stat__label">Films Shot</span>
          </div>
          <div className="stat__divider" />
          <div className="stat">
            <span className="stat__number">12</span>
            <span className="stat__label">Awards Won</span>
          </div>
          <div className="stat__divider" />
          <div className="stat">
            <span className="stat__number">8+</span>
            <span className="stat__label">Years Active</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`hero__scroll ${loaded ? 'visible' : ''}`}>
        <div className="scroll-indicator">
          <div className="scroll-indicator__mouse">
            <div className="scroll-indicator__wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Section Reveal Hook (inline) ─────────────────────── */
function useReveal<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Film Card ──────────────────────────────────────────
function FilmCard({ film, index }: { film: Film; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);

  // Generate a unique color gradient per card
  const gradients = [
    'from-amber-900/40 via-amber-800/20 to-transparent',
    'from-indigo-900/40 via-indigo-800/20 to-transparent',
    'from-rose-900/40 via-rose-800/20 to-transparent',
    'from-emerald-900/40 via-emerald-800/20 to-transparent',
  ];

  return (
    <div
      ref={ref}
      className={`film-card ${index % 2 === 0 ? 'film-card--left' : 'film-card--right'} reveal`}
      style={{ '--delay': index * 0.15 } as React.CSSProperties}
    >
      {/* Film number */}
      <div className="film-card__number">
        {(index + 1).toString().padStart(2, '0')}
      </div>

      {/* Visual placeholder */}
      <div className={`film-card__visual bg-gradient-to-br ${gradients[index % gradients.length]}`}>
        <div className="film-card__visual-overlay">
          <div className="film-card__play-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        <div className="film-card__year-badge">{film.year}</div>
      </div>

      {/* Content */}
      <div className="film-card__content">
        <div className="film-card__meta">
          <span className="film-card__role">{film.role}</span>
          <span className="film-card__genre">{film.genre}</span>
        </div>
        <h3 className="film-card__title">{film.title}</h3>
        <p className={`film-card__description ${expanded ? 'expanded' : ''}`}>
          {film.description}
        </p>
        <button className="film-card__toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Read less' : 'Read more'}
        </button>
        {film.awards && film.awards.length > 0 && (
          <div className="film-card__awards">
            {film.awards.map((award, i) => (
              <div key={i} className="award">
                <span className="award-icon">★</span>
                {award}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Films Section ──────────────────────────────────────
function Films() {
  const headerRef = useReveal<HTMLDivElement>();

  return (
    <section id="films" className="films">
      <div className="section-inner">
        <div ref={headerRef} className="section-header reveal">
          <span className="section-tag">Selected Works</span>
          <h2 className="section-title">Filmography</h2>
          <p className="section-subtitle">
            A curated collection of my most impactful projects — each one a chapter in my creative journey.
          </p>
        </div>

        <div className="films__grid">
          {FILMS.map((film, i) => (
            <FilmCard key={film.id} film={film} index={i} />
          ))}
        </div>

        {/* Showreel CTA */}
        <div className="films__showreel">
          <div className="showreel-card">
            <div className="showreel-card__icon">▶</div>
            <div className="showreel-card__text">
              <h3>Watch the Showreel</h3>
              <p>A 3-minute visual journey through my best moments behind the camera.</p>
            </div>
            <button className="btn btn--primary btn--sm">Play Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────
function About() {
  const ref = useReveal<HTMLElement>();

  const skills = [
    'Directing', 'Screenwriting', 'Cinematography', 'Editing',
    'Color Grading', 'Sound Design', 'Production Design', 'Visual FX',
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="section-inner">
        <div className="section-header reveal">
          <span className="section-tag">The Person Behind the Lens</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about__layout">
          {/* Photo area */}
          <div className="about__photo reveal">
            <div className="photo-frame">
              <div className="photo-frame__placeholder">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span>Your Photo</span>
              </div>
              <div className="photo-frame__border" />
            </div>
            {/* Decorative element */}
            <div className="about__quote-mark">"</div>
          </div>

          {/* Bio */}
          <div className="about__bio reveal">
            <h3 className="about__name">[Your Name]</h3>
            <p className="about__tagline">Director · Writer · Cinematographer</p>
            <div className="about__text">
              <p>
                I've always been drawn to stories that live in the spaces between words — the glances,
                the silences, the moments where emotion speaks louder than dialogue. My filmmaking journey
                began with a borrowed camera and an obsession with capturing the human condition.
              </p>
              <p>
                Over the past 8+ years, I've directed across genres — from intimate dramas that unfold
                in single rooms to sprawling sci-fi epics. My work has been featured at film festivals
                worldwide, and I've had the privilege of collaborating with some of the most passionate
                creatives in the industry.
              </p>
              <p>
                When I'm not behind the camera, you'll find me writing my next screenplay, exploring
                new visual techniques, or mentoring emerging filmmakers. I believe cinema is at its
                most powerful when it reminds us of our shared humanity.
              </p>
            </div>

            {/* Skills tags */}
            <div className="about__skills">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ────────────────────────────────────
function Contact() {
  const ref = useReveal<HTMLElement>();
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('sent');
      else setStatus('error');
    } catch {
      setStatus('sent'); // Demo mode — always succeeds
    }
  };

  return (
    <section id="contact" className="contact" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-inner">
        <div className="section-header reveal">
          <span className="section-tag">Let's Create Together</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? A story that needs telling? I'd love to hear from you.
          </p>
        </div>

        <div className="contact__layout">
          {/* Info */}
          <div className="contact__info reveal">
            <div className="contact-card">
              <div className="contact-card__icon">✉</div>
              <div>
                <h4>Email</h4>
                <p>hello@yourname.com</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card__icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>Los Angeles, CA</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card__icon">⏱</div>
              <div>
                <h4>Response Time</h4>
                <p>Within 48 hours</p>
              </div>
            </div>

            {/* Social links */}
            <div className="contact__social">
              {['Vimeo', 'Instagram', 'Letterboxd', 'IMDb'].map((s) => (
                <a key={s} className="social-link">{s}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className={`contact__form reveal ${status === 'sent' ? 'form--sent' : ''}`} onSubmit={handleSubmit}>
            {status === 'sent' ? (
              <div className="form-success">
                <div className="form-success__icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you within 48 hours.</p>
                <button className="btn btn--ghost btn--sm" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', project: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name" type="text" placeholder="John Doe" required
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" type="email" placeholder="john@example.com" required
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="project">Project Type</label>
                  <select
                    id="project"
                    value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}
                  >
                    <option value="">Select a project type</option>
                    <option value="film">Short Film / Feature</option>
                    <option value="commercial">Commercial / Branded Content</option>
                    <option value="music">Music Video</option>
                    <option value="doc">Documentary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message" rows={5} placeholder="Tell me about your project..." required
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--full" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">◈ Director</span>
          <p>Crafting cinema that lingers.</p>
        </div>
        <div className="footer__links">
          {['Films', 'About', 'Contact'].map((item) => (
            <a key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}>
              {item}
            </a>
          ))}
        </div>
        <div className="footer__copy">
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <span className="footer__made">Made with passion & obsession for cinema</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <Films />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
