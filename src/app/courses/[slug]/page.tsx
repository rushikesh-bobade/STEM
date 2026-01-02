"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Play,
  Clock,
  BarChart3,
  BookOpen,
  Award,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Download,
  MessageCircle,
  Share2,
  Heart,
  ShoppingCart,
  Gift,
  Linkedin,
  Twitter,
  ThumbsUp,
  FileText,
  HelpCircle,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coursesData, reviews } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

  if (!resolvedParams) {
    params.then(setResolvedParams);
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const course = coursesData.find((c) => c.slug === resolvedParams.slug);

  if (!course) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: course.id,
      name: course.name,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      type: "course",
    });
  };

  const totalLessons = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  );

  const discountPercent = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>/</span>
                <Link href="/courses" className="hover:text-white">Courses</Link>
                <span>/</span>
                <span className="text-teal-400">{course.category}</span>
              </div>

              <Badge className="mt-4 bg-amber-500 text-white hover:bg-amber-500">
                <Star className="mr-1 h-3 w-3" /> INDIA'S PREMIER ROBOTICS COURSE
              </Badge>

              <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                {course.name.split("&")[0]}
                {course.name.includes("&") && (
                  <span className="text-teal-400">
                    & {course.name.split("&")[1]}
                  </span>
                )}
              </h1>

              <p className="mt-4 text-lg text-gray-300">{course.description}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-amber-400">{course.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(course.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-600 text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{course.studentsEnrolled.toLocaleString()} students</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-gray-300">
                  Created by{" "}
                  <span className="text-teal-400 hover:underline cursor-pointer">
                    {course.instructor.name}
                  </span>
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Last updated {course.lastUpdated}
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {course.language}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 lg:hidden">
                <Button size="lg" className="rounded-full" onClick={handleAddToCart}>
                  Enroll Now
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white text-white">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Trailer
                </Button>
              </div>

              <div className="mt-6 flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-gray-800 bg-gradient-to-br from-teal-400 to-teal-600"
                  />
                ))}
                <div className="flex h-8 items-center pl-4 text-sm text-gray-400">
                  <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                  4.9 (500 reviews)
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={course.image}
                  alt={course.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-teal-600 shadow-lg transition hover:bg-white hover:scale-110">
                    <Play className="h-8 w-8 fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 rounded-lg bg-gray-900/80 p-3 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    SYSTEM ACTIVE
                    <span className="ml-2 text-gray-400">v2.4.9</span>
                  </div>
                  <code className="mt-2 block font-mono text-xs text-teal-400">
                    function initBot() {"{"}
                    <br />
                    &nbsp;&nbsp;await sensors.calibrate();
                    <br />
                    &nbsp;&nbsp;return true;
                    <br />
                    {"}"}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center rounded-xl border p-4 text-center">
              <Clock className="h-6 w-6 text-teal-600" />
              <span className="mt-2 text-xl font-bold text-gray-900">{course.duration}</span>
              <span className="text-sm text-gray-500">Duration</span>
            </div>
            <div className="flex flex-col items-center rounded-xl border p-4 text-center">
              <BarChart3 className="h-6 w-6 text-teal-600" />
              <span className="mt-2 text-xl font-bold text-gray-900 capitalize">{course.level}</span>
              <span className="text-sm text-gray-500">Level</span>
            </div>
            <div className="flex flex-col items-center rounded-xl border p-4 text-center">
              <BookOpen className="h-6 w-6 text-teal-600" />
              <span className="mt-2 text-xl font-bold text-gray-900">{course.totalLectures} Lectures</span>
              <span className="text-sm text-gray-500">Content</span>
            </div>
            <div className="flex flex-col items-center rounded-xl border p-4 text-center">
              <Award className="h-6 w-6 text-teal-600" />
              <span className="mt-2 text-xl font-bold text-gray-900">Included</span>
              <span className="text-sm text-gray-500">Certificate</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">What You'll Learn</h2>
                <p className="mt-2 text-gray-600">
                  Gain comprehensive knowledge in robotics and AI through hands-on projects and expert-led curriculum.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {course.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-3 rounded-xl border bg-white p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100">
                        <Check className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {outcome.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {outcome.split(" ").slice(2).join(" ")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Curriculum Breakdown</h2>
                    <p className="text-gray-600">Structured learning path for maximum retention</p>
                  </div>
                  <span className="text-sm text-teal-600">
                    {course.modules.length} Modules • {totalLessons} Lectures
                  </span>
                </div>

                <Accordion type="single" collapsible className="mt-6 space-y-4">
                  {course.modules.map((module, modIndex) => (
                    <AccordionItem
                      key={module.id}
                      value={module.id}
                      className="rounded-xl border bg-white px-4 shadow-sm"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 font-bold">
                            {String(modIndex + 1).padStart(2, "0")}
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">{module.title}</h3>
                            <p className="text-sm text-gray-500">
                              {module.lessons.length} lectures • {module.duration}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-2 pl-14">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.type === "video" && <PlayCircle className="h-4 w-4 text-gray-400" />}
                                {lesson.type === "quiz" && <HelpCircle className="h-4 w-4 text-gray-400" />}
                                {lesson.type === "assignment" && <FileText className="h-4 w-4 text-gray-400" />}
                                <span className="text-gray-700">{lesson.title}</span>
                                {lesson.isPreview && (
                                  <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">Preview</Badge>
                                )}
                              </div>
                              <span className="text-sm text-gray-500">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="rounded-2xl border bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900">Meet Your Instructor</h2>
                <div className="mt-6 flex gap-6">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{course.instructor.name}</h3>
                    <p className="text-sm text-teal-600">{course.instructor.title} AT {course.instructor.company}</p>
                    <p className="mt-3 text-gray-600">{course.instructor.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        {course.instructor.students.toLocaleString()}+ Students
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen className="h-4 w-4" />
                        {course.instructor.courses} Courses
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {course.instructor.rating} Rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Feedback</h2>
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white">
                    <div className="text-5xl font-bold">{course.rating}</div>
                    <div className="mt-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-white text-white" />
                      ))}
                    </div>
                    <p className="mt-2 text-teal-100">Course Rating</p>
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                    {reviews.slice(0, 2).map((review) => (
                      <div key={review.id} className="rounded-xl border bg-white p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <Image
                              src={review.userAvatar || "/placeholder.png"}
                              alt={review.userName}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900">{review.userName}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < review.rating
                                          ? "fill-amber-400 text-amber-400"
                                          : "fill-gray-200 text-gray-200"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                    <Link
                      href="#"
                      className="block text-center text-sm font-medium text-teal-600 hover:underline"
                    >
                      View All {course.reviewCount} Reviews
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border bg-white p-6 shadow-lg">
                  {course.badge && (
                    <Badge className="mb-4 bg-amber-500 text-white hover:bg-amber-500">
                      {course.badge.charAt(0).toUpperCase() + course.badge.slice(1)}
                    </Badge>
                  )}
                  <div className="mb-2 text-sm text-gray-500">Total Course Fee</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                    )}
                  </div>
                  {discountPercent > 0 && (
                    <p className="mt-1 text-sm text-teal-600">
                      <span className="text-red-500">🔥 {discountPercent}% off</span> - 3 days left at this price!
                    </p>
                  )}

                  <Button className="mt-4 w-full rounded-full" size="lg" onClick={handleAddToCart}>
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="mt-2 w-full rounded-full" size="lg">
                    <Gift className="mr-2 h-4 w-4" />
                    Gift this Course
                  </Button>

                  <div className="mt-6 space-y-3">
                    <h4 className="text-sm font-medium text-gray-900 uppercase">This Course Includes:</h4>
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-teal-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 p-6 text-white">
                  <h3 className="font-semibold">Training 5 or more people?</h3>
                  <p className="mt-2 text-sm text-teal-100">
                    Get your team access to top 2,000+ courses anytime, anywhere.
                  </p>
                  <Button variant="outline" className="mt-4 rounded-full border-white text-white hover:bg-white/10">
                    Get Business Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
