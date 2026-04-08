// components/ui/forms/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { FormFieldType } from "./PatientForm";
import { CONTACT_FORM_SUBJECTS, APPOINTMENT_TYPES } from "@/constants/contact";

const ContactFormValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email").or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(2, "Please select a subject"),
  message: z.string().min(10, "Please enter a message"),
  appointmentType: z.string().optional(),
});

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof ContactFormValidation>>({
    resolver: zodResolver(ContactFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      appointmentType: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ContactFormValidation>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call for the Harare-based business
      console.log("Contact form submitted:", data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      form.reset();
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Message not sent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {isSuccess && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-blue-500 rounded-full animate-pulse" />
            <p className="text-blue-400 font-bold text-sm">
              Message received. Our team will respond shortly.
            </p>
          </div>
        </div>
      )}
      
      <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl">
        <p className="text-xs text-white/40 leading-relaxed">
          <span className="text-blue-500 font-bold uppercase tracking-widest mr-2">Privacy Note:</span> 
          Your information is securely processed for contact purposes only.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your full name"
            />
            
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address (Optional)"
              placeholder="email@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="+263 ..."
            />
            
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="subject"
              label="Subject"
              placeholder="Select subject"
            >
              <option value="" className="bg-[#000B18]">Select a reason</option>
              {CONTACT_FORM_SUBJECTS.map((subject) => (
                <option key={subject.value} value={subject.value} className="bg-[#000B18]">
                  {subject.label}
                </option>
              ))}
            </CustomFormField>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="appointmentType"
            label="Appointment Type (Optional)"
            placeholder="Select type"
          >
            <option value="" className="bg-[#000B18]">General Inquiry</option>
            {APPOINTMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value} className="bg-[#000B18]">
                {type.label}
              </option>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="message"
            label="Message"
            placeholder="How can we help you?"
            rows={5}
          />

          <div className="pt-2">
            <SubmitButton isLoading={isLoading} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] transition-all">
              Send Message
            </SubmitButton>
          </div>

          <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            Professional care • Response within business hours
          </p>
        </form>
      </Form>
    </div>
  );
};