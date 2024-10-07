import { dbPool } from "../../src/db";
import { PoolConnection } from "mysql2/promise";
import { expect } from "chai";

let conn: PoolConnection;

describe("Classic Models - Customers table tests", () => {
  beforeEach("Init the database connection", async () => {
    conn = await dbPool.getConnection();
    await conn.query("USE classicmodels");
  });

  after("Release the database connection", async () => {
    conn.release();
  });

  it("Check table presence in database schema", async () => {
    const [rows, fields] = await conn.query({
      sql: "show databases",
      rowsAsArray: true,
    });
    expect(rows).to.include.deep.members([["classicmodels"]]);
  });

  it("Check table name convetions", async () => {
    const [rows, fields] = await conn.query({
      sql: "SHOW tables",
      rowsAsArray: true,
    });
    expect(rows).to.have.deep.members([
      ["customers"],
      ["employees"],
      ["offices"],
      ["orderdetails"],
      ["orders"],
      ["payments"],
      ["productlines"],
      ["products"],
    ]);
  });

  it("Check number of columns in 'customers' table", async () => {
    const [rows, fields] = await conn.query({
      sql: 'SELECT count(*) AS NumberOfColumns FROM information_schema.columns WHERE table_name="customers"',
      rowsAsArray: true,
    });
    expect(rows).to.have.deep.members([[13]]);
  });

  it("Check column names in 'customers' table", async () => {
    const [rows, fields] = await conn.query({
      sql: 'SELECT column_name FROM information_schema.columns WHERE table_name="customers"',
      rowsAsArray: true,
    });
    expect(rows).to.have.deep.members([
      ["addressLine1"],
      ["addressLine2"],
      ["city"],
      ["contactFirstName"],
      ["contactLastName"],
      ["country"],
      ["creditLimit"],
      ["customerName"],
      ["customerNumber"],
      ["phone"],
      ["postalCode"],
      ["salesRepEmployeeNumber"],
      ["state"],
    ]);
  });

  it("Check data type of columns 'customers' table", async () => {
    const [rows, fields] = await conn.query({
      sql: 'SELECT column_name, data_type FROM information_schema.columns WHERE table_name="customers"',
      rowsAsArray: true,
    });
    expect(rows).to.have.deep.members([
      ["addressLine1", "varchar"],
      ["addressLine2", "varchar"],
      ["city", "varchar"],
      ["contactFirstName", "varchar"],
      ["contactLastName", "varchar"],
      ["country", "varchar"],
      ["creditLimit", "decimal"],
      ["customerName", "varchar"],
      ["customerNumber", "int"],
      ["phone", "varchar"],
      ["postalCode", "varchar"],
      ["salesRepEmployeeNumber", "int"],
      ["state", "varchar"],
    ]);
  });

  it("Check size of columns 'customers' table", async () => {
    const [rows, fields] = await conn.query({
      sql: 'SELECT column_name, column_type FROM information_schema.columns WHERE table_name="customers"',
      rowsAsArray: true,
    });
    expect(rows).to.have.deep.members([
      ["addressLine1", "varchar(50)"],
      ["addressLine2", "varchar(50)"],
      ["city", "varchar(50)"],
      ["contactFirstName", "varchar(50)"],
      ["contactLastName", "varchar(50)"],
      ["country", "varchar(50)"],
      ["creditLimit", "decimal(10,2)"],
      ["customerName", "varchar(50)"],
      ["customerNumber", "int"],
      ["phone", "varchar(50)"],
      ["postalCode", "varchar(15)"],
      ["salesRepEmployeeNumber", "int"],
      ["state", "varchar(50)"],
    ]);
  });

  it("Check nulls in 'customers' table", async () => {
    const [rows, fields] = await conn.query({
      sql: 'SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name="customers"',
      rowsAsArray: true,
    });
    expect(rows).to.have.deep.members([
      ["addressLine1", "NO"],
      ["addressLine2", "YES"],
      ["city", "NO"],
      ["contactFirstName", "NO"],
      ["contactLastName", "NO"],
      ["country", "NO"],
      ["creditLimit", "YES"],
      ["customerName", "NO"],
      ["customerNumber", "NO"],
      ["phone", "NO"],
      ["postalCode", "YES"],
      ["salesRepEmployeeNumber", "YES"],
      ["state", "YES"],
    ]);
  });

  it("Check column keys in 'customers' table", async () => {
    const [rows, fields] = await conn.query({
      sql: 'SELECT column_name, column_key FROM information_schema.columns WHERE table_name="customers"',
      rowsAsArray: true,
    });
    expect(rows).to.have.deep.members([
      ["addressLine1", ""],
      ["addressLine2", ""],
      ["city", ""],
      ["contactFirstName", ""],
      ["contactLastName", ""],
      ["country", ""],
      ["creditLimit", ""],
      ["customerName", ""],
      ["customerNumber", "PRI"],
      ["phone", ""],
      ["postalCode", ""],
      ["salesRepEmployeeNumber", "MUL"],
      ["state", ""],
    ]);
  });
});
