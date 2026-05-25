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
  videoUrl?: string;
}

// ─── Data ──────────────────────────────────────────────
const FILMS: Film[] = [
  {
    id: 1,
    title: 'Needhi naadhi oke Katha',
    year: '2025',
    role: 'Writer -  Director - editor & Cinematographer',
    genre: 'Rom-Com',
    description: '"Needhi Naadhi Okate Katha" is an emotional coming-of-age short film that explores love, friendship, memories, and the moments we often leave unspoken. Through two parallel journeys that unexpectedly reflect each other, the story captures the beauty of college life and the emotions that shape us forever. Sometimes, different people live the same story in different ways.',
    awards: ['2nd Best short Film — VJ FilmMania 2026'],
    videoUrl: '/videos/needhi-naadhi.mp4',
  },
  {
    id: 2,
    title: 'The Guide',
    year: '2026',
    role: 'Director - Writer & Cinematographer',
    genre: 'Fantasy / Drama',
    description: 'Goutham Pardhasaaradhi, a continuation of Goutham’s journey from "Needhi Naadhi Okate Katha," is a student struggling with rejection, academic pressure, family expectations, and the problems of everyday life. When he reaches his lowest point, he discovers a new perspective that changes the way he sees himself and life. This story highlights how the Bhagavad Gita can provide guidance, help improve our mindset, and teach valuable lessons to face life’s challenges.',
    awards: ['Runner up short Film — VJ FilmMania 2026'],
  },
  {
    id: 3,
    title: 'Krishnastami Documentary',
    year: '2025',
    role: 'Director - Writer',
    genre: 'Documentary ',
    description: 'For Krishna Janmashtami in August 2025, we created a documentary for FOLK (ISKCON) as part of VJ TEATRO in our college. The documentary aimed to capture the spirit, devotion, cultural significance, and celebrations surrounding the occasion. Through storytelling, visuals, and creative presentation, our team worked together to showcase the essence of the festival while gaining valuable hands-on experience in filmmaking and content creation.',
    videoUrl: 'https://www.youtube.com/watch?v=C3WKUorZtDc',
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

      {/* Visual */}
      {film.videoUrl ? (() => {
        const isYouTube = film.videoUrl.includes('youtube.com') || film.videoUrl.includes('youtu.be');
        const isDrive = film.videoUrl.includes('drive.google.com');
        const isLocal = film.videoUrl.startsWith('/');
        if (isLocal) {
          return (
            <div className="film-card__visual film-card__visual--video">
              <video
                src={film.videoUrl}
                title={film.title}
                controls
                preload="metadata"
                className="film-card__video"
              />
              <div className="film-card__year-badge">{film.year}</div>
            </div>
          );
        }
        let embedUrl = film.videoUrl;
        if (isYouTube) {
          embedUrl = film.videoUrl.replace('watch?v=', 'embed/');
        } else if (isDrive && film.videoUrl.includes('/view')) {
          embedUrl = film.videoUrl.replace(/\/view.*/, '/preview');
        }
        return (
          <div className="film-card__visual film-card__visual--video">
            <iframe
              src={embedUrl}
              title={film.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="film-card__iframe"
            />
            <div className="film-card__year-badge">{film.year}</div>
          </div>
        );
      })() : (
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
      )}

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
  const headerRef = useReveal<HTMLDivElement>();
  const photoRef = useReveal<HTMLDivElement>();
  const bioRef = useReveal<HTMLDivElement>();

  const skills = [
    'Directing', 'Screenwriting', 'Cinematography', 'Editing',
     'Production Design', 'Visual FX',
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="section-inner">
        <div ref={headerRef} className="section-header">
          <span className="section-tag">The Person Behind the Lens</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about__layout">
          {/* Photo area */}
          <div className="about__photo" ref={photoRef}>
            <div className="photo-frame">
              <img src="./profile.jpg" alt="Sasi Kaladhar" className="photo-frame__img" />
              <div className="photo-frame__border" />
            </div>
            {/* Decorative element */}
            <div className="about__quote-mark">"</div>
          </div>

          {/* Bio */}
          <div className="about__bio" ref={bioRef}>
            <h3 className="about__name">[Sasi Kaladhar ]</h3>
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
  const headerRef = useReveal<HTMLDivElement>();
  const infoRef = useReveal<HTMLDivElement>();
  const formRef = useReveal<HTMLFormElement>();
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }
      await emailjs.send('sasigsk', 'template_bqdjxe7', {
        name: form.name,
        email: form.email,
        project: form.project || 'Not specified',
        message: form.message,
      });
      setStatus('sent');
    } catch (err) {
      console.error('Email send error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-inner">
        <div ref={headerRef} className="section-header">
          <span className="section-tag">Let's Create Together</span>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? A story that needs telling? I'd love to hear from you.
          </p>
        </div>

        <div className="contact__layout">
          {/* Info */}
          <div className="contact__info" ref={infoRef}>
            <div className="contact-card">
              <div className="contact-card__icon">✉</div>
              <div>
                <h4>Email</h4>
                <p>sasithedirector@gmail.com</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-card__icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>Kukatpally, Hyderabad.</p>
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
          <form ref={formRef} className={`contact__form ${status === 'sent' ? 'form--sent' : ''} ${status === 'error' ? 'form--error' : ''}`} onSubmit={handleSubmit}>
            {status === 'sent' ? (
              <div className="form-success">
                <div className="form-success__icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you within 48 hours.</p>
                <button className="btn btn--ghost btn--sm" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', project: '', message: '' }); }}>
                  Send Another
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="form-success form-success--error">
                <div className="form-success__icon">✕</div>
                <h3>Sending Failed</h3>
                <p>Something went wrong. Please try again or email me directly at sasithedirector@gmail.com</p>
                <button className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name" type="text" placeholder="Sasi kaladhar" required
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email" type="email" placeholder="sasithedirector@gmail.com" required
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
          <span className="footer__logo">◈ Sasi Kaldhar</span>
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
