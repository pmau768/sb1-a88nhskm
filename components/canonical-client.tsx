"use client";

import { useCanonical } from "@/hooks/use-canonical";

export function CanonicalClient() {
  useCanonical();
  return null;
}