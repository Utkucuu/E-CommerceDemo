import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/header/Header";
import ReduxProvider from "./ReduxProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "FAKESTOREAPI E-commerce Website Demo",
  description:
    "This is a sample e-commerce site built with React, Next.js, Tailwind CSS, and other modern technologies.",

  keywords: [
    "E-commerce",
    "Next.js",
    "Tailwind CSS",
    "React",
    "Redux",
    "Stripe",
    "Clerk",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ReduxProvider>
        <html lang="en">
         
          <body className={`${roboto.className} mx-auto max-w-[1280px]`}>
            <Providers>
              <Header />
              <div className="container mx-auto min-h-screen px-5 py-8">
                {children}
              </div>
            </Providers>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
            />
          </body>
        </html>
      </ReduxProvider>
    </ClerkProvider>
  );
}
