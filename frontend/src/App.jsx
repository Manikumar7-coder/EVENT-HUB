import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import {
  FiCalendar,
  FiMapPin,
  FiSearch,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiPlay,
  FiStar,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiMail,
  FiChevronDown,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi';
import axios from 'axios';
import './App.css';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const sampleEvents = [
  {
    _id: '1',
    title: 'Neon Nights Summit',
    description: 'A premium networking experience for founders and creators.',
    banner: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
    venue: 'Skyline Hall',
    location: 'Mumbai',
    date: '2026-08-12',
    time: '7:00 PM',
    category: 'Networking',
    price: 1299,
    availableSeats: 120,
    organizer: { name: 'Ava Rao' },
    featured: true,
  },
  {
    _id: '2',
    title: 'Design Systems Masterclass',
    description: 'Learn modern UI systems from top product leaders.',
    banner: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    venue: 'Orbit Studio',
    location: 'Bengaluru',
    date: '2026-09-03',
    time: '6:30 PM',
    category: 'Workshop',
    price: 899,
    availableSeats: 80,
    organizer: { name: 'Nikhil Shah' },
    featured: false,
  },
  {
    _id: '3',
    title: 'AI Builders Mixer',
    description: 'Meet ambitious builders shaping the next AI products.',
    banner: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
    venue: 'Blue Wharf',
    location: 'Delhi',
    date: '2026-09-20',
    time: '8:00 PM',
    category: 'Tech',
    price: 1499,
    availableSeats: 200,
    organizer: { name: 'Priya Mehta' },
    featured: true,
  },
];

const categories = ['All', 'Networking', 'Workshop', 'Tech'];

const stats = [
  { label: 'Active users', value: '120K+' },
  { label: 'Events hosted', value: '9.8K' },
  { label: 'Tickets sold', value: '480K' },
];

const highlights = [
  {
    icon: <FiStar />,
    title: 'Premium Discovery',
    text: 'Beautifully curated events tailored for modern professionals.',
  },
  {
    icon: <FiShield />,
    title: 'Secure Checkout',
    text: 'A polished simulated Razorpay experience with instant confirmations.',
  },
  {
    icon: <FiTrendingUp />,
    title: 'Smart Growth',
    text: 'Built for organizers, creators, and community-driven brands.',
  },
];

const testimonials = [
  {
    quote: 'The experience feels cinematic and effortless. This is the kind of product that gets noticed.',
    author: 'Maya Chen',
    role: 'Product Lead',
  },
  {
    quote: 'EventHub made our launch look premium from the first click to the final ticket.',
    author: 'Rahul Mehra',
    role: 'Founder, Northstar Labs',
  },
  {
    quote: 'Clear, elegant, and polished. It feels like a startup product already.',
    author: 'Jasmine Patel',
    role: 'Design Strategist',
  },
];

const faqs = [
  {
    question: 'Is the payment flow real?',
    answer: 'No. It is a professional, simulated Razorpay-style checkout that behaves like a real gateway without processing real funds.',
  },
  {
    question: 'Can I use this as a portfolio project?',
    answer: 'Absolutely. The structure, polish, and flows are designed to be interview-ready and GitHub-friendly.',
  },
  {
    question: 'Is it responsive?',
    answer: 'Yes. The layout is optimized for mobile, tablet, and desktop experiences.',
  },
];

function HomePage() {
  const [events, setEvents] = useState(sampleEvents);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(sampleEvents[0]);
  const [success, setSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('eventhub-user') || 'null'));
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/events')
      .then((res) => {
        if (res.data?.length) setEvents(res.data);
      })
      .catch(() => {});
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = `${event.title} ${event.description} ${event.location}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [events, search, selectedCategory]);

  const handleBook = (event) => {
    setSelectedEvent(event);
    setCheckoutOpen(true);
    setSuccess(false);
  };

  const handlePayment = async () => {
    try {
      const bookingRes = await api.post('/bookings', { eventId: selectedEvent._id, quantity }, { headers: { Authorization: 'Bearer demo-token' } });
      await api.post('/payments/simulate', { bookingId: bookingRes.data._id, success: true }, { headers: { Authorization: 'Bearer demo-token' } });
      setSuccess(true);
      toast.success('Payment successful. Your ticket is ready.');
    } catch (error) {
      toast.error('Simulated payment failed.');
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">EH</div>
          <div>
            <p className="eyebrow">EventHub</p>
            <h1>Discover. Book. Experience.</h1>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#events">Events</a>
          <a href="#highlights">Features</a>
          <a href="#stories">Stories</a>
        </nav>
        <div className="topbar-actions">
          {user ? (
            <button className="ghost-btn" onClick={() => {
              localStorage.removeItem('eventhub-token');
              localStorage.removeItem('eventhub-user');
              setUser(null);
              toast.success('Logged out');
            }}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="ghost-btn auth-link"><FiLogIn /> Login</Link>
              <Link to="/register" className="ghost-btn auth-link"><FiUserPlus /> Register</Link>
            </>
          )}
          <button className="ghost-btn" onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}>
            Explore Now
          </button>
        </div>
      </header>

      <main>
        <motion.section className="hero-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="hero-copy">
            <div className="hero-pill">Premium event platform • Built for ambitious teams</div>
            <h2>Elevate every event into a seamless, luxurious experience.</h2>
            <p>Discover trending experiences, book frictionlessly, and enjoy a polished mock payment journey that feels like a real startup product.</p>
            <div className="hero-actions">
              <label className="search-box">
                <FiSearch />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by city, event, or vibe" />
              </label>
              <button className="primary-btn" onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}>
                Browse Events <FiArrowRight />
              </button>
            </div>
            <div className="stats-row">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-showcase">
            <div className="showcase-glow" />
            <div className="showcase-card">
              <div className="showcase-header">
                <p>Featured this week</p>
                <span>Live now</span>
              </div>
              <h3>{filteredEvents[0]?.title}</h3>
              <p>{filteredEvents[0]?.description}</p>
              <div className="showcase-meta">
                <div><FiCalendar /> {filteredEvents[0]?.date}</div>
                <div><FiUsers /> {filteredEvents[0]?.availableSeats} seats</div>
              </div>
              <button className="secondary-btn" onClick={() => handleBook(filteredEvents[0])}>
                <FiPlay /> Reserve now
              </button>
            </div>
          </div>
        </motion.section>

        <section id="highlights" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Why EventHub</p>
            <h3>Crafted for modern event discovery and seamless booking.</h3>
          </div>
          <div className="feature-grid">
            {highlights.map((item) => (
              <div key={item.title} className="feature-card">
                <div className="icon-pill">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Curated picks</p>
            <h3>Trending experiences worth your attention.</h3>
          </div>
          <div className="chip-row">
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`chip ${selectedCategory === category ? 'chip-active' : ''}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="event-grid" id="events">
            {filteredEvents.map((event) => (
              <motion.article key={event._id} whileHover={{ y: -6 }} className="event-card">
                <img src={event.banner} alt={event.title} />
                <div className="event-content">
                  <div className="event-topline">
                    <span>{event.category}</span>
                    <strong>₹{event.price}</strong>
                  </div>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <div className="meta-list">
                    <div><FiCalendar /> {event.date}</div>
                    <div><FiClock /> {event.time}</div>
                    <div><FiMapPin /> {event.location}</div>
                  </div>
                  <button className="secondary-btn compact" onClick={() => handleBook(event)}>Reserve</button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="stories" className="section-block stories-grid">
          <div className="section-heading">
            <p className="eyebrow">Testimonials</p>
            <h3>What professionals are saying about the experience.</h3>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <div key={item.author} className="testimonial-card">
                <p>“{item.quote}”</p>
                <strong>{item.author}</strong>
                <span>{item.role}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block faq-card">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h3>Everything you need to know before you book.</h3>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>
                  {item.question}
                  <FiChevronDown />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="newsletter-card">
          <div>
            <p className="eyebrow">Stay updated</p>
            <h3>Join the EventHub list and never miss a standout experience.</h3>
          </div>
          <div className="newsletter-form">
            <label>
              <FiMail />
              <input placeholder="Enter your email" />
            </label>
            <button className="primary-btn">Subscribe</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>EventHub © 2026 • Premium event discovery and booking experiences.</p>
      </footer>

      {checkoutOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-head">
              <div>
                <p className="eyebrow">Razorpay simulation</p>
                <h3>{selectedEvent.title}</h3>
              </div>
              <button onClick={() => setCheckoutOpen(false)} className="icon-btn"><FiXCircle /></button>
            </div>

            <div className="payment-box">
              <div className="payment-topline">
                <div>
                  <p>Merchant</p>
                  <strong>EventHub Pvt. Ltd.</strong>
                </div>
                <span>UPI • Cards • Wallets</span>
              </div>
              <div className="amount-box">
                <p>Amount</p>
                <h4>₹{selectedEvent.price * quantity}</h4>
                <div className="quantity-row">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="primary-btn" onClick={() => handlePayment()}>Pay Now</button>
              <button className="ghost-btn" onClick={() => setCheckoutOpen(false)}>Cancel</button>
            </div>

            {success && (
              <div className="success-banner">
                <FiCheckCircle /> Payment successful • Booking confirmed • Ticket generated
              </div>
            )}
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

function AuthPage({ type }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', city: '', role: 'user' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = type === 'register' ? '/auth/register' : '/auth/login';
      const res = await api.post(endpoint, form);
      localStorage.setItem('eventhub-token', res.data.token);
      localStorage.setItem('eventhub-user', JSON.stringify(res.data.user));
      toast.success(type === 'register' ? 'Account created successfully' : 'Logged in successfully');
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <p className="eyebrow">EventHub</p>
          <h2>{type === 'register' ? 'Create your account' : 'Welcome back'}</h2>
          <p>{type === 'register' ? 'Join thousands of event lovers and organizers.' : 'Sign in to continue booking your next experience.'}</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {type === 'register' && (
            <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          )}
          <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {type === 'register' && (
            <>
              <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </>
          )}
          <button className="primary-btn" type="submit" disabled={loading}>{loading ? 'Please wait...' : type === 'register' ? 'Create account' : 'Login'}</button>
        </form>
        <p className="auth-footer">
          {type === 'register' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link to={type === 'register' ? '/login' : '/register'}>{type === 'register' ? 'Login' : 'Register'}</Link>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route path="*" element={<div className="not-found">404 • EventHub</div>} />
      </Routes>
    </Router>
  );
}

export default App;
