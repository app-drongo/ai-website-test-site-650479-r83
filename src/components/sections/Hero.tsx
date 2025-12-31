'use client';

import { Button } from '@/components/ui/button';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

const DEFAULT_HERO = {
  title: 'Build Amazing Products with Our Platform',
  subtitle:
    'Transform your ideas into reality with our cutting-edge tools and seamless workflow. Join thousands of creators who trust our platform.',
  primaryButtonText: 'Get Started Free',
  primaryButtonHref: '#pricing',
  secondaryButtonText: 'Watch Demo',
  secondaryButtonHref: '#demo',
  imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
  imageAlt: 'Modern workspace with laptop and design tools',
  features: ['No credit card required', 'Free 14-day trial', '24/7 support'],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              <span data-editable="title">{config.title}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              <span data-editable="subtitle">{config.subtitle}</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => navigate(config.primaryButtonHref)}
                data-editable-href="primaryButtonHref"
                data-href={config.primaryButtonHref}
              >
                <span data-editable="primaryButtonText">{config.primaryButtonText}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(config.secondaryButtonHref)}
                data-editable-href="secondaryButtonHref"
                data-href={config.secondaryButtonHref}
              >
                <Play className="mr-2 h-4 w-4" />
                <span data-editable="secondaryButtonText">{config.secondaryButtonText}</span>
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={config.imageUrl}
                alt={config.imageAlt}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                data-editable-src="imageUrl"
                priority
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
