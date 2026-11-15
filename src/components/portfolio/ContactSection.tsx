import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useData } from '../../context/DataContext';
import { StarburstSticker, RetroBarcode } from '../common/RetroStickers';

export const ContactSection: React.FC = () => {
  const { profile, submitContactMessage } = useData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory retro confetti explosion!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5FF4A', '#FF789B', '#8050F5', '#F5E82D'],
        });
      } catch (err) {
        // ignore if canvas not supported
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="border-b-4 border-retro-black bg-retro-cream p-6 sm:p-10 md:p-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* LEFT COLUMN: Bold Information & Direct Contact */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-purple text-white font-mono text-xs font-bold border-2 border-retro-black shadow-neo-sm mb-4">
              <MessageSquare size={16} />
              <span>TRANSMISSION TERMINAL</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-black text-retro-black uppercase leading-[1.05] tracking-tight">
              LET'S TALK ABOUT YOUR NEXT PROJECT.
            </h2>

            <p className="font-mono text-sm sm:text-base text-retro-darkgray mt-6 leading-relaxed">
              Available for full-time engineering roles, high-impact consulting, or challenging contract sprints. Let's create something unforgettable.
            </p>

            {/* Direct Email Card */}
            <div className="mt-8 card-neo p-5 bg-white border-2 border-retro-black">
              <span className="font-mono text-xs font-bold text-gray-500 uppercase block mb-1">
                DIRECT INBOX
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="font-display text-lg sm:text-xl font-black text-retro-black hover:text-retro-purple transition-colors break-all flex items-center gap-2"
              >
                <Mail size={18} className="text-retro-purple flex-shrink-0" />
                <span>{profile.email}</span>
              </a>
            </div>
          </div>

          {/* Retro Barcode & Decorative Sticker */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-retro-black/30">
            <RetroBarcode code="PORTFOLIO-CONTACT-01" />
            <div className="hidden sm:block">
              <StarburstSticker text="FAST REPLY" color="#C5FF4A" className="w-20 h-20" />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Neo-Brutalist Contact Form */}
        <div className="lg:col-span-7">
          <div className="card-neo bg-white p-6 sm:p-8 md:p-10 border-4 border-retro-black shadow-neo-xl relative">
            
            {/* Window bar */}
            <div className="bg-retro-black text-white -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 md:-mx-10 md:-mt-10 px-4 py-2 flex items-center justify-between border-b-4 border-retro-black mb-6">
              <span className="font-mono text-xs font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-retro-lime inline-block" />
                SEND_MESSAGE.EXE
              </span>
              <span className="font-mono text-[10px] text-gray-300">SECURE ENCRYPTION</span>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-retro-lime border-3 border-retro-black mx-auto flex items-center justify-center shadow-neo">
                  <CheckCircle2 size={36} className="text-retro-black" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-retro-black">
                  TRANSMISSION RECEIVED!
                </h3>
                <p className="font-mono text-sm text-retro-darkgray max-w-md mx-auto">
                  Thank you for reaching out! Your message has been logged in the developer's dashboard and I'll respond as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-neo text-xs py-2 px-4 mt-4"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="bg-retro-pink/20 border-2 border-retro-pink text-retro-black p-3 font-mono text-xs font-bold">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-retro-black mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ada Lovelace"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-neo"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-retro-black mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ada@computing.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-neo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-retro-black mb-1.5">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-neo"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase text-retro-black mb-1.5">
                    MESSAGE CONTENT *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Joshua, let's discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-neo resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-neo-lime w-full py-3 text-sm sm:text-base font-black flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
