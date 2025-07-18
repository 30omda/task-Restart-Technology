"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import ReduduxProvider from "@/store/ReduxProvider";
import ClientToaster from "@/components/ClientToster";

export default function ProtectedLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const isEmployee = localStorage.getItem("isEmployee");

    const isAuth = token && user && isEmployee === "true";

    if (!isAuth) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  });

  if (!isMounted) {
    
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ReduduxProvider>
      <ClientToaster />
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ReduduxProvider>
  );
}
