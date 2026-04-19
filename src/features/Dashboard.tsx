import {
  Settings,
  Info,
  GitBranch,
  Landmark,
  ArrowUpCircle,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import comyEmblem from "@/assets/comy.png";

export const Dashboard = () => {
  return (
    <div id="dashboard">
      <section className="flex flex-col items-center mb-16 pt-16 px-6">
        <div>
          <img
            src={comyEmblem}
            className="pointer-events-none bg-[radial-gradient(circle_at_center,rgba(242,202,80,0.12)_0%,transparent_70%)] rounded-full"
            alt="Comy emblem"
            width="256"
            height="auto"
          />
        </div>
        <div className="mt-6 text-center">
          <h1 className="tracking-tight">"Wow, that's a quality guild!"</h1>
          <p className="text-muted-foreground">"Thanks!"</p>
        </div>
      </section>

      <section className="bg-surface-container-low py-16">
        <div className="max-w-4xl mx-auto flex gap-6 text-left pl-30 pr-15 max-lg:flex-col max-lg:text-center max-lg:px-5 max-lg:pl-5 max-lg:pr-5">
          <div className="flex-1 p-8 bg-surface-container-high rounded-xl max-lg:px-5 max-lg:py-6">
            <Settings className="mb-4 w-[22px] h-[22px] text-primary" />
            <h2>Guild</h2>
            <p className="text-muted-foreground">Access the guild services</p>
            <ul className="list-none p-0 flex gap-2 mt-8 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
              <li className="max-lg:[flex:1_1_calc(50%-8px)]">
                <NavLink to="/treasury">
                  <Button>
                    <Landmark className="w-[22px] h-[22px]" />
                    Treasury
                  </Button>
                </NavLink>
              </li>
              <li className="max-lg:[flex:1_1_calc(50%-8px)]">
                <NavLink to="/upgrades">
                  <Button>
                    <ArrowUpCircle className="w-[22px] h-[22px]" />
                    Upgrades
                  </Button>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex-1 p-8 bg-surface-container-high rounded-xl max-lg:px-5 max-lg:py-6">
            <Info className="mb-4 w-[22px] h-[22px] text-secondary" />
            <h2>About the site</h2>
            <p className="text-muted-foreground">I don't know what I'm doing</p>
            <ul className="list-none p-0 flex gap-2 mt-8 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
              <li className="max-lg:[flex:1_1_calc(50%-8px)]">
                <a
                  href="https://www.github.com/arai2077/gw2-utility"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary">
                    <GitBranch className="w-[22px] h-[22px]" />
                    GitHub
                  </Button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
