export const navbarRoleBaseMenu = {
  ADMIN: [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Manage Users", href: "/admin/users" },
    { name: "Orders", href: "/admin/orders" },
  ],
  USER: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Orders", href: "/orders" },
    { name: "Account Info", href: "/account" },
  ],
  SUPER_ADMIN: [{ name: "Dashboard", href: "/super-admin" }],
  MODERATOR: [{ name: "Dashboard", href: "/moderator" }],
};
