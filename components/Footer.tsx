import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
const Footer = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mainFooter py-4 px-10 bg-[#11355E] text-white fixed bottom-0 left-0 w-full">
        <div className="px-4 max-w-[2400px] mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap">
              <NavItem
                label="Terms & Conditions"
                route="/discover"
                activeRoute={""}
              />
              <NavItem
                label="Privacy Policy"
                route="/discover"
                activeRoute={""}
              />
              <NavItem
                label="Do Not Sell My Personal Information"
                route=""
                activeRoute={""}
              />
            </div>
            <div className="flex flex-wrap">
              <NavItem
                label="© 2024 ABS-CBN Corporation. All Rights Reserved."
                route=""
                activeRoute={""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

type NavItemProps = {
  label: string;
  route: string;
  activeRoute: string;
};
const NavItem = ({ label, route, activeRoute }: NavItemProps) => {
  return (
    <>
      {route ? (
        <Link
          href={route}
          className={`flex items-center text-sm mr-4 cursor-pointer whitespace-nowrap`}
        >
          {label}
        </Link>
      ) : (
        <span className={`flex items-center text-sm mr-4 whitespace-nowrap`}>
          {label}
        </span>
      )}
    </>
  );
};
