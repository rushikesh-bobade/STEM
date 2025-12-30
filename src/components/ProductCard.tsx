"use client"

import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  title: string
  category: string
  description: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  type: "HARDWARE" | "COURSE"
}

export function ProductCard({
  title,
  category,
  description,
  price,
  oldPrice,
  rating,
  reviews,
  image,
  badge,
  type
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-muted/20 bg-white">
      <CardHeader className="p-0 relative aspect-square overflow-hidden bg-secondary/20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className={cn(
            "font-bold px-3 py-0.5 text-[10px] border-none",
            type === "HARDWARE" ? "bg-black text-white" : "bg-teal-500 text-white"
          )}>
            {type}
          </Badge>
          {badge && (
            <Badge className="bg-rose-500 text-white font-bold px-3 py-0.5 text-[10px] border-none">
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <h3 className="font-bold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed min-h-[32px]">
          {description}
        </p>
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "h-3 w-3 fill-current", 
                  i < Math.floor(rating) ? "text-orange-400" : "text-muted"
                )} 
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">({reviews} reviews)</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {oldPrice && <span className="text-xs line-through text-muted-foreground">${oldPrice.toFixed(2)}</span>}
            <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
          </div>
          <Button size="icon" variant="secondary" className="rounded-full h-9 w-9 bg-primary/10 hover:bg-primary hover:text-white transition-all text-primary">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
