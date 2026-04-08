import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Documentation",
  description: "Comprehensive Auto-Offensive documentation - guides, API references, tutorials, and CLI documentation for security professionals.",
  image: "/og-docs.png",
  url: "/docs",
});

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
