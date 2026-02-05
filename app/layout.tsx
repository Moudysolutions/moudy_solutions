import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Moudy Solutions",
    template: "%s | Moudy Solutions",
  },
  description: "Solutions numériques innovantes. Nous transformons vos idées en réalité numérique.",
  keywords: ["développement web", "applications mobiles", "hébergement", "Niger", "Niamey"],
  authors: [{ name: "Moudy Solutions" }],
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
