import { contactInformation, useStore } from "@/app/store";
import { Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import React from "react";
import { Section } from ".";
import { z } from "zod";

function MyName({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[2em] font-serif tracking-wide text-center font-bold mb-1">
      {children}
    </h1>
  );
}

function ContactInfoRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.7em] gap-x-4 flex flex-row justify-center">
      {children}
    </div>
  );
}

function ContactInfoField({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex whitespace-nowrap flex-nowrap gap-[0.5em] items-center">
      {children}
    </p>
  );
}

export function ContactInfo({ scale }: { scale: number }) {
  const { myName, email, city, state, country, phone, linkedin, github } =
    useStore((state) => state.contactInformation) as z.infer<
      typeof contactInformation
    >;
  const iconSize = scale * 16;
  return (
    <Section>
      <MyName>{myName}</MyName>
      <ContactInfoRow>
        {[
          { Icon: MapPin, text: ` ${city}, ${state}, ${country}` },
          { Icon: Mail, text: email },
          { Icon: Smartphone, text: phone },
          { Icon: Linkedin, text: linkedin },
        ].map(({ Icon, text }, i) => (
          <ContactInfoField key={i}>
            <Icon size={iconSize} /> {text as string}
          </ContactInfoField>
        ))}
      </ContactInfoRow>
    </Section>
  );
}
