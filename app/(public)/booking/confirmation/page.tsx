// app/(public)/booking/confirmation/page.tsx
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getBranchById } from "@/lib/actions/branch.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { BOOKING_CONFIRMATION_CONFIG } from "@/constants/booking-page";
import {
  ConfirmationHeader,
  SuccessHeader,
  AppointmentDetailsCard,
  NextStepsCard,
  ConfirmationActions,
  ConfirmationContactInfo,
  BookingErrorState
} from "@/components/sections/booking/confirmation";

export default async function BookingConfirmation({
  searchParams,
}: SearchParamProps) {
  const params = await searchParams;
  const bookingId = params?.bookingId as string;
  
  if (!bookingId) {
    return <BookingErrorState {...BOOKING_CONFIRMATION_CONFIG.error} />;
  }

  const appointment = await getAppointment(bookingId);
  const branch = await getBranchById(appointment.branchId);

  return (
    <div className="min-h-screen">
      <ConfirmationHeader 
        logoSrc={BOOKING_CONFIRMATION_CONFIG.header.logo}
        logoAlt={BOOKING_CONFIRMATION_CONFIG.header.alt}
      />

      <main className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-[5%]">
          <SuccessHeader {...BOOKING_CONFIRMATION_CONFIG.success} />

          <AppointmentDetailsCard 
            title={BOOKING_CONFIRMATION_CONFIG.appointmentDetails.title}
            dateTime={formatDateTime(appointment.schedule).dateTime}
            dateTimeLabel={BOOKING_CONFIRMATION_CONFIG.appointmentDetails.dateTimeLabel}
            branchName={branch?.name}
            branchAddress={branch?.address}
            locationLabel={BOOKING_CONFIRMATION_CONFIG.appointmentDetails.locationLabel}
            statusLabel={BOOKING_CONFIRMATION_CONFIG.appointmentDetails.statusLabel}
            pendingStatus={BOOKING_CONFIRMATION_CONFIG.appointmentDetails.pendingStatus}
            referenceLabel={BOOKING_CONFIRMATION_CONFIG.appointmentDetails.referenceLabel}
            bookingId={bookingId}
          />

          <NextStepsCard 
            title={BOOKING_CONFIRMATION_CONFIG.nextSteps.title}
            steps={BOOKING_CONFIRMATION_CONFIG.nextSteps.steps}
          />

          <ConfirmationActions 
            returnHome={BOOKING_CONFIRMATION_CONFIG.actions.returnHome}
            bookAnother={BOOKING_CONFIRMATION_CONFIG.actions.bookAnother}
          />

          <ConfirmationContactInfo 
            text={BOOKING_CONFIRMATION_CONFIG.contact.text}
            mainPhone={BOOKING_CONFIRMATION_CONFIG.contact.mainPhone}
            emergencyPhone={BOOKING_CONFIRMATION_CONFIG.contact.emergencyPhone}
            emergencyLabel={BOOKING_CONFIRMATION_CONFIG.contact.emergencyLabel}
          />
        </div>
      </main>
    </div>
  );
}