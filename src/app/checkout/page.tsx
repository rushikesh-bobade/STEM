"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, ChevronRight, Trash2, Plus, Minus, CreditCard, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const cartItems = [
  {
    id: 1,
    title: "Introduction to Neural Networks",
    type: "Online Course",
    access: "Lifetime Access",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Arduino Starter Kit v2",
    type: "Physical Product",
    access: "In Stock",
    price: 29.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=200&auto=format&fit=crop",
  },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = React.useState("credit-card")

  return (
    <div className="bg-[#f8fcfc] min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/cart" className="hover:text-primary">Cart</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary font-bold">Checkout</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-widest font-bold text-[10px]">
            Order Processing
          </Badge>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Secure Checkout</h1>
          <p className="text-muted-foreground text-sm">Review your order details and complete your purchase to join the innovation journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Your Cart */}
            <section className="bg-white rounded-3xl p-8 border border-muted/20 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-xl">Your Cart (2 items)</h2>
                </div>
                <Link href="/cart" className="text-xs text-primary font-bold hover:underline">Edit Cart</Link>
              </div>

              <div className="space-y-6">
                {cartItems.map((item, idx) => (
                  <div key={item.id}>
                    <div className="flex gap-6">
                      <div className="relative h-24 w-32 rounded-2xl overflow-hidden bg-secondary/30 shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-bold text-base">{item.title}</h3>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                            <span>{item.type}</span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground/30"></span>
                            <span>{item.access}</span>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end gap-3">
                          <span className="font-bold text-xl text-primary">${item.price.toFixed(2)}</span>
                          {item.quantity ? (
                            <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                              <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-white transition-colors"><Minus className="h-3 w-3" /></button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button className="h-6 w-6 rounded flex items-center justify-center hover:bg-white transition-colors"><Plus className="h-3 w-3" /></button>
                            </div>
                          ) : (
                            <button className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground hover:text-rose-500 transition-colors">
                              <Trash2 className="h-3.5 w-3.5" /> Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {idx < cartItems.length - 1 && <Separator className="mt-6 opacity-50" />}
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Information */}
            <section className="bg-white rounded-3xl p-8 border border-muted/20 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Plus className="h-5 w-5" />
                </div>
                <h2 className="font-bold text-xl">Shipping Information</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground ml-1">Full Name *</label>
                    <Input placeholder="John Doe" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground ml-1">Email Address *</label>
                    <Input placeholder="john@example.com" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground ml-1">Street Address *</label>
                    <Input placeholder="123 Tech Blvd, Suite 400" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground ml-1">City *</label>
                    <Input placeholder="San Francisco" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground ml-1">Postal Code *</label>
                    <Input placeholder="94105" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                  </div>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <Checkbox id="same-billing" defaultChecked className="mt-0.5 border-muted-foreground/30 data-[state=checked]:bg-primary" />
                  <label htmlFor="same-billing" className="text-xs font-bold text-muted-foreground cursor-pointer">
                    Billing address is same as shipping
                  </label>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-3xl p-8 border border-muted/20 shadow-sm space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <h2 className="font-bold text-xl">Payment Method</h2>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-10 bg-secondary/50 rounded border border-muted/20 flex items-center justify-center">
                    <div className="w-6 h-4 bg-muted-foreground/20 rounded-sm"></div>
                  </div>
                  <div className="h-6 w-10 bg-secondary/50 rounded border border-muted/20 flex items-center justify-center">
                    <div className="w-6 h-4 bg-muted-foreground/20 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <RadioGroup defaultValue="credit-card" onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                <Label
                  htmlFor="credit-card"
                  className={cn(
                    "flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                    paymentMethod === "credit-card" ? "border-primary bg-primary/5 text-primary" : "border-muted/20 hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                  <CreditCard className="h-4 w-4" />
                  <span className="font-bold text-sm">Credit Card</span>
                </Label>
                <Label
                  htmlFor="paypal"
                  className={cn(
                    "flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                    paymentMethod === "paypal" ? "border-primary bg-primary/5 text-primary" : "border-muted/20 hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                  <div className="font-bold text-sm italic">PayPal</div>
                </Label>
              </RadioGroup>

              <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground ml-1">Card Number</label>
                  <div className="relative">
                    <Input placeholder="0000 0000 0000 0000" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary pl-12" />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground ml-1">Expiration Date</label>
                    <Input placeholder="MM / YY" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground ml-1">CVC</label>
                    <div className="relative">
                      <Input placeholder="123" className="h-12 rounded-xl border-muted/20 bg-secondary/20 focus-visible:ring-primary" />
                      <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-help" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-[10px] text-muted-foreground font-medium">
                    Your transaction is secured with SSL encryption. We do not store your credit card details.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-white rounded-3xl p-8 border border-muted/20 shadow-lg shadow-primary/5 sticky top-28">
              <h2 className="font-bold text-xl mb-8">Order Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="font-bold">$79.98</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Shipping</span>
                  <span className="font-bold">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Tax (Estimated)</span>
                  <span className="font-bold">$6.40</span>
                </div>
                
                <Separator className="my-6 opacity-50" />
                
                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Discount Code</p>
                  <div className="flex gap-2">
                    <Input placeholder="STEM2025" className="h-11 rounded-xl border-muted/20 bg-secondary/30" />
                    <Button variant="default" className="h-11 rounded-xl px-6 font-bold bg-slate-900 text-white hover:bg-slate-800">Apply</Button>
                  </div>
                </div>

                <Separator className="my-6 opacity-50" />

                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-bold text-primary">$91.38</span>
                </div>

                <Button className="w-full h-14 rounded-full font-bold text-lg shadow-xl shadow-primary/20">
                  Pay Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="pt-8 space-y-4">
                  <div className="flex items-center justify-center gap-2 py-2 px-4 bg-green-50 rounded-xl border border-green-100">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-bold text-green-700">30-Day Money-Back Guarantee</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                    By completing your purchase, you agree to our <Link href="#" className="text-primary font-bold hover:underline">Terms of Service</Link>.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
              <div className="flex gap-4">
                <div className="h-10 w-10 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/5">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">Need Help?</h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">Our support team is available 24/7 to assist you with your order.</p>
                  <Link href="/contact" className="inline-block pt-1 text-xs font-bold text-primary hover:underline">Chat with us</Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
