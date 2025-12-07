"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { mockOrders } from "@/lib/data";
import { PublicTrackingView } from "@/components/tracking/public-tracking-view";

export default function PublicTrackPage() {
  const params = useParams();
  const id = params?.id;

  const order = mockOrders.find((o) => o.id === id);

  if (!order) notFound();

  return <PublicTrackingView order={order} />;
}
