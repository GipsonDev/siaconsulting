import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, TrendingUp, Truck, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Business Consultancy',
    desc: 'Strategic advice to improve performance and achieve growth. We work with you to identify opportunities, streamline operations, and develop actionable business strategies.',
    features: ['Business strategy development', 'Market analysis & research', 'Financial planning & modeling', 'Organizational development'],
  },
  {
    icon: GraduationCap,
    title: 'Capacity Building & Training',
    desc: 'Training programs and mentorship to strengthen skills and capabilities. Our modules cover essential business skills from leadership to financial literacy.',
    features: ['Customized training programs', 'Mentorship & coaching', 'Leadership development', 'Financial literacy workshops'],
  },
  {
    icon: TrendingUp,
    title: 'Investment & Market Linkages',
    desc: 'Connecting SMEs to finance, technology, and markets. We bridge the gap between businesses seeking growth capital and investors looking for opportunities.',
    features: ['Investor matchmaking', 'Market access facilitation', 'Trade fair participation', 'Partnership development'],
  },
  {
    icon: Truck,
    title: 'Logistics & Operations Support',
    desc: 'Reliable logistics and operations solutions that keep you moving. From supply chain optimization to distribution support, we ensure smooth operations.',
    features: ['Supply chain optimization', 'Distribution support', 'Inventory management', 'Operations streamlining'],
  },
];

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Services</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">We provide end-to-end solutions tailored to your business needs.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="border border-gray-border rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-green-pale flex items-center justify-center shrink-0">
                    <service.icon size={28} className="text-green-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-text text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-18 pl-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-brand shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-bg py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Need a Customized Solution?</h2>
          <p className="text-gray-text mb-8">
            Let us understand your business needs and create a tailored solution that drives real results.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-green-brand text-white font-semibold px-8 py-3 rounded hover:bg-green-700 transition-colors"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
