"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, CheckCircle, Clock, AlertCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Assignment {
  id: number;
  lessonId: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  maxScore: number | null;
  createdAt: string;
  lesson: {
    id: number;
    title: string;
    moduleId: number;
  };
  module: {
    id: number;
    courseId: number;
  };
  course: {
    id: number;
    title: string;
  };
}

interface Submission {
  id: number;
  assignmentId: number;
  userId: string;
  fileUrl: string | null;
  notes: string | null;
  score: number | null;
  feedback: string | null;
  status: string;
  submittedAt: string;
  gradedAt: string | null;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<{ [key: number]: Submission }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/assignments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch assignments");
      }

      const data = await response.json();
      setAssignments(data);

      // Fetch submissions for each assignment
      for (const assignment of data) {
        fetchSubmission(assignment.id);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmission = async (assignmentId: number) => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/assignments/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.submissions && data.submissions.length > 0) {
          setSubmissions((prev) => ({
            ...prev,
            [assignmentId]: data.submissions[0],
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching submission:", error);
    }
  };

  const handleSubmit = async (assignmentId: number) => {
    if (!fileUrl.trim()) {
      toast.error("Please enter a file URL");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/assignments/${assignmentId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileUrl: fileUrl.trim(),
          notes: notes.trim() || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit assignment");
      }

      const data = await response.json();
      setSubmissions((prev) => ({
        ...prev,
        [assignmentId]: data,
      }));

      toast.success("Assignment submitted successfully!");
      setSelectedAssignment(null);
      setFileUrl("");
      setNotes("");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to submit assignment");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending Review
          </Badge>
        );
      case "graded":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Graded
          </Badge>
        );
      case "resubmit":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Needs Resubmission
          </Badge>
        );
      default:
        return null;
    }
  };

  const pendingAssignments = assignments.filter(
    (a) => !submissions[a.id] || submissions[a.id].status === "resubmit"
  );
  const submittedAssignments = assignments.filter(
    (a) => submissions[a.id] && submissions[a.id].status === "pending"
  );
  const gradedAssignments = assignments.filter(
    (a) => submissions[a.id] && submissions[a.id].status === "graded"
  );

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
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">
            Submit your assignments and track your progress
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({submittedAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded ({gradedAssignments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No pending assignments</p>
                  <p className="text-sm text-muted-foreground">
                    Great job! You're all caught up.
                  </p>
                </CardContent>
              </Card>
            ) : (
              pendingAssignments.map((assignment) => {
                const submission = submissions[assignment.id];
                const isOverdue = assignment.dueDate && new Date(assignment.dueDate) < new Date();

                return (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>
                            {assignment.course.title} • {assignment.lesson.title}
                          </CardDescription>
                        </div>
                        {isOverdue && (
                          <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {assignment.description && (
                        <p className="text-sm text-muted-foreground">
                          {assignment.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {assignment.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due: {format(new Date(assignment.dueDate), "MMM d, yyyy")}
                          </div>
                        )}
                        {assignment.maxScore && (
                          <div>Max Score: {assignment.maxScore} points</div>
                        )}
                      </div>

                      {submission?.status === "resubmit" && submission.feedback && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <p className="text-sm font-medium text-destructive mb-1">
                            Feedback from Instructor:
                          </p>
                          <p className="text-sm">{submission.feedback}</p>
                        </div>
                      )}

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full"
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setFileUrl(submission?.fileUrl || "");
                              setNotes(submission?.notes || "");
                            }}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            {submission ? "Resubmit Assignment" : "Submit Assignment"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Assignment</DialogTitle>
                            <DialogDescription>
                              {assignment.title}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="fileUrl">File URL *</Label>
                              <Input
                                id="fileUrl"
                                placeholder="https://drive.google.com/..."
                                value={fileUrl}
                                onChange={(e) => setFileUrl(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">
                                Upload your file to Google Drive or similar and paste the link
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Add any notes or comments..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <Button
                              onClick={() => handleSubmit(assignment.id)}
                              disabled={submitting || !fileUrl.trim()}
                              className="w-full"
                            >
                              {submitting ? "Submitting..." : "Submit Assignment"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No submitted assignments</p>
                  <p className="text-sm text-muted-foreground">
                    Assignments awaiting review will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              submittedAssignments.map((assignment) => {
                const submission = submissions[assignment.id];

                return (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>
                            {assignment.course.title} • {assignment.lesson.title}
                          </CardDescription>
                        </div>
                        {getStatusBadge(submission.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Your Submission:</p>
                        <a
                          href={submission.fileUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Submitted File
                        </a>
                        {submission.notes && (
                          <p className="text-sm text-muted-foreground">
                            Notes: {submission.notes}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Submitted: {format(new Date(submission.submittedAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="graded" className="space-y-4">
            {gradedAssignments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">No graded assignments</p>
                  <p className="text-sm text-muted-foreground">
                    Graded assignments will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              gradedAssignments.map((assignment) => {
                const submission = submissions[assignment.id];

                return (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>
                            {assignment.course.title} • {assignment.lesson.title}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(submission.status)}
                          <p className="text-2xl font-bold text-primary mt-2">
                            {submission.score || 0}/{assignment.maxScore || 100}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {submission.feedback && (
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm font-medium mb-1">
                            Feedback from Instructor:
                          </p>
                          <p className="text-sm">{submission.feedback}</p>
                        </div>
                      )}
                      <div className="space-y-2">
                        <a
                          href={submission.fileUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Submitted File
                        </a>
                        <p className="text-xs text-muted-foreground">
                          Graded: {submission.gradedAt && format(new Date(submission.gradedAt), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
