"use client";

import React, {
  ElementType,
  FunctionComponent,
  JSXElementConstructor,
  Ref,
} from "react";
import { useStore, type ResumeSectionEntry } from "@/app/store";
import { useMeasure } from "@uidotdev/usehooks";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Section,
  SectionContent,
  SectionContentEntry,
  SectionContentEntryDateSpan,
  SectionContentEntryDetail,
  SectionContentEntryDetails,
  SectionContentEntrySubTitle,
  SectionContentEntrySummary,
  SectionContentEntryTitle,
  SectionTitle,
} from "./section";
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
  title,
  entity,
  summary,
  details,
  startDate,
  endDate,
  include,
  j,
  ...fields
}: ResumeSectionEntry & {
  sectionType: string;
  j: number;
}) {
  return (
    <NullCheck As={SectionContentEntry} variable={include}>
      <NullCheck As={SectionContentEntryTitle} variable={title}>
        {title}
        {(startDate || endDate) && sectionType === "list" ? (
          <SectionContentEntryDateSpan
            startDate={startDate}
            endDate={endDate}
          />
        ) : null}
      </NullCheck>
      <NullCheck As={SectionContentEntrySubTitle} variable={entity}>
        {entity}
      </NullCheck>
      <NullCheck As={SectionContentEntrySummary} variable={summary}>
        {summary}
      </NullCheck>
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

function PreviewPaneSection({ i, path }: { i: number; path: string }) {
  const { title, sectionType, entries, include } = useStore(
    (store) => store.sections[i],
  );
  if (!include) return null;
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent sectionType={sectionType}>
        {Object.values(entries || [])?.map((entry, j) => (
          <PreviewPaneSectionEntry key={j} j={j} {...entry} />
        ))}
      </SectionContent>
    </Section>
  );
}

export function PreviewPane() {
  const sections = useStore((store) => store.sections);
  const [ref, { width }] = useMeasure();
  const scale = width ? width / PRINT_WIDTH : 0;
  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className="sticky top-0 w-full border border-border bg-muted shadow-none print:m-0 print:border-none print:p-0 print:drop-shadow-none"
    >
      <AspectRatio
        ratio={8.5 / 11}
        className="bg-card"
        style={{
          fontSize: `${scale * 16}px`,
          padding: `${scale * PPI}px`,
          opacity: scale > 0 ? 1 : 0,
        }}
      >
        <ContactInfo scale={scale} />
        {Object.values(sections)?.length > 0 &&
          Object.values(sections)?.map((section, i) => (
            <PreviewPaneSection
              key={`sections.${i}.PreviewPaneSection`}
              i={i}
              path={`sections.${i}`}
            />
          ))}
      </AspectRatio>
    </div>
  );
}
