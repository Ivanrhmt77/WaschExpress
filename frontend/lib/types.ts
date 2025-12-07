import type { LucideIcon } from "lucide-react";

export type Customer = {
  id: string;
  name: string;
  whatsapp: string;
  address: string;
  totalOrders: number;
  createdAt: Date;
};

export type Service = {
  id: string;
  name: string;
  price: number;
  unit: "kg" | "pcs" | "trip";
  type: "regular" | "express";
  icon: string; // Lucide icon name
};

export type OrderStatus = "Tertunda" | "Dicuci" | "Siap Diambil" | "Selesai";

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  items: {
    serviceId: string;
    serviceName: string;
    quantity: number;
    price: number;
    unit: "kg" | "pcs" | "trip";
  }[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
  estimatedCompletion: Date;
  isExpress: boolean;
};
