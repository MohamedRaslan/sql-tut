import { dbPool } from "../src/db";
import { PoolConnection } from "mysql2/promise";
import { expect } from "chai";

let conn: PoolConnection;

describe("Basic DB Tests", () => {
  beforeEach("Init the database connection", async () => {
    conn = await dbPool.getConnection();
  });

  after("Release the database connection ", async () => {
    conn.release();
  });

  it("Check the existence of the needed databases", async () => {
    const [rows, fields] = await conn.query({
      sql: "show databases",
      rowsAsArray: true,
    });
    expect(rows).to.be.an("array");
    expect(rows).to.includes.deep.members([["classicmodels"], ["information_schema"], ["sakila"], ["sys"], ["world"]]);
  });
});
