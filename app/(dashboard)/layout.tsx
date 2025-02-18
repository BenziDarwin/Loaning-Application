"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Hook for navigation
import Cookies from "js-cookie";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if 'access-token' exists in cookies
    const token = Cookies.get("access-token");

    if (!token) {
      // Redirect to login if the token is not found
      router.push("/login"); // You can customize the login URL
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Render a loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
