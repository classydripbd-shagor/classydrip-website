import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 bg-neutral-900 text-white rounded-2xl shadow-2xl border border-neutral-700 animate-in slide-in-from-top duration-300"
        >
          <div className="flex items-center gap-2.5">
            {t.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />
            )}
            <span className="text-xs font-medium leading-snug">{t.message}</span>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-neutral-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
