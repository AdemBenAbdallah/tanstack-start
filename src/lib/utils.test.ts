import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("utils", () => {
  describe("cn", () => {
    it("should concatenate class names", () => {
      const result = cn("class-a", "class-b");
      expect(result).toBe("class-a class-b");
    });

    it("should handle conditional classes", () => {
      const result = cn("base", true && "conditional", false && "not-included");
      expect(result).toBe("base conditional");
    });

    it("should handle empty inputs", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("should handle mixed types", () => {
      const result = cn("class-a", false, null, undefined, "class-b");
      expect(result).toBe("class-a class-b");
    });

    it("should handle tailwind merge patterns", () => {
      const result = cn("px-4 py-2", "px-8");
      // Later class should override earlier for same properties
      expect(result).toContain("py-2");
      expect(result).toContain("px-8");
    });
  });
});
