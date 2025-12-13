"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, Filter, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-teal-100 text-teal-700 border-0">
              💎 Premium STEM Products
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Educational Products
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              High-quality robotics kits, IoT devices, and STEM learning products - 11 products available
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-12 h-14 text-lg border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-teal-600" />
                <span className="text-gray-600">50,000+ Students Trust Us</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-teal-600" />
                <span className="text-gray-600">Certified Quality Products</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-orange-400 fill-orange-400" />
                <span className="text-gray-600">4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12 bg-white">
        <div className="container">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Badge className="bg-teal-600 text-white border-0 cursor-pointer" onClick={() => setSelectedCategory("all")}>
                All Products
              </Badge>
              <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCategory("Robotics")}>
                Robotics
              </Badge>
              <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCategory("IoT")}>
                IoT
              </Badge>
              <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCategory("3D Printing")}>
                3D Printing
              </Badge>
              <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedCategory("Combo")}>
                Combo
              </Badge>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-xl transition-all border-2 group">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-teal-50 to-orange-50 rounded-t-lg overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-orange-500 text-white border-0">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge className="bg-teal-100 text-teal-700 border-0 mb-2">{product.category}</Badge>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{product.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 mb-3">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    {product.level && (
                      <Badge variant="outline" className="text-xs">{product.level}</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-teal-600">₹{product.price}</p>
                    </div>
                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your STEM Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get expert guidance on choosing the right products for your learning needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8">
                Contact Us
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
              Call: +91 91140 36376
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Users, Award } from "lucide-react";

const allProducts = [
  {
    id: 1,
    title: "ESP32 Development Board WiFi Kit",
    description: "Powerful WiFi and Bluetooth development board for IoT projects with dual-...",
    category: "IoT",
    level: "Beginner",
    rating: 4.8,
    reviews: "446",
    price: "899",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=400&fit=crop",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "STEM Learning Master Kit",
    description: "Complete package with robotics, IoT, and coding materials for comprehensive learning",
    category: "Combo",
    level: "All Levels",
    rating: 4.9,
    reviews: "970",
    price: "12,999",
    image: "https://images.unsplash.com/photo-1581093458791-9d42e2e0d46c?w=400&h=400&fit=crop",
    badge: "Bundle",
  },
  {
    id: 3,
    title: "Bluetooth Controlled Robot Car",
    description: "Control your robot via smartphone with custom mobile app and real-time feedback",
    category: "Robotics",
    level: "Beginner",
    rating: 4.6,
    reviews: "798",
    price: "4,499",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Ottoman Robotics Kit",
    description: "Complete robotics kit for beginners with Arduino-compatible board and sensors",
    category: "Robotics",
    level: "Beginner",
    rating: 4.8,
    reviews: "1734",
    price: "4,999",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Robotic & AI Bundle",
    description: "Robotics kit + AI course + project access to build intelligent systems",
    category: "Combo",
    level: "Intermediate",
    rating: 4.8,
    reviews: "234K",
    price: "9,999",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Oracle Avoidance Robot",
    description: "Smart robot with ultrasonic sensors for automatic obstacle detection and avoidance",
    category: "Robotics",
    level: "Intermediate",
    rating: 4.9,
    reviews: "768",
    price: "5,999",
    image: "https://images.unsplash.com/photo-1527430253228-e93688616381?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Smart Home Automation Kit",
    description: "Complete kit with sensors, actuators, and wireless module for home automation",
    category: "IoT",
    level: "Intermediate",
    rating: 4.7,
    reviews: "967",
    price: "5,499",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Weather Monitoring Station",
    description: "Build your own IoT weather station with temperature, humidity, and pressure sensors",
    category: "IoT",
    level: "Intermediate",
    rating: 4.8,
    reviews: "881",
    price: "3,999",
    image: "https://images.unsplash.com/photo-1592833159057-34c845f38d35?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Advanced Line Follower Robot",
    description: "High-precision line follower with PID control and adjustable speed settings",
    category: "Robotics",
    level: "Advanced",
    rating: 4.7,
    reviews: "366",
    price: "6,499",
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=400&h=400&fit=crop",
  },
  {
    id: 10,
    title: "3D Printed Robot Chassis Kit",
    description: "Customizable 3D printed robot chassis with motor mounts and modular design",
    category: "3D Printing",
    level: "Beginner",
    rating: 4.5,
    reviews: "123",
    price: "1,499",
    image: "https://images.unsplash.com/photo-1581092916450-c49e54d3f3e7?w=400&h=400&fit=crop",
  },
  {
    id: 11,
    title: "Drone Frame Kit",
    description: "Lightweight 3D printed quadcopter frame kit with brushless motor mounts",
    category: "3D Printing",
    level: "Advanced",
    rating: 4.7,
    reviews: "87",
    price: "2,499",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop",
  },
];
