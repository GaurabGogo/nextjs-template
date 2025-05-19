"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: "/nav/home.png",
  },
  {
    name: "luggage",
    href: "/luggage",
    icon: "/nav/luggage.png",
  },
  {
    name: "Bag",
    href: "/bag",
    icon: "/nav/bag.png",
  },
  {
    name: "Message",
    href: "/message",
    icon: "/nav/message.png",
  },
  {
    name: "Chart",
    href: "/chart",
    icon: "/nav/chart.png",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "/nav/settings.png",
  },
  {
    name: "Filter",
    href: "/filter",
    icon: "/nav/filter.png",
  },
  {
    name: "Cart",
    href: "/cart",
    icon: "/nav/cart.png",
  },
];

const NavSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="nav-sidebar">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`nav-sidebar__link ${
            pathname === item.href ? "active" : ""
          }`}
        >
          <Image src={item.icon} alt={item.name} width={48} height={48} />
        </Link>
      ))}
    </aside>
  );
};

export default NavSidebar;
