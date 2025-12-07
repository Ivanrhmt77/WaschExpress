import { notFound } from "next/navigation";
import { PublicTrackingView } from "@/components/tracking/public-tracking-view";
import type { Order } from "@/lib/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4001";

export default async function PublicTrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let order: Order | null = null;
  try {
    const res = await fetch(`${BACKEND_URL}/api/jobs/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      order = await res.json();
    }
  } catch (_) {
    order = null;
  }

  if (!order) return notFound();

  return <PublicTrackingView order={order} />;
}
