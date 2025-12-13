"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Cpu, Microscope, Rocket, Star, TrendingUp, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Fetch reviews from multiple courses
      const courseIds = [1, 2, 3];
      const allReviews: any[] = [];
      
      for (const courseId of courseIds) {
        const response = await fetch(`/api/reviews?courseId=${courseId}&limit=3`);
        if (response.ok) {
          const data = await response.json();
          allReviews.push(...data);
        }
      }
      
      // Get random 3 reviews
      const shuffled = allReviews.sort(() => 0.5 - Math.random());
      setReviews(shuffled.slice(0, 3));
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-orange-50 to-teal-50 py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 border-0 text-sm px-5 py-1.5 inline-flex items-center gap-2">
                <span>🚀</span>
                <span>Inspiring STEM Success</span>
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-gray-900">
                  Transform Your Future with{" "}
                  <span className="text-teal-600 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                    STEM
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-gray-700 font-medium leading-relaxed">
                  Master Robotics, AI & Coding in Just 6 Weeks
                </p>
              </div>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-teal-600 mt-2 flex-shrink-0"></div>
                  <span className="text-base sm:text-lg leading-relaxed">
                    Live & Interactive online sessions with expert mentors
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-teal-600 mt-2 flex-shrink-0"></div>
                  <span className="text-base sm:text-lg leading-relaxed">
                    Hands-on Projects: Build real robots and AI models
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-teal-600 mt-2 flex-shrink-0"></div>
                  <span className="text-base sm:text-lg leading-relaxed">
                    Earn a Professional Certificate to boost your profile
                  </span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/courses" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    VIEW YOUR FREE CLASS NOW
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full px-8 py-6 text-base font-semibold transition-all">
                    Request Callback
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 border-4 border-white shadow-md"
                    ></div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Join 50,000+ Students</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Already learning with us</p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative lg:pl-8">
              <div className="relative bg-gradient-to-br from-teal-100 to-orange-100 rounded-3xl p-6 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=500&fit=crop"
                  alt="Students learning STEM"
                  width={600}
                  height={500}
                  className="rounded-2xl shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: Users, value: "50,000+", label: "Active Students" },
              { icon: BookOpen, value: "200+", label: "Online Courses" },
              { icon: Award, value: "15K+", label: "Certificates Issued" },
              { icon: TrendingUp, value: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <stat.icon className="h-10 w-10 mx-auto opacity-90" strokeWidth={1.5} />
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm md:text-base opacity-90 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEM Education Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-teal-100 text-teal-700 border-0 px-4 py-1.5 text-sm font-medium">
              🔬 For Students
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              STEM Education
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore cutting-edge technology education designed for the future
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stemCategories.map((category, index) => (
              <Card 
                key={index} 
                className="hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-200 hover:-translate-y-1"
              >
                <CardHeader className="text-center space-y-6 py-10">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto shadow-lg">
                    {category.icon}
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="text-2xl text-gray-900 font-bold">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed px-4">
                      {category.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Educational Institutions */}
      <section className="py-24 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <Badge className="bg-orange-100 text-orange-600 border-0 px-4 py-1.5 text-sm font-medium">
              🏫 For Institutions
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
              What do we do for Educational Institutions
            </h2>
          </div>

          <div className="space-y-24 max-w-7xl mx-auto">
            {/* STEM Lab */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <Badge className="bg-orange-100 text-orange-600 border-0 px-4 py-1.5 text-sm font-medium">
                  Educational Setup
                </Badge>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  STEM Lab
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  TechyGuide makes you modern and futuristic an atmosphere of learning, at doing with our solution based system-based modules. Together with our hands-on, project based curriculum and STEM-focused learning tools our innovative technologies.
                </p>
                <Link href="/ai-lab">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all mt-2">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-teal-100 to-orange-100 rounded-3xl p-6 h-96 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop"
                    alt="STEM Lab"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover h-full w-full shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* ATL Lab */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-teal-100 to-orange-100 rounded-3xl p-6 h-96 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop"
                    alt="ATL Lab"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover h-full w-full shadow-lg"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <Badge className="bg-orange-100 text-orange-600 border-0 px-4 py-1.5 text-sm font-medium">
                  Innovation Center
                </Badge>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  ATL Lab
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We run a tech-enhanced center for ATL packages designed to spark young minds. Our integrated lab comes equipped with innovative state-of-the-art tools and resources along with expert guidance to inspire your next generation of innovators.
                </p>
                <Link href="/ai-lab">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all mt-2">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Workshops */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-6">
                <Badge className="bg-orange-100 text-orange-600 border-0 px-4 py-1.5 text-sm font-medium">
                  🎓 Interactive Learning
                </Badge>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  STEM Workshops & Tinkerfest
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We conduct a unique hands-on workshops & competitions to make STEM education more engaging for all institutions and students. From robotics to AI, we bring cutting-edge technology education to your students.
                </p>
                <Link href="/workshops">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all mt-2">
                    Book a Workshop
                  </Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-teal-100 to-orange-100 rounded-3xl p-6 h-96 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                    alt="Workshops"
                    width={600}
                    height={400}
                    className="rounded-2xl object-cover h-full w-full shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              What They Say About Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real feedback from our students and educators
            </p>
          </div>

          {reviewsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id} className="border-2 border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="space-y-6 p-8">
                      <div className="flex items-center gap-4">
                        <img
                          src={review.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userId}`}
                          alt={review.user?.name || "Student"}
                          className="h-14 w-14 rounded-full border-2 border-teal-200"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            {review.user?.name || "Student"}
                          </p>
                          <p className="text-sm text-gray-600">Student</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? "fill-orange-500 text-orange-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed line-clamp-4">
                        {review.reviewText}
                      </p>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-2 border-gray-100 hover:border-teal-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="space-y-6 p-8">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-500 to-orange-500 border-2 border-white shadow-md"></div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {testimonial.content}
                      </p>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button variant="outline" className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full px-8 py-6 text-base font-semibold transition-all shadow-sm hover:shadow-md">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Start Learning?
            </h2>
            <p className="text-lg sm:text-xl opacity-90 leading-relaxed">
              Join thousands of students already learning on TechyGuide. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-semibold transition-all">
                  Call: +91 91140 36376
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const stemCategories = [
  {
    icon: <Cpu className="h-8 w-8 text-white" />,
    title: "Robotics",
    description: "Learn to build and program robots with hands-on projects",
  },
  {
    icon: <Microscope className="h-8 w-8 text-white" />,
    title: "Maker",
    description: "Create innovative projects using electronics and design",
  },
  {
    icon: <Rocket className="h-8 w-8 text-white" />,
    title: "Innovator",
    description: "Develop problem-solving skills through STEM challenges",
  },
];

const testimonials = [
  {
    name: "PRITI GIRI",
    role: "Parent",
    content: "TechyGuide has transformed the way my child learns. The instructors are amazing and the curriculum is top-notch. Highly recommend!",
  },
  {
    name: "KAY WOLCURE",
    role: "Educator",
    content: "The ATL setup by TechyGuide is phenomenal. Tools, training, and support—everything was beyond our expectations. Great team to work with.",
  },
  {
    name: "SHARON N.",
    role: "Student",
    content: "I love learning robotics and coding with TechyGuide. The projects are fun and I've learned so much. The teachers are very helpful!",
  },
];