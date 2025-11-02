"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
};

type ToastContextType = {
  notify: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container fixed bottom-6 right-6 z-[1000] flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`glass rounded-lg px-4 py-3 shadow-lg border ${
              t.type === "success"
                ? "border-green-600 text-green-400"
                : t.type === "error"
                ? "border-red-600 text-red-400"
                : "border-blue-600 text-blue"
            } animate-in fade-in slide-in-from-bottom-2`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}