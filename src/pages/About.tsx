import { Eye, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  { icon: Eye, title: 'Vision', desc: 'To be a leading SME support organization in Tanzania.' },
  { icon: Target, title: 'Mission', desc: 'To foster the growth of SMEs through consultancy, mentorship and linkages.' },
  { icon: Heart, title: 'Values', desc: 'Integrity, Excellence, Innovation, Impact, Teamwork.' },
];

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">About SIA Consulting Dynamics</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Learn about our mission, values, and the team behind our success.</p>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image placeholder */}
            <div className="bg-gray-bg rounded-xl h-64 md:h-80 flex items-center justify-center overflow-hidden">
              <img src="/images/WIL2.jpg" alt="SIA Consulting Dynamics" className="w-full h-full object-cover" />
            </div>

            {/* Text content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">About SIA Consulting Dynamics</h2>
              <p className="text-gray-text leading-relaxed mb-4">
                SIA Consulting Dynamics is a private firm based in Dar es Salaam, Tanzania, dedicated to unlocking the potential of SMEs through business consultancy, capacity building, and strategic partnerships.
              </p>
              <p className="text-gray-text leading-relaxed mb-4">
                We are passionate about excellence and committed to integrity. Our team of experienced professionals works closely with entrepreneurs, investors, and development partners to create lasting economic impact.
              </p>
              <p className="text-gray-text leading-relaxed">
                With over 15 years of experience, we have supported thousands of small and medium enterprises across Tanzania, helping them grow, compete, and thrive in local and global markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="bg-gray-bg py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-pale flex items-center justify-center">
                  <item.icon size={24} className="text-green-brand" />
                </div>
                <h3 className="font-semibold text-navy text-base mb-2">{item.title}</h3>
                <p className="text-gray-text text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">Our Leadership Team</h2>
          <p className="text-gray-text max-w-2xl mx-auto mb-12">
            Meet the experienced professionals driving our mission to empower SMEs across Tanzania.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Janet Mbene',
                role: 'Chief Executive Officer',
                bio: 'A distinguished Senior Economist, International Trade and Regional Integration, Finance and Banking Expert with Cabinet Ministerial, Parliamentary, Board Governance, and senior Leadership and management experience in the public, private, civil society, and academic sectors',
                image: '/images/team/janet-mbene.png',
              },
              {
                name: 'Eunice John Chiume',
                role: 'Marketing and Communication Manager',
                bio: 'A seasoned Strategic Marketing and Communications professional with over two decades of experience leading corporate affairs, stakeholder engagement, and brand positioning across Tanzania’s financial and social protection sectors. She has held senior leadership roles at NMB Bank Plc, Public Service Social Security Fund (PSSSF), and National Social Security Fund (NSSF), where she successfully designed and executed communication strategies that enhanced institutional reputation and stakeholder trust.',
                image: '/images/team/Eunice-john.jpeg',
              },
              {
                name: 'Revocatus Valery',
                role: 'Technical Advisor',
                bio: 'Revocatus has over 20 years of experience working with local and international organizations. In his early career, he worked in the banking industry as a Credit Officer and Team Leader in the Underwriting Unit at Akiba Commercial Bank and Barclays Bank respectively. He also worked with donor-funded development projects as project coordinator.',
                image: '/images/team/revocatus-valery.jpeg',
              },
              {
                name: 'Yohana Matiko Isack',
                role: 'Environmental Engineer',
                bio: 'Yohana is an accomplished Youth Advocate with extensive experience in project management, entrepreneurship development, and climate action. He brings dynamic leadership to his work in empowering youth, women, and communities to achieve sustainable growth and resilience. A certified Climate X Youth Trainer and Pioneer, his initiatives emphasize addressing climate change\'s social and economic impacts, especially on marginalized groups.',
                image: '/images/team/yohana-matiko-isack.jpeg',
              },
              {
                name: 'Neema Winyael Munisi',
                role: 'Training Specialist',
                bio: 'Neema Munisi is a certified trainer/facilitator in various OD methodologies. She holds Master Degree in Community Economic Development (MCED). Neema has more than 10 years experience on Value chain Development and Analysis. She worked for five years on the Value Chain Development Projects, with PricewaterhouseCoopers LTD dealing with cassava and sunflower VCs in Ruvuma and Mwanza. She also worked with ACDI/VOCA, RUDI on Staple Food Value Chain Activity, Feed the Future – NAFAKA Project for 3 years. She has 3 years’ experience in conducting Gender Based Value Chain Analysis (GBVCA) with SNV for Women and Youth project.',
                image: '/images/team/neema-winyael-munisi.jpg',
              },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {/* Profile Image */}
                <div className="h-80 bg-gray-bg overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-navy text-lg mb-1">{member.name}</h3>
                  <p className="text-green-brand text-sm font-medium mb-4">{member.role}</p>
                  
                  {/* Bio */}
                  <p className="text-gray-text text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  
                  {/* Read More Link */}
                  <Link to="/category/team" className="inline-block px-6 py-2 bg-green-brand text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
