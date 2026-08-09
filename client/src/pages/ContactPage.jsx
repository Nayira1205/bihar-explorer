import { useState, useCallback } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import SectionEyebrow from '../components/common/SectionEyebrow';
import api from '../lib/api';

const emptyForm = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');

  const update = useCallback((key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value })), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await api.post('/contact', form);
      setStatus('done');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="px-6 py-20 md:px-12 xl:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <SectionEyebrow number="01" label="Contact" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
            Get in <span className="italic text-vermilion">touch</span>
          </h1>
          <p className="mt-6 font-body text-lg leading-8 text-charcoal-soft">
            Questions, feedback, or partnership ideas? We'd love to hear from you.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">Contact information</h2>
            <div className="mt-6 space-y-4">
              {[
                { icon: Phone, label: 'Phone', value: '+91-612-221-7045' },
                { icon: Mail, label: 'Email', value: 'secy-tourism-bih@nic.in' },
                { icon: MapPin, label: 'Address', value: 'Patna, Bihar 800001' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-vermilion/10">
                    <item.icon size={18} className="text-vermilion" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-charcoal/50">{item.label}</p>
                    <p className="mt-1 text-sm text-ink">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-ivory-card border border-ink/10 p-8">
            {status === 'done' ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
                  <Send size={24} className="text-gold" />
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">Message sent!</h3>
                <p className="mt-2 text-sm text-charcoal-soft">We'll get back to you soon.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-medium uppercase tracking-wide text-vermilion">Send another {'\u2192'}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', label: 'Name', type: 'text', required: true },
                  { key: 'email', label: 'Email', type: 'email', required: true },
                  { key: 'subject', label: 'Subject', type: 'text', required: false },
                ].map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className="text-xs uppercase tracking-wide text-charcoal/50">{field.label}</label>
                    <input id={field.key} type={field.type} required={field.required} value={form[field.key]} onChange={update(field.key)} className="mt-1.5 w-full rounded-2xl border border-ink/15 bg-ivory px-4 py-3 text-sm text-ink outline-none focus:border-ink/40" />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="text-xs uppercase tracking-wide text-charcoal/50">Message</label>
                  <textarea id="message" required rows={4} value={form.message} onChange={update('message')} className="mt-1.5 w-full rounded-2xl border border-ink/15 bg-ivory px-4 py-3 text-sm text-ink outline-none focus:border-ink/40" />
                </div>
                {status === 'error' && (
                  <p className="rounded-xl bg-vermilion/10 px-4 py-2.5 text-sm text-vermilion" role="alert">Couldn't send your message. Please try again.</p>
                )}
                <button type="submit" disabled={status === 'loading'} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink transition hover:scale-[1.02] disabled:opacity-50">
                  {status === 'loading' ? 'Sending...' : 'Send message'} <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
