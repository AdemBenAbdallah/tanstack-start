import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Import QueryClient for TanStack Query integration
import { queryClient } from "./lib/queryClient";

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },

    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

// Export queryClient for use in the app
export { queryClient };
