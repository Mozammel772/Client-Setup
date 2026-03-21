"use client";

import PublicFooter from "@/components/shared/publicFooter/PublicFooter";
import { PublicNavbar } from "@/components/shared/publicNavbar/PublicNavbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-2 ">{children}</div>
      <PublicFooter />
    </>
  );
}
