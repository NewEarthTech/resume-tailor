import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as O from "optics-ts";
import * as z from "zod";
import defaultResume from "./default-resume.json";

const title = z.string();
const include = z.boolean().default(true);
const type = z.enum(["row", "list", "grid", "block"]);

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
  type,
  entries: z.array(contactInformationEntry),
});

export type ContactInformation = z.infer<typeof contactInformation>;

const resumeSectionEntry = z.object({
  include,
  title,
  type,
  entity: z.string().optional(),
  summary: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  details: z.string().array().optional(),
});

export type ResumeSectionEntry = z.infer<typeof resumeSectionEntry>;

const resumeSection = z.object({
  include,
  title,
  type,
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

const useStore = create<ResumeState & ResumeActions>()(
  persist(
    (set, get) => ({
      ...DefaultResume,
      // update: (path: string, value: FieldValueDataTypes) =>
      //   set(O.set(O.optic<ResumeState>().path(path))(value)),
      update: (path: string, value: FieldValueDataTypes) => {
        console.log("path", path);
        console.log("value", value);
      },
    }),
    {
      name: "resume-tailor-storage",
    }
  )
);

export {
  type FieldValueDataTypes,
  contactInformation,
  resumeSection,
  DefaultResume,
  useStore,
};
