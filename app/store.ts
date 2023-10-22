import _ from "lodash";
import * as O from "optics-ts";
import * as z from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createSelectors } from "@/lib/zustand";
import defaultResume from "./default-resume.json";

const title = z.string();
const include = z.boolean().default(true);
export const sectionType = z.enum(["row", "list", "grid", "block"]);

export type SectionType = z.infer<typeof sectionType>;

export const contactInformationEntry = z.object({
  include,
  title,
  myName: z.string().optional(),
  jobTitle: z.string().optional(),
  entity: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

export type ContactInformationEntry = z.infer<typeof contactInformationEntry>;

const contactInformation = z.object({
  title,
  sectionType,
  include,
  entries: z.array(contactInformationEntry),
});

export type ContactInformation = z.infer<typeof contactInformation>;

const resumeSectionEntry = z.object({
  include,
  title,
  sectionType,
  entity: z.string().optional(),
  summary: z.string().min(50).max(5000).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  details: z.string().array().optional(),
});

const ResumeEntryGeneric = z.union([
  contactInformationEntry,
  resumeSectionEntry,
]);

export type ResumeEntryGeneric = z.infer<typeof ResumeEntryGeneric>;

export type ResumeSectionEntry = z.infer<typeof resumeSectionEntry>;

const resumeSection = z.object({
  include,
  title,
  sectionType,
  entries: z.array(resumeSectionEntry).optional(),
});

export type ResumeSection = z.infer<typeof resumeSection>;

export const resumeState = z.object({
  resumeName: z.string(),
  resumeId: z.string(),
  contactInformation,
  sections: z.array(resumeSection),
});

export type ResumeState = z.infer<typeof resumeState>;

const fieldValueDataTypes = z.union([
  z.string(),
  z.array(z.string()),
  z.boolean(),
]);

type FieldValueDataTypes = z.infer<typeof fieldValueDataTypes>;

const ResumeActions = z.object({
  update: z.function().args(z.string(), fieldValueDataTypes),
});

type ResumeActions = z.infer<typeof ResumeActions>;

const DefaultResume = defaultResume as unknown as ResumeState;

const useStoreBase = create<ResumeState & ResumeActions>()(
  persist(
    (set, get) => ({
      ...DefaultResume,
      update: (path: string, value: FieldValueDataTypes) => {
        return set(O.set(O.optic<ResumeState>().path(path))(value));
      },
    }),
    {
      name: "resume-tailor-storage",
      storage: createJSONStorage(() => localStorage),
      version: 0,
      merge: (persistedState, currentState) =>
        _.merge(persistedState, currentState),
    },
  ),
);

const useStore = createSelectors(useStoreBase);

export {
  type FieldValueDataTypes,
  contactInformation,
  resumeSection,
  DefaultResume,
  useStore,
};
