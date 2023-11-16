// Require Sequelize
import { Sequelize, DataTypes } from "sequelize";

const db_password = process.env["DB_PASSWORD"];

const DB = new Sequelize("database", "phantoms", db_password, {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

try {
    await DB.authenticate();
    console.log('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export { DB, DataTypes };
