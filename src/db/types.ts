import {
  boolean,
  //   date,
  //   foreignKey,
  //   index,
  //   pgTable,
  text,
  //   uuid,
  varchar,
} from "drizzle-orm/pg-core";

const title = varchar("title");
const include = boolean("include").default(true);
const layout = text("layout", {
  enum: ["row", "grid", "block", "list"],
}).notNull();

export { include, layout, title };
