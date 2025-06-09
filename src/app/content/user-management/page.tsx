"use client";
import { useState } from "react";
import { useUser } from "../layout";
import { UIButtonVariants } from "@/ultils/enum";

export default function DashboardPage() {
  const { user, errorUser } = useUser();

  return (
    <main>
      <h1>User Management</h1>
    </main>
  );
}
