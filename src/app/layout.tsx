import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "@/context/useSession";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const geistFrankly = localFont({
  src: "./fonts/FranklySpokenTwo.woff",
  variable: "--font-geist-frankly",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CATch the Moment",
  description: "Find more of the events you love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MID_CLIENT_KEY}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistFrankly.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {" "}
          <Navbar />
          {children}
          <ToastContainer
            draggable
            closeOnClick
            autoClose={5000}
            theme="dark"
            position="bottom-right"
          />
          <Footer />
        </SessionProvider>{" "}
      </body>
    </html>
  );
}
