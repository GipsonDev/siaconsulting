import { Link } from 'react-router-dom';
import { Users, Briefcase, Monitor, Sprout, ArrowRight } from 'lucide-react';

const programs = [
  {
    icon: Briefcase,
    title: 'SME Development Programs',
    desc: 'Supporting SMEs to improve productivity, quality, and competitiveness through tailored business development services, mentorship, and strategic planning.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'Women & Youth Empowerment',
    desc: 'Creating opportunities and building leadership for women and youth through skills development, entrepreneurship training, and access to finance.',
    color: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
  {
    icon: Monitor,
    title: 'Digital Business (WIDB)',
    desc: 'Promoting digital skills, e-commerce, and technology adoption to help businesses leverage digital tools for growth and efficiency.',
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Sprout,
    title: 'Agriculture & Value Chain Support',
    desc: 'Supporting farmers and value chain actors to access better markets, improve productivity, and strengthen agribusiness linkages.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
];

export default function Programs() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Our Programs & Initiatives</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Driving impact through targeted programs that empower businesses and communities.</p>
        </div>
      </section>

      {/* Programs List */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {programs.map((program) => (
              <div key={program.title} className="flex flex-col md:flex-row gap-6 border border-gray-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${program.color} w-full md:w-64 h-44 md:h-auto flex items-center justify-center shrink-0`}>
                  <program.icon size={64} className={`${program.iconColor} opacity-30`} />
                </div>
                <div className="p-6 md:py-8 md:pr-8 flex flex-col justify-center">
                  <h3 className="font-bold text-navy text-xl mb-3">{program.title}</h3>
                  <p className="text-gray-text leading-relaxed mb-4">{program.desc}</p>
                  <Link to="/contact" className="inline-flex items-center gap-1 text-green-brand font-medium hover:gap-2 transition-all">
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">Want to Join a Program?</h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">Reach out to us to learn how you can participate in our programs and initiatives.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded hover:bg-white hover:text-navy transition-colors"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
