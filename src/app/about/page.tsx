import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Award, TrendingUp, Target, Heart, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Learners Worldwide
            </h1>
            <p className="text-lg text-muted-foreground">
              TechyGuide is on a mission to make quality education accessible to everyone, everywhere. 
              We believe in the power of learning to transform lives and create opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">50,000+</p>
              <p className="text-sm opacity-90">Active Students</p>
            </div>
            <div className="text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">200+</p>
              <p className="text-sm opacity-90">Online Courses</p>
            </div>
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">15K+</p>
              <p className="text-sm opacity-90">Certificates Issued</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">95%</p>
              <p className="text-sm opacity-90">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide world-class education that empowers individuals to achieve their career goals and unlock their full potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A world where quality education is accessible to everyone, breaking down barriers and creating equal opportunities for all.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Excellence, accessibility, innovation, and community. We're committed to delivering the best learning experience possible.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-accent/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                TechyGuide was founded in 2020 with a simple yet powerful vision: to make high-quality tech education 
                accessible to everyone, regardless of their background or location.
              </p>
              <p>
                What started as a small platform with just a handful of courses has grown into a thriving community 
                of over 50,000 learners from around the world. Our courses are taught by industry experts who are 
                passionate about sharing their knowledge and helping students succeed.
              </p>
              <p>
                Today, we offer over 200 courses covering everything from web development and data science to design 
                and digital marketing. But we're just getting started. We're constantly adding new courses and 
                improving our platform to provide the best possible learning experience.
              </p>
              <p>
                Join us on this exciting journey and unlock your potential with TechyGuide!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate educators and tech experts dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                    alt={member.name}
                    className="h-24 w-24 rounded-full mx-auto mb-4"
                  />
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students already learning on TechyGuide
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" variant="secondary">
                Browse Courses
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former tech lead at Google with a passion for education",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Full-stack developer with 15 years of experience",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Curriculum",
    bio: "Educational technology specialist and course designer",
  },
  {
    name: "David Kim",
    role: "Lead Instructor",
    bio: "Award-winning educator and software engineer",
  },
];
