"use client"

import * as React from "react"
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Youtube, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-widest font-bold">
            We'd love to hear from you
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Have questions about our robotics kits, STEM courses, or the RoboThrone competition? Fill out the form below and our team will get back to you shortly.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-primary/5 border border-muted/20 space-y-10">
              <h3 className="font-bold text-2xl">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Our Office</h4>
                    <p className="text-sm font-medium leading-relaxed">
                      TechyGuide HQ, 123 Innovation Park,<br />
                      Electronic City, Bangalore, 560100
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Phone</h4>
                    <p className="text-sm font-medium">+91 91140 36376</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Email</h4>
                    <p className="text-sm font-medium">reachus@techyguide.in</p>
                    <p className="text-sm font-medium">support@techyguide.in</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-muted/20">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-6">Connect With Us</h4>
                <div className="flex gap-4">
                  {[Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
                    <Button key={i} variant="secondary" size="icon" className="rounded-full bg-secondary/50 hover:bg-primary hover:text-white transition-all">
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-[2.5rem] p-10 border border-primary/10">
              <h4 className="font-bold text-lg mb-4 text-primary">Need urgent help?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our support team is available 24/7 to assist you with technical issues or order inquiries.
              </p>
              <Button className="w-full rounded-full h-12 font-bold">Live Chat Now</Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl shadow-primary/5 border border-muted/20">
            <h3 className="font-bold text-3xl mb-8">Send us a Message</h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground ml-1">First Name</label>
                  <Input placeholder="John" className="h-14 rounded-2xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground ml-1">Last Name</label>
                  <Input placeholder="Doe" className="h-14 rounded-2xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground ml-1">Email Address</label>
                  <Input placeholder="john@example.com" className="h-14 rounded-2xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground ml-1">Phone Number</label>
                  <Input placeholder="+91 98765 43210" className="h-14 rounded-2xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground ml-1">Subject</label>
                <Select defaultValue="general">
                  <SelectTrigger className="h-14 rounded-2xl border-muted/20 bg-secondary/20 focus-visible:ring-primary">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="orders">Orders & Shipping</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="schools">For Schools</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground ml-1">Message</label>
                <Textarea 
                  placeholder="How can we help you?" 
                  className="min-h-[200px] rounded-2xl border-muted/20 bg-secondary/20 focus-visible:ring-primary p-6"
                />
              </div>

              <div className="flex items-start space-x-3 pt-4">
                <Checkbox id="terms" className="mt-1 border-muted-foreground/30 data-[state=checked]:bg-primary" />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to the <span className="text-primary font-bold hover:underline">Privacy Policy</span> and authorize STEM Logic to contact me regarding my inquiry.
                </label>
              </div>

              <Button size="lg" className="w-full md:w-auto px-12 h-16 rounded-full font-bold text-lg shadow-lg shadow-primary/20">
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions about our programs and products.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4 border-none">
              {[
                { q: "How do I register for RoboThrone 2025?", a: "Registration is open on our website. Simply click the 'Register' button on the RoboThrone page and follow the instructions." },
                { q: "Can I purchase kits in bulk for my school?", a: "Yes! We offer special bulk pricing for educational institutions. Please contact our sales team via the form above or email schools@techyguide.in." },
                { q: "Where is the competition held?", a: "RoboThrone 2025 will be held at our innovation center in Bangalore. Detailed location and travel guides will be shared with registered participants." },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-[1.5rem] px-8 bg-white border-muted/20">
                  <AccordionTrigger className="hover:no-underline font-bold text-lg py-6 data-[state=open]:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  )
}
