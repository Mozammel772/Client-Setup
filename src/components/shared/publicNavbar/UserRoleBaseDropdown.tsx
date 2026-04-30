"use client";

import { navbarRoleBaseMenu } from "@/lib/navbarUserRoleBaseInfo";
import { UserInfo } from "@/types/user.interface";
import { User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  user: UserInfo | null;
  onLogout?: () => void;
};

export default function UserRoleBaseDropdown({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Avatar */}
      <div className="h-9 w-9 rounded-full border flex items-center justify-center cursor-pointer">
        <User className="h-5 w-5" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full w-60 pt-2">
          <div className="bg-white shadow-lg rounded-xl p-4">
            {/* User Info */}
            <div className="flex items-center gap-3 border-b pb-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              <div>
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.phone}</p>
              </div>
            </div>

            {/* Menu */}
            <div className="flex flex-col text-sm gap-2">
              {user &&
                navbarRoleBaseMenu[user.role]?.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span className="hover:text-orange-500 transition cursor-pointer">
                      {item.name}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
