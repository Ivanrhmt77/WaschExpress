"use client";

import { useState } from "react";
import type { Order, Customer, OrderStatus } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statuses: OrderStatus[] = [
  "Tertunda",
  "Dicuci",
  "Siap Diambil",
  "Selesai",
];

export function OrderDetailClientPage({
  order: initialOrder,
  customer,
}: {
  order: Order;
  customer: Customer;
}) {
  const [order, setOrder] = useState(initialOrder);
  const { toast } = useToast();

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrder({ ...order, status: newStatus });
    toast({
      title: "Status Diperbarui",
      description: `Status order #${order.id} telah diperbarui menjadi "${newStatus}".`,
    });
  };

  const handleSendWhatsApp = () => {
    const message =
      `Halo ${customer.name}! 👋\n\n` +
      `Pesanan laundry kamu dengan ID *${order.id}* saat ini berada pada status: *${order.status}*.\n\n` +
      `Kamu bisa cek progress lengkapnya di link berikut:\n${window.location.origin}/track/${order.id}\n\n` +
      `Terima kasih telah menggunakan layanan kami! 🧺✨`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${
      customer.whatsapp
    }&text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Timeline Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {statuses.map((status, index) => {
                const isActive = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={status} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {isActive ? (
                          isCurrent && status !== "Selesai" ? (
                            <Loader className="animate-spin h-5 w-5" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5" />
                          )
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </div>
                      {index < statuses.length - 1 && (
                        <div
                          className={cn(
                            "w-0.5 h-12 mt-2",
                            isActive ? "bg-primary" : "bg-muted"
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className={cn(
                          "font-semibold",
                          isActive && "text-primary"
                        )}
                      >
                        {status}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isCurrent
                          ? `Status saat ini`
                          : isActive
                          ? `Selesai`
                          : "Menunggu"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {/* Select Status */}
        <Card>
          <CardHeader>
            <CardTitle>Ubah Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={handleStatusChange} value={order.status}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status baru" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSendWhatsApp}
            >
              Kirim Info ke WA
            </Button>
          </CardContent>
        </Card>

        {/* Ringkasan */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.serviceName} ({item.quantity} {item.unit})
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
