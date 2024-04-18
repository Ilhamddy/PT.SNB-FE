import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
// import { Metadata } from "@/types/metadata";
import { Poppins } from "next/font/google";
import Footersection from "./components/footer";
import Navbarsection from "./components/navbar";
import "./globals.css";
import { dataAdvantages } from "@/hooks/dataNavbar";
import StoreProvider from "./storeProvider";

const inter = Poppins({ subsets: ["latin"], weight: '400' });

dataAdvantages
export const metadata: Metadata = {
  title: "SNB - Revolutionizing Healthcare with Integrated Solutions",
  description: "Explore PT SOLUSI NUSANTARA BERDIKARI's innovative healthcare solutions, integrating hospital information systems for seamless operations, enhanced patient care, and optimized efficiency.",
  keywords: "healthcare solutions, hospital information system, integrated healthcare application, patient care optimization, healthcare technology, hospital management software, medical software solutions, healthcare innovation, data security in healthcare, healthcare compliance solutions.",
  openGraph: {
    type: "website",
    title: "SNB - Revolutionizing Healthcare with Integrated Solutions",
    description: "Explore PT SOLUSI NUSANTARA BERDIKARI's innovative healthcare solutions, integrating hospital information systems for seamless operations, enhanced patient care, and optimized efficiency.",
    images: '/image/bgabout.jpg'
  },
  twitter: {
    // cardType: "summary_large_image",
    // url: "solusi.com",
    title: "SNB - Revolutionizing Healthcare with Integrated Solutions",
    description: "Explore PT SOLUSI NUSANTARA BERDIKARI's innovative healthcare solutions, integrating hospital information systems for seamless operations, enhanced patient care, and optimized efficiency.",
    images: '/image/logoSNB.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
      <StoreProvider>

          <Navbarsection />
          {children}
            <Footersection />
          </StoreProvider>
            
          </ThemeProvider>
      </body>
    </html>
  );
}
