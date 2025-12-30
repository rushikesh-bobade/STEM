import Link from "next/link";
import { Phone, Mail, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Impact Program", href: "/impact-program" },
    { name: "Why Choose Us?", href: "/why-us" },
    { name: "Partners", href: "/partners" },
    { name: "Social Wall", href: "/social" },
  ],
  productsServices: [
    { name: "Online Courses", href: "/courses" },
    { name: "DIY Products", href: "/products" },
    { name: "Atal Tinkering Lab", href: "/schools/atal-lab" },
    { name: "Workshop", href: "/workshop" },
    { name: "Consultation", href: "/consultation" },
    { name: "Competition", href: "/robothrone" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-teal-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Products & Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.productsServices.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-teal-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-teal-600" />
                +91 91140 36376
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-teal-600" />
                reachus@techyguide.in
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Get More Stuff
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Subscribe to our mailing list and get interesting stuff and updates
              to your email inbox.
            </p>
            <div className="mt-4 space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="consent" className="text-xs text-gray-500">
                  I consent to my submitted data being collected via this form.
                </label>
              </div>
              <Button className="w-full rounded-full">Sign Up Now</Button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2024-2025 TechyGuide. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-teal-600"
            >
              Terms & Condition
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-teal-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund"
              className="text-sm text-gray-500 hover:text-teal-600"
            >
              Refund Policy
            </Link>
            <Link
              href="/shipping"
              className="text-sm text-gray-500 hover:text-teal-600"
            >
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
