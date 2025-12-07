import { PageHeader } from "@/components/shared/page-header";
import { OrderTable } from "@/components/order/order-table";
import { mockOrders } from "@/lib/data";

export default function OrderHistoryPage() {
  const orders = mockOrders;

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Riwayat Order"
        description="Lihat dan kelola semua order yang pernah dibuat."
      />
      <OrderTable orders={orders} />
    </div>
  );
}
