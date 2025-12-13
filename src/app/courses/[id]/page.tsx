"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { VideoPlayer } from "@/components/ui/video-player";
import { 
  BookOpen, 
  Star, 
  Clock, 
  Users, 
  Award, 
  PlayCircle,
  CheckCircle,
  Globe,
  Smartphone,
  Download,
  Share2,
  ShoppingCart,
  Loader2
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const [course] = useState(courseData[params.id as keyof typeof courseData] || courseData["1"]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [params.id]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?courseId=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!session) {
      toast.error("Please login to add items to cart");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setAddingToCart(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itemType: "course",
          itemId: parseInt(params.id),
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      toast.success("Course added to cart successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add course to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleEnrollNow = async () => {
    if (!session) {
      toast.error("Please login to enroll in courses");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setEnrolling(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: parseInt(params.id),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to enroll");
      }

      toast.success("Successfully enrolled in course!");
      router.push(`/dashboard/courses/${params.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to enroll in course");
    } finally {
      setEnrolling(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!session) {
      toast.error("Please login to submit a review");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: parseInt(params.id),
          rating,
          reviewText: reviewText.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.code === "NOT_ENROLLED") {
          toast.error("You must be enrolled in this course to leave a review");
        } else if (error.code === "DUPLICATE_REVIEW") {
          toast.error("You have already reviewed this course");
        } else {
          throw new Error(error.error || "Failed to submit review");
        }
        return;
      }

      toast.success("Review submitted successfully!");
      setRating(5);
      setReviewText("");
      fetchReviews();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : course.rating;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 via-background to-orange-50 py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-teal-600 text-white border-0">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
              
              <p className="text-lg text-muted-foreground">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
                  <span className="font-semibold">{averageRating}</span>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                  alt={course.instructor}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-muted-foreground">Created by</p>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:sticky lg:top-20 h-fit">
              <Card className="shadow-xl">
                <CardHeader>
                  <VideoPlayer
                    videoUrl={course.videoUrl}
                    thumbnailUrl={course.thumbnailUrl}
                    title={course.title}
                  />
                  <div className="flex items-baseline gap-2 pt-4">
                    <span className="text-4xl font-bold text-teal-600">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">${course.originalPrice}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700" 
                    size="lg"
                    onClick={handleEnrollNow}
                    disabled={enrolling || sessionLoading}
                  >
                    {enrolling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enrolling...
                      </>
                    ) : (
                      "Enroll Now"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-teal-600 text-teal-600 hover:bg-teal-50" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={addingToCart || sessionLoading}
                  >
                    {addingToCart ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600" />
                      <span>30-Day Money-Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-teal-600" />
                      <span>Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-teal-600" />
                      <span>Access on Mobile & Desktop</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-teal-600" />
                      <span>Certificate of Completion</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="flex-1">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="flex-1">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>What you'll learn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.learningPoints.map((point, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Description</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {course.fullDescription}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-teal-600 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="curriculum" className="space-y-4 mt-6">
                  {course.curriculum.map((section, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Section {index + 1}: {section.title}
                        </CardTitle>
                        <CardDescription>
                          {section.lessons} lessons • {section.duration}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {section.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
                              <PlayCircle className="h-4 w-4 text-teal-600" />
                              <span className="text-sm flex-1">{topic}</span>
                              <Clock className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${course.instructor}`}
                          alt={course.instructor}
                          className="h-20 w-20 rounded-full"
                        />
                        <div>
                          <CardTitle>{course.instructor}</CardTitle>
                          <CardDescription>{course.instructorTitle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-teal-600">4.8</p>
                          <p className="text-sm text-muted-foreground">Rating</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-teal-600">50K+</p>
                          <p className="text-sm text-muted-foreground">Students</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-teal-600">12</p>
                          <p className="text-sm text-muted-foreground">Courses</p>
                        </div>
                      </div>
                      <Separator />
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {course.instructorBio}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6 mt-6">
                  {/* Review Submission Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Write a Review</CardTitle>
                      <CardDescription>
                        Share your experience with this course
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  star <= rating
                                    ? "fill-orange-500 text-orange-500"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Your Review</label>
                        <Textarea
                          placeholder="Share your thoughts about this course..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <Button
                        onClick={handleSubmitReview}
                        disabled={submitting || !reviewText.trim()}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Review"
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Student Feedback */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Feedback</CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="text-5xl font-bold text-teal-600">{averageRating}</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-orange-500 text-orange-500" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {reviewsLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                        </div>
                      ) : reviews.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">
                          No reviews yet. Be the first to review this course!
                        </p>
                      ) : (
                        reviews.map((review) => (
                          <div key={review.id} className="border-b border-border pb-4 last:border-0">
                            <div className="flex items-start gap-3">
                              <img
                                src={review.user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.userId}`}
                                alt={review.user?.name || "Student"}
                                className="h-10 w-10 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{review.user?.name || "Student"}</span>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < review.rating
                                            ? "fill-orange-500 text-orange-500"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-sm">{review.reviewText}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lectures</span>
                    <span className="font-medium">{course.lectures}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium">English</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Certificate</span>
                    <Award className="h-5 w-5 text-teal-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Courses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((_, index) => (
                    <Link key={index} href={`/courses/${index + 10}`}>
                      <div className="flex gap-3 hover:bg-accent p-2 rounded-lg transition-colors">
                        <div className="w-20 h-14 bg-gradient-to-br from-teal-100 to-orange-100 rounded flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-6 w-6 text-teal-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2 mb-1">
                            Related Course Title {index + 1}
                          </p>
                          <p className="text-xs text-teal-600 font-bold">$49.99</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const courseData = {
  "1": {
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full-stack developer.",
    fullDescription: "This comprehensive web development bootcamp will take you from absolute beginner to job-ready full-stack developer. You'll learn modern web technologies including HTML5, CSS3, JavaScript ES6+, React, Node.js, Express, MongoDB, and much more. Through hands-on projects and real-world examples, you'll build a solid foundation and practical skills that employers are looking for.",
    category: "Web Development",
    level: "Beginner",
    rating: 4.8,
    reviews: "2,543",
    students: "12,500",
    duration: "40 hours",
    lectures: "245",
    price: 49.99,
    originalPrice: 89.99,
    instructor: "John Smith",
    instructorTitle: "Senior Full-Stack Developer",
    instructorBio: "John has over 10 years of experience in web development and has worked with companies like Google and Microsoft. He's passionate about teaching and has helped thousands of students launch their careers in tech.",
    learningPoints: [
      "Build responsive websites with HTML5 and CSS3",
      "Master JavaScript fundamentals and ES6+ features",
      "Create dynamic UIs with React and React Hooks",
      "Develop RESTful APIs with Node.js and Express",
      "Work with databases using MongoDB",
      "Deploy applications to production",
      "Implement authentication and authorization",
      "Build full-stack applications from scratch",
    ],
    requirements: [
      "No programming experience needed - we'll start from scratch",
      "A computer with internet connection",
      "Willingness to learn and practice coding",
    ],
    curriculum: [
      {
        title: "Introduction to Web Development",
        lessons: 12,
        duration: "2 hours",
        topics: ["Course Introduction", "Setting Up Your Environment", "HTML Basics", "CSS Fundamentals"],
      },
      {
        title: "JavaScript Fundamentals",
        lessons: 20,
        duration: "5 hours",
        topics: ["Variables and Data Types", "Functions", "Objects and Arrays", "DOM Manipulation"],
      },
      {
        title: "React Development",
        lessons: 25,
        duration: "8 hours",
        topics: ["Components and Props", "State and Lifecycle", "Hooks", "Building a React Project"],
      },
    ],
  },
};