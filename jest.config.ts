import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Jika Anda menggunakan alias path
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Opsional: Untuk setup global
};

export default config;