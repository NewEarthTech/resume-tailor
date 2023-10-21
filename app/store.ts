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

const resumeSectionContentEntry = z.object({
  title: z.string().optional(),
  entity: z.string().optional(),
  summary: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  details: z.string().array().optional(),
});

const resumeSection = z.object({
  title: z.string(),
  type: z.enum(["row", "list", "grid", "block"]),
  fields: resumeSectionContentEntry,
});

export type ResumeSection = z.infer<typeof resumeSection>;

export const resumeState = z.object({
  resumeName: z.string(),
  resumeId: z.string(),
  contactInformation,
  sections: z.array(resumeSection),
});

export type ResumeState = z.infer<typeof resumeState>;

const ResumeActions = z.object({
  update: z.function().args(z.string(), z.string()),
  updateSection: z
    .function()
    .args(z.number(), z.string(), z.string().or(z.array(z.string()))),
});

type ResumeActions = z.infer<typeof ResumeActions>;

const DefaultResume = defaultResume as unknown as ResumeState;

const useStore = create<ResumeState & ResumeActions>()(
  persist(
    (set, get) => ({
      ...DefaultResume,
      update: (path: string, value: string) =>
        set(O.set(O.optic<ResumeState>().path(path))(value)),
      updateSection: (i: number, path: string, value: string | string[]) =>
        set(
          O.set(O.optic<ResumeState>().prop("sections").at(i).path(path))(value)
        ),
    }),
    {
      name: "resume-tailor-storage",
    }
  )
);

export { contactInformation, resumeSection, DefaultResume, useStore };
