'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Home, Video, Calendar, User, Loader2, LogOut } from 'lucide-react';
import useAuth from '@/hooks/use-auth';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { getFirebaseServices } from '@/lib/firebase';
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
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  const handleLogout = async () => {
    const { auth } = getFirebaseServices();
    if (!auth) {
      toast({
        title: 'Error',
        description: 'Failed to log out. Firebase not initialized.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error',
        description: 'Failed to log out.',
        variant: 'destructive',
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-col flex-shrink-0 border-r bg-background">
        <nav className="flex-1 px-4 py-4">
          <ul>
            {adminNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${ 
                        isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-muted'
                      }`}>
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t">
            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
            </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
