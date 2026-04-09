import { NavLink } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, Landmark, ArrowUpCircle } from "lucide-react";
import gw2Logo from "@/assets/GW2_Logo.png";

export const NavBar = () => {
  return (
    <NavigationMenu>
      <img
        src={gw2Logo}
        className="pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)] rounded-full"
        alt="GW2 logo"
        width="200"
        height="auto"
      />
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink to="/" className="flex items-center gap-2">
            <Button>
              <Home className="w-4 h-4" />
              Home
            </Button>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to="/treasury" className="flex items-center gap-2">
            <Button>
              <Landmark className="w-4 h-4" />
              Treasury
            </Button>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink to="/upgrades" className="flex items-center gap-2">
            <Button>
              <ArrowUpCircle className="w-4 h-4" />
              Upgrades
            </Button>
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
