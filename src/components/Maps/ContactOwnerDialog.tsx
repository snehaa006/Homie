import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface ContactOwnerDialogProps {
  pgName: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  children: React.ReactNode;
}

const ContactOwnerDialog: React.FC<ContactOwnerDialogProps> = ({
  pgName,
  ownerName,
  ownerPhone,
  ownerEmail,
  children
}) => {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Message sent to ${ownerName}! They will contact you soon.`);
    setContactForm({ name: '', phone: '', email: '', message: '', preferredTime: '' });
  };

  const handleCall = () => {
    window.open(`tel:${ownerPhone}`, '_self');
    toast.success('Opening phone dialer...');
  };

  const handleEmail = () => {
    window.open(`mailto:${ownerEmail}?subject=Inquiry about ${pgName}`, '_blank');
    toast.success('Opening email client...');
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in ${pgName}. Could you please share more details?`;
    window.open(`https://wa.me/${ownerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    toast.success('Opening WhatsApp...');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Contact Owner
          </DialogTitle>
          <DialogDescription>
            Get in touch with {ownerName} for {pgName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={handleCall} variant="outline" size="sm" className="glass-card">
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button onClick={handleEmail} variant="outline" size="sm" className="glass-card">
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
            <Button onClick={handleWhatsApp} variant="outline" size="sm" className="glass-card bg-green-100 text-green-800 hover:bg-green-200">
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Or send a detailed message
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="glass-card"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Your Phone</Label>
                <Input
                  id="phone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Your phone number"
                  className="glass-card"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="glass-card"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTime">Preferred Contact Time</Label>
              <Input
                id="preferredTime"
                value={contactForm.preferredTime}
                onChange={(e) => setContactForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                placeholder="e.g., Morning 10-12 PM"
                className="glass-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Tell them about your requirements, budget, etc."
                className="glass-card"
                rows={3}
                required
              />
            </div>

            <Button type="submit" className="w-full gradient-button">
              Send Message
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactOwnerDialog;