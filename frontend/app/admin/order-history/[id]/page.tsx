import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrderDetailClientPage } from "@/components/order/order-detail-client-page";
import type { Order } from "@/lib/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";
interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;

  // Fetch order from backend
  const res = await fetch(`${BACKEND_URL}/api/jobs/${id}`, { cache: "no-store" });
  if (!res.ok) return notFound();
  const orderJson = await res.json();

  const order: Order = {
    id: orderJson.id,
    customerId: orderJson.customerId,
    customerName: orderJson.customerName,
    items: orderJson.items,
    status: orderJson.status,
    total: orderJson.total,
    createdAt: new Date(orderJson.createdAt),
    estimatedCompletion: orderJson.estimatedCompletion
      ? new Date(orderJson.estimatedCompletion)
      : new Date(orderJson.createdAt),
    isExpress: !!orderJson.isExpress,
  };

  const customer = {
    id: orderJson.customer?.id || order.customerId,
    name: orderJson.customer?.name || order.customerName,
    whatsapp: orderJson.customer?.phone || "",
    address: "",
    totalOrders: 0,
    createdAt: new Date(),
  };

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title={`Detail Order #${order.id}`}
        description={`Dipesan oleh ${order.customerName} pada ${order.createdAt.toLocaleDateString("id-ID")}`}
      >
        <Button variant="outline" asChild>
          <Link href="/admin/order-history">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Riwayat
          </Link>
        </Button>
      </PageHeader>

      <OrderDetailClientPage order={order as Order} customer={customer} />
    </div>
  );
}
