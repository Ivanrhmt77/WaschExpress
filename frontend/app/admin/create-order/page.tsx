export const dynamic = "force-dynamic";

import { NewOrderForm } from "@/components/order/new-order-form";
import { PageHeader } from "@/components/shared/page-header";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

async function getCustomers() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/customers`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getPendingOrders() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/jobs/pending`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function CreateOrderPage() {
  const customers = await getCustomers();
  const pendingOrders = await getPendingOrders();

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Buat Order Baru"
        description="Lengkapi form di bawah untuk membuat order laundry baru."
      />
      <NewOrderForm
        customers={customers}
        services={[]}
        pendingOrders={pendingOrders}
      />
    </div>
  );
}
