import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  BookOpen,
  Award,
  Users,
  Monitor,
  ArrowRight,
  CheckCircle,
  Target,
  Briefcase,
  TrendingUp,
  Heart,
  Megaphone,
  Zap,
  Video,
  Clock,
  Layers,
  GraduationCap,
} from 'lucide-react';

// ==================== DATA STRUCTURES ====================

const statistics = [
  { icon: BookOpen, value: '47', label: 'Training Modules' },
  { icon: Layers, value: '7', label: 'Learning Pillars' },
  { icon: Users, value: '4', label: 'Participant Levels' },
  { icon: Monitor, value: '4', label: 'Delivery Formats' },
];

// Define FileText component before use
const FileText = BookOpen; // Placeholder

const programFeatures = [
  {
    icon: Target,
    title: 'Learning Objectives',
    desc: 'Clear, measurable outcomes aligned with business growth needs',
  },
  {
    icon: BookOpen,
    title: 'Key Content Points',
    desc: 'Comprehensive coverage of practical business competencies',
  },
  {
    icon: Users,
    title: 'Practical Activities',
    desc: 'Hands-on exercises and real-world case studies',
  },
  {
    icon: CheckCircle,
    title: 'Assessment Methods',
    desc: 'Rigorous evaluation of learning and skill development',
  },
  {
    icon: FileText,
    title: 'Participant Handouts',
    desc: 'Reference materials and action planning templates',
  },
  {
    icon: Zap,
    title: 'Tools & Resources',
    desc: 'Digital toolkits and resources for business implementation',
  },
];

