'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';

export type Toast = {
  id: number;
  message: string;
  title?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
};

type ToastContextType = {
  addToast: (message: string, type?: Toast['type'], title?: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [closing, setClosing] = useState<number[]>([]);

  const removeToast = useCallback((id: number) => {
    // Adding the id at closing triggers the fade out animation
    setClosing(prev => [...prev, id]);
    // Wait for animation duration before set closing
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
      setClosing(prev => prev.filter(cid => cid !== id));
    }, 300);
  }, []);

  const addToast = useCallback(
    (message: string, type: Toast['type'] = 'info', title?: string, duration = 3000) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, title, type, duration }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => {
          const isClosing = closing.includes(toast.id);
          return (
            <div
              key={toast.id}
              className={`flex items-start gap-3 w-80 sm:w-96 max-w-sm p-4 rounded-lg shadow-lg border border-neutral-lower
                bg-white text-neutral-800 transition-all
                ${isClosing ? 'animate-fade-out-down' : 'animate-fade-in-up'}`}
            >
              <div className="text-xl pt-1">
                {toast.type === 'success' && <FiCheckCircle className="text-green-500" />}
                {toast.type === 'error' && <FiXCircle className="text-red-500" />}
                {toast.type === 'info' && <FiInfo className="text-blue-500" />}
              </div>
              <div className="flex-1 flex flex-col">
                {toast.title && <span className="font-bold">{toast.title}</span>}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                <FiX />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
