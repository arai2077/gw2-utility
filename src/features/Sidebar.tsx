import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";
import { Home, Landmark } from "lucide-react";
import gw2Logo from "@/assets/GW2_Logo.png";

export const Sidebar = () => {
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
          <NavigationMenuLink>
            <NavLink to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <NavLink to="/treasury" className="flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              Treasury
            </NavLink>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
