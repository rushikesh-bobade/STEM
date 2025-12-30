"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar, Users, Trophy, Download, Play, ChevronRight, Leaf, Rocket, Cpu, ShieldAlert, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function RobothronePage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-[#f0f9f9] rounded-[3rem] overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-primary/5">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest bg-orange-50 w-fit px-4 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              India's Premier Robotics Competition
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              RoboThrone <span className="text-primary">2025</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
              India's most exciting robotics competition for students. Design, build, and compete with your autonomous robots. Win amazing prizes and recognition!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Date</span>
                  <span className="text-sm font-bold">March 15-17, 2025</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Participants</span>
                  <span className="text-sm font-bold">500+ Expected</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground font-medium">Prize Pool</span>
                  <span className="text-sm font-bold">₹1,00,000+</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-6">
              <Button size="lg" className="rounded-full px-8 h-14 font-bold text-base shadow-lg shadow-primary/20">
                Register Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-bold text-base bg-white border-primary/20 hover:bg-primary/5 text-primary">
                <Download className="h-5 w-5 mr-2" />
                Download Guidelines
              </Button>
            </div>
          </div>
          <div className="flex-1 relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
              alt="Robotics Competition"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-white fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="h-2 w-2 bg-rose-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">Watch Highlights from 2024</span>
              </div>
              <ChevronRight className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Fest Themes */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Innovation Fest Themes</h2>
          <p className="text-muted-foreground">Choose from exciting themes for your innovation project and showcase your skills.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Environment Sustainability", icon: Leaf, color: "text-green-500", bg: "bg-green-50", desc: "Eco-friendly solutions for a greener tomorrow" },
            { title: "Space Exploration", icon: Rocket, color: "text-blue-500", bg: "bg-blue-50", desc: "Futuristic space tech and rovers" },
            { title: "Technology in Daily Life", icon: Cpu, color: "text-purple-500", bg: "bg-purple-50", desc: "Smart living solutions for modern homes" },
            { title: "Disaster Management", icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-50", desc: "Emergency response tech for safety" },
          ].map((theme, i) => (
            <Card key={i} className="border-none shadow-none hover:translate-y-[-8px] transition-transform duration-300">
              <CardContent className="p-10 flex flex-col items-center text-center space-y-6">
                <div className={`h-16 w-16 ${theme.bg} rounded-3xl flex items-center justify-center ${theme.color}`}>
                  <theme.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg leading-tight">{theme.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{theme.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Exciting Prizes to Win */}
      <section className="bg-secondary/20 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Exciting Prizes to Win</h2>
            <p className="text-muted-foreground">Top performers in each category will receive cash prizes, certificates, and recognition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { place: "2nd Place", prize: "₹30,000", order: "md:order-1", scale: "" },
              { place: "1st Place", prize: "₹50,000", order: "md:order-2", scale: "md:scale-110 z-10" },
              { place: "3rd Place", prize: "₹20,000", order: "md:order-3", scale: "" },
            ].map((prize, i) => (
              <div key={i} className={`bg-white rounded-[2rem] p-10 flex flex-col items-center text-center space-y-4 shadow-xl shadow-primary/5 border border-muted/20 ${prize.order} ${prize.scale}`}>
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                  <Trophy className="h-8 w-8" />
                </div>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{prize.place}</span>
                <span className="text-4xl font-bold text-primary">{prize.prize}</span>
                <p className="text-xs font-bold text-muted-foreground pt-4 border-t w-full">+ CERTIFICATE & RECOGNITION</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competition Categories */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Competition Categories</h2>
          <p className="text-muted-foreground">Choose your category and showcase your robotics skills.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { title: "Line Following Robot", level: "Beginner", desc: "Design a robot that can follow a line path autonomously with speed and precision.", icon: <Cpu className="h-5 w-5" /> },
            { title: "Obstacle Avoidance", level: "Intermediate", desc: "Create a robot that can navigate around obstacles independently using sensors.", icon: <Users className="h-5 w-5" /> },
            { title: "Sumo Wrestling Robot", level: "Advanced", desc: "Build a robot to compete in sumo-style matches and push opponents out.", icon: <Trophy className="h-5 w-5" /> },
            { title: "AI-Powered Bot", level: "Advanced", desc: "Integrate AI/ML capabilities into your robot design for complex tasks.", icon: <Rocket className="h-5 w-5" /> },
          ].map((cat, i) => (
            <div key={i} className="bg-white border border-muted/20 rounded-[2rem] p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  {cat.icon}
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-600 border-none font-bold uppercase text-[10px]">
                  {cat.level}
                </Badge>
              </div>
              <h3 className="font-bold text-xl mb-3">{cat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{cat.desc}</p>
              <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                View Guidelines <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Past Winners */}
      <section className="container mx-auto px-4 py-24 bg-secondary/10 rounded-[4rem]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">Past Winners</h2>
          <p className="text-muted-foreground">Celebrating excellence and innovation from RoboThrone 2024</p>
        </div>
        
        <Tabs defaultValue="junior" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white p-1 rounded-full h-14 shadow-sm border border-muted/20">
              <TabsTrigger value="junior" className="rounded-full px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Junior Group</TabsTrigger>
              <TabsTrigger value="advance" className="rounded-full px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Advance Group</TabsTrigger>
              <TabsTrigger value="pro" className="rounded-full px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Pro Group</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="junior" className="space-y-4">
            {[
              { rank: "#1", team: "RoboKids", school: "Delhi Public School, Mumbai", members: "Aarav Sharma, Diya Patel, Rohan Kumar" },
              { rank: "#2", team: "Tech Titans", school: "Modern School, Delhi", members: "Priya Singh, Arjun Mehta, Kavya Reddy" },
              { rank: "#3", team: "Innovation Squad", school: "Ryan International, Bangalore", members: "Aditya Verma, Sneha Gupta, Vivaan Joshi" },
            ].map((winner, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-muted/20 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-colors">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm ${i === 0 ? 'bg-orange-100 text-orange-600' : i === 1 ? 'bg-slate-100 text-slate-600' : 'bg-orange-50 text-orange-400'}`}>
                  {winner.rank}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-lg">{winner.team}</h4>
                  <p className="text-xs text-muted-foreground font-medium">{winner.school}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Team Members</p>
                  <p className="text-xs font-medium text-slate-700">{winner.members}</p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Ready to Compete CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-primary rounded-[3.5rem] p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Cpu className="h-64 w-64 rotate-12" />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Rocket className="h-10 w-10" />
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Ready to Compete?</h2>
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
              Early bird registration is now open! Register before February 15th to get a 20% discount on entry fees. Limited slots available!
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 h-16 font-bold text-lg">
                Register Your Team
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 rounded-full px-12 h-16 font-bold text-lg bg-transparent">
                Call for Details
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
