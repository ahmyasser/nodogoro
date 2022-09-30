import dotenv from "dotenv";
const nodemailer = require("nodemailer");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (process.env.NODE_ENV === "development" && envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   *  Favorite port with 3005 as default
   */
  port: parseInt(process.env.PORT || "3005", 10),

  /**
   * That long string from mlab
   */
  databaseBaseURL:
    process.env.MONGODB_URI_BASE || "mongodb://localhost:270017/",

  /**
   * Name for database
   */
  databaseName: process.env.MONGODB_DATABASE_NAME || "nodogoro",

  /**
   * Your secret sauce
   */
  Auth0: {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET ,
    baseURL: process.env.BASE_URL || "http://localhost:3005",
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  },
  /**
   * API configs
   */

  api: {
    prefix: "/api",
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
