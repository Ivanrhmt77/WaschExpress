import { PageHeader } from "@/components/shared/page-header";
import { OrderTable } from "@/components/order/order-table";
import type { Order } from "@/lib/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

export default async function OrderHistoryPage() {
  let orders: Order[] = [];

  try {
    const res = await fetch(`${BACKEND_URL}/api/jobs/history`, {
      // Force dynamic to avoid static rendering cache
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    orders = await res.json();
  } catch (e) {
    // graceful fallback: show empty list
    orders = [];
  }

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
