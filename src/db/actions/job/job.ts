import { db } from "@/db";
import { JobTable, NewJob } from "@/db/schema/jobs";

const insertJob = async (job: NewJob) => {
  return db.insert(JobTable).values(job);
};

export { insertJob };
