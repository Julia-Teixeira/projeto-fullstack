import { AuthProvider } from "@/provider/authProvider";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { ClientProvider } from "@/provider/clientProvider";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Lista de contatos",
  description: "Gerencie sua lista de contatos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <ClientProvider>{children}</ClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
