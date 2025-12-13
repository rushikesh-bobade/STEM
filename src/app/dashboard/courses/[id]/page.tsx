"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, CheckCircle, Lock, FileText, Download, Clock, User } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Lesson {
  id: number;
  title: string;
  description: string | null;
  videoUrl: string | null;
  notes: string | null;
  attachments: any;
  durationMinutes: number | null;
  orderIndex: number;
  isFree: boolean;
  createdAt: string;
}

interface Module {
  id: number;
  title: string;
  description: string | null;
  orderIndex: number;
  createdAt: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  instructorId: string | null;
  category: string | null;
  level: string | null;
  price: number | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  durationHours: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  instructor: {
    id: string;
    name: string;
    email: string;
  } | null;
  modules: Module[];
}

interface LessonProgress {
  [lessonId: number]: {
    completed: boolean;
    lastPositionSeconds: number;
  };
}

export default function CoursePlayerPage() {
  const params = useParams();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress>({});
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course");
      }

      const data = await response.json();
      setCourse(data);
      
      // Fetch progress for all lessons
      if (data.modules && data.modules.length > 0) {
        const allLessons = data.modules.flatMap((m: Module) => m.lessons);
        for (const lesson of allLessons) {
          fetchLessonProgress(lesson.id);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const fetchLessonProgress = async (lessonId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/lessons/${lessonId}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLessonProgress((prev) => ({
          ...prev,
          [lessonId]: {
            completed: data.completed || false,
            lastPositionSeconds: data.lastPositionSeconds || 0,
          },
        }));
      }
    } catch (error) {
      console.error("Error fetching lesson progress:", error);
    }
  };

  const markLessonComplete = async (lessonId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/lessons/${lessonId}/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      const data = await response.json();
      setLessonProgress((prev) => ({
        ...prev,
        [lessonId]: {
          completed: true,
          lastPositionSeconds: data.lastPositionSeconds || 0,
        },
      }));
      toast.success("Lesson marked as complete!");
      
      // Refresh course to get updated progress
      fetchCourse();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update progress");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-medium mb-2">Course not found</p>
            <Link href="/dashboard/courses">
              <Button>Back to My Courses</Button>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = Object.values(lessonProgress).filter((p) => p.completed).length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Course Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Badge variant="secondary">{course.category}</Badge>
                <CardTitle className="text-3xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                {course.instructor && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{course.instructor.name}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="font-medium">
                  {completedLessons} / {totalLessons} lessons completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Course Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Curriculum Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {course.modules.length} modules • {totalLessons} lessons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`}>
                      <AccordionTrigger>{module.title}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => {
                            const progress = lessonProgress[lesson.id];
                            const isCompleted = progress?.completed || false;
                            
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => setSelectedLesson(lesson)}
                                className={`w-full text-left p-3 rounded-lg transition-colors ${
                                  selectedLesson?.id === lesson.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {isCompleted ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  ) : lesson.isFree ? (
                                    <PlayCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Lock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium line-clamp-2">
                                      {lesson.title}
                                    </p>
                                    {lesson.durationMinutes && (
                                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Clock className="h-3 w-3" />
                                        {lesson.durationMinutes} min
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Player */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedLesson.title}</CardTitle>
                  {selectedLesson.description && (
                    <CardDescription>{selectedLesson.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Video Player */}
                  {selectedLesson.videoUrl && (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <video
                        src={selectedLesson.videoUrl}
                        controls
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                  )}

                  {/* Lesson Notes */}
                  {selectedLesson.notes && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Lesson Notes
                      </h3>
                      <div className="prose prose-sm max-w-none bg-muted p-4 rounded-lg">
                        {selectedLesson.notes}
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  {selectedLesson.attachments && Array.isArray(selectedLesson.attachments) && selectedLesson.attachments.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Attachments
                      </h3>
                      <div className="space-y-2">
                        {selectedLesson.attachments.map((attachment: any, index: number) => (
                          <a
                            key={index}
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 bg-muted rounded-lg hover:bg-accent transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span className="text-sm">{attachment.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mark Complete Button */}
                  {!lessonProgress[selectedLesson.id]?.completed && (
                    <Button
                      onClick={() => markLessonComplete(selectedLesson.id)}
                      className="w-full"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Complete
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <PlayCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Select a lesson to start</p>
                  <p className="text-sm text-muted-foreground">
                    Choose a lesson from the curriculum on the left
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
