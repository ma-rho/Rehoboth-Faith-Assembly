import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo1.PNG"
        alt="Rehoboth Faith Assembly Logo"
        width={100}
        height={120}
        priority
        className="h-[98px] w-[110px] object-cover rounded-full brightness-150 contrast-100"
      />
    </Link>
  );
}