const participantLevels = [
  {
    name: 'Foundational',
    subtitle: 'New or early-stage entrepreneurs',
    description: 'For entrepreneurs in their first 0–2 years of business',
    focus: ['Business Registration', 'Business Planning', 'Financial Management', 'Digital Literacy'],
    color: 'bg-blue-50',
    accentColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  {
    name: 'Intermediate',
    subtitle: 'Growth-stage businesses',
    description: 'For businesses established 2–5 years',
    focus: ['Systems Development', 'Scaling Strategies', 'Procurement', 'Finance', 'Strategic Partnerships'],
    color: 'bg-green-50',
    accentColor: 'text-green-600',
    borderColor: 'border-green-200',
  },
  {
    name: 'Advanced',
    subtitle: 'Established businesses',
    description: 'For businesses operating 5+ years',
    focus: ['Export Readiness', 'Policy Engagement', 'Advocacy', 'Institutional Partnerships'],
    color: 'bg-purple-50',
    accentColor: 'text-purple-600',
    borderColor: 'border-purple-200',
  },
  {
    name: 'All Levels',
    subtitle: 'Mixed-stage cohorts',
    description: 'Suitable for diverse business stages',
    focus: ['Networking', 'Peer Learning', 'Mentorship', 'Community Building'],
    color: 'bg-amber-50',
    accentColor: 'text-amber-600',
    borderColor: 'border-amber-200',
  },
];

const curriculumPillars = [
  {
    icon: Briefcase,
    name: 'Business Foundations',
    modules: 'Modules 1–4, 10–12',
    description: 'Core business essentials including registration, planning, and startup basics',
    focus: ['Legal Structure', 'Business Plan', 'Market Analysis', 'Startup Requirements'],
  },
  {
    icon: TrendingUp,
    name: 'Finance, Funding & Investment',
    modules: 'Modules 2–3, 21, 37–38, 45',
    description: 'Financial literacy, funding sources, and investment readiness programs',
    focus: ['Financial Planning', 'Fundraising', 'Investment Preparation', 'Credit Access'],
  },
  {
    icon: Zap,
    name: 'Digital & Innovation',
    modules: 'Modules 5, 7, 22, 28, 42',
    description: 'Digital transformation, e-commerce, and business innovation strategies',
    focus: ['Digital Tools', 'E-commerce', 'Cybersecurity', 'Innovation'],
  },
  {
    icon: Users,
    name: 'Leadership, Coaching & Mentorship',
    modules: 'Modules 6, 8–9, 17–20, 23–24',
    description: 'Leadership development, team management, and mentorship programs',
    focus: ['Team Leadership', 'Coaching Skills', 'Mentorship', 'Change Management'],
  },
  {
    icon: Briefcase,
    name: 'Sector Focus',
    modules: 'Modules 25–30',
    description: 'Sector-specific strategies and best practices for different industries',
    focus: ['Industry Insights', 'Best Practices', 'Value Chain', 'Competitive Analysis'],
  },
  {
    icon: Heart,
    name: 'Sustainability & Inclusion',
    modules: 'Modules 31–36',
    description: 'Sustainable business practices and inclusive growth strategies',
    focus: ['Social Impact', 'Environmental Practices', 'Inclusion', 'Community'],
  },
  {
    icon: Megaphone,
    name: 'Advocacy, M&E & Future Trends',
    modules: 'Modules 13–16, 39–41, 43–47',
    description: 'Policy engagement, monitoring, and emerging business trends',
    focus: ['Policy Advocacy', 'Impact Measurement', 'Future Trends', 'Networking'],
  },
];

const deliveryFormats = [
  {
    icon: Monitor,
    name: 'In-Person Workshop',
    duration: '55–60 Minutes',
    description: 'Interactive face-to-face sessions with hands-on activities and group discussions',
    benefits: ['Live interaction', 'Networking', 'Hands-on practice', 'Immediate feedback'],
  },
  {
    icon: Video,
    name: 'Virtual Live Session',
    duration: '90 Minutes',
    description: 'Online interactive sessions with real-time Q&A and breakout discussions',
    benefits: ['Flexible access', 'Global reach', 'Recording available', 'Interactive participation'],
  },
  {
    icon: Layers,
    name: 'Blended Learning',
    duration: 'Flexible Duration',
    description: 'Combination of in-person and online modules for optimal learning experience',
    benefits: ['Best of both', 'Self-paced options', 'Structured pathway', 'Customizable'],
  },
  {
    icon: BookOpen,
    name: 'Self-Paced Learning',
    duration: 'On Your Schedule',
    description: 'Comprehensive online modules available anytime with structured progression',
    benefits: ['Learn anytime', 'Review content', 'Personal pace', 'Lifetime access'],
  },
];

const learningPathways = [
  {
    name: 'Starter Pathway',
    modules: 10,
    hours: '~10 Hours',
    target: 'New Entrepreneurs',
    moduleList: '1, 2, 3, 4, 5, 6, 8, 10, 11, 17',
    description: 'Essential foundation for first-time business owners',
    highlight: false,
  },
  {
    name: 'Growth Pathway',
    modules: 15,
    hours: '~15 Hours',
    target: 'Scaling Businesses',
    moduleList: 'Focus: Scaling, Finance, Export Readiness',
    description: 'Strategies to scale operations and enter new markets',
    highlight: false,
  },
  {
    name: 'Women & Youth Pathway',
    modules: 12,
    hours: '~12 Hours',
    target: 'Inclusive Empowerment',
    moduleList: 'Focus: Inclusion, Mentorship, Empowerment',
    description: 'Tailored for women entrepreneurs and youth with focus on support',
    highlight: false,
  },
  {
    name: 'Advanced MSME Programme',
    modules: 47,
    hours: '~48 Hours',
    target: 'Most Comprehensive',
    moduleList: '10–12 Weeks with Capstone Market Linkage Event',
    description: 'Complete mastery of all MSME development competencies',
    highlight: true,
  },
];

// All 47 Training Modules
const allModules = [
  // Business Foundations (1-4, 10-12)
  { id: 1, number: 1, title: 'Business Registration & Legal Structures', level: 'Foundational', duration: '55 min', format: 'In-Person', category: 'Foundations', pillar: 'Business Foundations' },
  { id: 2, number: 2, title: 'Business Plan Development', level: 'Foundational', duration: '60 min', format: 'In-Person', category: 'Foundations', pillar: 'Business Foundations' },
  { id: 3, number: 3, title: 'Market Research & Analysis', level: 'Foundational', duration: '60 min', format: 'Virtual', category: 'Foundations', pillar: 'Finance, Funding & Investment' },
  { id: 4, number: 4, title: 'Customer Identification & Needs Assessment', level: 'Foundational', duration: '55 min', format: 'Blended', category: 'Foundations', pillar: 'Business Foundations' },
  { id: 5, number: 5, title: 'Digital Basics for Entrepreneurs', level: 'Foundational', duration: '60 min', format: 'Virtual', category: 'Digital', pillar: 'Digital & Innovation' },
  { id: 6, number: 6, title: 'Leadership Essentials', level: 'Foundational', duration: '60 min', format: 'In-Person', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 7, number: 7, title: 'E-commerce Fundamentals', level: 'Intermediate', duration: '90 min', format: 'Virtual', category: 'Digital', pillar: 'Digital & Innovation' },
  { id: 8, number: 8, title: 'Team Building & Motivation', level: 'Foundational', duration: '60 min', format: 'In-Person', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 9, number: 9, title: 'Conflict Resolution & Negotiation', level: 'Intermediate', duration: '60 min', format: 'In-Person', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 10, number: 10, title: 'Setting Business Goals & Targets', level: 'Foundational', duration: '55 min', format: 'Virtual', category: 'Foundations', pillar: 'Business Foundations' },
  { id: 11, number: 11, title: 'Record Keeping & Documentation', level: 'Foundational', duration: '60 min', format: 'Self-Paced', category: 'Foundations', pillar: 'Business Foundations' },
  { id: 12, number: 12, title: 'Business Ethics & Compliance', level: 'Foundational', duration: '55 min', format: 'Virtual', category: 'Foundations', pillar: 'Business Foundations' },
  // Finance & Funding (2, 3, 21, 37-38, 45)
  { id: 13, number: 21, title: 'Financial Statement Analysis', level: 'Intermediate', duration: '90 min', format: 'Virtual', category: 'Finance', pillar: 'Finance, Funding & Investment' },
  { id: 14, number: 37, title: 'Fundraising & Capital Mobilization', level: 'Advanced', duration: '90 min', format: 'In-Person', category: 'Finance', pillar: 'Finance, Funding & Investment' },
  { id: 15, number: 38, title: 'Investment Pitch & Presentation', level: 'Advanced', duration: '60 min', format: 'In-Person', category: 'Finance', pillar: 'Finance, Funding & Investment' },
  { id: 16, number: 45, title: 'Financial Planning & Forecasting', level: 'Advanced', duration: '90 min', format: 'Blended', category: 'Finance', pillar: 'Finance, Funding & Investment' },
  // Advocacy & M&E (13-16, 39-41, 43-47)
  { id: 17, number: 13, title: 'Policy Advocacy & Engagement', level: 'Advanced', duration: '60 min', format: 'In-Person', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 18, number: 14, title: 'Stakeholder Engagement', level: 'Advanced', duration: '60 min', format: 'Virtual', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 19, number: 15, title: 'Building Business Networks', level: 'Intermediate', duration: '60 min', format: 'In-Person', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 20, number: 16, title: 'Government Partnerships & Support', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 21, number: 39, title: 'Monitoring & Evaluation Framework', level: 'Advanced', duration: '90 min', format: 'Blended', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 22, number: 40, title: 'Impact Measurement & Reporting', level: 'Advanced', duration: '60 min', format: 'Virtual', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 23, number: 41, title: 'Data Analytics for Business Growth', level: 'Advanced', duration: '90 min', format: 'Virtual', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 24, number: 43, title: 'Emerging Business Trends', level: 'Advanced', duration: '60 min', format: 'Virtual', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 25, number: 44, title: 'Future-Ready Business Strategies', level: 'Advanced', duration: '90 min', format: 'Virtual', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 26, number: 46, title: 'Digital Transformation Strategy', level: 'Advanced', duration: '60 min', format: 'Virtual', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  { id: 27, number: 47, title: 'Strategic Planning & Execution', level: 'Advanced', duration: '90 min', format: 'In-Person', category: 'Advocacy', pillar: 'Advocacy, M&E & Future Trends' },
  // Leadership & Coaching (17-20, 23-24)
  { id: 28, number: 17, title: 'Mentorship & Coaching Skills', level: 'Intermediate', duration: '60 min', format: 'In-Person', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 29, number: 18, title: 'Emotional Intelligence in Leadership', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 30, number: 19, title: 'Strategic Leadership Development', level: 'Advanced', duration: '90 min', format: 'In-Person', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 31, number: 20, title: 'Organizational Culture & Change', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 32, number: 23, title: 'Advanced Coaching Techniques', level: 'Advanced', duration: '90 min', format: 'In-Person', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  { id: 33, number: 24, title: 'Talent Management & Retention', level: 'Advanced', duration: '60 min', format: 'Virtual', category: 'Leadership', pillar: 'Leadership, Coaching & Mentorship' },
  // Digital & Innovation (22, 28, 42)
  { id: 34, number: 22, title: 'Digital Marketing Strategy', level: 'Intermediate', duration: '90 min', format: 'Virtual', category: 'Digital', pillar: 'Digital & Innovation' },
  { id: 35, number: 28, title: 'Business Innovation & Ideation', level: 'Intermediate', duration: '60 min', format: 'In-Person', category: 'Digital', pillar: 'Digital & Innovation' },
  { id: 36, number: 42, title: 'Technology Integration for SMEs', level: 'Advanced', duration: '90 min', format: 'Blended', category: 'Digital', pillar: 'Digital & Innovation' },
  // Sector Focus (25-30)
  { id: 37, number: 25, title: 'Manufacturing Sector Insights', level: 'Intermediate', duration: '60 min', format: 'In-Person', category: 'Sector Focus', pillar: 'Sector Focus' },
  { id: 38, number: 26, title: 'Agriculture & Agri-Business', level: 'Intermediate', duration: '60 min', format: 'In-Person', category: 'Sector Focus', pillar: 'Sector Focus' },
  { id: 39, number: 27, title: 'Services Sector Development', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Sector Focus', pillar: 'Sector Focus' },
  { id: 40, number: 29, title: 'Retail & Trade Best Practices', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Sector Focus', pillar: 'Sector Focus' },
  { id: 41, number: 30, title: 'Tourism & Hospitality Growth', level: 'Intermediate', duration: '60 min', format: 'In-Person', category: 'Sector Focus', pillar: 'Sector Focus' },
  // Sustainability & Inclusion (31-36)
  { id: 42, number: 31, title: 'Sustainable Business Practices', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Sustainability', pillar: 'Sustainability & Inclusion' },
  { id: 43, number: 32, title: 'Environmental Management', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Sustainability', pillar: 'Sustainability & Inclusion' },
  { id: 44, number: 33, title: 'Social Impact Measurement', level: 'Intermediate', duration: '90 min', format: 'Blended', category: 'Sustainability', pillar: 'Sustainability & Inclusion' },
  { id: 45, number: 34, title: 'Women Entrepreneur Empowerment', level: 'All Levels', duration: '60 min', format: 'In-Person', category: 'Sustainability', pillar: 'Sustainability & Inclusion' },
  { id: 46, number: 35, title: 'Youth Empowerment & Opportunities', level: 'Foundational', duration: '60 min', format: 'Virtual', category: 'Sustainability', pillar: 'Sustainability & Inclusion' },
  { id: 47, number: 36, title: 'Inclusive Business Models', level: 'Intermediate', duration: '60 min', format: 'Virtual', category: 'Sustainability', pillar: 'Sustainability & Inclusion' },
];

// Filter categories
const filterCategories = [
  { label: 'All Modules', value: 'all' },
  { label: 'Foundations', value: 'Foundations' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Digital', value: 'Digital' },
  { label: 'Leadership', value: 'Leadership' },
  { label: 'Sector Focus', value: 'Sector Focus' },
  { label: 'Sustainability', value: 'Sustainability' },
  { label: 'Advocacy', value: 'Advocacy' },
];

const levelFilters = [
  { label: 'All Levels', value: 'all' },
  { label: 'Foundational', value: 'Foundational' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

// ==================== COMPONENTS ====================

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#0A2B5C] to-[#0D3A7A] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              MSME Training & Academy
            </h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Build the skills, systems, and strategies needed to start, grow, and scale sustainable businesses through our structured MSME development curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1b4620] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Explore Programmes <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Learning Pathways
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#2E7D32] rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-[#2E7D32] to-[#1b4620] rounded-3xl p-12 text-center">
                <GraduationCap size={80} className="mx-auto mb-6 text-white" />
                <p className="text-white text-sm font-medium">Professional Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {statistics.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 text-center shadow-md">
              <stat.icon size={32} className="mx-auto mb-3 text-[#2E7D32]" />
              <div className="text-3xl font-bold mb-1 text-[#0A2B5C]">{stat.value}</div>
              <p className="text-gray-700 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgrammeOverviewSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B5C] mb-3">
            A Practical Learning Framework for Business Growth
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Each module combines theory and practice with real-world application
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {programFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-[#2E7D32] rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2B5C] mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParticipantLevelsSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B5C] mb-3">
            Choose Your Learning Stage
          </h2>
          <p className="text-gray-600 text-lg">
            Programs tailored to your business maturity level
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {participantLevels.map((level, idx) => (
            <div
              key={idx}
              className={`${level.color} border-2 ${level.borderColor} rounded-xl p-6 hover:shadow-lg transition-shadow`}
            >
              <h3 className={`text-xl font-bold mb-1 ${level.accentColor}`}>{level.name}</h3>
              <p className="text-sm font-semibold text-gray-700 mb-2">{level.subtitle}</p>
              <p className="text-sm text-gray-600 mb-4">{level.description}</p>
              <div className="space-y-2">
                {level.focus.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 ${level.accentColor}`} />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumPillarsSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B5C] mb-3">
            Seven Pillars of MSME Development
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive curriculum organized around core business competencies
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculumPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-[#2E7D32] bg-opacity-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#2E7D32] group-hover:bg-opacity-100 transition-all">
                <pillar.icon size={24} className="text-[#0A2B5C] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#0A2B5C] mb-2">{pillar.name}</h3>
              <p className="text-sm font-semibold text-[#2E7D32] mb-3">{pillar.modules}</p>
              <p className="text-gray-600 text-sm mb-4">{pillar.description}</p>
              <div className="flex flex-wrap gap-2">
                {pillar.focus.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#2E7D32] bg-opacity-10 text-[#F5F6F7] px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliveryFormatsSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B5C] mb-3">
            Flexible Learning Formats
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the delivery method that works best for your schedule
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliveryFormats.map((format, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-[#0A2B5C] rounded-lg flex items-center justify-center mb-4">
                <format.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#0A2B5C] mb-1">{format.name}</h3>
              <p className="text-sm font-semibold text-[#2E7D32] mb-3">{format.duration}</p>
              <p className="text-gray-600 text-sm mb-4">{format.description}</p>
              <div className="space-y-2">
                {format.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#2E7D32] rounded-full"></div>
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LearningPathwaysSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B5C] mb-3">
            Recommended Learning Pathways
          </h2>
          <p className="text-gray-600 text-lg">
            Structured paths designed for different business objectives
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {learningPathways.map((pathway, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-8 transition-all ${
                pathway.highlight
                  ? 'bg-gradient-to-br from-[#2E7D32] to-[#1b4620] text-white border-2 border-[#2E7D32] shadow-lg scale-105 md:scale-100 md:col-span-2 lg:col-span-1'
                  : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 text-gray-900'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-2xl font-bold mb-1`}>{pathway.name}</h3>
                  {pathway.highlight && <div className="inline-block bg-navy bg-opacity-20 px-3 py-1 rounded text-sm font-semibold">Most Comprehensive</div>}
                </div>
              </div>
              <p className={`text-sm mb-4 ${pathway.highlight ? 'text-white' : 'text-gray-600'}`}>
                {pathway.description}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen size={18} />
                  <div>
                    <p className={`font-semibold ${pathway.highlight ? 'text-white' : ''}`}>{pathway.modules} Modules</p>
                    <p className={`text-sm ${pathway.highlight ? 'text-green-100' : 'text-gray-600'}`}>{pathway.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={18} />
                  <div>
                    <p className="font-semibold">Target Audience</p>
                    <p className={`text-sm ${pathway.highlight ? 'text-green-100' : 'text-gray-600'}`}>{pathway.target}</p>
                  </div>
                </div>
              </div>
              <p className={`text-sm mb-6 p-3 rounded ${pathway.highlight ? 'bg-navy bg-opacity-20' : 'bg-gray-100'} ${pathway.highlight ? 'text-white' : 'text-gray-800'}`}>
                {pathway.moduleList}
              </p>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 font-semibold transition-all ${
                  pathway.highlight
                    ? 'text-white hover:gap-3'
                    : 'text-[#2E7D32] hover:text-[#1b4620]'
                }`}
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCatalogueSection() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredModules = allModules.filter((module) => {
    const categoryMatch = categoryFilter === 'all' || module.category === categoryFilter;
    const levelMatch = levelFilter === 'all' || module.level === levelFilter;
    return categoryMatch && levelMatch;
  });

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2B5C] mb-3">
            Browse Training Modules
          </h2>
          <p className="text-gray-600 text-lg">
            {filteredModules.length} modules available
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <p className="font-semibold text-[#0A2B5C] mb-3">Filter by Category:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {filterCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  categoryFilter === cat.value
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#2E7D32]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filters */}
        <div className="mb-8">
          <p className="font-semibold text-[#0A2B5C] mb-3">Filter by Level:</p>
          <div className="flex flex-wrap gap-2">
            {levelFilters.map((level) => (
              <button
                key={level.value}
                onClick={() => setLevelFilter(level.value)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  levelFilter === level.value
                    ? 'bg-[#0A2B5C] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#0A2B5C]'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold bg-[#0A2B5C] text-white px-2 py-1 rounded">
                  Module {module.number}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    module.level === 'Foundational'
                      ? 'bg-blue-100 text-blue-700'
                      : module.level === 'Intermediate'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {module.level}
                </span>
              </div>
              <h3 className="font-bold text-[#0A2B5C] mb-3 text-base">{module.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor size={14} />
                  <span>{module.format}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No modules found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CertificationSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0A2B5C] to-[#0D3A7A] rounded-2xl p-12 md:p-16 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Award size={32} className="text-[#2E7D32]" />
              <h2 className="text-3xl md:text-4xl font-bold">Certification & Recognition</h2>
            </div>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Participants who successfully complete programme requirements receive certificates recognizing practical business competencies and readiness for growth opportunities. Our recognized credentials help entrepreneurs access funding, partnerships, and market opportunities.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-10">
              <div className="bg-green bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-10 h-10 bg-[#2E7D32] rounded-lg flex items-center justify-center mb-3">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <h3 className="font-bold mb-2">Certificate Programs</h3>
                <p className="text-green-100 text-sm">Industry-recognized certificates for completed pathways</p>
              </div>
              <div className="bg-green bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-10 h-10 bg-[#2E7D32] rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <h3 className="font-bold mb-2">Skills Validation</h3>
                <p className="text-blue-100 text-sm">Verified competency assessment and recognition</p>
              </div>
              <div className="bg-green bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <div className="w-10 h-10 bg-[#2E7D32] rounded-lg flex items-center justify-center mb-3">
                  <Award size={20} className="text-white" />
                </div>
                <h3 className="font-bold mb-2">Completion Recognition</h3>
                <p className="text-blue-100 text-sm">Public recognition and digital credentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="bg-gradient-to-r from-[#2E7D32] to-[#1b4620] text-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-lg text-green-100 mb-10 leading-relaxed max-w-2xl mx-auto">
          Join our MSME Training & Academy and gain practical skills, tools, networks, and mentorship designed to accelerate business growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#2E7D32] hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Enroll Now <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#2E7D32] font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Request Corporate Training
          </Link>
        </div>
      </div>
    </section>
  );
}

// ==================== MAIN COMPONENT ====================

export default function Training() {
  return (
    <div>
      <HeroSection />
      <ProgrammeOverviewSection />
      <ParticipantLevelsSection />
      <CurriculumPillarsSection />
      <DeliveryFormatsSection />
      <LearningPathwaysSection />
      <ModuleCatalogueSection />
      <CertificationSection />
      <FinalCTASection />
    </div>
  );
}
