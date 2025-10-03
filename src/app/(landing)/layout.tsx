import { Navbar } from "../components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-white">
      <Navbar />
      {children}
    </div>
  );
}
