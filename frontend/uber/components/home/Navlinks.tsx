import React from "react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";

interface NavlinksProps {
  data: {
    name: string;
    dropdown?: { name: string; index: number }[];
  };
}
type links = {
  name: string;
  index: number;
};

const Navlinks: React.FC<NavlinksProps> = ({ data }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{data.name}</NavigationMenuTrigger>
          <NavigationMenuContent className="w-full border-2 ">
            <NavigationMenuLink>
              <div className="grid grid-cols-3 justify-center items-center gap-7">
                {data && data.dropdown && data.dropdown.length > 0
                  ? data.dropdown.map((item: links) => {
                      return <p key={item.index}>{item.name}</p>;
                    })
                  : null}
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navlinks;
