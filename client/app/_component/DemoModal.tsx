'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Award, User, Loader2, Key } from 'lucide-react';
import { useLoginMutation } from '@/redux/api/auth';
import { useAppDispatch } from '@/redux/redux';
import { setCredentials } from '@/redux/states/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_ACCOUNTS = {
  RESTAURANT: {
    title: 'Restaurant Owner',
    description:
      'Full administrative access: oversee finances, manage plans, toggle shop hours, manage menus & employees.',
    icon: Award,
    email:
      process.env.NEXT_PUBLIC_DEMO_RESTAURANT_EMAIL || 'owner@royalbistro.com',
    password: process.env.NEXT_PUBLIC_DEMO_RESTAURANT_PASSWORD || 'restro123',
    color: 'from-amber-500 to-orange-600',
    hoverBg: 'hover:border-amber-500/50 hover:bg-amber-500/5',
    iconColor: 'text-amber-500 bg-amber-500/10',
  },
  MANAGER: {
    title: 'Manager (Admin Staff)',
    description:
      'Operational leadership: full control of live orders, adding employees, managing categories & products.',
    icon: ShieldAlert,
    email:
      process.env.NEXT_PUBLIC_DEMO_MANAGER_EMAIL || 'admin@royalbistro.com',
    password: process.env.NEXT_PUBLIC_DEMO_MANAGER_PASSWORD || 'user123',
    color: 'from-blue-500 to-indigo-600',
    hoverBg: 'hover:border-blue-500/50 hover:bg-blue-500/5',
    iconColor: 'text-blue-500 bg-blue-500/10',
  },
  STAFF: {
    title: 'Normal Staff',
    description:
      'Counter & Kitchen view: process incoming live orders, update statuses, and view ticket summaries.',
    icon: User,
    email: process.env.NEXT_PUBLIC_DEMO_STAFF_EMAIL || 'staff1@royalbistro.com',
    password: process.env.NEXT_PUBLIC_DEMO_STAFF_PASSWORD || 'user123',
    color: 'from-emerald-500 to-teal-600',
    hoverBg: 'hover:border-emerald-500/50 hover:bg-emerald-500/5',
    iconColor: 'text-emerald-500 bg-emerald-500/10',
  },
};

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const [login, { isLoading }] = useLoginMutation();

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Keyboard Escape close listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDemoSignIn = async (accountType: keyof typeof DEMO_ACCOUNTS) => {
    if (isLoading) return;
    const account = DEMO_ACCOUNTS[accountType];
    const toastId = toast.loading(`Signing in as ${account.title}...`);

    try {
      const response: any = await login({
        email: account.email,
        password: account.password,
      }).unwrap();

      if (!response || !response.success) {
        throw new Error(response?.message || 'Login failed');
      }

      dispatch(setCredentials(response));
      toast.success(`Welcome to Restroo! Logged in as ${account.title}`);

      onClose();

      // Check role or configuration to direct
      const role = response.user?.role;
      if (role === USER_ROLE_TYPE.RESTAURANT) {
        router.push('/dashboard');
      } else {
        router.push('/dashboard/live-orders');
      }
    } catch (err: any) {
      console.error('Demo login error:', err);
      toast.error(err?.data?.message || 'Demo login failed. Please try again.');
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            ref={modalRef}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header decor */}
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              {/* Header Title */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                    Choose a Demo Role
                  </h3>
                  <p className="text-sm text-slate-500">
                    Explore Restroo instantly with auto-generated credentials
                  </p>
                </div>
              </div>

              {/* Persona Grid */}
              <div className="space-y-4">
                {(
                  Object.keys(DEMO_ACCOUNTS) as Array<
                    keyof typeof DEMO_ACCOUNTS
                  >
                ).map((key) => {
                  const account = DEMO_ACCOUNTS[key];
                  const Icon = account.icon;

                  return (
                    <motion.button
                      key={key}
                      onClick={() => handleDemoSignIn(key)}
                      disabled={isLoading}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      className={`flex w-full text-left items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 shadow-sm ${account.hoverBg} disabled:opacity-50 disabled:pointer-events-none group`}
                    >
                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${account.iconColor} group-hover:scale-110`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                            {account.title}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded bg-gradient-to-r ${account.color}`}
                          >
                            Quick Access
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-normal">
                          {account.description}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer Loading State indicator */}
              {isLoading && (
                <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Configuring workspace and signing in...</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
