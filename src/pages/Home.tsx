import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  Briefcase, Users, TrendingUp, 
  GraduationCap, Landmark, Building2,
  Monitor, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { gql } from '@apollo/client';

const heroSlides = [
  {
    image: '/images/IWC.jpg',
    eyebrow: 'WELCOME TO SIA CONSULTING DYNAMICS',
    headline: 'Empowering Women SMEs Through Digital Business Training',
    sub: 'Virtual training programs that equip women entrepreneurs with practical digital skills to start, grow, and scale successful businesses.',
    features: ['Online & Virtual Classes', '45+ Practical Modules', 'Certification', 'For Women & Youth'],
    secondaryButtonLabel: 'Join Training Program',
  },
  {
    image: '/images/hero-2.jpg',
    eyebrow: 'WELCOME TO SIA CONSULTING DYNAMICS',
    headline: 'Building Capacity. Connecting Communities. Transforming Livelihoods.',
    sub: 'We deliver virtual training, mentorship, and business support that unlock potential and create lasting economic impact across Tanzania.',
    features: ['Skills for the Digital Economy', 'Business Growth Support', 'Access to Markets & Finance', 'Sustainable Impact'],
    secondaryButtonLabel: 'Explore Our Training',
  },
  {
    image: '/images/WIL1.jpg',
    eyebrow: 'WELCOME TO SIA CONSULTING DYNAMICS',
    headline: 'Unlocking Opportunities. Driving Investment. Creating Sustainable Growth.',
    sub: 'We help SMEs access the right opportunities, connect with investors, and grow sustainably in local and global markets.',
    features: ['Investment Facilitation', 'Market Linkages', 'Business Advisory', 'Long-term Partnerships'],
    secondaryButtonLabel: 'Partner With Us',
  },
];

const services = [
  {
    icon: Monitor,
    title: 'Digital Business Training',
    desc: 'Empowering SMEs with practical digital skills to grow and manage their businesses online.',
  },
  {
    icon: GraduationCap,
    title: 'Capacity Building',
    desc: 'Training and mentorship programs designed for sustainable business growth.',
  },
  {
    icon: Briefcase,
    title: 'Business Consultancy',
    desc: 'Strategic guidance to improve operations, performance, and scalability.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Linkages',
    desc: 'Connecting SMEs to funding opportunities and financial partners.',
  },
];

const impacts = [
  { value: '3,000+', label: 'SMEs Supported', icon: Users },
  { value: '45+', label: 'Training Modules', icon: GraduationCap },
  { value: '15+', label: 'Years of Experience', icon: Briefcase },
  { value: '20+', label: 'Partners & Institutions', icon: Building2 },
];

const audiences = [
  { icon: Users, title: 'Women Entrepreneurs', desc: 'Supporting women-led businesses to grow through digital skills and training.' },
  { icon: Users, title: 'Youth-led SMEs', desc: 'Empowering young entrepreneurs with tools and knowledge for success.' },
  { icon: Building2, title: 'Growing Businesses', desc: 'Helping SMEs scale operations, access markets, and improve performance.' },
  { icon: Landmark, title: 'Investors & Partners', desc: 'Connecting stakeholders to high-potential businesses and opportunities.' },
];


