"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Grid3X3, List, Star, ShoppingCart, Download, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products, categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

const typeFilters = ["All Items", "Physical Kits", "Digital Courses", "Bundles"];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedType, setSelectedType] = useState("All Items");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
      const matchesType = selectedType === "All Items" ||
        (selectedType === "Physical Kits" && product.type === "hardware") ||
        (selectedType === "Digital Courses" && product.type === "course") ||
        (selectedType === "Bundles" && product.type === "bundle");
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedCategory, selectedType, priceRange, sortBy]);

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      type: product.type === "course" ? "course" : "product",
      inStock: product.inStock,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
                <span className="mr-1">⚡</span> NEW COLLECTION
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Equip the{" "}
                <span className="text-teal-500">Innovators</span> of Tomorrow
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Explore our curated selection of STEM kits, robotics gear, and
                learning modules designed to inspire creativity.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full" size="lg">
                  Browse Store
                </Button>
                <Button variant="outline" className="rounded-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Catalog
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
                  alt="STEM Kits"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">RoboThrone Ready Kits</h3>
                  <p className="text-sm opacity-90">Prepare for the 2025 competition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for kits, parts, or courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Recommended" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex rounded-lg border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-gray-100" : ""}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {typeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedType === type
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            <aside className="space-y-6">
              <div className="rounded-xl border bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Categories</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {categories.products.map((category) => (
                    <label key={category} className="flex cursor-pointer items-center gap-2">
                      <Checkbox
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4">
                <h3 className="font-semibold text-gray-900">Price Range</h3>
                <div className="mt-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                  <GraduationCap className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-semibold text-gray-900">School Bulk Orders?</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Get special discounts for educational institutions.
                </p>
                <Button variant="outline" className="mt-3 rounded-full text-teal-600 border-teal-600 hover:bg-teal-50">
                  Learn More
                </Button>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "aspect-[4/3]"}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute left-3 top-3 flex gap-2">
                        <Badge
                          className={`${
                            product.type === "hardware"
                              ? "bg-gray-800 text-white"
                              : "bg-teal-500 text-white"
                          }`}
                        >
                          {product.type === "hardware" ? "HARDWARE" : "COURSE"}
                        </Badge>
                        {product.badge && (
                          <Badge className="bg-red-500 text-white">
                            {product.badge.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                      <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className={`flex flex-1 flex-col p-4 ${viewMode === "list" ? "justify-between" : ""}`}>
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-2 flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            ({product.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className={`text-lg font-bold ${product.originalPrice ? "text-teal-600" : "text-gray-900"}`}>
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          size="icon"
                          className="h-10 w-10 rounded-full"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              )}

              <div className="mt-8 flex items-center justify-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  &lt;
                </Button>
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "default" : "outline"}
                    size="icon"
                    className={page === 1 ? "rounded-full" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <span className="px-2 text-gray-500">...</span>
                <Button variant="outline" size="icon">
                  8
                </Button>
                <Button variant="outline" size="icon">
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
