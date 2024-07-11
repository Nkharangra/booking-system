/* eslint-disable no-unused-vars */
declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other" | "Prefer not to say";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  name: string;
  email: string;
  phone: string;
  gender: string | undefined;
  address: string;
  preferredLanguage: string | undefined;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryInstructor: string | undefined;
  transmissionType: string | undefined;
  experienceLevel: string | undefined;
  learnerPermitNumber: string | undefined;
  learnerPermitExpiryDate: Date | undefined;
  availabiliblyOptions: string | undefined;
  timeSlots: string | undefined;
  otherInformation: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  disclosureConsent: boolean | undefined;
  lessonConsent: boolean | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  learner: string;
  primaryInstructor: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
