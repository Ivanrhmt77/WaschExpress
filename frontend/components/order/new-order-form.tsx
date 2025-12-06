"use client";

import { useState, useEffect, useMemo } from "react";
import type { Customer, Service, Order } from "@/lib/types";
import {
  Shirt,
  WashingMachine,
  Truck,
  Zap,
  Package,
  PlusCircle,
  Sun,
  CloudRain,
  Loader,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CustomerForm } from "../customer/customer-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";

const IroningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 16h18" />
    <path d="M3 16l2.15-9.15A2 2 0 0 1 7.02 5h9.96a2 2 0 0 1 1.87 1.85L21 16" />
    <path d="M11 12H9" />
  </svg>
);

const serviceIcons: { [key: string]: React.ElementType } = {
  Shirt,
  WashingMachine,
  Ironing: IroningIcon,
  Truck,
  Zap,
  Package,
};

type NewOrderFormProps = {
  customers: Customer[];
  services: Service[];
};

type SelectedService = {
  service: Service;
  quantity: number;
};

export function NewOrderForm({
  customers: initialCustomers,
  services,
}: NewOrderFormProps) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [openCustomerPopover, setOpenCustomerPopover] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );
  const [isAiCalculating, setIsAiCalculating] = useState(false);
  const [aiResult, setAiResult] = useState<{
    time: Date;
    weather: "sun" | "rain";
  } | null>(null);
  const { toast } = useToast();

  const handleSelectService = (service: Service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.service.id === service.id);
      if (isSelected) {
        return prev.filter((s) => s.service.id !== service.id);
      } else {
        return [...prev, { service, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    if (quantity >= 0) {
      setSelectedServices((prev) =>
        prev.map((s) => (s.service.id === serviceId ? { ...s, quantity } : s))
      );
    }
  };

  const total = useMemo(() => {
    return selectedServices.reduce(
      (acc, s) => acc + s.service.price * s.quantity,
      0
    );
  }, [selectedServices]);

  useEffect(() => {
    if (selectedServices.length > 0) {
      setIsAiCalculating(true);
      setAiResult(null);
      const timer = setTimeout(() => {
        const isExpress = selectedServices.some(
          (s) => s.service.type === "express"
        );
        const baseHours = isExpress ? 6 : 24;
        const completionTime = new Date();
        completionTime.setHours(
          completionTime.getHours() + baseHours + Math.random() * 4
        );

        setAiResult({
          time: completionTime,
          weather: Math.random() > 0.5 ? "sun" : "rain",
        });
        setIsAiCalculating(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsAiCalculating(false);
      setAiResult(null);
    }
  }, [selectedServices]);

  const handleSaveCustomer = (
    customerData: Omit<Customer, "id" | "totalOrders" | "createdAt">
  ) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `CUST-${String(customers.length + 1).padStart(3, "0")}`,
      totalOrders: 0,
      createdAt: new Date(),
    };
    setCustomers([newCustomer, ...customers]);
    setSelectedCustomer(newCustomer);
    setIsCustomerModalOpen(false);
    toast({
      title: "Sukses",
      description: "Customer baru berhasil ditambahkan.",
    });
  };

  const handleSubmitOrder = () => {
    if (!selectedCustomer) {
      toast({
        title: "Gagal",
        description: "Silakan pilih pelanggan terlebih dahulu.",
        variant: "destructive",
      });
      return;
    }
    if (selectedServices.length === 0) {
      toast({
        title: "Gagal",
        description: "Silakan pilih minimal satu layanan.",
        variant: "destructive",
      });
      return;
    }
    // Logic to submit order
    toast({
      title: "Order Dibuat!",
      description: `Order untuk ${selectedCustomer.name} berhasil dibuat.`,
    });
    setSelectedCustomer(null);
    setSelectedServices([]);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section 1: Customer */}
          <Card>
            <CardHeader>
              <CardTitle>1. Informasi Pelanggan</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Popover
                open={openCustomerPopover}
                onOpenChange={setOpenCustomerPopover}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-[300px] justify-between"
                  >
                    {selectedCustomer
                      ? selectedCustomer.name
                      : "Pilih pelanggan..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Cari pelanggan..." />
                    <CommandList>
                      <CommandEmpty>Pelanggan tidak ditemukan.</CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            key={customer.id}
                            onSelect={() => {
                              setSelectedCustomer(customer);
                              setOpenCustomerPopover(false);
                            }}
                          >
                            {customer.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsCustomerModalOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Cepat
              </Button>
            </CardContent>
          </Card>

          {/* Section 2: Services */}
          <Card>
            <CardHeader>
              <CardTitle>2. Pilih Layanan</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((service) => {
                const Icon = serviceIcons[service.icon];
                const isSelected = selectedServices.some(
                  (s) => s.service.id === service.id
                );
                return (
                  <Card
                    key={service.id}
                    onClick={() => handleSelectService(service)}
                    className={cn(
                      "cursor-pointer transition-all",
                      isSelected && "border-primary border-2 shadow-lg"
                    )}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {service.name}
                      </CardTitle>
                      {Icon && (
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            service.type === "express"
                              ? "text-accent"
                              : "text-muted-foreground"
                          )}
                        />
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold">
                        {formatCurrency(service.price)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        per {service.unit}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Summary */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>3. Detail & Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedServices.length > 0 ? (
                selectedServices.map(({ service, quantity }) => (
                  <div key={service.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">
                        {service.name}
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleSelectService(service)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            service.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="flex-1"
                        min="1"
                      />
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        x {formatCurrency(service.price)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Pilih layanan untuk memulai.
                </p>
              )}
            </CardContent>
          </Card>

          {(isAiCalculating || aiResult) && (
            <Card className="bg-accent/10 border-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-accent">
                  <Zap className="h-5 w-5" /> AI Smart Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAiCalculating ? (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-pulse">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>AI sedang menghitung beban kerja & cuaca...</span>
                  </div>
                ) : (
                  aiResult && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {aiResult.weather === "sun" ? (
                          <Sun className="h-5 w-5 text-amber-500" />
                        ) : (
                          <CloudRain className="h-5 w-5 text-blue-400" />
                        )}
                        <p className="font-semibold">
                          Estimasi Selesai:{" "}
                          {aiResult.time.toLocaleDateString("id-ID", {
                            weekday: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {selectedServices.some(
                        (s) => s.service.type === "express"
                      ) && (
                        <Badge
                          variant="destructive"
                          className="bg-accent text-accent-foreground"
                        >
                          PRIORITAS TINGGI
                        </Badge>
                      )}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Total Biaya</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold tracking-tighter">
                {formatCurrency(total)}
              </p>
              <Button
                onClick={handleSubmitOrder}
                className="w-full mt-4"
                size="lg"
                disabled={!selectedCustomer || selectedServices.length === 0}
              >
                Buat Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Customer Baru</DialogTitle>
            <DialogDescription>
              Isi detail untuk customer baru.
            </DialogDescription>
          </DialogHeader>
          <CustomerForm
            customer={null}
            onSave={handleSaveCustomer}
            onCancel={() => setIsCustomerModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
