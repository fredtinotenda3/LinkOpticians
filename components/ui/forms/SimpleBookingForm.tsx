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
import { trackAppointmentRequest, trackSMSOptIn } from "@/components/Analytics";

interface SimpleBookingFormProps {
  branches: Branch[];
}

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
      smsOptIn: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof EnhancedBookingSchema>) => {
    setIsLoading(true);

    try {
      const branch = branches.find(b => b.$id === values.branchId);

      trackAppointmentRequest(
        branch?.name || "Unknown Branch",
        "online_form"
      );

      trackSMSOptIn(values.smsOptIn === true);

      const result = await createSimpleAppointment(values);

      if (result?.success) {
        // FIXED: Use absolute path from root - removing the extra "booking" prefix
        // The file is at app/(public)/booking/confirmation/page.tsx
        // So the URL should be /booking/confirmation?bookingId=xxx
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

        {/* Branch */}
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

        {/* Date */}
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Preferred Date & Time"
          showTimeSelect
          dateFormat="MM/dd/yyyy - h:mm aa"
        />

        {/* Patient Info */}
        <div className="space-y-4">
          <h3 className="text-white text-sm font-medium">
            Patient Information
          </h3>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="patientName"
            label="Full Name"
            placeholder="Enter your full name"
          />

          <div className="flex flex-col gap-6 md:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="patientEmail"
              label="Email (optional)"
              placeholder="Enter email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="patientPhone"
              label="Phone"
              placeholder="Enter phone"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason (optional)"
            placeholder="Briefly describe your request"
          />

          {/* CLEAN SMS OPT-IN */}
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="smsOptIn"
            label="Receive SMS updates"
          />
        </div>

        {/* Submit */}
        <SubmitButton isLoading={isLoading}>
          Book Appointment
        </SubmitButton>

      </form>
    </Form>
  );
};