"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Onboarding",
      icon: UserPlus,
      href: "/dashboard/onboarding",
      color: "text-emerald-500",
      subItems: [
        {
          label: "Members",
          href: "/dashboard/onboarding/members",
        },
        {
          label: "Collectors",
          href: "/dashboard/onboarding/collectors",
        },
        {
          label: "Towns",
          href: "/dashboard/onboarding/towns",
        },
      ],
    },
    {
      label: "Users & Roles",
      icon: Users,
      href: "/dashboard/users",
      color: "text-violet-500",
      subItems: [
        {
          label: "Manage Users",
          href: "/dashboard/users",
        },
        {
          label: "Manage Roles",
          href: "/dashboard/roles",
        },
      ],
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      color: "text-gray-500",
    },
  ];

  return (
    <div
      className={cn(
        "relative h-full bg-card border-r pt-4 px-3",
        isOpen ? "w-60" : "w-[70px]",
      )}
    >
      <div className="flex items-center gap-2 px-2">
        {isOpen && (
          <span className="font-bold text-xl">
            <Image
              alt="Yunesta"
              width={200}
              height={200}
              src="/images/logo.png"
            />
          </span>
        )}
      </div>
      <div className="mt-8 flex flex-col gap-2">
        {routes.map((route) => {
          if (route.subItems) {
            return (
              <Accordion
                key={route.href}
                type="single"
                collapsible
                className="space-y-2"
              >
                <AccordionItem
                  value={route.label.toLowerCase()}
                  className="border-none"
                >
                  <AccordionTrigger
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 [&[data-state=open]>div>svg]:rotate-0 hover:no-underline",
                      pathname.includes(route.href) &&
                        "bg-gray-100 text-gray-900",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <route.icon className={cn("h-5 w-5", route.color)} />
                      {isOpen && route.label}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pl-9 mt-2">
                      {route.subItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "text-sm text-gray-500 hover:text-gray-900",
                            pathname === item.href &&
                              "text-gray-900 font-medium",
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 no-underline",
                pathname === route.href && "bg-gray-100 text-gray-900",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {isOpen && route.label}
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-1 w-full px-3">
        <div
          onClick={() => {
            Cookies.remove("access-token");
            Cookies.remove("user");
            router.push("/");
          }}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 no-underline"
        >
          <LogOut className="h-5 w-5" />
          {isOpen && "Logout"}
        </div>
      </div>
    </div>
  );
}
