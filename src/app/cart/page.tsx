"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Shield,
  HelpCircle,
  ArrowRight,
  CheckCircle,
  Package,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const shipping = items.some((i) => i.type === "product") ? 5.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Checkout:", { items, formData, total });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Looks like you haven't added any items yet.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button asChild className="rounded-full">
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-teal-600">Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-8">
          <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
            ORDER PROCESSING
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          <p className="mt-2 text-gray-600">
            Review your order details and complete your purchase to join the
            innovation journey.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-teal-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Your Cart ({items.length} items)
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="text-sm font-medium text-teal-600 hover:underline"
                >
                  Edit Cart
                </Link>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        {item.type === "course" ? (
                          <>
                            <Monitor className="h-4 w-4" />
                            <span>Online Course • Lifetime Access</span>
                          </>
                        ) : (
                          <>
                            <Package className="h-4 w-4" />
                            <span>Physical Product • In Stock</span>
                          </>
                        )}
                      </div>
                      {item.type === "product" && (
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border text-gray-600 hover:bg-gray-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-md border text-gray-600 hover:bg-gray-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-teal-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-teal-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Shipping Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="fullName"
                    placeholder="John Doe"
                    className="mt-1"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="address"
                    placeholder="123 Tech Blvd, Suite 400"
                    className="mt-1"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="city"
                      placeholder="San Francisco"
                      className="mt-1"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="postalCode"
                      placeholder="94105"
                      className="mt-1"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="billing"
                    checked={sameAsBilling}
                    onCheckedChange={(checked) =>
                      setSameAsBilling(checked as boolean)
                    }
                  />
                  <label htmlFor="billing" className="text-sm text-gray-600">
                    Billing address is same as shipping
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-teal-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Payment Method
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                    alt="Visa"
                    width={32}
                    height={20}
                    className="h-5 w-auto"
                  />
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                    alt="Mastercard"
                    width={32}
                    height={20}
                    className="h-5 w-auto"
                  />
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors ${
                    paymentMethod === "card"
                      ? "bg-teal-500 text-white"
                      : "border bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors ${
                    paymentMethod === "paypal"
                      ? "bg-teal-500 text-white"
                      : "border bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <div className="relative mt-1">
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        className="pl-10"
                        value={formData.cardNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiration Date
                      </label>
                      <Input
                        name="expiry"
                        placeholder="MM / YY"
                        className="mt-1"
                        value={formData.expiry}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <div className="relative mt-1">
                        <Input
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleChange}
                        />
                        <HelpCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                <Shield className="h-4 w-4" />
                Your transaction is secured with SSL encryption. We do not store
                your credit card details.
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (Estimated)</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    DISCOUNT CODE
                  </label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      placeholder="STEM2025"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button>Apply</Button>
                  </div>
                </div>

                <div className="mt-4 flex justify-between border-t pt-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-teal-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="mt-6 w-full rounded-full"
                  size="lg"
                >
                  Pay Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-teal-600" />
                  30-Day Money-Back Guarantee
                </div>

                <p className="mt-4 text-center text-xs text-gray-500">
                  By completing your purchase, you agree to our{" "}
                  <Link href="/terms" className="text-teal-600 hover:underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100">
                    <HelpCircle className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Need Help?</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Our support team is available 24/7 to assist you with your
                      order.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-2 inline-block text-sm font-medium text-teal-600 hover:underline"
                    >
                      Chat with us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
