'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, Palette, Gem, Users, BadgeCheck, Clock, 
  Instagram, Mail, MapPin, Phone, ArrowRight, Loader2, 
  CheckCheck, ImageOff, Menu, X, ArrowUpRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

// --- HELPERS ---

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary via-primary to-accent/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- DATA ---

const brand = {
  name: "Paula's Hair",
  tagline: "The Crown You Never Take Off.",
  description: "Abuja's premier destination for luxury human hair, expert wigging, and artisan revamping services for the modern woman.",
  industry: "beauty",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1663582816222-0058880a9fdc?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1663582816182-15cf69d87665?q=80&w=1080",
    "https://images.unsplash.com/photo-1663582815412-665909d70e01?q=80&w=1080",
    "https://images.unsplash.com/photo-1690842267912-005bff92a29a?q=80&w=1080",
    "https://images.unsplash.com/photo-1649201347131-3fbadba43f66?q=80&w=1080"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1663582816260-ea903f9441eb?q=80&w=1080",
    "https://images.unsplash.com/photo-1663582816158-42354522fe15?q=80&w=1080",
    "https://images.unsplash.com/photo-1663582815337-52558dc2f9fd?q=80&w=1080",
    "https://images.unsplash.com/photo-1617311454806-1b8b2b8af811?q=80&w=1080",
    "https://images.unsplash.com/photo-1696905364720-fd2111238e0a?q=80&w=1080",
    "https://images.unsplash.com/photo-1732244749599-da1261cbcf31?q=80&w=1080"
  ]
};

const products = [
  { name: "Luxe Bone Straight Wig", description: "Premium 12A grade double drawn hair with a high-definition lace finish.", price: "₦185,000" },
  { name: "Signature Color Revamp", description: "Breathe new life into your old bundles with our artisan coloring treatment.", price: "₦45,000" },
  { name: "Raw Cambodian Wave", description: "Unprocessed luxury hair with natural luster and unmatched longevity.", price: "₦210,000" },
  { name: "360 Lace Installation", description: "Flawless, glue-less application with natural baby hair styling.", price: "₦25,000" }
];

const features = [
  { title: "Artisan Revamping", description: "We specialize in restoring tired wigs to their original factory glow through deep steam and premium oils.", icon: Scissors },
  { title: "Custom Coloring", description: "From honey highlights to bold obsidian, our colorists ensure zero damage to your cuticles.", icon: Palette },
  { title: "Ethical Sourcing", description: "Every bundle is meticulously checked for donor quality and natural cuticle alignment.", icon: Gem }
];

const stats = [
  { number: "200+", label: "Women Transformed" },
  { number: "100%", label: "Human Hair" },
  { number: "24hr", label: "Revamp Turnaround" }
];

const testimonials = [
  { name: "Amina Bello", text: "The revamp service is literal magic. My two-year-old wig looks brand new again. Paula is the best in Abuja!", role: "Verified Client" },
  { name: "Chioma Okafor", text: "Best quality bone straight I have ever bought. No shedding, no tangling, just pure luxury.", role: "Fashion Influencer" }
];

