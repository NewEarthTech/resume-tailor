"use client";

import { Ref } from "react";
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
import { useStore } from "@/app/store";

import { ContactInfo } from "./section/contact-info";

const PPI = 96;
const PRINT_WIDTH = 8.5 * PPI;

export function PreviewPane() {
  const [ref, { width }] = useMeasure();
  const scale = width ? width / PRINT_WIDTH : 0;
  const sections = useStore((state) => state.sections);
  // const { sections } = useStore();

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
        {sections.map(({ title, type }, i) => {
          const fields = useStore((state) => state.sections[i]).fields;
          return (
            <Section key={i}>
              <SectionTitle>{title}</SectionTitle>
              <SectionContent type={type}>
                {/* <pre>{JSON.stringify(type, null, 2)}</pre> */}
                <pre suppressHydrationWarning>
                  {JSON.stringify(fields, null, 2)}
                </pre>
                {/* {Object.keys(fields).map(
                  (
                    // { title, entity, startDate, endDate, details, summary },
                    key,
                    j
                  ) => ( */}
                <SectionContentEntry>
                  {/* {typeof fields.title !== "undefined" ? (
                    <SectionContentEntryTitle>
                      {fields.title}
                    </SectionContentEntryTitle>
                  ) : null} */}
                  <SectionContentEntrySubTitle>
                    {/* {entity} */}
                    {/* {type !== "grid" ? (
                          <SectionContentEntryDateSpan
                            startDate={startDate}
                            endDate={endDate}
                          />
                        ) : null} */}
                  </SectionContentEntrySubTitle>
                  <SectionContentEntrySummary>
                    {/* {JSON.stringify(fields[key as keyof typeof fields])} */}
                    {/* {fields.summary ? fields.summary : null} */}
                  </SectionContentEntrySummary>
                  {/* <SectionContentEntryDetails>
                        {details?.map((detail, k) => (
                          <SectionContentEntryDetail key={k}>
                            {detail}
                          </SectionContentEntryDetail>
                        ))}
                      </SectionContentEntryDetails>  */}
                </SectionContentEntry>
              </SectionContent>
            </Section>
          );
        })}
      </AspectRatio>
    </div>
  );
}
