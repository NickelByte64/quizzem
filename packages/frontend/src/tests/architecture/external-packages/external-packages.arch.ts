import { describe, it } from "vitest";
import { expectNoImports } from "./external-packages.util";

describe("Architecture", () => {
  it("features don't depend on MUI", () => {
    expectNoImports({
      files: "src/features/**/*.{ts,tsx}",
      forbidden: ["@mui/material", "@mui/material/*"],
    });
  });
});
