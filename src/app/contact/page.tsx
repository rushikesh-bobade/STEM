"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ChevronDown,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    privacyAccepted: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-gray-100 text-gray-800 hover:bg-gray-100">
            <MessageCircle className="mr-1 h-3 w-3" /> WE'D LOVE TO HEAR FROM YOU
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Have questions about our robotics kits, STEM courses, or the RoboThrone
            competition? Fill out the form below and our team will get back to you
            shortly.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-b from-emerald-50 to-white p-8 lg:col-span-1">
              <h2 className="text-xl font-semibold text-gray-900">
                Contact Information
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <MapPin className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Our Office</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      TechyGuide HQ, 123 Innovation Park,
                      <br />
                      Electronic City, Bangalore, 560100
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <Phone className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-sm text-gray-600">+91 91140 36376</p>
                    <p className="text-xs text-gray-500">Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <Mail className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      reachus@techyguide.in
                    </p>
                    <p className="text-sm text-gray-600">support@techyguide.in</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase text-gray-500">
                  CONNECT WITH US
                </h3>
                <div className="mt-4 flex gap-3">
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      placeholder="John"
                      className="mt-1"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      placeholder="Doe"
                      className="mt-1"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="mt-1"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, subject: value }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="General Inquiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="products">Products & Kits</SelectItem>
                      <SelectItem value="courses">Online Courses</SelectItem>
                      <SelectItem value="robothrone">RoboThrone Competition</SelectItem>
                      <SelectItem value="schools">School Partnership</SelectItem>
                      <SelectItem value="bulk">Bulk Orders</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="How can we help you?"
                    className="mt-1 min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        privacyAccepted: checked as boolean,
                      }))
                    }
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-teal-600 hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and authorize STEM Logic to contact me regarding my inquiry.
                  </label>
                </div>

                <Button type="submit" className="rounded-full" size="lg">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-600">
              Quick answers to common questions about our programs
            </p>
          </div>

          <Accordion type="single" collapsible className="mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border bg-white px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
