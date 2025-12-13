import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Users, BookOpen, Award, CheckCircle, Wrench, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function AILabPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-white to-orange-50 py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-teal-100 text-teal-600 border-0">
                For Educational Institutions
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                AI & Robotics Lab Setup
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Transform your school into a hub of innovation with our comprehensive AI & Robotics Lab. Equipped with cutting-edge technology and expert guidance to inspire the next generation of innovators.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8">
                    Request a Proposal
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full px-8">
                  Call Us Now
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-100 to-green-100 rounded-3xl p-4 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop"
                  alt="AI & Robotics Lab"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Our Lab
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A complete solution designed to bring world-class STEM education to your institution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labInclusions.map((item, index) => (
              <Card key={index} className="border-2 hover:border-teal-200 hover:shadow-lg transition-all">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Lab Package */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-4 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop"
                  alt="Complete Lab Package"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <Badge className="bg-orange-100 text-orange-600 border-0">Complete Package</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Complete Lab Package
              </h2>
              <p className="text-gray-600">
                Our AI & Robotics Lab comes with everything you need to start teaching cutting-edge technology concepts immediately.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {labPackage.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Lab Setup?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-2">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription className="text-sm">{benefit.description}</CardDescription>
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
            Ready to Transform Your School?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join 50+ schools across India that have already set up TechyGuide AI & Robotics Labs. Get a free consultation and customized proposal today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8">
                Schedule a Demo
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

const labInclusions = [
  {
    icon: <Cpu className="h-8 w-8 text-white" />,
    title: "Advanced Robotics Kit",
    description: "Complete robotics kits with sensors, motors, and controllers for hands-on learning",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: "AI & Machine Learning",
    description: "Introduction to artificial intelligence concepts through practical projects",
  },
  {
    icon: <Wrench className="h-8 w-8 text-white" />,
    title: "Creative Innovation",
    description: "Encourage students to design and build their own robotic solutions",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Expert Training",
    description: "Comprehensive teacher training and ongoing support included",
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: "Certification Program",
    description: "Students receive certificates upon completion of lab modules",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-white" />,
    title: "Curriculum Integration",
    description: "Aligns with CBSE and ICSE curriculum standards for STEM education",
  },
];

const labPackage = [
  "Robotics Kits (20+ sets)",
  "AI Learning Modules",
  "3D Printing Station",
  "IoT Development Boards",
  "Electronics Components",
  "Programming Software Licenses",
  "Teacher Training (40 hours)",
  "Student Workbooks",
  "Project Guide Materials",
  "Ongoing Technical Support",
];

const benefits = [
  {
    icon: <Cpu className="h-6 w-6 text-teal-600" />,
    title: "Cutting-Edge Tech",
    description: "Latest equipment and tools",
  },
  {
    icon: <Users className="h-6 w-6 text-teal-600" />,
    title: "Full Support",
    description: "Training and assistance",
  },
  {
    icon: <Award className="h-6 w-6 text-teal-600" />,
    title: "Curriculum Aligned",
    description: "CBSE/ICSE compatible",
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-teal-600" />,
    title: "Proven Results",
    description: "50+ successful setups",
  },
];
