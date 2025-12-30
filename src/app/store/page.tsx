"use client"

import * as React from "react"
import Image from "next/image"
import { Search, Grid, List, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ProductCard } from "@/components/ProductCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const products = [
  {
    title: "IoT Smart Home Starter Kit",
    category: "Robotics Kits",
    description: "Build your own automated home system with sensors, relays, and a custom dashboard.",
    price: 89.99,
    rating: 4.5,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=800&auto=format&fit=crop",
    type: "HARDWARE" as const,
  },
  {
    title: "Python for Robotics Masterclass",
    category: "Online Courses",
    description: "20 hours of video content teaching you how to code autonomous robots from scratch.",
    price: 49.99,
    oldPrice: 120.00,
    rating: 4.8,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
    type: "COURSE" as const,
  },
  {
    title: "AI Vision Sensor Module",
    category: "Sensors",
    description: "High-performance camera module with on-board object detection and tracking capabilities.",
    price: 35.50,
    rating: 4.2,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1558239023-58a482e65a50?q=80&w=800&auto=format&fit=crop",
    badge: "SALE",
    type: "HARDWARE" as const,
  },
  {
    title: "6-Axis Robotic Arm Kit",
    category: "Robotics Kits",
    description: "Programmable desktop robotic arm. Supports Python, C++, and block-based coding.",
    price: 299.00,
    rating: 4.9,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1531746790731-6c087fdec69a?q=80&w=800&auto=format&fit=crop",
    type: "HARDWARE" as const,
  },
  {
    title: "DIY Quadcopter Drone",
    category: "Robotics Kits",
    description: "Assemble and program your own drone. Includes gyroscope and GPS modules.",
    price: 159.99,
    rating: 4.0,
    reviews: 8,
    image: "https://images.unsplash.com/photo-1473960104312-d2e17d6efd1b?q=80&w=800&auto=format&fit=crop",
    type: "HARDWARE" as const,
  },
  {
    title: "Neural Networks for Beginners",
    category: "Online Courses",
    description: "Understand the math and logic behind modern AI. No heavy coding required.",
    price: 39.00,
    rating: 4.7,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop",
    type: "COURSE" as const,
  },
]

export default function ProductStore() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-secondary/20 rounded-[2.5rem] overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <Badge className="bg-orange-100 text-orange-600 border-none px-4 py-1 font-bold tracking-widest uppercase text-[10px]">
              ⚡ New Collection
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
              Equip the <span className="text-primary">Innovators</span> of Tomorrow
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Explore our curated selection of STEM kits, robotics gear, and learning modules designed to inspire creativity.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8 h-14 font-bold text-base">Browse Store</Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-bold text-base bg-white">
                <GraduationCap className="h-5 w-5 mr-2" />
                Catalog
              </Button>
            </div>
          </div>
          <div className="flex-1 relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop"
              alt="STEM Kits"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white font-bold text-xl">RoboThrone Ready Kits</h3>
              <p className="text-white/80 text-sm">Prepare for the 2025 competition</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-8">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for kits, parts, or courses..." 
              className="pl-12 h-14 rounded-full border-muted/20 bg-white focus-visible:ring-primary shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground min-w-fit">
              Sort by:
              <Select defaultValue="recommended">
                <SelectTrigger className="w-[180px] rounded-full h-12 border-muted/20 bg-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex bg-secondary/50 p-1 rounded-full ml-auto lg:ml-0">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white shadow-sm text-primary">
                <Grid className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <List className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-secondary/10 rounded-3xl p-6 space-y-8 border border-muted/10">
              <div>
                <h4 className="font-bold text-sm mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-primary rounded-full"></span>
                  Categories
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "All Products", count: 120, checked: true },
                    { label: "Robotics Kits", count: 45 },
                    { label: "Microcontrollers", count: 22 },
                    { label: "Sensors", count: 38 },
                    { label: "Online Courses", count: 15 },
                  ].map((cat) => (
                    <div key={cat.label} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${cat.checked ? 'border-primary bg-primary' : 'border-muted-foreground/30'}`}>
                          {cat.checked && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                        <span className={`text-sm font-medium transition-colors ${cat.checked ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}>{cat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-muted/20">
                <h4 className="font-bold text-sm mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-primary rounded-full"></span>
                  Price Range
                </h4>
                <Slider defaultValue={[0, 500]} max={500} step={1} className="mb-6" />
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>

              <div className="pt-8 border-t border-muted/20">
                <div className="bg-primary/5 rounded-2xl p-6 text-center space-y-4 border border-primary/10">
                  <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h5 className="font-bold text-sm">School Bulk Orders?</h5>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Get special discounts for educational institutions.</p>
                  <Button variant="outline" size="sm" className="w-full rounded-full border-primary/20 hover:bg-primary hover:text-white transition-all text-[10px] font-bold h-8">Learn More</Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div>
            <div className="flex flex-wrap gap-4 mb-8">
              {["All Items", "Physical Kits", "Digital Courses", "Bundles"].map((tab, i) => (
                <Button 
                  key={tab} 
                  variant={i === 0 ? "default" : "secondary"} 
                  className={`rounded-full px-6 font-bold text-sm h-10 ${i === 0 ? 'shadow-lg shadow-primary/20' : 'bg-secondary/50 border-none'}`}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, idx) => (
                <ProductCard key={idx} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              {[1, 2, 3, "...", 8].map((page, i) => (
                <Button 
                  key={i} 
                  variant={page === 1 ? "default" : "ghost"} 
                  className={`rounded-full h-10 w-10 font-bold ${page === 1 ? 'shadow-lg shadow-primary/20' : 'text-muted-foreground'}`}
                >
                  {page}
                </Button>
              ))}
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
