'use client';

import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'Test Site',
  year: '2024',
  links: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  return (
    <footer className="bg-muted/30 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © <span data-editable="year">{config.year}</span>{' '}
            <span data-editable="companyName">{config.companyName}</span>. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {config.links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigate(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-editable-href={`links[${idx}].href`}
                data-href={link.href}
              >
                <span data-editable={`links[${idx}].label`}>{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
