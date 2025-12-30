"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "For Schools",
    href: "#",
    dropdown: [
      { name: "School Programs", href: "/schools/programs" },
      { name: "Teacher Training", href: "/schools/training" },
      { name: "Atal Tinkering Lab", href: "/schools/atal-lab" },
      { name: "School Partnership", href: "/schools/partnership" },
    ],
  },
  { name: "Products", href: "/products" },
  { name: "Courses", href: "/courses" },
  { name: "Impact Program", href: "/impact-program" },
  { name: "Robothrone", href: "/robothrone" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">TechyGuide</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href}>{item.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Link href="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="flex lg:hidden">
            <Link href="/cart" className="relative mr-2 p-2">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="space-y-1">
                  <span className="block px-3 py-2 text-base font-medium text-gray-900">
                    {link.name}
                  </span>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="mt-4 flex flex-col gap-2 px-3">
              <Link
                href="/login"
                className="text-center text-sm font-medium text-gray-700"
              >
                Login
              </Link>
              <Button asChild className="rounded-full">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
