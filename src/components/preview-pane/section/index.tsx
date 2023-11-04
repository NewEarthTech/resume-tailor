import React, { useEffect, useState } from "react";
import type { ResumeSection as ResumeSectionType } from "@/store/store";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b-2 border-border text-[1.125em] font-semibold uppercase">
      {children}
    </h2>
  );
}

function SectionContentEntryTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex justify-between text-[1.1em] font-semibold">
      {children}
    </h3>
  );
}

function SectionContentEntrySubTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h4 className="flex justify-between text-[1.05em] font-semibold">
      {children}
    </h4>
  );
}

function SectionContentEntrySummary({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

function SectionContentEntryDetail({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li>{children}</li>;
}

function SectionContentEntryDetails({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="list-inside list-disc text-[0.9em]">{children}</ul>;
}

function SectionContentEntryDate({ date }: { date?: Date | string }) {
  const [printDate, setDate] = useState(date);
  useEffect(() => {
    const newDate = new Date(String(date));
    setDate(newDate.getFullYear().toString());
    return () => setDate(undefined);
  }, [date]);
  return <>{printDate ? printDate : null}</>;
}

function SectionContentEntryDateSpan({
  startDate,
  endDate,
}: {
  startDate?: Date | string;
  endDate?: Date | string;
}) {
  return (
    <span>
      <SectionContentEntryDate date={startDate} />
      {startDate && endDate ? " - " : null}
      <SectionContentEntryDate date={endDate} />
    </span>
  );
}

function SectionContentEntry({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

const sectionContentVariants = cva("", {
  variants: {
    sectionType: {
      row: "",
      list: "",
      grid: "grid auto-cols-max grid-flow-col place-content-between gap-4",
      block: "",
    },
  },
});

function SectionContent({
  sectionType,
  children,
}: {
  sectionType: ResumeSectionType["sectionType"];
  children: React.ReactNode;
}) {
  return (
    <div className={cn(sectionContentVariants({ sectionType }))}>
      {children}
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-6">{children}</section>;
}

export {
  SectionTitle,
  SectionContentEntryTitle,
  SectionContentEntrySubTitle,
  SectionContentEntryDateSpan,
  SectionContentEntry,
  SectionContentEntrySummary,
  SectionContentEntryDetails,
  SectionContentEntryDetail,
  SectionContent,
  Section,
};
