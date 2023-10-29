import { sql } from "@vercel/postgres";

export default async function ResumeIndex() {
  const { rows } = await sql`SELECT * FROM resume WHERE user_id = 1`;

  return <div>{JSON.stringify(rows)}</div>;
}
