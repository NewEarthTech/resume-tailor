import { db } from "@/db";
import { NewResume, ResumeTable } from "@/db/schema/resume";

const insertResume = async (resume: NewResume) => {
  return db.insert(ResumeTable).values(resume);
};

export { insertResume };
