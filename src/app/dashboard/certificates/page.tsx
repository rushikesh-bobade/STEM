"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Certificate {
  id: number;
  certificateCode: string;
  issuedAt: string;
  verificationUrl: string | null;
  course: {
    id: number;
    title: string;
    instructorId: string | null;
  };
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/certificates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch certificates");
      }

      const data = await response.json();
      setCertificates(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (certificate: Certificate) => {
    // In a real application, this would generate and download the certificate PDF
    toast.success("Certificate download started");
    console.log("Downloading certificate:", certificate.certificateCode);
  };

  const handleShare = (certificate: Certificate) => {
    const shareUrl = certificate.verificationUrl || `${window.location.origin}/verify/${certificate.certificateCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Certificate - ${certificate.course.title}`,
        text: `Check out my certificate for completing ${certificate.course.title}!`,
        url: shareUrl,
      }).catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Verification link copied to clipboard!");
    }
  };

  const handleVerify = (certificate: Certificate) => {
    const verifyUrl = certificate.verificationUrl || `/api/certificates/verify/${certificate.certificateCode}`;
    window.open(verifyUrl, "_blank");
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-muted-foreground">
            Download and share your course completion certificates
          </p>
        </div>

        {certificates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Award className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No certificates yet</p>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Complete courses to earn certificates and showcase your achievements
              </p>
              <Button asChild>
                <a href="/dashboard/courses">Continue Learning</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-bl-full" />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Award className="h-12 w-12 text-primary flex-shrink-0" />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">
                    {certificate.course.title}
                  </CardTitle>
                  <CardDescription>
                    Certificate of Completion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Issued:</span>
                      <span className="font-medium">
                        {format(new Date(certificate.issuedAt), "MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Certificate ID:</span>
                      <span className="font-mono text-xs">
                        {certificate.certificateCode}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleDownload(certificate)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare(certificate)}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerify(certificate)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {certificates.length > 0 && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">About Certificates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                • All certificates are digitally signed and verified
              </p>
              <p>
                • Share your certificates on LinkedIn and other professional networks
              </p>
              <p>
                • Employers can verify your certificates using the verification link
              </p>
              <p>
                • Certificates never expire and remain valid indefinitely
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
