import { SideBar } from "../components/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-white">
      <SideBar />
      {children}
    </div>
  );
}
