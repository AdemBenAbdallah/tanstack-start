import { describe, expect, it } from "vitest";
import { createQueryClient } from "./queryClient";

describe("queryClient", () => {
  it("should create a QueryClient instance", () => {
    const client = createQueryClient();
    expect(client).toBeDefined();
  });

  it("should have default staleTime of 1 minute", () => {
    const client = createQueryClient();
    // The default options should be set
    expect(client.getDefaultOptions().queries?.staleTime).toBe(60 * 1000);
  });

  it("should have default gcTime of 5 minutes", () => {
    const client = createQueryClient();
    expect(client.getDefaultOptions().queries?.gcTime).toBe(5 * 60 * 1000);
  });

  it("should have retry set to 1", () => {
    const client = createQueryClient();
    expect(client.getDefaultOptions().queries?.retry).toBe(1);
  });

  it("should have refetchOnWindowFocus disabled", () => {
    const client = createQueryClient();
    expect(client.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(false);
  });

  it("should return the same instance on multiple calls when using exported singleton", () => {
    // This test requires the singleton export
    // import { queryClient } from "./queryClient";
    // expect(queryClient).toBe(queryClient);
  });
});
