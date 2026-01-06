"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Grid3X3, List, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { courses, categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);
      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.includes(course.level);
      const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
      const matchesPrice = course.price >= minPrice && course.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [searchQuery, selectedCategories, selectedLevels, priceRange]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelToggle = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level.toLowerCase())
        ? prev.filter((l) => l !== level.toLowerCase())
        : [...prev, level.toLowerCase()]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceRange({ min: "", max: "" });
  };

  const handleAddToCart = (course: typeof courses[0]) => {
    addItem({
      id: course.id,
      name: course.name,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      type: "course",
    });
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "bestseller":
        return "bg-amber-500 text-white";
      case "new":
        return "bg-teal-500 text-white";
      case "sale":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
            LEARN & INNOVATE
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Course <span className="text-teal-500">Catalog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Discover our comprehensive range of STEM courses designed to equip
            students with future-ready skills in robotics, coding, and AI.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1 px-3 py-2 text-sm ${
                    viewMode === "grid" ? "bg-gray-100" : ""
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center gap-1 px-3 py-2 text-sm ${
                    viewMode === "list" ? "bg-gray-100" : ""
                  }`}
                >
                  <List className="h-4 w-4" />
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            <aside className="space-y-6">
              <div className="rounded-xl border bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-teal-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4">
                <h3 className="mb-4 font-semibold text-gray-900">CATEGORIES</h3>
                <div className="space-y-3">
                  {categories.courses.map((category) => (
                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4">
                <h3 className="mb-4 font-semibold text-gray-900">LEVEL</h3>
                <div className="space-y-3">
                  {categories.levels.map((level) => (
                    <label
                      key={level}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Checkbox
                        checked={selectedLevels.includes(level.toLowerCase())}
                        onCheckedChange={() => handleLevelToggle(level)}
                      />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border bg-white p-4">
                <h3 className="mb-4 font-semibold text-gray-900">PRICE</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="0"
                      className="pl-7 w-24"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                      }
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="500"
                      className="pl-7 w-24"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`group overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div
                      className={`relative ${
                        viewMode === "list" ? "w-48 shrink-0" : "aspect-4/3"
                      }`}
                    >
                      <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                      {course.badge && (
                        <Badge
                          className={`absolute left-3 top-3 ${getBadgeColor(
                            course.badge
                          )}`}
                        >
                          {course.badge.charAt(0).toUpperCase() + course.badge.slice(1)}
                        </Badge>
                      )}
                      <button
                        title="Add to favorites"
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div
                      className={`flex flex-1 flex-col p-4 ${
                        viewMode === "list" ? "justify-between" : ""
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium uppercase text-teal-600">
                            {course.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-gray-600">
                              {course.rating}
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-2 font-semibold text-gray-900 line-clamp-2">
                          {course.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {course.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-500">Total Price</span>
                          <div className="flex items-center gap-2">
                            {course.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ${course.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span
                              className={`text-lg font-bold ${
                                course.originalPrice ? "text-teal-600" : "text-gray-900"
                              }`}
                            >
                              ${course.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          className="h-10 w-10 rounded-full"
                          onClick={() => handleAddToCart(course)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-gray-500">
                    No courses found matching your criteria.
                  </p>
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
