import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ChevronDown, Menu, X } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { title: "Web Development", href: "/category/web" },
  { title: "Design", href: "/category/design" },
  { title: "Marketing", href: "/category/marketing" },
  { title: "Business", href: "/category/business" },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <div className="w-full border-b bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-2 md:px-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          {/* <Image
            src="/logo.png" // 👉 public folder e logo.png dao
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          /> */}
          <span className="font-semibold text-lg">My Website</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/menu">Menu</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Category */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Category</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-56 p-2">
                    {categories.map((item) => (
                      <ListItem key={item.title} {...item} />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Dashboard */}
          <Link href="/dashboard" className={navigationMenuTriggerStyle()}>
            Dashboard
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-black text-white text-sm hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu size={24} />
        </button>

        {/* MOBILE SIDEBAR */}
        {/* MOBILE SIDEBAR */}
        {open && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="flex-1 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <div className="w-72 bg-white h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold text-lg">Menu</span>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 border-b hover:bg-gray-50"
                >
                  Home
                </Link>

                <Link
                  href="/menu"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 border-b hover:bg-gray-50"
                >
                  Menu
                </Link>

                {/* Category Dropdown */}
                <div className="border-b">
                  <button
                    onClick={() => setCatOpen(!catOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                  >
                    <span>Category</span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        catOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {catOpen && (
                    <div className="flex flex-col bg-gray-50">
                      {categories.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="px-6 py-2 text-sm border-t hover:bg-gray-100"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 border-b hover:bg-gray-50"
                >
                  Dashboard
                </Link>
              </div>

              {/* Bottom Login Button */}
              <div className="mt-auto p-4 border-t">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-black text-white rounded-md hover:opacity-90 transition"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Dropdown item (desktop) */
function ListItem({ title, href }: { title: string; href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block px-3 py-2 rounded-md text-sm hover:bg-muted"
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
