import { Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const footerLinks = [
    { title: 'About Us', href: '/about' },
    { title: 'Sermons', href: '/sermons' },
    { title: 'Events', href: '/events' },
    { title: 'Give', href: '/giving' },
    { title: 'Contact', href: '/contact' },
    { title: 'Visit', href: '/visit' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">Connecting people with God and each other.</p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{label}</span>
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-start-3">
            <h3 className="font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold uppercase tracking-wider">Visit Us</h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>Sunday Service: 10:00 AM</p>
              <p>123 Church Street</p>
              <p>Anytown, USA 12345</p>
              <p className="pt-2">(123) 456-7890</p>
            </div>
          </div>

        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} Rehoboth Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
