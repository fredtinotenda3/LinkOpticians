// components/ui/forms/SimpleBookingForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "./PatientForm";
import { SimpleBookingSchema } from "@/lib/validation";
import SubmitButton from "@/components/SubmitButton";
import { createSimpleAppointment } from "@/lib/actions/booking.actions";
import { Branch } from "@/types";
import { SelectItem } from "../select";
import { trackAppointmentRequest, trackSMSOptIn } from "@/components/Analytics"; // ADDED

interface SimpleBookingFormProps {
  branches: Branch[];
}

// UPDATED SCHEMA WITH SMS OPT-IN
const EnhancedBookingSchema = SimpleBookingSchema.extend({
  smsOptIn: z.boolean().default(true).optional(),
});

export const SimpleBookingForm = ({ branches }: SimpleBookingFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof EnhancedBookingSchema>>({
    resolver: zodResolver(EnhancedBookingSchema),
    defaultValues: {
      branchId: "",
      schedule: new Date(),
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      reason: "",
      smsOptIn: true, // Default to opted-in
    },
  });

  const onSubmit = async (values: z.infer<typeof EnhancedBookingSchema>) => {
    setIsLoading(true);

    try {
      // TRACK ANALYTICS EVENTS
      const branch = branches.find(b => b.$id === values.branchId);
      trackAppointmentRequest(
        branch?.name || "Unknown Branch",
        "online_form"
      );
      
      trackSMSOptIn(values.smsOptIn === true);
      
      const result = await createSimpleAppointment(values);
      
      if (result?.success) {
        router.push(`/booking/confirmation?bookingId=${result.bookingId}`);
      }
    } catch (error) {
      console.error("Appointment booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Branch Selection */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="branchId"
          label="Select Practice Location"
          placeholder="Select a practice location"
        >
          {branches.map((branch) => (
            <SelectItem key={branch.$id} value={branch.$id!}>
              {branch.name} - {branch.address}
            </SelectItem>
          ))}
        </CustomFormField>

        {/* Date & Time */}
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Preferred Date & Time"
          showTimeSelect
          dateFormat="MM/dd/yyyy - h:mm aa"
        />

        {/* Patient Information */}
        <div className="space-y-4">
          <h3 className="text-16-semibold">Patient Information</h3>
          
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="patientName"
            label="Full Name"
            placeholder="Enter your full name"
            iconSrc="/assets/icons/user.svg"
          />

          <div className="flex flex-col gap-6 md:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="patientEmail"
              label="Email Address (optional)"
              placeholder="Enter email address"
              iconSrc="/assets/icons/email.svg"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="patientPhone"
              label="Phone Number"
              placeholder="Enter phone number"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason for Appointment (optional)"
            placeholder="Describe reason for appointment"
          />

          {/* SMS Opt-in Section */}
          <div className="p-4 bg-dark-300 rounded-lg border border-dark-500">
            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="smsOptIn"
              label="Send SMS appointment reminders and confirmations"
            />
            <div className="mt-2 space-y-1">
              <p className="text-xs text-dark-600">
                • Receive appointment confirmations via SMS
              </p>
              <p className="text-xs text-dark-600">
                • Get reminders 24 hours and 3 hours before your appointment
              </p>
              <p className="text-xs text-dark-600">
                • Standard SMS rates may apply
              </p>
              <p className="text-xs text-dark-600 mt-2">
                You can unsubscribe anytime by replying STOP to our messages.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>
          Submit Appointment Request
        </SubmitButton>

        {/* Privacy Note */}
        <div className="p-4 bg-dark-300 rounded-lg">
          <p className="text-sm text-dark-600">
            Your information is collected for appointment purposes only. Appointment confirmations will be sent via SMS or email during business hours.
          </p>
        </div>

        <p className="text-12-regular text-dark-600 text-center">
          We will contact you to confirm your appointment details.
        </p>
      </form>
    </Form>
  );
};