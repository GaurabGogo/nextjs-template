import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="header__content">
        <div className="header__logo">
          <div className="header__logo-image">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </div>
          <div className="header__logo-text">Kumele</div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="header__avatar">
            <Image src="/avatar.jpg" alt="Avatar" width={80} height={80} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
