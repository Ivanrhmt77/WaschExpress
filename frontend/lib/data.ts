import type { Customer, Service, Order, OrderStatus } from "./types";
import { Shirt, WashingMachine, Truck, Zap, Package } from "lucide-react";

export const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Kats",
    whatsapp: "6285609580519",
    address: "Jl. Merdeka No. 1, Jakarta",
    totalOrders: 5,
    createdAt: new Date("2023-10-15"),
  },
  {
    id: "CUST-002",
    name: "Siti Aminah",
    whatsapp: "6281298765432",
    address: "Jl. Pahlawan No. 10, Bandung",
    totalOrders: 8,
    createdAt: new Date("2023-09-01"),
  },
  {
    id: "CUST-003",
    name: "Agus Wijaya",
    whatsapp: "6285611223344",
    address: "Jl. Sudirman No. 55, Surabaya",
    totalOrders: 2,
    createdAt: new Date("2023-11-01"),
  },
  {
    id: "CUST-004",
    name: "Dewi Lestari",
    whatsapp: "6287755667788",
    address: "Jl. Gajah Mada No. 22, Yogyakarta",
    totalOrders: 12,
    createdAt: new Date("2023-05-20"),
  },
  {
    id: "CUST-005",
    name: "Rian Hidayat",
    whatsapp: "6281344556677",
    address: "Jl. Diponegoro No. 8, Semarang",
    totalOrders: 1,
    createdAt: new Date("2023-11-10"),
  },
];

export const mockServices: Service[] = [
  {
    id: "SVC-001",
    name: "Cuci Kering Lipat",
    price: 6000,
    unit: "kg",
    type: "regular",
    icon: "WashingMachine",
  },
  {
    id: "SVC-002",
    name: "Cuci & Setrika",
    price: 7000,
    unit: "kg",
    type: "regular",
    icon: "Shirt",
  },
  {
    id: "SVC-003",
    name: "Setrika Saja",
    price: 4000,
    unit: "kg",
    type: "regular",
    icon: "Layers",
  },
  {
    id: "SVC-004",
    name: "Laundry Express",
    price: 9000,
    unit: "kg",
    type: "express",
    icon: "Timer",
  },
  {
    id: "SVC-005",
    name: "Dry Cleaning",
    price: 15000,
    unit: "pcs",
    type: "regular",
    icon: "Droplet",
  },
  {
    id: "SVC-006",
    name: "Antar Jemput",
    price: 5000,
    unit: "trip",
    type: "regular",
    icon: "Truck",
  },
];

const now = new Date();

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "CUST-001",
    customerName: "Kats",
    items: [
      {
        serviceId: "SVC-002",
        serviceName: "Cuci & Setrika",
        quantity: 5,
        price: 7000,
        unit: "kg",
      },
    ],
    status: "Selesai",
    total: 35000,
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    estimatedCompletion: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    isExpress: false,
  },
  {
    id: "ORD-002",
    customerId: "CUST-002",
    customerName: "Siti Aminah",
    items: [
      {
        serviceId: "SVC-004",
        serviceName: "Laundry Express",
        quantity: 3,
        price: 9000,
        unit: "kg",
      },
    ],
    status: "Siap Diambil",
    total: 27000,
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    estimatedCompletion: new Date(now.getTime() + 4 * 60 * 60 * 1000),
    isExpress: true,
  },
  {
    id: "ORD-003",
    customerId: "CUST-003",
    customerName: "Agus Wijaya",
    items: [
      {
        serviceId: "SVC-005",
        serviceName: "Dry Cleaning",
        quantity: 2,
        price: 15000,
        unit: "pcs",
      },
    ],
    status: "Dicuci",
    total: 30000,
    createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000),
    estimatedCompletion: new Date(now.getTime() + 16 * 60 * 60 * 1000),
    isExpress: false,
  },
  {
    id: "ORD-004",
    customerId: "CUST-001",
    customerName: "Budi Santoso",
    items: [
      {
        serviceId: "SVC-001",
        serviceName: "Cuci Kering Lipat",
        quantity: 8,
        price: 6000,
        unit: "kg",
      },
    ],
    status: "Dicuci",
    total: 48000,
    createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    estimatedCompletion: new Date(now.getTime() + 20 * 60 * 60 * 1000),
    isExpress: false,
  },
  {
    id: "ORD-005",
    customerId: "CUST-004",
    customerName: "Dewi Lestari",
    items: [
      {
        serviceId: "SVC-001",
        serviceName: "Cuci Kering Lipat",
        quantity: 4,
        price: 6000,
        unit: "kg",
      },
      {
        serviceId: "SVC-006",
        serviceName: "Antar Jemput",
        quantity: 1,
        price: 5000,
        unit: "trip",
      },
    ],
    status: "Tertunda",
    total: 29000,
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    estimatedCompletion: new Date(now.getTime() + 48 * 60 * 60 * 1000),
    isExpress: false,
  },
];
