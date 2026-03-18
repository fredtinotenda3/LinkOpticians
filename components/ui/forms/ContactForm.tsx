// components\ui\forms\ContactForm.tsx - CORRECTED VERSION

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
      console.log("Contact form submitted:", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    <div className="space-y-6">
      {isSuccess && (
        <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
          <p className="text-green-500 font-medium">
            Message received. We will respond during business hours.
          </p>
        </div>
      )}
      
      <div className="p-4 bg-dark-300 rounded-lg mb-6">
        <p className="text-sm text-dark-600">
          <strong>Privacy Note:</strong> Your information is collected for contact purposes only.
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
              placeholder="Enter name"
            />
            
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address (optional)"
              placeholder="Enter email address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
            />
            
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="subject"
              label="Subject"
              placeholder="Select subject"
            >
              <option value="">Select subject</option>
              {CONTACT_FORM_SUBJECTS.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </CustomFormField>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="appointmentType"
            label="Appointment Type (optional)"
            placeholder="Select appointment type"
          >
            <option value="">Select appointment type</option>
            {APPOINTMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="message"
            label="Message"
            placeholder="Enter your message"
            rows={6}
          />

          <SubmitButton isLoading={isLoading}>
            Send Message
          </SubmitButton>

          <p className="text-center text-sm text-dark-600">
            We respond to messages during business hours.
          </p>
        </form>
      </Form>
    </div>
  );
};