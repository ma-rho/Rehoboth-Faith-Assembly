import Link from 'next/link';
import { Church } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-lg font-bold text-primary", className)}>
      <Church className="h-6 w-6" />
      <span className="hidden sm:inline-block">Rehoboth Connect</span>
      <span className="sm:hidden">RC</span>
    </Link>
  );
}
