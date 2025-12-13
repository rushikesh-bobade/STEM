"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Calendar,
  Bell
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-accent/30">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="text-lg opacity-90">Ready to continue your learning journey?</p>
            </div>
            <Button variant="secondary" size="lg">
              Browse Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Courses Enrolled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">6</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  Completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">3</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">3</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Hours Learned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">48</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <Tabs defaultValue="courses" className="space-y-6">
            <TabsList>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="progress">Learning Progress</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
                <Link href="/courses">
                  <Button variant="outline">Browse All Courses</Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center relative">
                        <BookOpen className="h-12 w-12 text-primary" />
                        {course.progress === 100 && (
                          <Badge className="absolute top-2 right-2 bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary" className="w-fit">{course.category}</Badge>
                      <CardTitle className="line-clamp-2 mt-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-1">
                        {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{course.completed}/{course.totalLessons} lessons</span>
                        <span>{course.timeSpent} spent</span>
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button className="w-full">
                          {course.progress === 100 ? (
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
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Statistics</CardTitle>
                  <CardDescription>Your progress over the past month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-muted-foreground">67%</span>
                      </div>
                      <Progress value={67} />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm">This Week</span>
                        </div>
                        <p className="text-2xl font-bold">12.5 hours</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">This Month</span>
                        </div>
                        <p className="text-2xl font-bold">48 hours</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Award className="h-4 w-4" />
                          <span className="text-sm">Achievements</span>
                        </div>
                        <p className="text-2xl font-bold">7 earned</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{course.title}</span>
                          <span className="text-sm text-muted-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Certificates</CardTitle>
                  <CardDescription>Download and share your achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {certificates.map((cert, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <Award className="h-12 w-12 text-primary" />
                            <Badge variant="secondary">Verified</Badge>
                          </div>
                          <CardTitle className="text-lg">{cert.course}</CardTitle>
                          <CardDescription>Issued on {cert.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1">Download</Button>
                            <Button size="sm" variant="outline" className="flex-1">Share</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your learning history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

const enrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "John Smith",
    category: "Web Development",
    progress: 75,
    completed: 180,
    totalLessons: 245,
    timeSpent: "30h",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    instructor: "Sarah Johnson",
    category: "Data Science",
    progress: 45,
    completed: 90,
    totalLessons: 200,
    timeSpent: "15h",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Michael Chen",
    category: "Design",
    progress: 100,
    completed: 120,
    totalLessons: 120,
    timeSpent: "18h",
  },
];

const certificates = [
  {
    course: "UI/UX Design Masterclass",
    date: "November 15, 2024",
  },
  {
    course: "JavaScript Fundamentals",
    date: "October 28, 2024",
  },
  {
    course: "Python for Beginners",
    date: "September 12, 2024",
  },
];

const activities = [
  {
    icon: <CheckCircle className="h-5 w-5 text-primary" />,
    title: "Completed Lesson",
    description: "React Hooks - useState and useEffect",
    time: "2 hours ago",
  },
  {
    icon: <Award className="h-5 w-5 text-secondary" />,
    title: "Certificate Earned",
    description: "UI/UX Design Masterclass",
    time: "1 day ago",
  },
  {
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    title: "Started New Course",
    description: "Data Science & Machine Learning",
    time: "3 days ago",
  },
  {
    icon: <Bell className="h-5 w-5 text-primary" />,
    title: "Reminder",
    description: "Complete your Web Development course",
    time: "5 days ago",
  },
];
