import { notFound } from "next/navigation";
import { mockOrders, mockCustomers } from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { OrderDetailClientPage } from "@/components/order/order-detail-client-page";
import { Order } from "@/lib/types";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  const order = mockOrders.find((o) => o.id === id);
  if (!order) notFound();

  const customer = mockCustomers.find((c) => c.id === order.customerId);
  if (!customer) notFound();

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title={`Detail Order #${order.id}`}
        description={`Dipesan oleh ${
          order.customerName
        } pada ${order.createdAt.toLocaleDateString("id-ID")}`}
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
