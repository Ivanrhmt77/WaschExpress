import { NewOrderForm } from "@/components/order/new-order-form";
import { PageHeader } from "@/components/shared/page-header";
import { mockCustomers, mockServices, mockOrders } from "@/lib/data";

export default function CreateOrderPage() {
  const pendingOrders = mockOrders.filter((o) => o.status === "Tertunda");

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Buat Order Baru"
        description="Lengkapi form di bawah untuk membuat order laundry baru."
      />
      <NewOrderForm
        customers={mockCustomers}
        services={mockServices}
        pendingOrders={pendingOrders}
      />
    </div>
  );
}
