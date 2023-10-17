// jest.config.ts
import type { Config } from "@jest/types"
import { compilerOptions } from "../tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  // automock: true,

  // Support using our TS Paths without repeating them
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>/"}),
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],

  // Use SWC for our transformations
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  }
}
export default config