"use client"

import * as React from "react"
import { Search, Grid, List, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { CourseCard } from "@/components/CourseCard"

const courses = [
  {
    title: "Introduction to Neural Networks",
    category: "AI & ML",
    description: "Master the fundamentals of AI. Build your first neural network from scratch using Python and TensorFlow.",
    price: 49.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    title: "Advanced Drone Physics",
    category: "Robotics",
    description: "Deep dive into aerodynamics, PID controllers, and autonomous navigation for quadcopters.",
    price: 120.00,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop",
    badge: "New",
  },
  {
    title: "Web3 Development Bootcamp",
    category: "Blockchain",
    description: "Learn Solidity, smart contracts, and build your own decentralized applications on Ethereum.",
    price: 89.00,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Python for Data Analysis",
    category: "Data Science",
    description: "Clean, visualize, and analyze complex datasets using Pandas, NumPy, and Matplotlib.",
    price: 59.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Arduino Masters",
    category: "Hardware",
    description: "Get hands-on with electronics. Program microcontrollers to interact with the physical world.",
    price: 35.00,
    oldPrice: 45.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=800&auto=format&fit=crop",
    badge: "Sale",
  },
  {
    title: "Ethical Hacking & Cyber Sec",
    category: "Security",
    description: "Understand network security, penetration testing, and how to defend against cyber threats.",
    price: 75.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
  },
]

export default function CourseCatalog() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-widest font-bold">
            Learn & Innovate
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Course <span className="text-primary">Catalog</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Discover our comprehensive range of STEM courses designed to equip students with future-ready skills in robotics, coding, and AI.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        {/* Search and View Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-12 h-14 rounded-full border-none bg-secondary/50 focus-visible:ring-primary shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-secondary/50 p-1 rounded-full">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-white shadow-sm">
                <Grid className="h-5 w-5 text-primary" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <List className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="outline" className="rounded-full h-12 px-6 lg:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block space-y-10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button className="text-xs text-primary font-bold hover:underline">Reset</button>
              </div>
              
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Categories</h4>
                  <div className="space-y-3">
                    {["Robotics", "AI & Coding", "IoT & Electronics", "Game Dev"].map((cat) => (
                      <div key={cat} className="flex items-center space-x-3 group cursor-pointer">
                        <Checkbox id={cat} className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                        <label htmlFor={cat} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-primary transition-colors cursor-pointer">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div className="pt-6 border-t">
                  <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Level</h4>
                  <div className="space-y-3">
                    {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                      <div key={lvl} className="flex items-center space-x-3 group cursor-pointer">
                        <Checkbox id={lvl} className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                        <label htmlFor={lvl} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-primary transition-colors cursor-pointer">
                          {lvl}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="pt-6 border-t">
                  <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Price</h4>
                  <div className="px-2">
                    <Slider defaultValue={[0, 500]} max={500} step={1} className="my-6" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 p-2 rounded-lg bg-secondary/50 text-center text-sm font-bold">$0</div>
                      <div className="text-muted-foreground text-sm font-medium">to</div>
                      <div className="flex-1 p-2 rounded-lg bg-secondary/50 text-center text-sm font-bold">$500</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Course Grid */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map((course, idx) => (
                <CourseCard key={idx} {...course} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-none bg-secondary/50">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="rounded-full h-10 w-10 border-none bg-primary text-white shadow-lg shadow-primary/20">1</Button>
              <Button variant="outline" className="rounded-full h-10 w-10 border-none bg-secondary/50">2</Button>
              <Button variant="outline" className="rounded-full h-10 w-10 border-none bg-secondary/50">3</Button>
              <span className="px-2 text-muted-foreground">...</span>
              <Button variant="outline" size="icon" className="rounded-full border-none bg-secondary/50">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
