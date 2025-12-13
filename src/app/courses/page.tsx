"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Star, Clock, Search, Users, Award, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-teal-100 text-teal-700 border-0">
              📚 Live Interactive Courses
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Learn from Experts
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Master STEM skills with 12 expert-led courses - Learn by doing with real projects
            </p>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses, topics, or instructors..."
                className="pl-12 h-14 text-lg border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-teal-600" />
                <span className="text-gray-600">10,000+ Active Learners</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-teal-600" />
                <span className="text-gray-600">Certificate on Completion</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-orange-400 fill-orange-400" />
                <span className="text-gray-600">4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Badge 
              className={`cursor-pointer px-4 py-2 ${selectedCategory === "all" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border-2"}`}
              onClick={() => setSelectedCategory("all")}
            >
              All Courses
            </Badge>
            <Badge 
              className={`cursor-pointer px-4 py-2 ${selectedCategory === "Robotics" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border-2"}`}
              onClick={() => setSelectedCategory("Robotics")}
            >
              Robotics
            </Badge>
            <Badge 
              className={`cursor-pointer px-4 py-2 ${selectedCategory === "IoT" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border-2"}`}
              onClick={() => setSelectedCategory("IoT")}
            >
              IoT
            </Badge>
            <Badge 
              className={`cursor-pointer px-4 py-2 ${selectedCategory === "AI" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border-2"}`}
              onClick={() => setSelectedCategory("AI")}
            >
              AI
            </Badge>
            <Badge 
              className={`cursor-pointer px-4 py-2 ${selectedCategory === "Programming" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border-2"}`}
              onClick={() => setSelectedCategory("Programming")}
            >
              Programming
            </Badge>
            <Badge 
              className={`cursor-pointer px-4 py-2 ${selectedCategory === "3D Printing" ? "bg-teal-600 text-white" : "bg-white text-gray-700 border-2"}`}
              onClick={() => setSelectedCategory("3D Printing")}
            >
              3D Printing
            </Badge>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
            </p>
            <Select defaultValue="popular">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="students">Most Students</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-xl transition-all border-2 group">
                <CardHeader className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-teal-100 to-orange-100 rounded-t-lg overflow-hidden relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                    {course.badge && (
                      <Badge className="absolute top-3 left-3 bg-orange-500 text-white border-0">
                        {course.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">{course.category}</Badge>
                    {course.level && (
                      <Badge variant="outline" className="text-xs">{course.level}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2 mb-3">
                    {course.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({course.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-teal-600">₹{course.price}</p>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
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
            Transform Your Career with STEM Education
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers through our expert-led courses
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8">
                Get Free Counseling
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

const allCourses = [
  {
    id: 1,
    title: "Python Programming Masterclass",
    description: "Learn Python from scratch with hands-on projects and real-world applications",
    category: "Programming",
    level: "Beginner",
    rating: 4.7,
    reviews: "1889",
    students: "3,980+",
    duration: "9 Weeks",
    price: "3,499",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Robotics for Kids (Age 8-12)",
    description: "Complete robotics course designed specifically for young learners with fun projects",
    category: "Robotics",
    level: "Beginner",
    rating: 4.9,
    reviews: "3400",
    students: "12,340+",
    duration: "15 Weeks",
    price: "2,999",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    title: "Web Development with React & Next.js",
    description: "Build modern web stack with JavaScript, React and Next.js from scratch",
    category: "Programming",
    level: "Intermediate",
    rating: 4.8,
    reviews: "2342",
    students: "1,399+",
    duration: "12 Weeks",
    price: "6,499",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    title: "Robot Programming with Python",
    description: "Program robots using Python with advanced AI and machine learning concepts",
    category: "Robotics",
    level: "Intermediate",
    rating: 4.7,
    reviews: "366",
    students: "1,358+",
    duration: "10 Weeks",
    price: "5,499",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=225&fit=crop",
  },
  {
    id: 5,
    title: "Artificial Intelligence for Beginners",
    description: "Introduction to AI, machine learning, and neural networks with practical projects",
    category: "AI",
    level: "Beginner",
    rating: 4.8,
    reviews: "7428",
    students: "2,938+",
    duration: "10 Weeks",
    price: "9,999",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop",
  },
  {
    id: 6,
    title: "Computer Vision & Image Processing",
    description: "Build AI applications that see with hands-on image recognition and processing",
    category: "AI",
    level: "Advanced",
    rating: 4.7,
    reviews: "1523",
    students: "1,249+",
    duration: "12 Weeks",
    price: "7,999",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&h=225&fit=crop",
  },
  {
    id: 7,
    title: "IoT Fundamentals & Smart Devices",
    description: "Build connected devices and learn Internet of Things concepts from scratch",
    category: "IoT",
    level: "Beginner",
    rating: 4.8,
    reviews: "881",
    students: "1,030+",
    duration: "8 Weeks",
    price: "4,499",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=225&fit=crop",
  },
  {
    id: 8,
    title: "Advanced IoT with ESP32 & Arduino",
    description: "Master IoT development with ESP32 programming and cloud connectivity",
    category: "IoT",
    level: "Intermediate",
    rating: 4.6,
    reviews: "967",
    students: "83k+",
    duration: "10 Weeks",
    price: "5,999",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=225&fit=crop",
  },
  {
    id: 9,
    title: "3D Printing & Design Basics",
    description: "Customizable 3D printed robot chassis with motor mounts and modular design",
    category: "3D Printing",
    level: "Beginner",
    rating: 4.5,
    reviews: "1523",
    students: "833+",
    duration: "6 Weeks",
    price: "1,499",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=225&fit=crop",
  },
  {
    id: 10,
    title: "C++ for Competitive Programming",
    description: "Master algorithms and data structures for coding competitions and interviews",
    category: "Programming",
    level: "Intermediate",
    rating: 4.6,
    reviews: "1667",
    students: "1,987+",
    duration: "14 Weeks",
    price: "4,999",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
  },
  {
    id: 11,
    title: "Advanced Robotics Engineering",
    description: "High-level robotics with kinematics, dynamics, and control theory",
    category: "Robotics",
    level: "Advanced",
    rating: 4.9,
    reviews: "534",
    students: "423+",
    duration: "16 Weeks",
    price: "12,999",
    image: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=400&h=225&fit=crop",
  },
  {
    id: 12,
    title: "3D Printing for Prototyping",
    description: "Learn rapid prototyping techniques using 3D printing for product development",
    category: "3D Printing",
    level: "Intermediate",
    rating: 4.7,
    reviews: "234",
    students: "312+",
    duration: "8 Weeks",
    price: "3,999",
    image: "https://images.unsplash.com/photo-1581093458791-9d42e2e0d46c?w=400&h=225&fit=crop",
  },
];