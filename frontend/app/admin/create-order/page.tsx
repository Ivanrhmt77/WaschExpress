import { NewOrderForm } from "@/components/order/new-order-form";
import { PageHeader } from "@/components/shared/page-header";
import { mockServices } from "@/lib/data";

async function getCustomers() {
  try {
    const res = await fetch("http://localhost:4001/api/customers", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch customers", e);
    return [];
  }
}

async function getPendingOrders() {
  try {
    const res = await fetch("http://localhost:4001/api/jobs/pending", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Failed to fetch pending orders", e);
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
        services={mockServices}
        pendingOrders={pendingOrders}
      />
    </div>
  );
}
