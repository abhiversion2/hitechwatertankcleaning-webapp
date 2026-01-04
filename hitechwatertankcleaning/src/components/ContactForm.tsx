'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number (10 digits)'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const services = [
  'Household Water Tank Cleaning',
  'Underground Water Tank Cleaning',
  'Overhead Water Tank Cleaning',
  'Loft Water Tank Cleaning',
  'Residential Society Water Tank Cleaning',
  'Industrial Water Tank Cleaning',
];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      address: '',
      message: '',
    },
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('idle');
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <section className="py-16 bg-blue-50" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mt-4 text-xl text-gray-700">
            Fill out the form below and we'll contact you within hours!
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                Full Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600 ${
                  errors.name ? 'border-red-500' : 'border-gray-400'
                } bg-white`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                Phone Number *
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600 ${
                  errors.phone ? 'border-red-500' : 'border-gray-400'
                } bg-white`}
                placeholder="0123456789"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                Email (optional)
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600 ${
                  errors.email ? 'border-red-500' : 'border-gray-400'
                } bg-white`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-800 mb-1">
                Service Required *
              </label>
              <select
                {...register('service')}
                id="service"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600 ${
                  errors.service ? 'border-red-500' : 'border-gray-400'
                } bg-white`}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-800 mb-1">
                Address / Location *
              </label>
              <input
                {...register('address')}
                type="text"
                id="address"
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600 ${
                  errors.address ? 'border-red-500' : 'border-gray-400'
                } bg-white`}
                placeholder="Full address where cleaning is needed"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">
                Additional Message (optional)
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600 bg-white"
                placeholder="Any specific requirements or tank details..."
              />
            </div>

            {/* Submit Button with Spinner */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="md:col-span-2 text-center text-green-700 font-medium text-lg">
                Thank you! We have received your request and will contact you shortly.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="md:col-span-2 text-center text-red-700 font-medium text-lg">
                Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>

        {/* Direct Contact */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-800">
            Or call us directly:{' '}
            <a href="tel:+919323999502" className="text-blue-700 font-bold hover:underline">
              +91 93239 99502
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}