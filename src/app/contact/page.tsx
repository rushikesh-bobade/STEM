"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our STEM programs? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                  <p className="text-sm text-gray-600">
                    Get in touch with TechyGuide for any inquiries about our STEM programs, workshops, or educational solutions for schools.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Phone</p>
                      <a href="tel:+919140036376" className="text-teal-600 hover:text-teal-700">
                        +91 91140 36376
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Mon-Sat, 9am-6pm IST</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Email</p>
                      <a href="mailto:reachus@techyguide.in" className="text-teal-600 hover:text-teal-700 break-all">
                        reachus@techyguide.in
                      </a>
                      <p className="text-xs text-gray-500 mt-1">We reply within 24 hours</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Address</p>
                      <p className="text-gray-600 text-sm">
                        Noida, Uttar Pradesh, India
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Visit us during business hours</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Business Hours</p>
                      <p className="text-gray-600 text-sm">Monday - Saturday</p>
                      <p className="text-gray-600 text-sm">9:00 AM - 6:00 PM IST</p>
                    </div>
                  </div>

                  {/* Follow Us */}
                  <div>
                    <p className="font-semibold text-gray-900 mb-3">Follow Us</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Stay connected with us on social media for updates, tips, and educational content.
                    </p>
                    <div className="flex gap-3">
                      <a href="#" className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-semibold">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900 font-semibold">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-900 font-semibold">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 XXXXX XXXXX"
                          className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-900 font-semibold">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <Select required>
                          <SelectTrigger className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="courses">Course Information</SelectItem>
                            <SelectItem value="workshop">Workshop Booking</SelectItem>
                            <SelectItem value="lab">Lab Setup</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-900 font-semibold">
                        Your Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help you..."
                        className="min-h-[150px] border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.48129308215!2d77.04417!3d28.527554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}