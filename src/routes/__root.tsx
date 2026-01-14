import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Haute Pâtisserie 2026 - Paris Pastry Conference" },
      {
        name: "description",
        content:
          "Join the world's most celebrated pastry chefs and master bakers for three extraordinary days of masterclasses, demonstrations, and culinary inspiration in Paris, France.",
      },
      { property: "og:title", content: "Haute Pâtisserie 2026" },
      {
        property: "og:description",
        content: "A world-class pastry conference in Paris. March 15-17, 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://haute-patisserie-2026.com" },
      {
        property: "og:image",
        content: "https://haute-patisserie-2026.com/og-image.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Haute Pâtisserie 2026" },
      {
        name: "twitter:description",
        content: "World-class pastry conference in Paris. March 15-17, 2026.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
