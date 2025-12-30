"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, ShoppingBag, Trophy, Mail, Users, Star, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const features = [
  {
    title: "Online Courses",
    desc: "Master robotics, AI, and coding with our expert-led video courses.",
    icon: BookOpen,
    href: "/courses",
    color: "bg-blue-500",
  },
  {
    title: "STEM Kits",
    desc: "Get hands-on with our curated selection of robotics and electronic kits.",
    icon: ShoppingBag,
    href: "/store",
    color: "bg-teal-500",
  },
  {
    title: "RoboThrone 2025",
    desc: "Join India's premier robotics competition and win exciting prizes.",
    icon: Trophy,
    href: "/robothrone",
    color: "bg-orange-500",
  },
]

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[#f0f9f9] -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(0,178,169,0.1),transparent)]"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 font-bold uppercase tracking-widest text-xs">
                Next-Gen STEM Education
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
                Empowering <span className="text-primary">Future</span> Innovators
              </h1>
              <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Dive into the world of Robotics, AI, and Coding with our industry-leading platform. From expert-led courses to professional-grade hardware kits.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <Button size="lg" className="rounded-full px-10 h-16 font-bold text-lg shadow-xl shadow-primary/20" asChild>
                  <Link href="/courses">Start Learning</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 h-16 font-bold text-lg bg-white border-primary/20 hover:bg-primary/5 text-primary" asChild>
                  <Link href="/store">Explore Kits</Link>
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="user" width={40} height={40} />
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-xs font-bold">
                    +2k
                  </div>
                </div>
                <div className="h-10 w-px bg-muted-foreground/20"></div>
                <div>
                  <div className="flex items-center gap-1 text-orange-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-xs font-bold text-muted-foreground mt-1">Trusted by 25,000+ students</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative aspect-square w-full max-w-xl"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-[4rem] rotate-6 -z-10 animate-pulse"></div>
              <div className="absolute inset-0 bg-primary/5 rounded-[4rem] -rotate-3 -z-10"></div>
              <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1531746790731-6c087fdec69a?q=80&w=1200&auto=format&fit=crop"
                  alt="Innovation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex items-center justify-between">
                    <div className="text-white">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Upcoming Event</p>
                      <h4 className="font-bold text-xl">RoboThrone 2025</h4>
                    </div>
                    <Button size="icon" className="rounded-full bg-white text-primary hover:bg-white/90">
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <Link href={feature.href}>
                <div className="bg-white rounded-[2.5rem] p-10 border border-muted/20 shadow-xl shadow-primary/5 transition-all group-hover:border-primary/30 group-hover:shadow-primary/10">
                  <div className={`h-16 w-16 ${feature.color} rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg shadow-${feature.color.split('-')[1]}/20`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">{feature.desc}</p>
                  <div className="flex items-center gap-2 font-bold text-primary group-hover:translate-x-2 transition-transform">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#00b2a9_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#00b2a9_0%,transparent_50%)]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Students Worldwide", value: "25k+" },
              { label: "Expert Instructors", value: "150+" },
              { label: "Hardware Kits", value: "45+" },
              { label: "Success Stories", value: "10k+" },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <h4 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">{stat.value}</h4>
                <p className="text-primary font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Why Students Choose <span className="text-primary text-stroke">TechyGuide</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Hands-on Learning", desc: "Our curriculum is 80% practical. Build real robots and solve real problems.", icon: Zap },
                { title: "Industry Standard Hardware", desc: "We use the same components used by professional engineers in the field.", icon: ShieldCheck },
                { title: "Global Community", desc: "Connect with fellow innovators and compete in global robotics challenges.", icon: Users },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-[2rem] hover:bg-secondary/30 transition-colors border border-transparent hover:border-muted/20 group">
                  <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-muted/10 shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop" alt="lab" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop" alt="coding" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop" alt="arduino" fill className="object-cover" />
              </div>
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1531746790731-6c087fdec69a?q=80&w=600&auto=format&fit=crop" alt="robot" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="bg-[#f0f9f9] rounded-[4rem] p-12 md:p-24 border border-primary/10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Stay ahead of the curve</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Get the latest updates on robotics competitions, new hardware releases, and exclusive STEM resources.
            </p>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <div className="relative p-2 bg-white rounded-full shadow-xl shadow-primary/5 flex border border-muted/20">
              <Input 
                placeholder="Enter your email address" 
                className="h-14 rounded-full border-none pl-6 text-base focus-visible:ring-0 placeholder:text-muted-foreground/50" 
              />
              <Button className="h-14 rounded-full px-10 font-bold text-base shadow-lg shadow-primary/20">
                Subscribe
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-4 font-medium">
              Join 15,000+ innovators. No spam, just pure innovation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
