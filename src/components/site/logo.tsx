import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo.PNG"
        alt="Rehoboth Faith Assembly Logo"
        width={100}
        height={120}
        priority
        className="h-[120px] w-[100px] rounded-full brightness-110 contrast-100"
      />
    </Link>
  );
}
