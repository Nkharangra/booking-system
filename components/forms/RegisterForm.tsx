"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  AvailabilityOptions,
  ExperienceLevel,
  GenderOptions,
  IdentificationTypes,
  Instructors,
  LearnerFormDefaultValues,
  PreferredLanguage,
  TimeSlots,
  TransmissionType,
} from "@/constatnts";

import { registerLearner } from "@/lib/actions/learner.actions";
import { LearnerFormValidation } from "@/lib/validations";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";

export const RegisterForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LearnerFormValidation>>({
    resolver: zodResolver(LearnerFormValidation),
    defaultValues: {
      ...LearnerFormDefaultValues,
    },
  });

  const onSubmit = async (values: z.infer<typeof LearnerFormValidation>) => {
    console.log(values);
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      if (!userId || !userId.length) {
        console.error("User or User ID is undefined");
      }
      const learner = {
        userId,
        name: values.name,
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        address: values.address,
        preferredLanguage: values.preferredLanguage,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryInstructor: values.primaryInstructor,
        transmissionType: values.transmissionType,
        experienceLevel: values.experienceLevel,
        learnerPermitNumber: values.learnerPermitNumber,
        learnerPermitExpiryDate: new Date(values.learnerPermitExpiryDate),
        availabiliblyOptions: values.availabiliblyOptions,
        timeSlots: values.timeSlots,
        otherInformation: values.otherInformation,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
        lessonConsent: values.lessonConsent,
        disclosureConsent: values.disclosureConsent,
      };
      console.log(learner);
      const newLearner = await registerLearner(learner);
      if (newLearner) {
        router.push(`/learners/${userId}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          {/* NAME */}

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          {/* EMAIL & PHONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
            />
          </div>
          {/* Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          {/* Address & Occupation */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 street, New york, NY - 5101"
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="preferredLanguage"
              label="Preferred Language"
              placeholder="English"
            >
              {PreferredLanguage.map((language, i) => (
                <SelectItem key={language + i} value={language}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{language}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Related Information</h2>
          </div>

          {/* PRIMARY CARE Instructor */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryInstructor"
            label="Primay Driving Instructor"
            placeholder="Select a Instructor"
          >
            {Instructors.map((instructor, i) => (
              <SelectItem key={instructor.name + i} value={instructor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={instructor.image}
                    width={32}
                    height={32}
                    alt="instructor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{instructor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="transmissionType"
              label="Transmission Type"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {TransmissionType.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="experienceLevel"
              label="Experience Level"
              placeholder="Please select your experience level"
            >
              {ExperienceLevel.map((experience, i) => (
                <SelectItem key={experience + i} value={experience}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <p>{experience}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
          </div>

          {/* Learner's Permit Number & Expiry Date */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="learnerPermitNumber"
              label="Learner's Permit Number"
              placeholder="XXXXXXXX00"
            />

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="learnerPermitExpiryDate"
              label="Learner's Permit Expiry Date"
            />
          </div>

          {/* Availibility*/}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="availabiliblyOptions"
              label="Availability Options"
              placeholder="Select availability options"
            >
              {AvailabilityOptions.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="timeSlots"
              label="Prefered Time Slots"
              placeholder="Select preferred time slots"
            >
              {TimeSlots.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>
          </div>
          {/* Other Relevant Informations*/}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="otherInformation"
              label="Other Relevant Information"
              placeholder="I don't have learner's permit yet. I have international driving license."
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select identification type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type + i} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="123456789"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="lessonConsent"
            label="I consent to learn driving lessons from the instructor."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to the use and disclosure of my health
            information for the purpose of providing me with driving lessons."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I acknowledge that I have reviewed and agree to the
            privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
