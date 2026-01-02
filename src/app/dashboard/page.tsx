"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ShoppingBag,
  Award,
  Heart,
  Settings,
  LogOut,
  Play,
  Clock,
  CheckCircle,
  Download,
  FileText,
  Package,
  ChevronRight,
  Star,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coursesData, productsData } from "@/lib/data";

const enrolledCourses = [
  { ...coursesData[0], progress: 65, lastAccessed: "2 hours ago" },
  { ...coursesData[1], progress: 30, lastAccessed: "Yesterday" },
  { ...coursesData[2], progress: 100, lastAccessed: "1 week ago" },
];

const orders = [
  {
    id: "ORD-2024-001",
    date: "Dec 28, 2024",
    items: [productsData[0]],
    status: "Delivered",
    total: 49.99,
  },
  {
    id: "ORD-2024-002",
    date: "Dec 20, 2024",
    items: [productsData[1], productsData[6]],
    status: "Shipped",
    total: 114.98,
  },
];

const certificates = [
  { name: "Advanced Robotics & AI Integration", date: "Dec 15, 2024", id: "CERT-2024-001" },
  { name: "Python Programming Fundamentals", date: "Nov 20, 2024", id: "CERT-2024-002" },
];

const wishlistItems = [coursesData[3], coursesData[4], productsData[3]];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("courses");

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    memberSince: "January 2024",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-center">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="mx-auto h-20 w-20 rounded-full"
                />
                <h2 className="mt-4 text-lg font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="mt-1 text-xs text-gray-400">Member since {user.memberSince}</p>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-teal-600">{enrolledCourses.length}</div>
                  <div className="text-xs text-gray-500">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600">{certificates.length}</div>
                  <div className="text-xs text-gray-500">Certificates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600">{orders.length}</div>
                  <div className="text-xs text-gray-500">Orders</div>
                </div>
              </div>

              <nav className="mt-6 space-y-1 border-t pt-6">
                {[
                  { icon: BookOpen, label: "My Courses", value: "courses" },
                  { icon: ShoppingBag, label: "Orders", value: "orders" },
                  { icon: Award, label: "Certificates", value: "certificates" },
                  { icon: Heart, label: "Wishlist", value: "wishlist" },
                  { icon: Settings, label: "Settings", value: "settings" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setActiveTab(item.value)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      activeTab === item.value
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            {activeTab === "courses" && (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-gray-900">My Learning</h1>
                  <Link href="/courses" className="text-sm font-medium text-teal-600 hover:underline">
                    Browse More Courses
                  </Link>
                </div>

                <div className="grid gap-6">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
                      <div className="relative h-32 w-48 shrink-0 overflow-hidden rounded-lg">
                        <Image src={course.image} alt={course.name} fill className="object-cover" />
                        {course.progress === 100 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <CheckCircle className="h-10 w-10 text-green-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{course.name}</h3>
                              <p className="text-sm text-gray-500">{course.instructor.name}</p>
                            </div>
                            {course.progress === 100 ? (
                              <Badge className="bg-green-100 text-green-700">Completed</Badge>
                            ) : (
                              <Badge variant="outline">{course.progress}% Complete</Badge>
                            )}
                          </div>
                          <div className="mt-2">
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Last accessed {course.lastAccessed}
                            </span>
                          </div>
                          <Button asChild size="sm" className="rounded-full">
                            <Link href={`/learn/${course.slug}`}>
                              {course.progress === 100 ? "Review" : "Continue"}
                              <Play className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "orders" && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-xl border bg-white p-6 shadow-sm">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-semibold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {order.status}
                          </Badge>
                          <p className="mt-1 text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                              <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-3 border-t pt-4">
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Package className="mr-2 h-4 w-4" />
                          Track Order
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <FileText className="mr-2 h-4 w-4" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "certificates" && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
                <div className="grid gap-4 md:grid-cols-2">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="rounded-xl border bg-white p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                          <Award className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                          <p className="text-sm text-gray-500">Issued on {cert.date}</p>
                          <p className="text-xs text-gray-400">ID: {cert.id}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="rounded-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full">
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "wishlist" && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {wishlistItems.map((item: any) => (
                    <div key={item.id} className="rounded-xl border bg-white p-4 shadow-sm">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                          src={item.image || item.images?.[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <button className="absolute right-2 top-2 rounded-full bg-white p-2 shadow">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </button>
                      </div>
                      <h3 className="mt-3 font-semibold text-gray-900">{item.name}</h3>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">${item.price}</span>
                        <Button size="sm" className="rounded-full">Add to Cart</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "settings" && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                  <h2 className="font-semibold text-gray-900">Profile Information</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <Button className="mt-4 rounded-full">Edit Profile</Button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
