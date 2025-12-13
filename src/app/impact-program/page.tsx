import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, School, BookOpen, Award, Heart, TrendingUp, Globe, Target } from "lucide-react";
import Image from "next/image";

export default function ImpactProgramPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-orange-50 to-teal-50 py-16 md:py-24">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-600 border-0 text-lg px-6 py-2">
              🤝 Making a Difference Together
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              TechyGuide Impact Program
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering underprivileged students with world-class STEM education. Together, we're building a future where every child has access to quality technology education, regardless of their background.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link href="/contact">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8">
                  Get Involved
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full px-8">
                See Our Impact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At TechyGuide, we believe that every child deserves access to quality STEM education. Our Impact Program is dedicated to breaking down barriers and creating opportunities for students from all backgrounds to explore, learn, and innovate in the fields of science, technology, engineering, and mathematics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Make an Impact */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-700 border-0">📍 Our Reach</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Where We Make an Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach addresses multiple aspects of STEM education accessibility
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {impactAreas.map((area, index) => (
              <Card key={index} className="border-2 hover:border-teal-200 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      {area.icon}
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-orange-100 text-orange-600 border-0 mb-3">{area.badge}</Badge>
                      <CardTitle className="text-2xl text-gray-900 mb-3">{area.title}</CardTitle>
                      <CardDescription className="text-base text-gray-600 mb-4">
                        {area.description}
                      </CardDescription>
                      <div className="space-y-2">
                        {area.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Goals */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-orange-100 text-orange-600 border-0">🎯 Vision 2030</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Goals</h2>
              <p className="text-gray-600">
                We're committed to creating lasting change in STEM education accessibility. Here's what we're working towards:
              </p>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-teal-600"></div>
                    </div>
                    <p className="text-gray-700">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-4 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop"
                  alt="Students learning"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-700 border-0">📊 Impact Metrics</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              By the Numbers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-2 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                    {stat.icon}
                  </div>
                  <CardTitle className="text-4xl text-teal-600 mb-2">{stat.value}</CardTitle>
                  <CardDescription className="text-base font-semibold text-gray-900">{stat.label}</CardDescription>
                  <p className="text-sm text-gray-600 mt-2">{stat.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're an individual, organization, or school, there are many ways to contribute to our Impact Program and help us reach more students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {involvement.map((option, index) => (
              <Card key={index} className="border-2 text-center hover:border-teal-200 hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    {option.icon}
                  </div>
                  <CardTitle className="text-xl mb-3">{option.title}</CardTitle>
                  <CardDescription className="text-sm mb-6">{option.description}</CardDescription>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full w-full">
                    {option.action}
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch to learn more about our Impact Program or to discuss how you can get involved.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const impactAreas = [
  {
    icon: <Users className="h-8 w-8 text-white" />,
    badge: "2,500+ Students Reached",
    title: "Underprivileged Students",
    description: "Providing free STEM education to students from low-income families",
    details: [
      "Free online courses with live mentorship",
      "Scholarships for exceptional students",
      "Access to learning materials and kits",
    ],
  },
  {
    icon: <School className="h-8 w-8 text-white" />,
    badge: "35+ Partner Schools",
    title: "Rural Schools",
    description: "Setting up STEM labs in rural schools with limited resources",
    details: [
      "Complete lab equipment and materials",
      "Teacher training workshops",
      "Ongoing technical support",
    ],
  },
  {
    icon: <BookOpen className="h-8 w-8 text-white" />,
    badge: "500+ Scholarships Given",
    title: "Scholarship Programs",
    description: "Merit-based scholarships for exceptional students",
    details: [
      "Full course fee waiver",
      "Free learning kits",
      "Mentorship programs",
    ],
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    badge: "300+ Teachers Trained",
    title: "Teacher Training",
    description: "Free training workshops for teachers in underserved areas",
    details: [
      "Modern teaching methodologies",
      "Hands-on technical training",
      "Curriculum development support",
    ],
  },
];

const goals = [
  "Make STEM education accessible to every child regardless of economic background",
  "Bridge the digital divide in rural and semi-urban areas",
  "Empower teachers with modern teaching methodologies",
  "Create a community of young innovators and problem-solvers",
  "Inspire the next generation of scientists, engineers, and mathematicians",
];

const stats = [
  {
    icon: <Users className="h-8 w-8 text-white" />,
    value: "2,500+",
    label: "Students Reached",
    description: "Across India",
  },
  {
    icon: <School className="h-8 w-8 text-white" />,
    value: "35+",
    label: "Partner Schools",
    description: "In rural areas",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-white" />,
    value: "150+",
    label: "Scholarship Grants",
    description: "Worth ₹50 lakhs",
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    value: "300+",
    label: "Teachers Trained",
    description: "Free workshops",
  },
];

const involvement = [
  {
    icon: <Heart className="h-8 w-8 text-teal-600" />,
    title: "Donate",
    description: "Support our scholarship programs and help us reach more students",
    action: "Learn More",
  },
  {
    icon: <Users className="h-8 w-8 text-teal-600" />,
    title: "Partner",
    description: "Collaborate with us to set up labs or sponsor workshops at schools",
    action: "Become a Partner",
  },
  {
    icon: <Target className="h-8 w-8 text-teal-600" />,
    title: "Volunteer",
    description: "Share your expertise as a mentor or workshop facilitator",
    action: "Get Involved",
  },
];
