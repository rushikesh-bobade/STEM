"use client"

import Image from "next/image"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CourseCardProps {
  title: string
  category: string
  description: string
  price: number
  oldPrice?: number
  rating: number
  image: string
  badge?: string
}

export function CourseCard({
  title,
  category,
  description,
  price,
  oldPrice,
  rating,
  image,
  badge,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-secondary/30">
      <CardHeader className="p-0 relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {badge && (
            <Badge className={cn(
              "font-bold px-3 py-1 border-none",
              badge === "Bestseller" ? "bg-orange-500 text-white" : 
              badge === "New" ? "bg-teal-500 text-white" : 
              "bg-rose-500 text-white"
            )}>
              {badge}
            </Badge>
          )}
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4 text-rose-500" />
        </button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{category}</span>
          <div className="flex items-center gap-1 text-orange-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-xs font-bold">{rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center gap-3">
          <div className="text-xs text-muted-foreground">Total Price</div>
          <div className="flex items-center gap-2">
            {oldPrice && <span className="text-xs line-through text-muted-foreground">${oldPrice.toFixed(2)}</span>}
            <span className="text-xl font-bold text-foreground">${price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-end">
        <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 bg-primary/10 hover:bg-primary hover:text-white transition-all">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

import { cn } from "@/lib/utils"
