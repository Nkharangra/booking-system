import { Models } from "node-appwrite";

export interface Learner extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryInstructor: string;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  learner: Learner;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
