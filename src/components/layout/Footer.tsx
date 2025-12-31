'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'Test Site',
  tagline: 'Simple, powerful technology solutions that work seamlessly for everyone.',
  copyright: '© 2024 Test Site. All rights reserved.',

  // Contact Information
  email: 'hello@testsite.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, Innovation City, IC 12345',

  // Navigation Links
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
  ],

  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],

  // CTA
  ctaText: 'Get Started Today',
  ctaHref: '/contact',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="footer" className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              <span data-editable="companyName">{config.companyName}</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span data-editable="email">{config.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span data-editable="address">{config.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {config.quickLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigation(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  data-editable-href={`quickLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`quickLinks[${idx}].label`}>{link.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Legal & CTA */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <nav className="space-y-3 mb-6">
              {config.legalLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigation(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  data-editable-href={`legalLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                </button>
              ))}
            </nav>

            <Button
              onClick={handleCTAClick}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm">
          <span data-editable="copyright">{config.copyright}</span>
        </div>
      </div>
    </section>
  );
}
