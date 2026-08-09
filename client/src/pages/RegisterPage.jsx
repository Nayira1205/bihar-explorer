import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const update = useCallback((key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value })), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      await signUp(form.name, form.email, form.password);
      navigate('/profile');
    } catch (err) {
      setStatus('error');
      const msg = err?.response?.data?.message;
      setErrorMessage(msg || 'Could not create account');
    }
  };

  return (
    <div className="bg-ink min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center gap-2 justify-center">
          <span className="h-2 w-2 rounded-full bg-gold" />
          <h1 className="font-display text-2xl text-parchment">Bihar <span className="italic text-gold">Explorer</span></h1>
        </Link>
        <div className="rounded-3xl border border-parchment/10 bg-white/[0.03] p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold">
              <UserPlus size={17} className="text-ink" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-vermilion/80">Join Bihar Explorer</p>
              <h2 className="font-display text-2xl text-parchment">Create an account</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            {[
              { key: 'name', icon: User, type: 'text', placeholder: 'Full name', label: 'Full name' },
              { key: 'email', icon: Mail, type: 'email', placeholder: 'Email address', label: 'Email address' },
              { key: 'password', icon: Lock, type: 'password', placeholder: 'Password (min. 6 characters)', label: 'Password', minLength: 6 },
            ].map((field) => (
              <div key={field.key} className="flex items-center gap-3 rounded-2xl border border-parchment/15 bg-white/5 px-4 py-3">
                <field.icon size={16} className="text-parchment/40" />
                <input type={field.type} required minLength={field.minLength} placeholder={field.placeholder} value={form[field.key]} onChange={update(field.key)} aria-label={field.label} className="w-full bg-transparent text-sm text-parchment outline-none placeholder:text-parchment/40" />
              </div>
            ))}
            {status === 'error' && (
              <p className="flex items-center gap-2 rounded-xl bg-vermilion/10 px-4 py-2.5 text-sm text-vermilion" role="alert">
                <AlertCircle size={14} /> {errorMessage}
              </p>
            )}
            <button type="submit" disabled={status === 'loading'} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-ink transition hover:scale-[1.02] disabled:opacity-50">
              {status === 'loading' ? 'Please wait...' : 'Create account'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-parchment/60">
            Already have an account? <Link to="/login" className="text-gold transition hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
