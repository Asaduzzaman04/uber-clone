import React from "react";
import Image from "next/image";
import logo from "@/public/assets/uber_icon.png";
import { navigation } from "./../../data/static";
import Navlinks from "./Navlinks";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center h-16 bg-white ">
      <nav className="flex  gap-14 justify-between items-center h-16 bg-white  ">
        {/* logo */}
        <Link href={"/"}>
          <Image src={logo} alt="logo" width={100} height={100} />
        </Link>
        {/* links */}
        <ul className="flex text-xl font-semibold gap-10">
          {navigation && navigation.length > 0
            ? navigation?.map((item) => (
                <Navlinks data={item} key={item.index} />
              ))
            : null}
        </ul>
      </nav>
      {/* right side and other activity goes here */}
      <div className="flex items-center gap-3 pr-4">
        {/* Language Dropdown */}
        <div className="relative">
          <select className="appearance-none bg-transparent border border-gray-300 rounded-md px-3 py-1.5 pr-8 hover:border-gray-400 focus:outline-none focus:border-black">
            <option value="en">EN</option>
            <option value="bd">BD</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Help Button */}

        <Button className="text-lg" size={"lg"} variant={"link"}>
          Help
        </Button>

        {/* Sign In Button */}
        <Button className="transition-all duration-150 active:scale-95 ease-linear">
          <Link href={"select-role"}>Get start</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
