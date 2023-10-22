import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as O from "optics-ts";
import * as z from "zod";
import defaultResume from "./default-resume.json";

const contactInformation = z.object({
  myName: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

const resumeSectionEntryFields = z.object({
  title: z.string().optional(),
  include: z.boolean().default(true),
  entity: z.string().optional(),
  summary: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  details: z.string().array().optional(),
});

export type ResumeSectionEntry = z.infer<typeof resumeSectionEntryFields>;

const resumeSection = z.object({
  title: z.string(),
  type: z.enum(["row", "list", "grid", "block"]),
  entries: z.array(resumeSectionEntryFields).optional(),
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
  update: z.function().args(z.string(), z.string().or(z.boolean())),
  updateSection: z.function().args(z.number(), z.string(), fieldValueDataTypes),
  // updateEntry: z
  //   .function()
  //   .args(z.number(), z.number(), z.string(), fieldValueDataTypes),
});

type ResumeActions = z.infer<typeof ResumeActions>;

const DefaultResume = defaultResume as unknown as ResumeState;

const useStore = create<ResumeState & ResumeActions>()(
  persist(
    (set, get) => ({
      ...DefaultResume,
      update: (path: string, value: FieldValueDataTypes) =>
        set(O.set(O.optic<ResumeState>().path(path))(value)),
      updateSection: (i: number, path: string, value: FieldValueDataTypes) =>
        set(
          O.set(O.optic<ResumeState>().prop("sections").at(i).path(path))(value)
        ),
      // updateEntry: (
      // sectionIndex: number,
      // entryIndex: number,
      // path: string,
      // value: FieldValueDataTypes
      // ) =>
      // set(
      // O.set(
      // O.optic<ResumeState>()
      //   .prop("sections")
      //   .at(sectionIndex)
      //   .path("entries")
      //   .at(entryIndex)
      //   .path(path)
      // )(value)
      // ),
    }),
    {
      name: "resume-tailor-storage",
    }
  )
);

export { contactInformation, resumeSection, DefaultResume, useStore };
