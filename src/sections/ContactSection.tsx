import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Send, 
  User, 
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle,
  Building2
} from 'lucide-react';
import { ContactFormInput, SubmissionLog } from '../types';

interface ContactSectionProps {
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onSubmissionSuccess: (submission: SubmissionLog) => void;
}

export default function ContactSection({ addToast, onSubmissionSuccess }: ContactSectionProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInput>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormInput) => {
    setSubmitting(true);
    try {
      // POST to the FormSubmit backend
      await fetch('https://formsubmit.co/ajax/9986b51e68710328b9d03837920807e3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New General Inquiry: ${data.subject} - ${data.name}`,
          ...data
        })
      });

      const uniqueId = 'con-' + Math.random().toString(36).substr(2, 9);
      
      const newLog: SubmissionLog = {
        id: uniqueId,
        type: 'contact',
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        data: {
          ...data
        }
      };

      onSubmissionSuccess(newLog);
      setSuccess(true);
      addToast('Message dispatched successfully!', 'success');
      reset();
    } catch (err) {
      addToast('Dispatch failed. Please check connection.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-900/80">
      <div className="mx-auto max-w-6xl px-6">
        
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Contact Details Coordinates Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
                Get In Touch
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4">
                Let's Start a Conversation
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                Have custom staffing queries, partnership concepts, or questions about active vacancies? Reach out directly using our secure touchpoints.
              </p>
            </div>

            {/* Direct Contact Nodes */}
            <div className="space-y-6">
              
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm text-indigo-600 dark:text-indigo-400">
                  <MapPin className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">Headquarters</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                    100 Pine Street, Floor 14<br />
                    San Francisco, CA 94111
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm text-indigo-600 dark:text-indigo-400">
                  <Mail className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">Corporate Inbox</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 hover:text-indigo-600 transition">
                    <a href="mailto:careers@nexuslabs.co">careers@nexuslabs.co</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm text-indigo-600 dark:text-indigo-400">
                  <Phone className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">Support Desk</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                    +1 (415) 555-0192 (Mon - Fri, 9am - 5pm PST)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm text-indigo-600 dark:text-indigo-400">
                  <Linkedin className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">Professional Network</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 hover:text-indigo-600 transition">
                    <a href="https://linkedin.com/company/nexuslabs-co" target="_blank" rel="noreferrer">linkedin.com/company/nexuslabs-co</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Stylized vector region design map */}
            <div className="h-44 rounded-3xl border border-slate-150 dark:border-slate-850 bg-slate-100 dark:bg-slate-900 overflow-hidden relative flex items-center justify-center p-6 shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
              <div className="relative text-center z-10 space-y-1.5">
                <Building2 className="h-6 w-6 text-indigo-500 mx-auto animate-bounce" />
                <span className="font-display text-xs font-bold text-slate-800 dark:text-slate-200 block">San Francisco HQ Node</span>
                <span className="text-[10px] text-slate-400 block">Global Distributed Cluster Coordinates Active</span>
              </div>
            </div>

          </div>

          {/* Business Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-850 shadow-xl p-6 sm:p-8">
              
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <HelpCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-display font-bold text-slate-950 dark:text-slate-100 text-base">Send General Inquiry</span>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="mx-auto h-12 w-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Message Dispatched!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                    Thank you. Your corporate question has been routed to our help desk. We will respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline cursor-pointer"
                  >
                    Send another query message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Morgan Taylor"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          placeholder="morgan@enterprise.com"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                          })}
                          className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="(555) 011-3948"
                          {...register('phone')}
                          className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Subject / Goal *</label>
                      <div className="relative">
                        <Sparkles className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="e.g. Enterprise Staffing Inquiry"
                          {...register('subject', { required: 'Subject is required' })}
                          className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                      {errors.subject && <p className="text-[10px] text-rose-500 mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Inquiry Details *</label>
                    <textarea
                      rows={4}
                      placeholder="Detail your question, consulting parameters, or scheduling options here..."
                      {...register('message', { required: 'Message details are required' })}
                      className="w-full text-xs px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition resize-none"
                    />
                    {errors.message && <p className="text-[10px] text-rose-500 mt-1">{errors.message.message}</p>}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-white py-3 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Dispatched...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send Partnership Message
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
