"use client";

import { useRouter } from "next/navigation";
import type { Order, OrderStatus } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const statusColors: Record<OrderStatus, string> = {
  Tertunda: "bg-gray-500",
  Dicuci: "bg-blue-500",
  "Siap Diambil": "bg-green-500",
  Selesai: "bg-gray-800 dark:bg-gray-300 dark:text-gray-900",
};

export function OrderTable({ orders }: { orders: Order[] }) {
  const router = useRouter();

  const handleRowClick = (orderId: string) => {
    router.push(`/admin/order-history/${orderId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getServicesString = (items: Order["items"]) => {
    const names = items.map((item) => item.serviceName);
    if (names.length > 1) {
      return `${names[0]}, +${names.length - 1} lainnya`;
    }
    return names[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Semua Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Layanan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Tanggal</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                onClick={() => handleRowClick(order.id)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{getServicesString(order.items)}</TableCell>
                <TableCell>
                  <Badge
                    className={cn("text-white", statusColors[order.status])}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(order.createdAt, "d MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(order.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
