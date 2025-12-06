import { CustomerClientPage } from "@/components/customer/customer-client-page";
import { PageHeader } from "@/components/shared/page-header";
import { mockCustomers } from "@/lib/data";

export default function DatabaseCustomerPage() {
  // In a real app, you would fetch this data from your database.
  const customers = mockCustomers;

  return (
    <div className="p-6 md:p-8">
      <CustomerClientPage initialCustomers={customers} />
    </div>
  );
}
