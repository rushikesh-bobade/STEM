import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl text-white mb-6 relative inline-block">
                  Company
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"></span>
                </h3>
              </div>
              <ul className="space-y-3.5">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/impact-program" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Impact Program</span>
                  </Link>
                </li>
                <li>
                  <Link href="/why-choose" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Why Choose Us?</span>
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Partners</span>
                  </Link>
                </li>
                <li>
                  <Link href="/social-wall" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Social Wall</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products & Services */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl text-white mb-6 relative inline-block">
                  Products & Services
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"></span>
                </h3>
              </div>
              <ul className="space-y-3.5">
                <li>
                  <Link href="/courses" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Online Courses</span>
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">DIY Products</span>
                  </Link>
                </li>
                <li>
                  <Link href="/ai-lab" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Atal Tinkering Lab</span>
                  </Link>
                </li>
                <li>
                  <Link href="/workshops" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Workshop</span>
                  </Link>
                </li>
                <li>
                  <Link href="/consultation" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Consultation</span>
                  </Link>
                </li>
                <li>
                  <Link href="/robothrone" className="text-gray-300 hover:text-teal-400 transition-colors flex items-center gap-2.5 group">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
                    <span className="text-sm font-medium">Competition</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl text-white mb-6 relative inline-block">
                  Contact Us
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"></span>
                </h3>
              </div>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+919140036376" className="text-gray-300 hover:text-teal-400 transition-colors flex items-start gap-3 group">
                    <div className="h-10 w-10 rounded-lg bg-teal-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600/30 transition-colors">
                      <Phone className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Call Us</p>
                      <p className="text-sm font-semibold">+91 91140 36376</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:reachus@techyguide.in" className="text-gray-300 hover:text-teal-400 transition-colors flex items-start gap-3 group">
                    <div className="h-10 w-10 rounded-lg bg-orange-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600/30 transition-colors">
                      <Mail className="h-5 w-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Email Us</p>
                      <p className="text-sm font-semibold break-all">reachus@techyguide.in</p>
                    </div>
                  </a>
                </li>
              </ul>
              <div className="flex gap-3 pt-2">
                <a href="#" className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center hover:from-teal-500 hover:to-teal-400 transition-all shadow-lg hover:shadow-xl hover:scale-110 transform">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center hover:from-orange-500 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl hover:scale-110 transform">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center hover:from-teal-500 hover:to-teal-400 transition-all shadow-lg hover:shadow-xl hover:scale-110 transform">
                  <Twitter className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center hover:from-orange-500 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl hover:scale-110 transform">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl text-white mb-6 relative inline-block">
                  Stay Updated
                  <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full"></span>
                </h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Subscribe to our newsletter and get the latest updates on courses, workshops, and STEM education directly to your inbox.
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-12 h-12 rounded-xl focus:bg-white/15 focus:border-teal-500 transition-all"
                  />
                  <Button 
                    size="icon"
                    className="absolute right-1 top-1 h-10 w-10 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-lg shadow-md"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                🔒 Your privacy is important to us. We'll never share your information.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TG</span>
              </div>
              <div>
                <div className="text-lg font-bold leading-none">
                  <span className="text-white">TECHY</span>
                  <span className="text-teal-400">GUIDE</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">© 2024-2025 All rights reserved</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              <Link href="/terms" className="text-gray-300 hover:text-teal-400 transition-colors font-medium">
                Terms & Conditions
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/privacy" className="text-gray-300 hover:text-teal-400 transition-colors font-medium">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/refund" className="text-gray-300 hover:text-teal-400 transition-colors font-medium">
                Refund Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link href="/shipping" className="text-gray-300 hover:text-teal-400 transition-colors font-medium">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}