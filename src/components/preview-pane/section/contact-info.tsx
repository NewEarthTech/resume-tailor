import React from "react";
import {
  contactInformation,
  contactInformationEntry,
  useStore,
} from "@/store/store";
import { Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import { z } from "zod";

import { Section } from ".";

function MyName({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="mb-1 text-center font-serif text-[2em] font-bold leading-[.8em] tracking-wide">
      {children}
    </h1>
  );
}
function JobTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-1.5 text-center font-serif text-[1.5em] font-bold uppercase tracking-widest">
      {children}
    </h2>
  );
}

function ContactInfoRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row justify-center gap-x-4 text-[0.7em]">
      {children}
    </div>
  );
}

function ContactInfoField({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex flex-nowrap items-center gap-[0.5em] whitespace-nowrap">
      {children}
    </p>
  );
}

export function ContactInfo({ scale }: { scale: number }) {
  const [
    { include: includeSection },
    {
      myName,
      jobTitle,
      email,
      city,
      state,
      country,
      phone,
      linkedin,
      github,
      include,
    },
  ] = useStore((state) => [
    state.contactInformation,
    state.contactInformation.entries[0],
  ]) as [{ include: boolean }, z.infer<typeof contactInformationEntry>];

  if (!includeSection || !include) return null;

  const iconSize = scale * 16;
  return (
    <Section>
      <MyName>{myName}</MyName>
      <JobTitle>{jobTitle}</JobTitle>
      <ContactInfoRow>
        {[
          { Icon: MapPin, text: ` ${city}, ${state}, ${country}` },
          { Icon: Mail, text: email },
          { Icon: Smartphone, text: phone },
          { Icon: Linkedin, text: linkedin },
        ].map(({ Icon, text }, i) => (
          <ContactInfoField key={`contactInfo-icon-field-${i}`}>
            <Icon size={iconSize} /> {text as string}
          </ContactInfoField>
        ))}
      </ContactInfoRow>
    </Section>
  );
}
