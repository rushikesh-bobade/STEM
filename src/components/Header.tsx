"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchoolsOpen, setIsSchoolsOpen] = useState(false);
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    if (error?.code) {
      toast.error("Sign out failed");
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  const userInitials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-600 to-teal-500 shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-xl">TG</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold leading-none">
                <span className="text-gray-900">TECHY</span>
                <span className="text-teal-600">GUIDE</span>
              </div>
              <p className="text-xs text-gray-600 font-medium mt-0.5">Learn, Grow, Succeed</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
              Home
            </Link>
            <div className="relative group">
              <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all flex items-center gap-1.5">
                For Schools
                <ChevronDown className="h-4 w-4 transform group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform group-hover:translate-y-0 -translate-y-2 overflow-hidden">
                <Link href="/workshops" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-teal-600"></span>
                  Workshop
                </Link>
                <Link href="/ai-lab" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-teal-600"></span>
                  Atal Tinkering Lab
                </Link>
                <Link href="/ai-lab" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-teal-600"></span>
                  AI & Robotics Lab
                </Link>
              </div>
            </div>
            <Link href="/products" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
              Products
            </Link>
            <Link href="/courses" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
              Courses
            </Link>
            <Link href="/impact-program" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
              Impact
            </Link>
            <Link href="/robothrone" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
              Robothrone
            </Link>
            <Link href="/contact" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {!isPending && session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 gap-2.5 px-3 hover:bg-teal-50">
                    <Avatar className="h-9 w-9 ring-2 ring-teal-100">
                      <AvatarImage src={session.user.image || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-teal-600 to-teal-500 text-white text-sm font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-[120px] truncate font-semibold text-gray-900">{session.user.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-2 p-2">
                      <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-600">{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer py-3">
                      <LayoutDashboard className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer py-3">
                      <User className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="font-medium">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/orders" className="cursor-pointer py-3">
                      <ShoppingCart className="mr-3 h-5 w-5 text-teal-600" />
                      <span className="font-medium">My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer py-3 text-red-600 focus:text-red-600 focus:bg-red-50">
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-teal-600 hover:bg-teal-50 font-semibold px-5">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="container mx-auto px-4 sm:px-6 flex flex-col py-6 space-y-1">
            <Link 
              href="/" 
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={() => setIsSchoolsOpen(!isSchoolsOpen)}
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all flex items-center justify-between"
            >
              For Schools
              <ChevronDown className={`h-4 w-4 transition-transform ${isSchoolsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSchoolsOpen && (
              <div className="pl-4 space-y-1 py-2">
                <Link 
                  href="/workshops" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600"></span>
                  Workshop
                </Link>
                <Link 
                  href="/ai-lab" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600"></span>
                  Atal Tinkering Lab
                </Link>
                <Link 
                  href="/ai-lab" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-600"></span>
                  AI & Robotics Lab
                </Link>
              </div>
            )}
            <Link 
              href="/products" 
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/courses" 
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/impact-program" 
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Impact Program
            </Link>
            <Link 
              href="/robothrone" 
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Robothrone
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-3 pt-6 border-t border-gray-200 mt-4">
              {!isPending && session?.user ? (
                <>
                  <div className="px-4 py-3 bg-teal-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{session.user.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start border-teal-200 hover:bg-teal-50">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    variant="outline" 
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-md">
                      Sign Up Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}