import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Get in Touch</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">We'd love to hear from you. Reach out and let's start a conversation.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-pale flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-green-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Our Office</h3>
                    <p className="text-gray-text text-sm">Plot 305, Block K, Kigamboni, Dar es Salaam, Tanzania</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-pale flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-green-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Call Us</h3>
                    <p className="text-gray-text text-sm">+255 683 333 200</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-pale flex items-center justify-center shrink-0">
                    <Mail size={22} className="text-green-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Email Us</h3>
                    <p className="text-gray-text text-sm">info@siaconsulting.co.tz</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-pale flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-green-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Working Hours</h3>
                    <p className="text-gray-text text-sm">Mon – Fri, 8:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-10 rounded-xl overflow-hidden border border-gray-border bg-gray-bg h-56 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={40} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Kigamboni, Dar es Salaam, Tanzania</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-8">Send us a Message</h2>
              {submitted && (
                <div className="bg-green-pale text-green-brand p-4 rounded-lg mb-6 text-sm font-medium flex items-center gap-2">
                  <span>✓</span>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-sm font-medium flex items-center gap-2">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1.5">Your Message</label>
                  <textarea
                    required
                    disabled={isLoading}
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-brand/30 focus:border-green-brand transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 bg-green-brand text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
