import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle, Wrench, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function WorkshopsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-orange-50 to-teal-50 py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-200 border-0">
                🎓 Interactive STEM Workshops
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                STEM Workshops & Tinkerfest
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ignite curiosity and innovation with our engaging STEM workshops. Perfect for schools, colleges, and educational events. From robotics to AI, we bring cutting-edge technology education to your students.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8">
                    Book a Workshop
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full px-8">
                  Explore Workshops
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-100 to-green-100 rounded-3xl p-4 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Students in workshop"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-2 hover:border-teal-200 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Programs */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Workshop Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our range of specialized workshops tailored to different age groups and skill levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {workshops.map((workshop, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-teal-100 text-teal-700 border-0">{workshop.category}</Badge>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{workshop.students}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{workshop.title}</CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-2">
                    {workshop.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <p className="font-semibold text-gray-900">Key Topics Covered:</p>
                    <ul className="space-y-2">
                      {workshop.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tinkerfest Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-4 shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
                  alt="Tinkerfest event"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <Badge className="bg-orange-100 text-orange-600 border-0">🏆 Innovation Festival</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Host a Tinkerfest at Your School
              </h2>
              <p className="text-gray-600">
                Transform your school into a maker event that brings together multiple workshops, competitions, and exhibitions to create an unforgettable STEM learning experience.
              </p>
              <ul className="space-y-3">
                {tinkerfestFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                  Organize a Tinkerfest
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Workshop?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today for a free workshop proposal customized to your school's needs. We offer flexible scheduling and competitive pricing.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8">
                Get Free Proposal
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

const features = [
  {
    icon: <Users className="h-8 w-8 text-teal-600" />,
    title: "Expert Instructors",
    description: "Industry professionals with years of teaching experience",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
    title: "Certificates",
    description: "Participation certificates for all attendees",
  },
  {
    icon: <Wrench className="h-8 w-8 text-teal-600" />,
    title: "Hands-on Learning",
    description: "Practical projects and real-world applications",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-teal-600" />,
    title: "All Materials Provided",
    description: "Complete kits and materials included",
  },
];

const workshops = [
  {
    category: "Robotics Workshop",
    duration: "1-3 Days",
    students: "20-30 Students",
    title: "Robotics Workshop",
    description: "Hands-on robotics building and programming with industry-standard tools",
    topics: [
      "Robot Assembly",
      "Sensor Integration",
      "Basic Programming",
      "Motor Control",
    ],
  },
  {
    category: "AI & ML Workshop",
    duration: "2-4 Days",
    students: "30-40 Students",
    title: "AI & ML Workshop",
    description: "Introduction to artificial intelligence and machine learning concepts",
    topics: [
      "AI Fundamentals",
      "Machine Learning Basics",
      "Image Recognition",
      "Chatbot Creation",
    ],
  },
  {
    category: "IoT Workshop",
    duration: "1-2 Days",
    students: "20-40 Students",
    title: "IoT Workshop",
    description: "Build smart connected devices and learn Internet of Things concepts",
    topics: [
      "Sensors & Actuators",
      "WiFi Connectivity",
      "Cloud Integration",
      "Smart Home Projects",
    ],
  },
  {
    category: "3D Printing Workshop",
    duration: "1-3 Days",
    students: "10-30 Students",
    title: "3D Printing Workshop",
    description: "Learn 3D modeling and printing to bring your digital designs to life",
    topics: [
      "3D Modeling Software",
      "Print Preparation",
      "Design Principles",
      "Hands-on Printing",
    ],
  },
];

const tinkerfestFeatures = [
  "Multiple concurrent workshops",
  "Robotics competitions and challenges",
  "Live project demonstrations",
  "Innovation showcase",
  "Expert speaker sessions",
  "Certificates and prizes for participants",
];
