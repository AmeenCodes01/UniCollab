import Providers from "@/components/Providers";
import AuthScreen from "./auth/component/AuthScreen";
import "./globals.css";
import Header from "@/components/header";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="antialiased h-screen flex flex-col ">
        {/* Wrap the application in Providers for authentication management */}
        <Providers>
          <div className="flex-1 flex flex-col">
            <Header />
            <div className="px-4 py-2 flex-1 overflow-auto">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
