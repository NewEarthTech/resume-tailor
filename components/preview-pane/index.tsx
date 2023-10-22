"use client";

import React, {
  Component,
  ElementType,
  Fragment,
  FunctionComponent,
  JSXElementConstructor,
  ReactElement,
  Ref,
} from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMeasure } from "@uidotdev/usehooks";
import {
  SectionTitle,
  SectionContentEntryTitle,
  SectionContentEntrySubTitle,
  SectionContentEntryDateSpan,
  SectionContentEntrySummary,
  SectionContentEntryDetails,
  SectionContentEntryDetail,
  SectionContentEntry,
  SectionContent,
  Section,
} from "./section";
import { ResumeSection, ResumeSectionEntry, useStore } from "@/app/store";

import { ContactInfo } from "./section/contact-info";

const PPI = 96;
const PRINT_WIDTH = 8.5 * PPI;

function NullCheck({
  As,
  variable,
  children,
  ...attrs
}: {
  As: FunctionComponent | JSXElementConstructor<any> | ElementType<any>;
  variable: unknown | null;
  children: React.ReactNode;
}) {
  return !!variable ? <As {...attrs}>{children}</As> : null;
}

function PreviewPaneSectionEntry({
  sectionType,
  entryIndex,
  title: entryTitle,
  entity,
  summary,
  details,
  startDate,
  endDate,
  include,
  ...fields
}: ResumeSectionEntry & {
  entryIndex: number;
  sectionType: string;
}) {
  return (
    <NullCheck As={SectionContentEntry} variable={include} key={entryIndex}>
      <NullCheck As={SectionContentEntryTitle} variable={entryTitle}>
        {entryTitle}

        {(startDate || endDate) && sectionType === "list" ? (
          <SectionContentEntryDateSpan
            startDate={startDate}
            endDate={endDate}
          />
        ) : null}
      </NullCheck>
      <NullCheck
        As={SectionContentEntrySubTitle}
        variable={entity}
        children={entity}
      />
      <NullCheck
        As={SectionContentEntrySummary}
        variable={summary}
        children={summary}
      />
      <NullCheck As={SectionContentEntryDetails} variable={details}>
        {details?.map((detail, k) => (
          <SectionContentEntryDetail key={k}>
            {detail}
          </SectionContentEntryDetail>
        ))}
      </NullCheck>
      <NullCheck As={"pre"} variable={Object.keys(fields).length}>
        {JSON.stringify(fields, null, 2)}
      </NullCheck>
    </NullCheck>
  );
}

function PreviewPaneSectionEntries({
  sectionType,
  entries,
}: {
  sectionType: string;
  entries?: ResumeSectionEntry[];
}) {
  return (
    <div>
      {entries?.map((entry, j) => (
        <PreviewPaneSectionEntry
          key={j}
          sectionType={sectionType}
          entryIndex={j}
          {...entry}
        />
      ))}
    </div>
  );
}

function PreviewPaneSection({
  section,
  sectionIndex,
}: {
  section: ResumeSection;
  sectionIndex: number;
}) {
  const { title, type, entries } = section;
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent type={type}>
        <PreviewPaneSectionEntries sectionType={type} entries={entries} />
      </SectionContent>
    </Section>
  );
}

export function PreviewPane() {
  const [ref, { width }] = useMeasure();
  const scale = width ? width / PRINT_WIDTH : 0;
  const { sections } = useStore((state) => state);
  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className="w-full bg-muted shadow-md border-border border"
    >
      <AspectRatio
        ratio={8.5 / 11}
        className="bg-card w-full"
        style={{
          fontSize: `${scale * 16}px`,
          padding: `${scale * PPI}px`,
          opacity: scale > 0 ? 1 : 0,
        }}
      >
        <ContactInfo scale={scale} />
        <NullCheck As={Fragment} variable={sections?.length > 0}>
          {sections?.map((section, i) => (
            <PreviewPaneSection
              section={section}
              key={`section-${i}-rooot-preview-pane`}
              sectionIndex={i}
            />
          ))}
        </NullCheck>
      </AspectRatio>
    </div>
  );
}
