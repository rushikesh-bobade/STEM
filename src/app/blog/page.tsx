import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data";

const categories = ["All", "Education", "Competition", "Tutorial", "News", "Robotics"];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-100">
              BLOG & NEWS
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Latest from <span className="text-teal-500">TechyGuide</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Stay updated with the latest news, tutorials, and insights from the world of STEM education.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <div>
                <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
                  Featured
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-teal-600">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-lg text-gray-600">{featuredPost.excerpt}</p>
                <div className="mt-6 flex items-center gap-4">
                  <Image
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{featuredPost.author.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-gray-600">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...blogPosts, ...blogPosts].slice(0, 6).map((post, index) => (
              <Link
                key={`${post.id}-${index}`}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden rounded-t-xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 bg-white/90 text-gray-700">
                    {post.category}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{post.author.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="outline" className="rounded-full">
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Subscribe to Our Newsletter</h2>
          <p className="mt-4 text-gray-600">
            Get the latest articles, tutorials, and updates delivered to your inbox.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-full border px-6 py-3 text-center sm:w-80 sm:text-left"
            />
            <Button className="rounded-full">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
