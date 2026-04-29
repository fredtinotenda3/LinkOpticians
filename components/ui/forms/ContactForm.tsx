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
  email: z.string().email("Invalid email address").or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(2, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      form.reset();

      setTimeout(() => setIsSuccess(false), 4000);
    } catch (error) {
      console.error("Message not sent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* SUCCESS (minimal, inline) */}
      {isSuccess && (
        <p className="text-sky-400 text-sm">
          Message received. We&apos;ll respond shortly.
        </p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* ROW 1 */}
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
              label="Email (optional)"
              placeholder="email@example.com"
            />
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="+263 ..."
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="subject"
              label="Subject"
              placeholder="Select subject"
            >
              <option value="">Select a reason</option>
              {CONTACT_FORM_SUBJECTS.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </CustomFormField>
          </div>

          {/* APPOINTMENT */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="appointmentType"
            label="Appointment (optional)"
            placeholder="Select type"
          >
            <option value="">General Inquiry</option>
            {APPOINTMENT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </CustomFormField>

          {/* MESSAGE */}
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="message"
            label="Message"
            placeholder="How can we help you?"
            rows={5}
          />

          {/* BUTTON */}
          <div className="pt-4">
            <SubmitButton
              isLoading={isLoading}
              className="w-full h-14 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition"
            >
              Send Message
            </SubmitButton>
          </div>

        </form>
      </Form>
    </div>
  );
};