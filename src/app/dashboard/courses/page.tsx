"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, PlayCircle, CheckCircle, Clock, Search, Filter } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Course {
  id: number;
  enrolledAt: string;
  completedAt: string | null;
  progressPercentage: number;
  lastAccessedLessonId: number | null;
  course: {
    id: number;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    instructorId: string | null;
    durationHours: number | null;
  };
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState("all");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/enrollments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((enrollment) => {
    const matchesSearch = enrollment.course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (filterTab === "all") return matchesSearch;
    if (filterTab === "active")
      return matchesSearch && !enrollment.completedAt;
    if (filterTab === "completed")
      return matchesSearch && enrollment.completedAt;

    return matchesSearch;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground">
              Track your learning progress and continue where you left off
            </p>
          </div>
          <Link href="/courses">
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Courses
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={filterTab} onValueChange={setFilterTab}>
          <TabsList>
            <TabsTrigger value="all">
              All Courses ({courses.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              In Progress ({courses.filter((c) => !c.completedAt).length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({courses.filter((c) => c.completedAt).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filterTab} className="space-y-6">
            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No courses found</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Enroll in courses to start learning"}
                  </p>
                  {!searchTerm && (
                    <Link href="/courses">
                      <Button>Browse Courses</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((enrollment) => (
                  <Card
                    key={enrollment.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center relative">
                        {enrollment.course.thumbnailUrl ? (
                          <img
                            src={enrollment.course.thumbnailUrl}
                            alt={enrollment.course.title}
                            className="rounded-lg object-cover w-full h-full"
                          />
                        ) : (
                          <BookOpen className="h-12 w-12 text-primary" />
                        )}
                        {enrollment.completedAt && (
                          <Badge className="absolute top-2 right-2 bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">
                        {enrollment.course.title}
                      </CardTitle>
                      {enrollment.course.durationHours && (
                        <CardDescription className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {enrollment.course.durationHours} hours
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {enrollment.progressPercentage}%
                          </span>
                        </div>
                        <Progress value={enrollment.progressPercentage} />
                      </div>
                      <Link href={`/dashboard/courses/${enrollment.course.id}`}>
                        <Button className="w-full">
                          {enrollment.progressPercentage === 100 ? (
                            <>Review Course</>
                          ) : (
                            <>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Continue Learning
                            </>
                          )}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
