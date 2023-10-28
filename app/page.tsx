import { sql } from "@vercel/postgres";

import { PreviewPane } from "@/components/preview-pane";
import { ResumeForm } from "@/components/resume-form/index";

export default async function ResumeTailor() {
  const { rows } = await sql`
-- Fetch primary user and resume details
WITH user_and_resume AS (
    SELECT
        r.id AS resume_id,
        u.name,
        u.email,
        r.custom_url,
        r.pdf_url,
        ue.email AS additional_email,
        ua.google_location,
        ul.link,
        ut.title
    FROM app_user u
    INNER JOIN resume r ON u.id = r.user_id
    LEFT JOIN user_email ue ON r.user_email = ue.id
    LEFT JOIN user_address ua ON r.user_address = ua.id
    LEFT JOIN user_link ul ON r.user_link = ul.id
    LEFT JOIN user_title ut ON r.user_title = ut.id
    WHERE r.id = 1
),

-- Fetch sections for the resume
sections_for_resume AS (
    SELECT
        rs.resume_id,
        s.title AS section_title,
        s.layout
    FROM resume_section rs
    INNER JOIN section s ON rs.section_id = s.id
    WHERE rs.resume_id = 1
),

-- Fetch entries for each section
entries_for_section AS (
    SELECT
        se.section_id,
        e.id AS entry_id,
        e.start_date,
        e.end_date,
        e.include
    FROM section_entry se
    INNER JOIN entry e ON se.entry_id = e.id
),

-- Fetch fields for each entry
fields_for_entry AS (
    SELECT
        ef.entry_id,
        f.input_type,
        f.name AS field_name,
        f.value AS field_value,
        f.label AS field_label
    FROM entry_field ef
    INNER JOIN field f ON ef.field_id = f.id
)

-- Combine everything together
SELECT
    uar.*,
    sfr.section_title,
    sfr.layout,
    efs.entry_id,
    efs.start_date,
    efs.end_date,
    efs.include,
    ffe.input_type,
    ffe.field_name,
    ffe.field_value,
    ffe.field_label
FROM user_and_resume uar
LEFT JOIN sections_for_resume sfr ON uar.resume_id = sfr.resume_id
LEFT JOIN entries_for_section efs ON sfr.resume_id = efs.section_id
LEFT JOIN fields_for_entry ffe ON efs.entry_id = ffe.entry_id;
`;

  return (
    <div className="relative flex flex-col-reverse gap-6 md:grid md:grid-flow-col md:grid-cols-12">
      {JSON.stringify(rows)}
      {/* <div className="relative z-0 flex flex-col items-center justify-start space-y-6 md:col-span-7 md:overscroll-none">
        <PreviewPane />
      </div>
      <div className="sticky top-0 z-10 max-h-[30vh] space-y-6 overflow-y-scroll bg-muted print:hidden md:col-span-5 md:max-h-[initial]">
        <ResumeForm />
      </div> */}
    </div>
  );
}
