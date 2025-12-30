import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-background border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold tracking-tight">TechyGuide</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Empowering the next generation of innovators with cutting-edge STEM education and tools. Discover our range of robotics kits and AI courses.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/impact" className="text-muted-foreground hover:text-primary transition-colors">Impact Program</Link></li>
              <li><Link href="/why-choose-us" className="text-muted-foreground hover:text-primary transition-colors">Why Choose Us?</Link></li>
              <li><Link href="/partners" className="text-muted-foreground hover:text-primary transition-colors">Partners</Link></li>
              <li><Link href="/social-wall" className="text-muted-foreground hover:text-primary transition-colors">Social Wall</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">Online Courses</Link></li>
              <li><Link href="/store" className="text-muted-foreground hover:text-primary transition-colors">DIY Products</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/help-center" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-muted-foreground mb-4">Subscribe to our mailing list and get interesting stuff and updates to your email inbox.</p>
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <Input placeholder="Enter your email" className="rounded-full pl-4 pr-12 h-12 border-muted-foreground/20" />
                <Button size="icon" className="absolute right-1 top-1 h-10 w-10 rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button className="w-full rounded-full h-12 font-bold tracking-wide">
                Subscribe Now
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 TechyGuide Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Condition</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/refund" className="text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link>
            <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
