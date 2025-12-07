"use client";

import { useState, useEffect, useMemo } from "react";
import type { Customer, Service, Order } from "@/lib/types";
import {
  Shirt,
  WashingMachine,
  Truck,
  Zap,
  Layers,
  PlusCircle,
  Sun,
  CloudRain,
  Loader,
  X,
  Timer,
  Droplet,
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
import { format } from "date-fns";
import { id } from "date-fns/locale";

const serviceIcons: { [key: string]: React.ElementType } = {
  Shirt,
  WashingMachine,
  Layers,
  Truck,
  Timer,
  Droplet,
};

type NewOrderFormProps = {
  customers: Customer[];
  services: Service[];
};

type SelectedService = {
  service: Service;
  quantity: number;
};

type AiResult = {
  estimatedCompletionTime: string;
  weatherCondition: string;
  priority?: string;
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
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
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
    const fetchPrediction = async () => {
      if (selectedServices.length > 0) {
        setIsAiCalculating(true);
        setAiResult(null);

        const totalQuantity = selectedServices.reduce(
          (acc, s) => acc + s.quantity,
          0
        );
        const isExpress = selectedServices.some(
          (s) => s.service.type === "express"
        );

        try {
          const response = await fetch("http://localhost:4001/api/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              kilos: totalQuantity,
              service_type: isExpress ? "express" : "regular",
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          setAiResult({
            estimatedCompletionTime: data.estimated_completion,
            weatherCondition: data.weather_condition,
            priority: isExpress ? "Express" : undefined,
          });
        } catch (error) {
          console.error("AI prediction failed:", error);
          toast({
            title: "Prediksi Gagal",
            description:
              "Gagal mendapatkan estimasi dari server. Silakan coba lagi.",
            variant: "destructive",
          });
          setAiResult(null); // Clear previous results on error
        } finally {
          setIsAiCalculating(false);
        }
      } else {
        setIsAiCalculating(false);
        setAiResult(null);
      }
    };

    const timer = setTimeout(() => {
      fetchPrediction();
    }, 500); // Debounce API call

    return () => clearTimeout(timer);
  }, [selectedServices, toast]);

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
  const formatEstimationDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "eeee, d MMMM yyyy 'pukul' HH:mm", { locale: id });
    } catch (e) {
      return dateString; // Fallback to raw string if format fails
    }
  };

  const getWeatherIcon = (weather: string) => {
    const lowerCaseWeather = weather.toLowerCase();
    if (
      lowerCaseWeather.includes("hujan") ||
      lowerCaseWeather.includes("rain")
    ) {
      return <CloudRain className="h-5 w-5 text-blue-400" />;
    }
    if (
      lowerCaseWeather.includes("cerah") ||
      lowerCaseWeather.includes("sun")
    ) {
      return <Sun className="h-5 w-5 text-amber-500" />;
    }
    return <Sun className="h-5 w-5 text-muted-foreground" />;
  };

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
                      isSelected && "border-blue-500 border-2 shadow-lg"
                    )}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {service.name}
                      </CardTitle>
                      {Icon && <Icon className="h-4 w-4 text-blue-500" />}
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
                        {getWeatherIcon(aiResult.weatherCondition)}
                        <p className="font-semibold">Estimasi Selesai:</p>
                      </div>
                      <p className="font-bold text-primary">
                        {formatEstimationDate(aiResult.estimatedCompletionTime)}
                      </p>
                      {aiResult.priority && (
                        <Badge
                          variant="destructive"
                          className="bg-accent text-accent-foreground"
                        >
                          {aiResult.priority}
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
