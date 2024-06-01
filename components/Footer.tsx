import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
const Footer = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mainFooter p-4 sm:px-10 bg-[#11355E] text-white w-full">
        <div className="px-4 max-w-[2400px] mx-auto">
          <div className="flex flex-wrap justify-between text-center">
            <div className="w-full sm:w-fit flex flex-wrap flex-col gap-4 items-center sm:flex-row">
              <NavItem
                label="Terms & Conditions"
                route=""
                activeRoute={""}
              />
              <NavItem
                label="Privacy Policy"
                route=""
                activeRoute={""}
              />
              <NavItem
                label="Do Not Sell My Personal Information"
                route=""
                activeRoute={""}
              />
            </div>
            <div className="w-full text-wrap sm:w-fit flex flex-wrap flex-col mt-4 sm:mt-0 items-center sm:flex-row">
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
          className={`flex items-center text-sm cursor-pointer `}
        >
          {label}
        </Link>
      ) : (
        <span className={`flex items-center text-sm `}>{label}</span>
      )}
    </>
  );
};
