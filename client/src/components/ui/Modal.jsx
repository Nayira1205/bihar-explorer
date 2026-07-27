import { useEffect } from "react";
import { X } from "lucide-react";

function Modal({ open, onClose, children, labelledBy }) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("modal-open");
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/70 backdrop-blur-sm px-4 py-10 sm:py-16"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-ivory-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-charcoal transition hover:bg-ink hover:text-ivory"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
