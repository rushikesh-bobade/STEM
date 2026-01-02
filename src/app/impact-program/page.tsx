import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Users,
  School,
  Trophy,
  Heart,
  Truck,
  Award,
  Recycle,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { testimonials, initiatives, impactStats } from "@/lib/data";

export default function ImpactProgramPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "truck": return <Truck className="h-6 w-6" />;
      case "users": return <Users className="h-6 w-6" />;
      case "award": return <Award className="h-6 w-6" />;
      case "recycle": return <Recycle className="h-6 w-6" />;
      default: return <Heart className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
                <Heart className="mr-1 h-3 w-3" /> EMPOWERING THE FUTURE
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Making a Real{" "}
                <span className="text-teal-500">Impact</span> Through STEM
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                We believe that technology education is a right, not a privilege.
                Our Impact Program bridges the digital divide by bringing
                robotics and coding to underserved communities.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-teal-600" />
                  <span>90+ Schools Supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span>16,000+ Students Impacted</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full">
                  Partner With Us
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Our Story
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop"
                  alt="Students learning"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">Government School Project, 2024</h3>
                  <p className="text-sm opacity-90">Bringing hands-on robotics to 50+ government schools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-6 text-lg text-gray-600">
            To democratize access to modern technology education, ensuring every child has the
            opportunity to become an innovator, regardless of their background.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
                <Trophy className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Accessibility</h3>
              <p className="mt-2 text-sm text-gray-600">
                Providing affordable and free educational resources to schools in remote and
                underprivileged areas.
              </p>
            </div>
            <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                <Users className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Inclusivity</h3>
              <p className="mt-2 text-sm text-gray-600">
                Creating programs specifically designed to encourage participation from girls and
                underrepresented minorities in STEM.
              </p>
            </div>
            <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100">
                <Star className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Innovation</h3>
              <p className="mt-2 text-sm text-gray-600">
                Fostering a culture of problem-solving and creativity that extends beyond the classroom
                into real-world challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
              <p className="mt-2 text-gray-600">Our core initiatives driving change across the nation.</p>
            </div>
            <Link href="#" className="text-sm font-medium text-teal-600 hover:underline">
              View All Projects →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {initiatives.map((initiative) => (
              <div
                key={initiative.id}
                className="flex gap-4 rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                  {getIcon(initiative.icon)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{initiative.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{initiative.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {initiative.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`${
                          tag === "Active" || tag === "Ongoing"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : tag === "Financial Aid"
                            ? "border-purple-200 bg-purple-50 text-purple-700"
                            : tag === "Eco-Friendly" || tag === "New"
                            ? "border-teal-200 bg-teal-50 text-teal-700"
                            : "border-gray-200 text-gray-600"
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-teal-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Stories of Change</h2>
            <p className="mt-2 text-gray-600">
              Hear from the students and teachers whose lives have been transformed.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Quote className="h-8 w-8 text-teal-200" />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
                {testimonial.program && (
                  <Badge className="mt-4 bg-teal-100 text-teal-700 hover:bg-teal-100">
                    {testimonial.program}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-bold">Join Our Movement</h2>
          <p className="mx-auto mt-4 max-w-xl text-teal-100">
            Whether you're a corporate sponsor, a school looking for support, or a
            volunteer, there's a place for you in our mission.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-white text-teal-600 hover:bg-gray-100"
            >
              <Heart className="mr-2 h-4 w-4" />
              Donate to the Cause
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white text-white hover:bg-white/10"
            >
              Become a Volunteer
            </Button>
          </div>
          <p className="mt-6 text-sm text-teal-200">
            Are you a school in need?{" "}
            <Link href="/contact" className="underline hover:text-white">
              Apply for support here.
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
