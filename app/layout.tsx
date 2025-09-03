import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "Manage and view users with search, pagination and details",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-gray-50 text-foreground">
            <header className="bg-white border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      UM
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        User Management
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Admin dashboard
                      </div>
                    </div>
                  </div>
                  <nav className="flex items-center gap-4 text-sm">
                    <a
                      href="/"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Home
                    </a>
                    <a
                      href="/"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Users
                    </a>
                  </nav>
                </div>
              </div>
            </header>

            <main className="max-w-5xl mx-auto p-6">{children}</main>

            <footer className="mt-8 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-muted-foreground">
                © {new Date().getFullYear()} User Management — Built with ❤️
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
