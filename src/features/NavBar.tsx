import { useState } from "react";
import { NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, Landmark, ArrowUpCircle, Menu, X } from "lucide-react";
import gw2Logo from "@/assets/GW2_Logo.png";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/treasury", icon: Landmark, label: "Treasury" },
  { to: "/upgrades", icon: ArrowUpCircle, label: "Upgrades" },
];

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-surface-container-low backdrop-blur-sm px-6 py-3">
      <div className="flex items-center justify-between">
        <img
          src={gw2Logo}
          className="pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] rounded-full"
          alt="GW2 logo"
          width="160"
          height="auto"
        />

        {/* Desktop nav */}
        <NavigationMenu className="hidden sm:flex">
          <NavigationMenuList>
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavigationMenuItem key={to}>
                <NavLink to={to} className="flex items-center gap-2">
                  {({ isActive }) => (
                    <Button variant={isActive ? "default" : "ghost"}>
                      <Icon className="w-4 h-4" />
                      {label}
                    </Button>
                  )}
                </NavLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile burger */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col gap-1 pt-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              {({ isActive }) => (
                <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
