import Providers from "@/components/Providers";
import Navigations from "@/components/Navigations";
import { plus_Jakarta_Sans } from "./layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative h-screen overflow-hidden bg-kanbanLightGreyBG dark:bg-kanbanDarkGreyBG font-medium${plus_Jakarta_Sans.className}`}
      >
        <Providers>
          <Navigations />
          {children}
        </Providers>
      </body>
    </html>
  );
}
