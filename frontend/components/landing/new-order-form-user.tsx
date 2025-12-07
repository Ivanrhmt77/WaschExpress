"use client";

import { useMemo, useState } from "react";
import { mockServices } from "@/lib/data";
import type { Service } from "@/lib/types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  CheckCircle2,
  User,
  Phone,
  Shirt,
  WashingMachine,
  Truck,
  Zap,
  Layers,
  Timer,
  Droplet,
} from "lucide-react";

const serviceIcons: { [key: string]: React.ElementType } = {
  Shirt,
  WashingMachine,
  Layers,
  Truck,
  Timer,
  Droplet,
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function NewOrderFormUser() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    mockServices[0]?.id ?? ""
  );
  const [pickup, setPickup] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedService: Service | undefined = useMemo(
    () => mockServices.find((s) => s.id === selectedServiceId),
    [selectedServiceId]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedService) {
      toast.error("Lengkapi data: Nama, nomor HP, dan layanan wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:4001/api/submitJob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service_type: selectedService.type,
          pickup,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      // Success notification
      toast.success("✅ Permintaan Berhasil Dikirim!", {
        description: `Terima kasih ${name}! Admin akan menimbang cucian dan menginformasikan total biaya.`,
      });

      // Reset form
      setName("");
      setPhone("");
      setSelectedServiceId(mockServices[0]?.id ?? "");
      setPickup(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Gagal mengirim permintaan", {
        description: "Terjadi kesalahan saat menghubungi server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Format phone input to international-ish: replace leading 0 with 62,
  // and if user types starting with 8 (e.g. 8xxxx), prepend 62 so they only
  // need to type the local part after 62. Store only digits.
  function formatPhoneInput(raw: string) {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.startsWith("0")) {
      return "62" + digits.slice(1);
    }
    return digits;
  }

  // Ensure quick UX: when focusing the phone field, if it's empty prefill '62'
  function handlePhoneFocus() {
    if (!phone) setPhone("62");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-lg border-0 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Pesan Laundry Sekarang
          </CardTitle>
          <CardDescription className="text-lg">
            Masukkan data kontak Anda. Berat cucian dan total biaya akan
            ditentukan oleh admin setelah penimbangan di outlet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Nomor HP / WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      placeholder="8xxxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                      onFocus={handlePhoneFocus}
                      required
                      className="h-12"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shirt className="h-5 w-5 text-green-600" />
                  Pilih Layanan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockServices.map((svc) => {
                      const Icon = serviceIcons[svc.icon] || Shirt;
                      return (
                        <Card
                          key={svc.id}
                          onClick={() =>
                            !isSubmitting && setSelectedServiceId(svc.id)
                          }
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedServiceId === svc.id
                              ? "border-green-500 border-2 shadow-lg bg-green-50 dark:bg-green-950/20"
                              : "border-gray-200 dark:border-gray-800"
                          } ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Icon className="h-8 w-8 text-green-600" />
                              <div className="flex-1">
                                <h3 className="font-semibold">{svc.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {formatCurrency(svc.price)} / {svc.unit}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    *Harga final dihitung berdasarkan berat/jumlah aktual saat
                    diterima.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-rose-200 dark:border-rose-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5 text-rose-600" />
                  Antar Jemput (Opsional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      Tambahkan layanan antar jemput
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Biaya tambahan: {formatCurrency(5000)}
                    </p>
                  </div>
                  <div>
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={pickup}
                        onChange={(e) => setPickup(e.target.checked)}
                        className="h-4 w-4"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm">Ya</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-amber-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                        Siap Mengirim Permintaan?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Total tagihan akan muncul di halaman tracking setelah
                        admin memproses pesanan Anda.
                      </p>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto min-w-[200px] h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Kirim Permintaan
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
