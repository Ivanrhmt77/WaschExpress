"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Users,
  Settings,
  LogOut,
  Shirt,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { placeholderImages } from "@/lib/placeholder-images";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/create-order", label: "Buat Order Baru", icon: PlusCircle },
  { href: "/admin/order-history", label: "Riwayat Order", icon: History },
  { href: "/admin/customer-database", label: "Database Customer", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const adminAvatar = placeholderImages["admin-avatar"];

  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="p-5 border-b bg-linear-to-b from-background to-muted/20">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="p-2.5 rounded-xl bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
            <Shirt className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            WaschExpress
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="w-full justify-start gap-3 px-4 py-3 mb-1 rounded-lg cursor-pointer transition-all hover:bg-accent/60 data-[active=true]:bg-linear-to-r data-[active=true]:from-blue-500/15 data-[active=true]:to-indigo-500/15 data-[active=true]:border data-[active=true]:border-blue-500/30"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-accent/60 transition-all cursor-pointer group">
              <Avatar className="h-10 w-10 ring-2 ring-border group-hover:ring-blue-500/50 transition-all">
                <AvatarImage
                  src={adminAvatar.imageUrl}
                  alt={adminAvatar.description}
                  data-ai-hint={adminAvatar.imageHint}
                />
                <AvatarFallback className="bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="font-semibold text-sm">Admin</span>
                <span className="text-xs text-muted-foreground truncate w-full">
                  admin@smartlaundry.com
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 mb-2 ml-2"
            align="end"
            side="top"
          >
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Pengaturan</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
