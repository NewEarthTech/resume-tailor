import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { ResumeSection as ResumeSectionType } from "@/app/store";
import React, { useEffect, useState } from "react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-semibold uppercase border-b-2 border-border text-[1.125em]">
      {children}
    </h2>
  );
}

function SectionContentEntryTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[1.1em] font-semibold">{children}</h3>;
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
  return <ul className="list-disc list-inside text-[0.9em]">{children}</ul>;
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
  // if ("startDate" in entry && typeof entry["startDate"] === "string") {
  // entry["startDate"] = new Date(entry["startDate"]);
  // }
  // if ("endDate" in entry && typeof entry["endDate"] === "string") {
  // entry["endDate"] = new Date(entry["endDate"]);
  // }

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
    type: {
      row: "",
      list: "",
      grid: "grid grid-cols-3 gap-4",
      block: "",
    },
  },
});

function SectionContent({
  type,
  children,
}: {
  type?: ResumeSectionType["type"];
  children: React.ReactNode;
}) {
  return <div className={cn(sectionContentVariants({ type }))}>{children}</div>;
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
