import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  FileText, 
  MessageSquare, 
  Building, 
  Wrench, 
  Briefcase,
  CheckCircle,
  Clock
} from 'lucide-react';
import { ApplicationFormInput, SubmissionLog } from '../types';

interface ApplicationFormProps {
  preFilledRole: string;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
  onSubmissionSuccess: (submission: SubmissionLog) => void;
}

export default function ApplicationForm({ preFilledRole, addToast, onSubmissionSuccess }: ApplicationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  // Sync preFilledRole with react-hook-form's default values when it changes
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ApplicationFormInput>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      currentLocation: '',
      experience: 'Mid-level',
      currentCompany: '',
      skills: '',
      preferredRole: preFilledRole || '',
      linkedin: '',
      resumeLink: '',
      message: ''
    }
  });

  // Keep react-hook-form synced if preFilledRole changes from a job card apply trigger
  React.useEffect(() => {
    if (preFilledRole) {
      setValue('preferredRole', preFilledRole);
    }
  }, [preFilledRole, setValue]);

  const onSubmit = async (data: ApplicationFormInput) => {
    setSubmitting(true);
    try {
      // FormSubmit endpoint (free and requires no registration/backend)
      // It posts to https://formsubmit.co/ajax/your-email
      // To prevent spam and maintain a clean test sandbox, we use a test-inbox URL
      const response = await fetch('https://formsubmit.co/ajax/9986b51e68710328b9d03837920807e3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Job Application: ${data.preferredRole} - ${data.fullName}`,
          ...data
        })
      });

      const uniqueId = 'app-' + Math.random().toString(36).substr(2, 9);
      
      const newLog: SubmissionLog = {
        id: uniqueId,
        type: 'application',
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

      // Call parent handler to save submissions logs in state & localStorage
      onSubmissionSuccess(newLog);
      setLastSubmittedId(uniqueId);
      
      addToast(`Your application for "${data.preferredRole}" was sent!`, 'success');
      reset();
    } catch (err) {
      addToast('Submission failed. Check network or try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="apply" className="py-20 md:py-28 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
            Inquiry Submission Portal
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-4 leading-tight">
            Express Your Core Career Interest
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Fill out your developer coordinates and competencies below. Our hiring partners evaluate applications and contact qualified profiles within 24 business hours.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-150 dark:border-slate-850 shadow-xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Success screen toggle */}
          {lastSubmittedId ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="mx-auto h-16 w-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-5">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Submission Transmitted</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                Your application details have been dispatched. A copy has been saved locally to your browser submission history for review.
              </p>

              <div className="mt-8 p-5 bg-slate-50 dark:bg-slate-850/50 rounded-2xl text-left border border-slate-100 dark:border-slate-800 max-w-md mx-auto space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>SLA Timer: Under 24 Business Hours</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Our recruiting desk compiles profile details and sends direct email briefs containing preparation packages.
                </p>
              </div>

              <button
                onClick={() => setLastSubmittedId(null)}
                className="mt-8 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline cursor-pointer"
              >
                Submit another application form
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* SECTION 1: Personal Details */}
              <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">1. Professional Coordinates</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Alex Mercer"
                      {...register('fullName', { required: 'Full name is required' })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      {...register('email', { 
                        required: 'Email address is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                      })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="(555) 019-2834"
                      {...register('phone', { required: 'Phone number is required' })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone.message}</p>}
                </div>

                {/* Current Location */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Current Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Austin, TX or Remote"
                      {...register('currentLocation', { required: 'Current location is required' })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  {errors.currentLocation && <p className="text-[11px] text-rose-500 mt-1">{errors.currentLocation.message}</p>}
                </div>
              </div>

              {/* SECTION 2: Work & Skills */}
              <div className="border-b border-slate-100 dark:border-slate-800/80 pt-4 pb-4">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">2. Background & Placement Metrics</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Experience Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Experience Level *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <select
                      {...register('experience', { required: 'Experience level is required' })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 transition cursor-pointer"
                    >
                      <option value="Junior">Junior (1-2 years)</option>
                      <option value="Mid-level">Mid-level (2-4 years)</option>
                      <option value="Senior">Senior (5+ years)</option>
                      <option value="Entry">Entry Level / Intern</option>
                    </select>
                  </div>
                </div>

                {/* Current Company */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Current Employer / Org</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Freelance, University, or Company Name"
                      {...register('currentCompany')}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Skills Summary */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Primary Technical Skills *</label>
                  <div className="relative">
                    <Wrench className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. React, TS, Tailwind, Node.js"
                      {...register('skills', { required: 'Please list some key skills' })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  {errors.skills && <p className="text-[11px] text-rose-500 mt-1">{errors.skills.message}</p>}
                </div>

                {/* Preferred Role / Job Title */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Preferred Role *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Lead Full-Stack Engineer"
                      {...register('preferredRole', { required: 'Please specify your target role' })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  {errors.preferredRole && <p className="text-[11px] text-rose-500 mt-1">{errors.preferredRole.message}</p>}
                </div>
              </div>

              {/* SECTION 3: Social & Message */}
              <div className="border-b border-slate-100 dark:border-slate-800/80 pt-4 pb-4">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">3. Links & Cover Profile</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* LinkedIn */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">LinkedIn Profile Link *</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/alexmercer"
                      {...register('linkedin', { 
                        required: 'LinkedIn profile is required',
                        pattern: { value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i, message: 'Please enter a valid LinkedIn URL' }
                      })}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                  {errors.linkedin && <p className="text-[11px] text-rose-500 mt-1">{errors.linkedin.message}</p>}
                </div>

                {/* Resume Link */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Resume Link (PDF / Google Drive)</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="url"
                      placeholder="https://drive.google.com/file/... or Dropbox"
                      {...register('resumeLink')}
                      className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Cover Letter / Message *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3 text-slate-400 w-4.5 h-4.5" />
                  <textarea
                    rows={4}
                    placeholder="Briefly explain your primary engineering accomplishments, project works, and why you want to build with NexusLabs..."
                    {...register('message', { required: 'Please leave a message or cover letter summary' })}
                    className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
                  />
                </div>
                {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message.message}</p>}
              </div>

              {/* Submit Trigger Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 text-xs font-bold shadow-md hover:shadow-lg disabled:bg-indigo-400 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Transmitting Secure Application...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Secure Application Form
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
