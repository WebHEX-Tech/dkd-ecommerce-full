// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// import SessionWrapper from "@/components/layout/SessionWrapper";
// import { ToasterProvider } from "@/lib/ToasterProvider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "DKD Food Solutions - Admin",
//   description: "Admin dashboard to manage DKD's data",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <SessionWrapper>
//       <html lang="en">
//         <body className={inter.className}>
//           <ToasterProvider />
//           {children}
//         </body>
//       </html>
//     </SessionWrapper>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";
import SessionWrapper from "@/components/layout/SessionWrapper";
import AuthWrapper from "@/components/layout/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DKD Food Solutions - Admin",
  description: "Admin dashboard to manage DKD's data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <AuthWrapper>
        <html lang="en">
          <body className={inter.className}>
            <ToasterProvider />
            <div className="flex max-lg:flex-col text-grey-1">
              <LeftSideBar />
              <TopBar />
              <div className="flex-1">{children}</div>
            </div>
          </body>
        </html>
      </AuthWrapper>
    </SessionWrapper>
  );
}
