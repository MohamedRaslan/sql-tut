import { dbPool } from "../src/db";
import { PoolConnection } from "mysql2/promise";

let conn: PoolConnection;

describe("Calculator Tests", () => {
  beforeEach("Init the database connection", async () => {
    console.info("Init the database connection");
    conn = await dbPool.getConnection();
  });

  after("Release the database connection ", async () => {
    conn.release();
    console.info("Database connection closed");
  });

  it("check databases", async () => {
    // show databases;
    // use information_schema;
    // show tables;
    // Do something with the connection
    const [rows, fields] = await conn.query({
      sql: "SELECT * FROM information_schema.columns",
      rowsAsArray: true,
    });

    console.log(rows);
    console.log(fields);
  });
});
