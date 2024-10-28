import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-col flex-center">
      <Navbar />
      <div>{children}</div>
    </main>
  );
}
