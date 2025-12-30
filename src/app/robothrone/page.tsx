"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Users,
  Trophy,
  Download,
  Play,
  Leaf,
  Rocket,
  Home,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  competitionCategories,
  pastWinners,
  innovationThemes,
} from "@/lib/data";

const prizeData = [
  { place: "1st Place", amount: "₹50,000", extras: "+ CERTIFICATE & RECOGNITION" },
  { place: "2nd Place", amount: "₹30,000", extras: "+ CERTIFICATE & RECOGNITION" },
  { place: "3rd Place", amount: "₹20,000", extras: "+ CERTIFICATE & RECOGNITION" },
];

const winnerCategories = ["Junior Group", "Advance Group", "Pro Group"];

export default function RobothronePage() {
  const [selectedCategory, setSelectedCategory] = useState("Junior Group");

  const getThemeIcon = (icon: string) => {
    switch (icon) {
      case "leaf":
        return <Leaf className="h-6 w-6" />;
      case "rocket":
        return <Rocket className="h-6 w-6" />;
      case "home":
        return <Home className="h-6 w-6" />;
      case "shield":
        return <Shield className="h-6 w-6" />;
      default:
        return <Leaf className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
                <Trophy className="mr-1 h-3 w-3" /> INDIA'S PREMIER ROBOTICS COMPETITION
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                RoboThrone 2025
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                India's most exciting robotics competition for students. Design, build,
                and compete with your autonomous robots. Win amazing prizes and
                recognition!
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  <span>March 15-17, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-teal-600" />
                  <span>500+ Participants Expected</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>₹1,00,000+ Prize Pool</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full" size="lg">
                  Register Now
                </Button>
                <Button variant="outline" className="rounded-full" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Guidelines
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
                  alt="RoboThrone Competition"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white">
                  <Play className="h-4 w-4 fill-teal-600 text-teal-600" />
                  Watch Highlights from 2024
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Innovation Fest Themes
            </h2>
            <p className="mt-2 text-gray-600">
              Choose from exciting themes for your innovation project
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {innovationThemes.map((theme, index) => (
              <div
                key={index}
                className="rounded-xl border bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  {getThemeIcon(theme.icon)}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">
                  {theme.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{theme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Exciting Prizes to Win
            </h2>
            <p className="mt-2 text-gray-600">
              Top performers in each category will receive cash prizes, certificates,
              and recognition
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {prizeData.map((prize, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl p-6 text-center ${
                  index === 0
                    ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white"
                    : index === 1
                    ? "bg-gradient-to-br from-teal-400 to-teal-500 text-white"
                    : "bg-gradient-to-br from-teal-300 to-teal-400 text-white"
                }`}
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
                <div className="relative">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{prize.place}</h3>
                  <p className="mt-2 text-3xl font-bold">{prize.amount}</p>
                  <p className="mt-2 text-sm opacity-90">{prize.extras}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Competition Categories
            </h2>
            <p className="mt-2 text-gray-600">
              Choose your category and showcase your robotics skills
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {competitionCategories.map((category) => (
              <div
                key={category.id}
                className="flex gap-4 rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                  <svg
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <Badge
                      className={`${
                        category.difficulty === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : category.difficulty === "Intermediate"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {category.difficulty}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {category.description}
                  </p>
                  <Link
                    href="#"
                    className="mt-3 inline-block text-sm font-medium text-teal-600 hover:underline"
                  >
                    View Guidelines
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Past Winners</h2>
            <p className="mt-2 text-gray-600">
              Celebrating excellence and innovation from RoboThrone 2024
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {winnerCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-teal-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            {pastWinners
              .filter((w) => w.category === selectedCategory)
              .map((winner) => (
                <div
                  key={winner.rank}
                  className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-bold ${
                      winner.rank === 1
                        ? "bg-amber-500"
                        : winner.rank === 2
                        ? "bg-gray-400"
                        : "bg-amber-700"
                    }`}
                  >
                    {winner.rank}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {winner.teamName}
                    </h3>
                    <p className="text-sm text-gray-500">{winner.school}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase">Team Members</p>
                    <p className="text-sm text-gray-700">
                      {winner.members.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Trophy className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-3xl font-bold">Ready to Compete?</h2>
          <p className="mx-auto mt-4 max-w-xl text-teal-100">
            Early bird registration is now open! Register before February 15th to get
            a 20% discount on entry fees. Limited slots available!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-white text-teal-600 hover:bg-gray-100"
            >
              Register Your Team
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white text-white hover:bg-white/10"
            >
              Call for Details
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