const GET_LATEST_POSTS = gql`
  query GetLatestPosts {
    posts(first: 3, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

const print = (query: any) => {
  if (typeof query === 'string') return query;
  return query.loc?.source?.body || '';
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [latestPosts, setLatestPosts] = useState<any[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

 const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Fetch latest posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch('https://siaconsulting.co.tz/blog/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: print(GET_LATEST_POSTS) }),
        });
        const json = await response.json();
        const posts = json.data?.posts?.edges?.map((edge: any) => edge.node) || [];
        setLatestPosts(posts);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      } finally {
        setPostsLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div>
      {/* Hero (IMPROVED TO Image slider)*/}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
              {/* Background slides */}
              {heroSlides.map((s, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{ opacity: i === currentSlide ? 1 : 0 }}
                >
                  <img
                    src={s.image}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
      
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30 z-10" />
      
              {/* Green accent bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-brand z-20" />
      
              {/* Content */}
              <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left side: Text content */}
                    <div className="max-w-2xl">
                      <div
                        className="transition-all duration-500"
                        style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'translateY(12px)' : 'translateY(0)' }}
                      >
                        <p className="text-green-light font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                          <span className="inline-block w-8 h-0.5 bg-green-light" />
                          {slide.eyebrow}
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                          {(() => {
                            let highlightText = '';
                            if (currentSlide === 0) highlightText = 'Digital Business Training';
                            else if (currentSlide === 1) highlightText = 'Transforming Livelihoods';
                            else if (currentSlide === 2) highlightText = 'Creating Sustainable Growth';
                            
                            if (highlightText) {
                              const parts = slide.headline.split(highlightText);
                              
                              if (currentSlide === 0) {
                                // Slide 1: break after "Digital Business Training"
                                return parts.map((part, i, arr) => (
                                  <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                      <>
                                        <span className="text-green-light">{highlightText}</span>
                                        <br />
                                      </>
                                    )}
                                  </span>
                                ));
                              } else if (currentSlide === 1 || currentSlide === 2) {
                                // Slides 2 & 3: breaks after each period
                                const fullText = parts[0] + highlightText + (parts[1] || '');
                                const sentences = fullText.split('. ');
                                
                                return sentences.map((sentence, idx) => (
                                  <span key={idx}>
                                    <span className={sentence.includes(highlightText) ? 'text-green-light' : ''}>
                                      {sentence}
                                    </span>
                                    {idx < sentences.length - 1 && (
                                      <>. <br /></>
                                    )}
                                  </span>
                                ));
                              }
                              
                              return parts.map((part, i, arr) => (
                                <span key={i}>
                                  {part}
                                  {i < arr.length - 1 && <span className="text-green-light">{highlightText}</span>}
                                </span>
                              ));
                            }
                            return slide.headline;
                          })()}
                        </h1>
                        <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8">
                          {slide.sub}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <Link
                            to="/services"
                            className="bg-green-brand text-white font-semibold px-7 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                          >
                            Our Services
                          </Link>
                          <Link
                            to="/contact"
                            className="border-2 border-white text-white font-semibold px-7 py-3 rounded-lg hover:bg-white hover:text-navy transition-colors"
                          >
                            {slide.secondaryButtonLabel}
                          </Link>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
      
              {/* Prev / Next arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white transition-all group"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-sm text-white transition-all group"
                aria-label="Next slide"
              >
                <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
              </button>
      
              {/* Dot indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? 'w-8 h-3 bg-green-light'
                        : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
      </section>

      {/* WIDB Signature Product */}
      <section className="widb-section bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="widb-content grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="widb-copy">
              <p className="widb-label text-green-light font-semibold uppercase tracking-[0.28em] mb-4">
                OUR SIGNATURE PROGRAM
              </p>
              <h2 className="widb-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-navy mb-6">
                Women in Digital Business (WIDB)
              </h2>
              <p className="text-gray-text text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Empowering women entrepreneurs with practical digital skills to grow, manage, and scale their businesses in today’s digital economy.
              </p>
              <ul className="widb-features space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-brand" />
                  <span className="text-gray-700 text-base md:text-lg">Learn how to sell online</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-brand" />
                  <span className="text-gray-700 text-base md:text-lg">Use mobile payments &amp; digital tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-brand" />
                  <span className="text-gray-700 text-base md:text-lg">Access new markets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-brand" />
                  <span className="text-gray-700 text-base md:text-lg">Build a sustainable business</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-green-brand text-white font-semibold px-7 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  Join Training Program
                </Link>
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center border border-green-brand text-green-brand font-semibold px-7 py-3 rounded-lg hover:bg-green-brand/10 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="widb-image overflow-hidden rounded-[28px] shadow-[0_24px_60px_rgba(15,23,42,0.12)] min-h-[320px]">
              <img
                src="/images/IWC.jpg"
                alt="Women in Digital Business program"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-gray-bg py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Our Solutions for Business Growth
            </h2>
            <p className="text-gray-text text-base md:text-lg leading-relaxed">
              We provide practical solutions to help SMEs grow, scale, and succeed in today’s competitive environment.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`rounded-2xl p-6 border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                  index === 0 ? 'border-green-brand/25 ring-1 ring-green-brand/10' : 'border-gray-border'
                }`}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-light text-white shadow-sm">
                  <service.icon size={24} />
                </div>
                <h3 className="font-semibold text-navy text-xl mb-3">{service.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed mb-6">{service.desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-green-light text-sm font-semibold hover:text-green-brand"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Who We Serve</h2>
            <p className="text-gray-text text-base md:text-lg leading-relaxed">
              We work with a diverse range of clients across the SME ecosystem.
            </p>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {audiences.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-border bg-gray-bg p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-brand/10 text-green-brand">
                  <item.icon size={24} />
                </div>
                <h3 className="font-semibold text-navy text-xl mb-3">{item.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact) => (
              <div key={impact.label} className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-pale flex items-center justify-center">
                  <impact.icon size={28} className="text-green-brand" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-navy mb-1">{impact.value}</div>
                <p className="text-gray-text text-sm">{impact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-light py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0">
              <TrendingUp size={28} className="text-green-light" />
            </div>
            <div>
              <h3 className="text-navy text-xl md:text-2xl font-bold">Ready to Grow Your Business?</h3>
              <p className="text-navy text-sm md:text-base">Join our Women in Business training program today and take your business to the next level.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-navy text-white font-semibold px-8 py-3 rounded hover:bg-navy/90 transition-colors shrink-0"
            >
              Join Training Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-navy transition-colors shrink-0"
            >
              Get Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Our Latest Insight */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Our Latest Insight</h2>
            <p className="text-gray-text text-lg max-w-2xl mx-auto">
              Stay updated with our latest thoughts, insights, and industry trends that drive business growth and innovation.
            </p>
          </div>

          {postsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-brand"></div>
            </div>
          ) : latestPosts.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              {latestPosts.map((post) => (
                <article key={post.id} className="bg-white border border-gray-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[16/10] bg-gray-200">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <img
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Monitor size={48} className="mx-auto mb-2 opacity-20" />
                          <p className="text-sm opacity-50">No image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {post.categories.edges.length > 0 && (
                        <span className="text-green-light font-medium text-sm">
                          {post.categories.edges[0].node.name}
                        </span>
                      )}
                      <span className="text-gray-text text-sm">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-text text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                    <Link
                      to={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-2 text-green-brand font-semibold hover:text-green-700 transition-colors"
                    >
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-text">No insights available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 bg-green-brand text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Insights <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
