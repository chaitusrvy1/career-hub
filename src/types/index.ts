export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Remote';
  experience: string;
  salary: string;
  technology: string;
  skills: string[];
  summary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface ApplicationFormInput {
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  experience: 'Entry' | 'Mid-level' | 'Senior' | 'Junior' | 'Other';
  currentCompany: string;
  skills: string;
  preferredRole: string;
  linkedin: string;
  resumeLink?: string;
  message: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface SubmissionLog {
  id: string;
  type: 'application' | 'contact';
  timestamp: string;
  data: any;
}
