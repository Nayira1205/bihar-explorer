import { useState } from "react";
import { User, Mail, Lock, LogIn, UserPlus } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const reset = () => {
    setForm({ name: "", email: "", password: "" });
    setStatus("idle");
    setErrorMessage("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      handleClose();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Try again.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} labelledBy="auth-modal-title">
      <div className="p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold">
            {mode === "login" ? (
              <LogIn size={17} className="text-ink" />
            ) : (
              <UserPlus size={17} className="text-ink" />
            )}
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-vermilion/80">
              {mode === "login" ? "Welcome back" : "Join Bihar Explorer"}
            </p>
            <h2 id="auth-modal-title" className="text-2xl text-ink" style={{ fontFamily: "'Fraunces', serif" }}>
              {mode === "login" ? "Log in" : "Create an account"}
            </h2>
          </div>
        </div>

        <div className="mt-7 flex gap-1 rounded-full bg-ivory p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-2 text-sm transition ${
              mode === "login" ? "bg-ink text-parchment" : "text-charcoal-soft"
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 rounded-full py-2 text-sm transition ${
              mode === "register" ? "bg-ink text-parchment" : "text-charcoal-soft"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {mode === "register" && (
            <div className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-ivory-card px-4 py-3">
              <User size={16} className="text-charcoal/40" />
              <input
                type="text"
                required
                placeholder="Full name"
                value={form.name}
                onChange={update("name")}
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-charcoal/40"
              />
            </div>
          )}

          <div className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-ivory-card px-4 py-3">
            <Mail size={16} className="text-charcoal/40" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={update("email")}
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-charcoal/40"
            />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-ink/15 bg-ivory-card px-4 py-3">
            <Lock size={16} className="text-charcoal/40" />
            <input
              type="password"
              required
              minLength={6}
              placeholder={mode === "register" ? "Password (min. 6 characters)" : "Password"}
              value={form.password}
              onChange={update("password")}
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-charcoal/40"
            />
          </div>

          {status === "error" && (
            <p className="rounded-xl bg-vermilion/10 px-4 py-2.5 text-sm text-vermilion">{errorMessage}</p>
          )}

          <Button
            type="submit"
            variant="gold-solid"
            className="w-full justify-center"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default AuthModal;
