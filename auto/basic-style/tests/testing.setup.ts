import { dbPool } from "../src/db";

after("Release the pool connection", async () => {
  await dbPool.end();
  console.info("Pool connection closed");
});
