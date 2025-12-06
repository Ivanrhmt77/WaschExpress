import { Activity, CreditCard, DollarSign, WashingMachine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { mockOrders } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function DashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const todayRevenue = mockOrders
    .filter(
      (order) =>
        order.createdAt.toDateString() === new Date().toDateString() &&
        order.status !== "Tertunda"
    )
    .reduce((sum, order) => sum + order.total, 0);

  const activeOrders = mockOrders.filter(
    (order) => order.status === "Dicuci"
  ).length;

  const recentOrders = mockOrders
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Dashboard"
        description="Ringkasan performa laundry Anda hari ini."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Pendapatan Hari Ini"
          value={formatCurrency(todayRevenue)}
          icon={DollarSign}
          description="Total pendapatan dari order yang masuk hari ini."
        />
        <StatCard
          title="Order Aktif"
          value={`${activeOrders} Order`}
          icon={Activity}
          description="Jumlah order yang sedang dalam status 'Dicuci'."
        />
        <StatCard
          title="Mesin Terpakai"
          value="4 / 6 Mesin"
          icon={WashingMachine}
          description="Simulasi jumlah mesin yang sedang beroperasi."
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {order.customerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Order baru dari{" "}
                      <span className="font-bold">{order.customerName}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(order.createdAt, {
                        addSuffix: true,
                        locale: id,
                      })}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {formatCurrency(order.total)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
