import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Navbar from "@/components/Navbar";
import BackToTopButton from "@/components/BackToTopButton";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import { getCategory, getCollections } from "@/lib/actions/actions";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DKD Food Solutions",
  description: "DKD Food Solutions Ecommerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const collections: CollectionType[] = await getCollections();
  const category: CategoryType[] = await getCategory();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ToasterProvider />
          <Navbar collections={collections} category={category}/>
          {children}
          <Footer />
          <BackToTopButton />
        </ClerkProvider>
      </body>
    </html>
  );
}
