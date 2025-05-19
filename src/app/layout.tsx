import Providers from "./Providers";
import { Inter } from "next/font/google";
import { Metadata } from "next";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@mantine/core/styles.css";
import "@/styles/main.scss";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import WrapperLayout from "./WrapperLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "NEXTAPP",
    template: "%s - NEXTAPP",
  },
  description: "NEXTJS APP",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased ${inter.className} relative`}>
        <MantineProvider>
          <Providers>
            <WrapperLayout>{children}</WrapperLayout>
          </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
