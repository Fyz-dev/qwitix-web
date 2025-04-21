import path from "path";
import "dotenv/config";

import { generateApi } from "swagger-typescript-api";

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
