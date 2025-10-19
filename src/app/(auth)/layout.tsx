import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center relative">
      <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4">
        <span className="text-2xl font-bold">Zynx</span>
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
