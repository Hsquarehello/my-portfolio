import { ThemeProvider } from "@/components/ui/ThemeProvider";
import "@/app/globals.css"; // Ensure your Tailwind CSS is imported
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://heinhtet-weld.vercel.app"),
  title: "Hein Htet | Portfolio",
  description:
    "Portfolio of Hein Htet, building thoughtful digital experiences.",
  openGraph: {
    url: "https://heinhtet-weld.vercel.app",
    title: "Hein Htet | Portfolio",
    description:
      "Portfolio of Hein Htet, building thoughtful digital experiences.",
    siteName: "Hein Htet",
    type: "website",
    images: [
      {
        url: "/images/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Hein Htet portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hein Htet | Portfolio",
    description:
      "Portfolio of Hein Htet, building thoughtful digital experiences.",
    images: [
      {
        url: "/images/social-preview.png",
        alt: "Hein Htet portfolio preview",
      },
    ],
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
