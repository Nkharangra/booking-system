export const GenderOptions = ["Male", "Female", "Other", "Prefer not to say"];

export const TransmissionType = ["Automatic", "Manual"];

export const PreferredLanguage = ["English", "Hindi", "Punjabi", "Other"];

export const ExperienceLevel = [
  "No Experience",
  "Beginner",
  "Intermediate",
  "Advanced",
];
export const TimeSlots = ["Morning", "Afternoon", "Evening", "Night"];

export const AvailabilityOptions = ["Weekdays", "Weekends", "Both"];

export const LearnerFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  gender: "Male" as Gender,
  address: "",
  preferredLanguage: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryInstructor: "",
  transmissionType: "",
  experienceLevel: "",
  learnerPermitNumber: "",
  learnerPermitExpiryDate: new Date(Date.now()),
  availabiliblyOptions: "",
  timeSlots: "",
  otherInformation: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  lessonConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Learner Permit",
  "Passport",
  "Intrernational Driver's Permit",
];

export const Instructors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
