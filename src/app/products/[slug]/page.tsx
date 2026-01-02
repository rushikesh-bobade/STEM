"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Package,
  Code,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { productsData, reviews } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const product = productsData.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        type: "product",
        inStock: product.inStock,
      });
    }
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const relatedProducts = productsData
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b bg-gray-50 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-teal-600">{product.category}</Link>
            <span>/</span>
            <span className="text-teal-600">{product.subcategory || "Advanced Kits"}</span>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl border bg-white">
                {product.badge && (
                  <Badge className="absolute left-4 top-4 z-10 bg-amber-500 text-white hover:bg-amber-500">
                    {product.badge.toUpperCase()}
                  </Badge>
                )}
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                      selectedImage === index ? "border-teal-500" : "border-transparent"
                    }`}
                  >
                    <Image src={image} alt="" fill className="object-cover" />
                  </button>
                ))}
                <button className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border bg-gray-50">
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {product.ageRange && (
                  <Badge variant="outline" className="text-gray-600">{product.ageRange}</Badge>
                )}
                {product.difficulty && (
                  <Badge variant="outline" className="text-teal-600">{product.difficulty}</Badge>
                )}
                {product.compatibility?.includes("Python") && (
                  <Badge variant="outline" className="text-blue-600">
                    {"<>"} Python Compatible
                  </Badge>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-bold text-gray-900">{product.name}</h1>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} Reviews)</span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">Save {discountPercent}%</Badge>
                  </>
                )}
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-green-600">In stock. Ships within 24 hours.</span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center rounded-lg border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button className="flex-1 rounded-full" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <Button
                variant="outline"
                className="mt-3 w-full rounded-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                Add to Wishlist
              </Button>

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <p>{product.description}</p>
                {product.longDescription && <p>{product.longDescription}</p>}
              </div>

              <div className="mt-6 space-y-2">
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-teal-600" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-6 border-t pt-6">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-gray-500">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{product.warranty || "2 Year Warranty"}</p>
                    <p className="text-gray-500">Full coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Technical Specs</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Master the Basics of Engineering</h2>
                  <p className="mt-4 text-gray-600">
                    {product.longDescription || product.description}
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-xl border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <Package className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Build Circuits</h3>
                        <p className="text-sm text-gray-500">
                          Use the breadboard to create solderless circuits instantly.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <Code className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Write Code</h3>
                        <p className="text-sm text-gray-500">
                          Control the physical world with simple C++ based code.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-gray-900 p-6 text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-gray-400">blink_led.ino</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Easy to Code</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Here is a sample of how simple it is to blink an LED, your first project:
                  </p>
                  <pre className="mt-4 overflow-x-auto text-sm text-teal-400">
{`void setup() {
  // Initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH); // turn the LED on
  delay(1000);                      // wait for a second
  digitalWrite(LED_BUILTIN, LOW);  // turn the LED off
  delay(1000);                      // wait for a second
}`}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Technical Specs</h3>
                  <div className="mt-4 divide-y rounded-xl border">
                    {product.specs?.map((spec, index) => (
                      <div key={index} className="flex justify-between px-4 py-3">
                        <span className="text-gray-500">{spec.label}</span>
                        <span className="font-medium text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Box Contents</h3>
                  <div className="mt-4 space-y-2">
                    {product.boxContents?.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-600">
                        <Check className="h-4 w-4 text-teal-600" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-8">
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Project-Based Learning</h3>
                <p className="mt-2 text-gray-600">
                  This kit includes a 170-page project guide with step-by-step instructions for 15+ projects.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="grid gap-8 lg:grid-cols-3">
                <div>
                  <div className="rounded-2xl border p-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                      <div className="mt-1 text-sm text-gray-500">out of 5</div>
                      <div className="mt-2 flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Based on {product.reviewCount} global ratings</p>
                    </div>
                    <div className="mt-6 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="w-4 text-sm text-gray-600">{stars}</span>
                          <Progress value={stars === 5 ? 75 : stars === 4 ? 15 : 5} className="h-2" />
                          <span className="w-12 text-right text-sm text-gray-600">
                            {stars === 5 ? "75%" : stars === 4 ? "15%" : "5%"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-6 w-full rounded-full">Write a Review</Button>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border bg-white p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600 font-semibold">
                            {review.userName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{review.userName}</h4>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h5 className="mt-3 font-semibold text-gray-900">Great product!</h5>
                      <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                        <button className="flex items-center gap-1 hover:text-teal-600">
                          <ThumbsUp className="h-4 w-4" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Compatible Accessories</h2>
              <Link href="/products" className="text-sm font-medium text-teal-600 hover:underline">
                View all →
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                  </div>
                  <h3 className="mt-3 font-medium text-gray-900 group-hover:text-teal-600">{item.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
