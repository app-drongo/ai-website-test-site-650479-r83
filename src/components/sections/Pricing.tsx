'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { Check, Star } from 'lucide-react';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your needs. No hidden fees, no surprises.',
  plans: [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for individuals and small projects',
      features: ['Up to 5 projects', '10GB storage', 'Basic support', 'Core features'],
      buttonText: 'Get Started',
      buttonHref: '#signup',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Best for growing teams and businesses',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Advanced features',
        'Team collaboration',
        'Analytics dashboard',
      ],
      buttonText: 'Start Free Trial',
      buttonHref: '#signup',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations with custom needs',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee',
      ],
      buttonText: 'Contact Sales',
      buttonHref: '#contact',
      popular: false,
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} bg-card`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <div className="mb-2">
                  <span
                    className="text-4xl font-bold text-foreground"
                    data-editable={`plans[${idx}].price`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground" data-editable={`plans[${idx}].period`}>
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
              </CardHeader>

              <CardContent className="pb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span
                        className="text-sm text-foreground"
                        data-editable={`plans[${idx}].features[${featureIdx}]`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => navigate(plan.buttonHref)}
                  data-editable-href={`plans[${idx}].buttonHref`}
                  data-href={plan.buttonHref}
                >
                  <span data-editable={`plans[${idx}].buttonText`}>{plan.buttonText}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
