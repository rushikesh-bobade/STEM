import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Star, Users, BookOpen, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Students Trained", value: "50,000+" },
  { label: "Schools Partnered", value: "500+" },
  { label: "Courses Available", value: "100+" },
  { label: "Competition Winners", value: "1,000+" },
];

const features = [
  {
    icon: BookOpen,
    title: "Online Courses",
    description: "Learn robotics, AI, and coding from expert instructors at your own pace.",
  },
  {
    icon: Zap,
    title: "DIY Kits",
    description: "Hands-on learning with our curated STEM kits for all skill levels.",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Participate in RoboThrone and other exciting robotics competitions.",
  },
  {
    icon: Users,
    title: "School Programs",
    description: "Comprehensive STEM programs designed for schools and institutions.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <Badge className="mb-4 w-fit bg-teal-100 text-teal-800 hover:bg-teal-100">
                <Zap className="mr-1 h-3 w-3" /> STEM Education Platform
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Empowering the{" "}
                <span className="text-teal-500">Next Generation</span> of
                Innovators
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Discover robotics, coding, and AI through hands-on learning
                experiences. From beginner kits to advanced courses, we have
                everything you need to start your STEM journey.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/courses">
                    Explore Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-teal-400 to-teal-600"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">4.9</span> from 10,000+
                    reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
                  alt="STEM Learning"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg hover:bg-white">
                  <Play className="h-4 w-4 fill-teal-600 text-teal-600" />
                  Watch Our Story
                </button>
              </div>
              <div className="absolute -bottom-4 -right-4 hidden rounded-xl border bg-white p-4 shadow-lg lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                    <Trophy className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      RoboThrone 2025
                    </p>
                    <p className="text-xs text-gray-500">
                      Registrations Open!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-teal-600">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
              WHY CHOOSE US
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need to{" "}
              <span className="text-teal-500">Master STEM</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              From online courses to hands-on kits, we provide comprehensive
              learning experiences for students of all ages.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600 transition-colors group-hover:bg-teal-500 group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">
                <Trophy className="mr-1 h-3 w-3" /> ROBOTHRONE 2025
              </Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">
                India's Premier Robotics Competition
              </h2>
              <p className="mt-4 text-teal-100">
                Join thousands of students from across the country in the most
                exciting robotics competition. Design, build, and compete with
                your autonomous robots.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "₹1,00,000+ Prize Pool",
                  "500+ Participants Expected",
                  "Multiple Competition Categories",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                      <svg
                        className="h-3 w-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-teal-600 hover:bg-gray-100"
                >
                  <Link href="/robothrone">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white text-white hover:bg-white/10"
                >
                  <Link href="/robothrone">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&h=400&fit=crop"
                alt="Robotics Competition"
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Ready to Start Your STEM Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Join thousands of students who are already learning robotics,
            coding, and AI with TechyGuide.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/courses">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
