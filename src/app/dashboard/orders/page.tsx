"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface OrderItem {
  id: number;
  itemType: string;
  itemId: number;
  itemName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  paymentMethod: string | null;
  createdAt: string;
  completedAt: string | null;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "refunded":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price / 100);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Order History</h1>
          <p className="text-muted-foreground">
            View and manage your course purchases
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">No orders yet</p>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Browse our course catalog and start learning today
              </p>
              <Button asChild>
                <a href="/courses">Browse Courses</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>Order #{order.id}</CardTitle>
                      <CardDescription>
                        {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                      </CardDescription>
                    </div>
                    <div className="text-right space-y-2">
                      {getStatusBadge(order.status)}
                      <p className="text-2xl font-bold">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Items:</p>
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.itemName}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {item.itemType}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatPrice(item.price)}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Info */}
                  {order.paymentMethod && (
                    <div className="flex items-center justify-between text-sm pt-2 border-t">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span className="font-medium capitalize">
                        {order.paymentMethod}
                      </span>
                    </div>
                  )}

                  {order.completedAt && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">
                        {format(new Date(order.completedAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Receipt
                    </Button>
                    {order.status === "completed" && (
                      <Button variant="outline" size="sm" className="flex-1">
                        Request Refund
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                • All payments are securely processed through our payment gateway
              </p>
              <p>
                • Refund requests are typically processed within 5-7 business days
              </p>
              <p>
                • For billing questions, contact support@techyguide.com
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