// --- COMPONENTS ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Our Wigs", href: "#products" },
    { name: "Services", href: "#features" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 md:px-12 ${scrolled ? 'bg-primary/95 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="group">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-heading font-bold text-accent tracking-tighter leading-none group-hover:scale-105 transition-transform">
                PAULA<span className="text-white">'S</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium">Hair Luxury</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-[13px] font-medium tracking-widest uppercase text-white/70 hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-accent hover:after:w-full after:transition-all">
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-primary px-7 py-2.5 rounded-full font-bold text-[13px] tracking-widest uppercase hover:brightness-110 transition-all shadow-lg shadow-accent/10">
              Book Now
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[200] bg-primary transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-10">
          <div className="flex justify-between items-center mb-16">
            <span className="font-heading text-3xl font-bold text-accent">PAULA'S</span>
            <button onClick={() => setMobileOpen(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-heading font-bold text-white/90 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-white/40 text-sm mb-6">Abuja's premier destination for luxury hair.</p>
            <div className="flex gap-6">
              <Instagram className="text-accent" />
              <Phone className="text-accent" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SectionDivider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto opacity-40">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap">
      {brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-[#0d0d0d] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-50" />
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/40 relative z-10">
          <CheckCheck size={32} className="text-accent" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-3 relative z-10">Message Sent</h3>
        <p className="text-white/60 max-w-sm text-lg relative z-10">Our concierge will contact you shortly to confirm your hair revamp session.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#0d0d0d] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-bold text-white mb-8">Secure Your Session</h3>
        <div className="grid grid-cols-1 gap-5">
          {(['name', 'email', 'phone'] as const).map(field => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
            />
          ))}
          <textarea 
            rows={4} 
            placeholder="Tell us about your hair (Revamp, Coloring, or Purchase?)"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/30 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-accent"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-10 bg-accent text-primary py-5 rounded-xl font-black text-[15px] uppercase tracking-widest hover:brightness-110 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Inquire Now <ArrowRight size={18} /></>}
        </button>
      </div>
    </form>
  );
};

export default function Home() {
  const heroReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="relative">
      <Navigation />

      {/* HERO SECTION - pattern HR-C */}
      <section id="home" className="min-h-screen grid lg:grid-cols-[1.2fr_1fr] items-stretch bg-primary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-20 py-32 lg:py-0 relative z-10">
          <div className={`transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            <p className="text-accent font-mono text-[11px] tracking-[0.5em] uppercase mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-accent/40" /> Artisan Hair Restoration
            </p>
            <h1 className="font-heading text-6xl md:text-[5.5rem] lg:text-[7rem] font-bold text-white leading-[0.9] tracking-tighter">
              Defining <br/> Elegance<span className="text-accent">.</span>
            </h1>
            <p className="text-white/50 mt-10 text-lg md:text-xl max-w-lg leading-relaxed font-light italic">
              "Luxury hair sales and expert wigging services tailored for the sophisticated Abuja woman."
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mt-12">
              <a href="#products" className="bg-accent text-primary px-10 py-5 font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-accent/10">
                Shop the Collection
              </a>
              <a href="#contact" className="border border-white/20 text-white px-10 py-5 font-medium text-sm uppercase tracking-widest hover:bg-white/5 transition-all group inline-flex items-center gap-2">
                Book Revamp <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            
            <div className="mt-20 flex gap-16 border-t border-white/10 pt-10">
              {stats.slice(0, 2).map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-heading text-4xl font-bold text-accent">{s.number}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[500px] lg:min-h-full overflow-hidden">
          <SafeImage src={IMAGES.hero} alt="Paulas Hair" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
          <div className="absolute inset-0 bg-accent/5 backdrop-contrast-[1.1]" />
        </div>
      </section>

      {/* PRODUCTS SECTION - P-HORIZONTAL */}
      <section id="products" ref={productsReveal.ref} className="py-32 bg-secondary text-primary">
        <div className="px-6 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className={`transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-6xl font-bold text-primary mb-4 tracking-tighter">The Hair Bar</h2>
            <p className="text-primary/60 text-lg uppercase tracking-widest font-medium">Curated bundles and custom units.</p>
          </div>
          <a href="#contact" className="text-primary font-bold border-b-2 border-primary/20 pb-1 hover:border-accent transition-all text-sm tracking-widest uppercase">View Full Catalog</a>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-12 px-6 lg:px-20 snap-x snap-mandatory scrollbar-hide">
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`snap-start shrink-0 w-[300px] md:w-[380px] group transition-all duration-700 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative h-[450px] overflow-hidden mb-6 bg-primary/5">
                <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                <div className="absolute bottom-6 left-6 right-6 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-full bg-white text-primary py-4 font-black text-[12px] uppercase tracking-[0.2em]">Inquire Selection</button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading text-2xl font-bold">{p.name}</h3>
                  <p className="text-primary/50 text-sm mt-1 line-clamp-2 max-w-[240px]">{p.description}</p>
                </div>
                <span className="font-black text-accent text-lg">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION - F-NUMBERED */}
      <section id="features" ref={featuresReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[120px] -mr-[20rem] -mt-[20rem]" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-20">
            <h2 className="font-heading text-6xl font-bold text-white tracking-tighter">Why Paula's Hair?</h2>
            <p className="text-white/40 mt-4 text-lg font-light italic">The Abuja standard in premium hair maintenance and artisan sourcing.</p>
          </div>

          <div className="divide-y divide-white/10">
            {features.map((f, i) => (
              <div 
                key={i} 
                className={`py-16 flex flex-col md:flex-row items-start gap-12 group transition-all duration-1000 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <span className="font-heading text-6xl text-accent/20 font-light italic shrink-0 w-24 group-hover:text-accent/60 transition-colors duration-500">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-3xl font-bold text-white group-hover:text-accent transition-colors">{f.title}</h3>
                  <p className="text-white/50 mt-4 text-lg max-w-2xl leading-relaxed">{f.description}</p>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all">
                  <f.icon className="text-white/30 group-hover:text-accent transition-colors" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Masonry Pattern */}
      <section id="gallery" ref={galleryReveal.ref} className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-6xl font-bold text-primary tracking-tighter">The Transformation Gallery</h2>
            <p className="text-primary/50 text-lg mt-4 font-light">Abuja's finest revamps on our real dolls.</p>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.gallery.map((src, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid group relative rounded-2xl overflow-hidden bg-primary/5 transition-all duration-700 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <SafeImage src={src} alt={`Gallery transformation ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / STATS - D-STAT STYLE */}
      <section id="about" ref={aboutReveal.ref} className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="font-heading text-6xl font-bold text-white mb-8 tracking-tighter">Our Legacy</h2>
            <p className="text-white/60 text-xl leading-relaxed font-light mb-10 italic">
              "Based in the heart of Abuja, Paulas Hair was founded on the belief that every woman deserves to feel like royalty. We don't just sell hair; we manage your crown."
            </p>
            <p className="text-white/40 leading-relaxed mb-12">
              Our signature revamping process is what sets us apart. We take pride in the meticulous care we give to every strand, ensuring your investment lasts years, not months. Your hair is sorted once it enters our studio.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-heading text-4xl font-bold text-accent">{s.number}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square md:aspect-video lg:aspect-square overflow-hidden transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
             <SafeImage src={IMAGES.gallery[4]} alt="Paula's legacy" fill className="object-cover" />
             <div className="absolute inset-0 border-[20px] border-primary/20 pointer-events-none" />
             <div className="absolute bottom-10 left-10 p-6 bg-accent/10 backdrop-blur-md border border-accent/20 max-w-[200px]">
               <p className="text-white text-sm font-light leading-relaxed">Trusted by Abuja's elite for over 5 years of consistent luxury.</p>
             </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SPOTLIGHT */}
      <section ref={testimonialsReveal.ref} className="py-32 px-6 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-bold text-white mb-16 tracking-tighter">What Our Dolls Say</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`relative py-12 px-8 rounded-[40px] border border-white/10 bg-primary/40 backdrop-blur-sm transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-primary text-3xl font-heading font-black italic">“</span>
                </div>
                <p className="text-white/80 text-2xl font-heading leading-relaxed italic">
                  {t.text}
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-heading font-bold text-lg border border-accent/20">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white uppercase tracking-widest text-[11px]">{t.name}</p>
                    <p className="text-accent/60 text-[10px] uppercase tracking-widest mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - C2 Diagonal Split */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden py-32 md:py-48 min-h-[800px] flex items-center">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden lg:block" />
        <div className="absolute inset-0 bg-primary/90 lg:hidden" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center w-full">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-accent font-mono text-[11px] tracking-[0.5em] uppercase mb-6">Concierge</p>
            <h2 className="font-heading text-7xl md:text-8xl font-bold text-white leading-none mb-10 tracking-tighter">
              Book Your <br/> Session<span className="text-accent">.</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <MapPin size={18} className="text-accent" />
                </div>
                <span className="text-lg">Abuja, Nigeria</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <Instagram size={18} className="text-accent" />
                </div>
                <span className="text-lg">@paulashair_ng</span>
              </div>
            </div>
            <div className="mt-16 text-white/30 text-sm font-light">
              *Appointments required for in-studio revamp assessments.
            </div>
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER - pattern F2 */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <span className="text-3xl font-heading font-bold text-accent tracking-tighter">PAULA<span className="text-white">'S</span></span>
              <p className="text-white/40 mt-6 max-w-sm leading-relaxed text-sm">
                The ultimate destination for Abuja's elite human hair and artisan revamping. Your crown is sorted with our signature maintenance techniques.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-8">Navigation</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="#products" className="hover:text-accent transition-colors">Our Wigs</a></li>
                <li><a href="#features" className="hover:text-accent transition-colors">Artisan Services</a></li>
                <li><a href="#gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[11px] mb-8">Connect</h4>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a href="https://instagram.com/paulashair_ng" className="hover:text-accent transition-colors">Instagram</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Book Concierge</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-[11px] uppercase tracking-widest">
              © {new Date().getFullYear()} Paula's Hair Luxury. Abuja's Finest.
            </p>
            <div className="flex gap-8">
               <span className="text-white/20 text-[11px] uppercase tracking-widest italic">The Crown You Never Take Off</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}