/* eslint-disable no-console */
import path from "path";

import { generateApi } from "swagger-typescript-api";

import "dotenv/config";

generateApi({
  name: "api",
  output: path.resolve(process.cwd(), "./src/gen"),
  url:
    process.env.API_SWAGGER_URL ??
    (() => {
      throw new Error("API_SWAGGER_URL is not defined");
    })(),
  httpClientType: "axios",
  extractEnums: true,
  modular: true,
  cleanOutput: true,
  moduleNameIndex: 1,

  // types
  primitiveTypeConstructs: () => ({
    string: {
      $default: "string",
      "date-time": "Date",
    },
  }),
}).catch((error) => {
  console.error("Error generating API:", error);
});
