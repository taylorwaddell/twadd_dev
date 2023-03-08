import "./globals.scss";

export const metadata = {
  title: "twadd.dev",
  description: "In progress: twadd's development portfolio.",
  icons: {
    icon: "/defrost_sticker.png",
    shortcut: "/defrost_sticker.png",
    apple: "/apple-defrost_sticker.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
