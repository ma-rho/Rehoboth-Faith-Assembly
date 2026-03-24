"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Video, Calendar, User } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar';
import { Logo } from '@/components/site/logo';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/sermons', label: 'Sermons', icon: Video },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/pastor', label: 'Pastor', icon: User },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar>
              <SidebarHeader>
                <Logo />
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {adminNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <SidebarMenuItem key={link.label}>
                        <Link href={link.href} legacyBehavior passHref>
                          <SidebarMenuButton isActive={isActive}>
                            <link.icon className="h-4 w-4" />
                            <span>{link.label}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
