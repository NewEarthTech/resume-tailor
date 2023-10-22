"use client";

import React, {
  ElementType,
  Fragment,
  FunctionComponent,
  JSXElementConstructor,
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
  title,
  entity,
  summary,
  details,
  startDate,
  endDate,
  include,
  ...fields
}: ResumeSectionEntry & {
  sectionType: string;
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

function PreviewPaneSection({
  section,
  path,
}: {
  section: ResumeSection;
  path: string;
}) {
  const { title, sectionType, entries } = section;
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <SectionContent sectionType={sectionType}>
        {JSON.stringify(section.sectionType)}
        {entries?.map((entry, j) => (
          <PreviewPaneSectionEntry key={j} {...entry} />
        ))}
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
              path={`sections.${i}`}
            />
          ))}
        </NullCheck>
      </AspectRatio>
    </div>
  );
}
