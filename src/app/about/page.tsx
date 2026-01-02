import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  Users,
  Award,
  MapPin,
  Calendar,
  Linkedin,
  Twitter,
  ArrowRight,
  Heart,
  BookOpen,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { instructors } from "@/lib/data";

const milestones = [
  { year: "2019", title: "Founded", description: "Started with a vision to make STEM accessible to all." },
  { year: "2020", title: "First 1000 Students", description: "Reached our first milestone of student enrollments." },
  { year: "2021", title: "RoboThrone Launch", description: "Launched India's premier robotics competition." },
  { year: "2022", title: "School Partnerships", description: "Partnered with 100+ schools across India." },
  { year: "2023", title: "Impact Program", description: "Launched free STEM education for underprivileged students." },
  { year: "2024", title: "50K+ Students", description: "Crossed 50,000 students trained milestone." },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest quality in everything we create and teach.",
  },
  {
    icon: Heart,
    title: "Accessibility",
    description: "Making STEM education available to students regardless of their background.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly evolving our curriculum to include the latest technologies.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive community of learners, educators, and innovators.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-100">
              ABOUT US
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Empowering the Next Generation of{" "}
              <span className="text-teal-500">Innovators</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              TechyGuide is India's leading STEM education platform, dedicated to preparing
              students for the future through hands-on learning in robotics, coding, and AI.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-gray-600">
                Founded in 2019, TechyGuide began with a simple mission: to make quality STEM
                education accessible to every student in India. What started as a small
                workshop in Bangalore has grown into a nationwide movement.
              </p>
              <p className="mt-4 text-gray-600">
                Today, we've trained over 50,000 students, partnered with 500+ schools,
                and conducted India's largest student robotics competition. Our team of
                passionate educators and engineers continues to innovate and expand our
                reach every day.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="rounded-xl border bg-white p-4 text-center">
                  <div className="text-3xl font-bold text-teal-600">50K+</div>
                  <div className="text-sm text-gray-500">Students Trained</div>
                </div>
                <div className="rounded-xl border bg-white p-4 text-center">
                  <div className="text-3xl font-bold text-teal-600">500+</div>
                  <div className="text-sm text-gray-500">School Partners</div>
                </div>
                <div className="rounded-xl border bg-white p-4 text-center">
                  <div className="text-3xl font-bold text-teal-600">100+</div>
                  <div className="text-sm text-gray-500">Courses</div>
                </div>
                <div className="rounded-xl border bg-white p-4 text-center">
                  <div className="text-3xl font-bold text-teal-600">25+</div>
                  <div className="text-sm text-gray-500">Cities</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team at work"
                width={800}
                height={600}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 p-8 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Our Mission</h3>
              <p className="mt-4 text-teal-100">
                To democratize STEM education in India by providing accessible, high-quality
                learning experiences that inspire curiosity, creativity, and innovation in
                every student.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-8 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">Our Vision</h3>
              <p className="mt-4 text-amber-100">
                To be the catalyst for a generation of Indian innovators, engineers, and
                entrepreneurs who will solve the world's most pressing challenges through
                technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="mt-2 text-gray-600">The principles that guide everything we do.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
                  <value.icon className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
            <p className="mt-2 text-gray-600">Key milestones in our growth story.</p>
          </div>
          <div className="mt-12 relative">
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-teal-200 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                      <div className="text-2xl font-bold text-teal-600">{milestone.year}</div>
                      <h3 className="mt-2 font-semibold text-gray-900">{milestone.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-teal-500" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Instructors</h2>
            <p className="mt-2 text-gray-600">Learn from industry experts and passionate educators.</p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <Image
                  src={instructor.avatar}
                  alt={instructor.name}
                  width={120}
                  height={120}
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{instructor.name}</h3>
                <p className="text-sm text-teal-600">{instructor.title}</p>
                <p className="text-sm text-gray-500">{instructor.company}</p>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{instructor.bio}</p>
                <div className="mt-4 flex justify-center gap-4 text-sm text-gray-500">
                  <span>{instructor.students.toLocaleString()}+ students</span>
                  <span>{instructor.courses} courses</span>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  <a href="#" className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                    <Linkedin className="h-4 w-4 text-gray-600" />
                  </a>
                  <a href="#" className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                    <Twitter className="h-4 w-4 text-gray-600" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Join Our Team</h2>
          <p className="mx-auto mt-4 max-w-xl text-teal-100">
            We're always looking for passionate educators, engineers, and innovators
            to join our mission. Check out our open positions.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full bg-white text-teal-600 hover:bg-gray-100"
          >
            <Link href="/careers">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
