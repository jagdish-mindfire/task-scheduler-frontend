import localFont from "next/font/local";
import { cookies } from "next/headers"; // Import to access cookies on the server
import "./globals.css";
import UnprotectedLayout from "./layouts/UnprotectedLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";

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

export const metadata = {
  title: "Schedule Me",
  description: "Schedule your important work now!",
};

export default async function RootLayout({ children }) {
  // Read the `isAuthenticated` cookie on the server side
  const cookieStore = await cookies()
  const isAuthenticated = Boolean(cookieStore.get('refreshToken')?.value);
  console.log({isAuthenticated})
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isAuthenticated ? (
          <ProtectedLayout>{children}</ProtectedLayout>
        ) : (
          <UnprotectedLayout>{children}</UnprotectedLayout>
        )}
      </body>
    </html>
  );
}
