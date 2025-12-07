"use client";
import type { Order, OrderStatus } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Shirt, Clock, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

const statuses: OrderStatus[] = [
  "Tertunda",
  "Dicuci",
  "Siap Diambil",
  "Selesai",
];

export function PublicTrackingView({ order }: { order: Order }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentStatusIndex = statuses.indexOf(order.status);
  const progressValue = ((currentStatusIndex + 1) / statuses.length) * 100;

  const getStatusColor = (index: number) => {
    if (index < currentStatusIndex) return "bg-blue-600";
    if (index === currentStatusIndex) return "bg-yellow-400";
    return "bg-gray-200";
  };

  return (
    // UBAH: py-12 jadi py-16 biar lebih lega atas bawahnya
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50 py-16 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* UBAH: mb-2 jadi mb-10 biar ada jarak jauh ke logo */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
        </div>

        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="p-2.5 rounded-xl bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
            <Shirt className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            WaschExpress
          </span>
        </div>

        <Card className="w-full shadow-xl overflow-hidden py-0">
          <CardHeader className="text-center bg-linear-to-r from-blue-600 to-indigo-600 text-white pb-8 pt-6">
            <h1 className="text-2xl font-bold mb-2">Status Order Anda</h1>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
              <p className="text-sm font-medium">ID Order: #{order.id}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-8 pb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-700">
                  Status Saat Ini
                </span>
                <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-semibold px-3 py-1">
                  {order.status}
                </Badge>
              </div>

              <div className="relative pt-2 pb-6">
                <div className="flex justify-between items-center mb-2">
                  {statuses.map((status, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(
                          index
                        )} transition-all duration-300 shadow-md ${
                          index === currentStatusIndex
                            ? "ring-4 ring-yellow-200"
                            : ""
                        }`}
                      >
                        {index <= currentStatusIndex && (
                          <Package className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="absolute top-7 left-0 right-0 h-1 bg-gray-200 mx-5"
                  style={{ zIndex: 0 }}
                >
                  <div
                    className="h-full bg-linear-to-r from-blue-600 to-yellow-400 transition-all duration-500"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs font-medium text-gray-600 mt-2">
                  <span className="text-center w-16">Diterima</span>
                  <span className="text-center w-16">Dicuci</span>
                  <span className="text-center w-16">Siap</span>
                  <span className="text-center w-16">Selesai</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">
                  Estimasi Selesai
                </h3>
              </div>
              <p className="text-blue-700 font-bold text-lg">
                {order.estimatedCompletion
                  ? format(
                      new Date(order.estimatedCompletion as unknown as string),
                      "eeee, d MMMM yyyy 'pukul' HH:mm",
                      { locale: id }
                    )
                  : "Belum tersedia"}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                Ringkasan Layanan
              </h3>
              <div className="bg-yellow-50 rounded-lg p-4 space-y-2 border border-yellow-100">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-700 font-medium">
                      {item.serviceName} ({item.quantity} {item.unit})
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between items-center bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-lg shadow-md">
                <span className="font-bold text-lg">Total Biaya</span>
                <span className="font-bold text-xl">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Terima kasih telah mempercayai WaschExpress! 💙
        </p>
      </div>
    </div>
  );
}
