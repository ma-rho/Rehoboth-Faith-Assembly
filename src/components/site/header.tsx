"use client";

import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/site/logo';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/visit', label: 'Visit Us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string, label: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} onClick={() => setIsOpen(false)}>
        <span
          className={cn(
            "text-foreground/80 transition-colors hover:text-foreground",
            isActive && "font-semibold text-primary"
          )}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/giving">Give Online</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin"><Shield className="mr-2 h-4 w-4" /> Admin</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-8 sm:px-6">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
             <Button asChild className="w-full max-w-xs">
              <Link href="/admin" onClick={() => setIsOpen(false)}><Shield className="mr-2 h-4 w-4" /> Admin Panel</Link>
            </Button>
            <Button asChild className="w-full max-w-xs bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/giving" onClick={() => setIsOpen(false)}>Give Online</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
