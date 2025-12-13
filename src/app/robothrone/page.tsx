import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, Target, Gift, Award, Lightbulb, Download } from "lucide-react";
import Image from "next/image";

export default function RoboThronePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-teal-50 to-orange-50 py-16 md:py-24">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-600 border-0 text-lg px-6 py-2">
              🏆 National Competition
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              RoboThrone 2025
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              India's Largest STEM Robotics Competition - Where Young Minds Compete to Build the Future
            </p>
            <div className="flex items-center justify-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-teal-600">March 15</p>
                <p className="text-sm text-gray-600">Competition Date</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-teal-600">₹50,000</p>
                <p className="text-sm text-gray-600">Total Prizes</p>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <p className="text-3xl font-bold text-teal-600">500+</p>
                <p className="text-sm text-gray-600">Participants</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link href="/contact">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8">
                  Register Your Team
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-full px-8">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Fest Themes */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-teal-100 text-teal-700 border-0">🎯 Competition Themes</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Innovation Fest Themes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your challenge and showcase your robotics skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme, index) => (
              <Card key={index} className="border-2 hover:border-teal-200 hover:shadow-xl transition-all">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
                    {theme.icon}
                  </div>
                  <CardTitle className="text-xl">{theme.title}</CardTitle>
                  <CardDescription className="text-sm">{theme.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exciting Prizes */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-600 border-0">🎁 Win Big</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Exciting Prizes to Win
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {prizes.map((prize, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-shadow text-center">
                <CardHeader>
                  <div className={`h-20 w-20 rounded-full ${prize.color} flex items-center justify-center mx-auto mb-4`}>
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                  <Badge className={`${prize.badgeColor} border-0 mb-3`}>{prize.place}</Badge>
                  <CardTitle className="text-2xl">{prize.amount}</CardTitle>
                  <CardDescription>{prize.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Categories */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Competition Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your category and showcase your robotics skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="border-2 hover:border-teal-200 hover:shadow-xl transition-all">
                <CardHeader>
                  <Badge className="bg-teal-100 text-teal-700 border-0 w-fit mb-3">{category.age}</Badge>
                  <CardTitle className="text-2xl text-gray-900">{category.title}</CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-2">
                    {category.description}
                  </CardDescription>
                  <div className="pt-4 space-y-2">
                    {category.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Winners */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-600 border-0">🏆 Hall of Fame</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Past Winners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pastWinners.map((winner, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`${winner.badgeColor} border-0`}>{winner.year}</Badge>
                    <Badge variant="outline">{winner.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{winner.team}</CardTitle>
                  <CardDescription className="text-sm">
                    <span className="font-semibold">Project:</span> {winner.project}
                  </CardDescription>
                  <CardDescription className="text-xs text-gray-500 mt-1">
                    {winner.school}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Participate in RoboThrone?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 text-center hover:shadow-lg transition-shadow">
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
            Ready to Compete?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Register your team today and be part of India's biggest STEM robotics competition. Limited slots available!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 rounded-full px-8">
                Register Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Guidelines
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const themes = [
  {
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: "Smart City",
    description: "Build robots that solve urban challenges and improve city living",
  },
  {
    icon: <Target className="h-8 w-8 text-white" />,
    title: "Line Following Robot",
    description: "Design and program robots to follow complex paths accurately",
  },
  {
    icon: <Trophy className="h-8 w-8 text-white" />,
    title: "Sumo Wrestling",
    description: "Create powerful robots to compete in the ultimate robot battle",
  },
  {
    icon: <Gift className="h-8 w-8 text-white" />,
    title: "Maze Solving",
    description: "Program intelligent robots to navigate through challenging mazes",
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: "Obstacle Course",
    description: "Build versatile robots that overcome various physical challenges",
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: "Team Challenge",
    description: "Collaborative robotics projects requiring teamwork and coordination",
  },
];

const prizes = [
  {
    place: "1st Place",
    amount: "₹50,000",
    description: "Cash Prize",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },
  {
    place: "2nd Place",
    amount: "₹30,000",
    description: "Cash Prize",
    color: "bg-gradient-to-br from-gray-300 to-gray-500",
    badgeColor: "bg-gray-100 text-gray-700",
  },
  {
    place: "3rd Place",
    amount: "₹20,000",
    description: "Cash Prize",
    color: "bg-gradient-to-br from-orange-400 to-orange-600",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

const categories = [
  {
    age: "Ages 8-12",
    title: "Junior Category",
    description: "For young innovators starting their robotics journey",
    details: [
      "Basic robotics challenges",
      "Simple programming tasks",
      "Team size: 2-3 members",
      "Duration: 2 hours",
    ],
  },
  {
    age: "Ages 13-17",
    title: "Senior Category",
    description: "For advanced students ready for complex challenges",
    details: [
      "Advanced robotics problems",
      "Complex programming requirements",
      "Team size: 3-4 members",
      "Duration: 3 hours",
    ],
  },
];

const pastWinners = [
  {
    year: "2024",
    category: "Line Following",
    team: "RoboMinds",
    project: "SpeedTracer 3000",
    school: "Delhi Public School, Mumbai",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },
  {
    year: "2023",
    category: "Sumo Wrestling",
    team: "Tech Titans",
    project: "PowerBot X",
    school: "Ryan International, Bangalore",
    badgeColor: "bg-gray-100 text-gray-700",
  },
  {
    year: "2023",
    category: "Maze Solver",
    team: "Innovation Squad",
    project: "MazeRunner AI",
    school: "Kendriya Vidyalaya, Chennai",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

const benefits = [
  {
    icon: <Trophy className="h-6 w-6 text-teal-600" />,
    title: "Win Amazing Prizes",
    description: "Compete for cash prizes and recognition",
  },
  {
    icon: <Award className="h-6 w-6 text-teal-600" />,
    title: "Certificates",
    description: "All participants receive certificates",
  },
  {
    icon: <Users className="h-6 w-6 text-teal-600" />,
    title: "Networking",
    description: "Connect with fellow robotics enthusiasts",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-teal-600" />,
    title: "Learn & Grow",
    description: "Enhance your technical skills",
  },
  {
    icon: <Gift className="h-6 w-6 text-teal-600" />,
    title: "Industry Exposure",
    description: "Interact with experts and mentors",
  },
  {
    icon: <Calendar className="h-6 w-6 text-teal-600" />,
    title: "Real-World Experience",
    description: "Apply classroom knowledge practically",
  },
];
