import { Link } from 'wouter';
import { BookOpen, Monitor, Sparkles, Globe, Heart, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const features = [
  {
    icon: Monitor,
    title: 'Read Anywhere',
    description: 'Access your books from any device with an internet connection. Desktop, tablet, or mobile - your library is always with you.',
  },
  {
    icon: Sparkles,
    title: 'Instant Access',
    description: 'No downloads, no waiting. Start reading immediately in your browser with our optimized reading experience.',
  },
  {
    icon: Globe,
    title: 'Vast Collection',
    description: 'Explore thousands of titles across fiction, non-fiction, science, fantasy, and self-help categories.',
  },
  {
    icon: Heart,
    title: 'Personalized',
    description: 'Build your personal library with favorites, get recommendations, and track your reading journey.',
  },
];

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Message sent!',
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Digital-First Reading</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6" data-testid="text-about-title">
            Welcome to PageTurner
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe great stories should be accessible to everyone, everywhere. 
            That's why we built a digital bookstore focused on instant, browser-based reading.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold mb-4">
              Why Choose PageTurner?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience the future of reading with our modern, user-friendly platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-4">
                At PageTurner, we're passionate about making reading more accessible and enjoyable 
                for everyone. We believe that great literature should be just a click away, 
                without the barriers of physical shipping or complex download processes.
              </p>
              <p className="text-muted-foreground mb-6">
                Our digital-first approach means you can start reading instantly, from any device, 
                anywhere in the world. Whether you're commuting, traveling, or relaxing at home, 
                your entire library is always at your fingertips.
              </p>
              <Link href="/catalog">
                <Button data-testid="button-start-reading">
                  Start Reading Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 text-center">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="font-serif text-4xl font-bold text-primary mb-2">1000+</p>
              <p className="text-muted-foreground">Digital books available</p>
              <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="font-serif text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold">24/7</p>
                  <p className="text-sm text-muted-foreground">Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get in Touch</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold mb-2" data-testid="text-contact-heading">
              Contact Us
            </h2>
            <p className="text-muted-foreground">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    data-testid="input-contact-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    data-testid="input-contact-email"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={4}
                    required
                    data-testid="input-contact-message"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting} data-testid="button-send-message">
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            You can also reach us at{' '}
            <a href="mailto:hello@pageturner.com" className="text-primary hover:underline">
              hello@pageturner.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
