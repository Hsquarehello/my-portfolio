import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "@/app/globals.css"; // Ensure your Tailwind CSS is imported
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hein Htet | Portfolio",
  description:
    "Portfolio of Hein Htet, building thoughtful digital experiences.",
  openGraph: {
    title: "Hein Htet | Portfolio",
    description:
      "Portfolio of Hein Htet, building thoughtful digital experiences.",
    siteName: "Hein Htet",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
