'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { Menu, X } from 'lucide-react';

const DEFAULT_NAVIGATION = {
  logo: 'Test Site',
  logoHref: '#hero',
  links: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
  ctaText: 'Get Started',
  ctaHref: '#pricing',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate(config.logoHref)}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            data-editable-href="logoHref"
            data-href={config.logoHref}
          >
            <span data-editable="logo">{config.logo}</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {config.links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigate(link.href)}
                className="text-foreground hover:text-primary transition-colors"
                data-editable-href={`links[${idx}].href`}
                data-href={link.href}
              >
                <span data-editable={`links[${idx}].label`}>{link.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigate(config.ctaHref)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {config.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    navigate(link.href);
                    setIsOpen(false);
                  }}
                  className="text-left text-foreground hover:text-primary transition-colors"
                  data-editable-href={`links[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`links[${idx}].label`}>{link.label}</span>
                </button>
              ))}
              <Button
                onClick={() => {
                  navigate(config.ctaHref);
                  setIsOpen(false);
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
