"use client";

import { useState } from "react";
import { PlusCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Customer } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CustomerForm } from "./customer-form";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";

export function CustomerClientPage({
  initialCustomers,
}: {
  initialCustomers: Customer[];
}) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const handleOpenModal = (customer: Customer | null = null) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSaveCustomer = (
    customerData: Omit<Customer, "id" | "totalOrders" | "createdAt">
  ) => {
    if (editingCustomer) {
      // Edit existing customer
      const updatedCustomers = customers.map((c) =>
        c.id === editingCustomer.id ? { ...c, ...customerData } : c
      );
      setCustomers(updatedCustomers);
      toast({
        title: "Sukses",
        description: "Data customer berhasil diperbarui.",
      });
    } else {
      // Add new customer
      const newCustomer: Customer = {
        ...customerData,
        id: `CUST-${String(customers.length + 1).padStart(3, "0")}`,
        totalOrders: 0,
        createdAt: new Date(),
      };
      setCustomers([newCustomer, ...customers]);
      toast({
        title: "Sukses",
        description: "Customer baru berhasil ditambahkan.",
      });
    }
    handleCloseModal();
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers(customers.filter((c) => c.id !== customerId));
    toast({
      title: "Sukses",
      description: "Customer berhasil dihapus.",
      variant: "destructive",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <PageHeader
        title="Database Pelanggan"
        description="Kelola semua data pelanggan Anda di satu tempat."
      >
        <Button onClick={() => handleOpenModal()}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Customer
        </Button>
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            Total {customers.length} pelanggan terdaftar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>No. WhatsApp</TableHead>
                <TableHead className="hidden md:table-cell">Alamat</TableHead>
                <TableHead className="text-right">Total Order</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{customer.whatsapp}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {customer.address}
                  </TableCell>
                  <TableCell className="text-right">
                    {customer.totalOrders}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleOpenModal(customer)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? "Edit Customer" : "Tambah Customer Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingCustomer
                ? "Perbarui detail customer di bawah ini."
                : "Isi detail untuk customer baru."}
            </DialogDescription>
          </DialogHeader>
          <CustomerForm
            customer={editingCustomer}
            onSave={handleSaveCustomer}
            onCancel={handleCloseModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
