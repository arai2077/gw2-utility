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
      <section className="flex flex-col items-center mb-8">
        <div>
          <img
            src={comyEmblem}
            className="pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)] rounded-full"
            alt="Comy emblem"
            width="512"
            height="auto"
          />
        </div>
        <div>
          <h1>"Wow, that's a quality guild!"</h1>
          <p className="text-center">"Thanks!"</p>
        </div>
      </section>

      <section className="w-[50%] mx-auto flex border-t text-left max-lg:flex-col max-lg:text-center">
        <div className="flex-1 p-8 max-lg:px-5 max-lg:py-6 border-r max-lg:border-r-0 max-lg:border-b">
          <Settings className="mb-4 w-[22px] h-[22px]" />
          <h2>Guild</h2>
          <p>Access the guild services</p>
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
        <div className="flex-1 p-8 max-lg:px-5 max-lg:py-6">
          <Info className="mb-4 w-[22px] h-[22px]" />
          <h2>About the site</h2>
          <p>I don't know what I'm doing</p>
          <ul className="list-none p-0 flex gap-2 mt-8 max-lg:mt-5 max-lg:flex-wrap max-lg:justify-center">
            <li className="max-lg:[flex:1_1_calc(50%-8px)]">
              <a
                href="https://www.github.com/arai2077/gw2-utility"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <GitBranch className="w-[22px] h-[22px]" />
                  GitHub
                </Button>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
