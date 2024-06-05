import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";

const ExclusiveFooter = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mainFooter py-4  border-t border-[#7ACAD2] bg-white text-[#7ACAD2] w-full">
        <div className="px-16 max-w-[2400px] mx-auto">
          <div className="flex flex-wrap justify-between text-center">
            <div className="w-full sm:w-fit flex flex-wrap flex-col gap-2 sm:gap-8 items-center sm:flex-row">
              <NavItem
                label="Terms & Conditions"
                route="https://www.abs-cbn.com/terms"
                activeRoute={""}
              />
              <NavItem
                label="Privacy Policy"
                route="https://www.abs-cbn.com/privacy"
                activeRoute={""}
              />
              <NavItem
                label="Do Not Sell My Personal Information"
                route=""
                activeRoute={""}
              />
            </div>
            <div className="w-full text-wrap sm:w-fit flex flex-wrap flex-col gap-2 mt-2 sm:mt-0 items-center sm:flex-row">
              <NavItem
                label="© 2024 ABS-CBN Corporation. All Rights Reserved."
                route=""
                activeRoute={""}
              />

              <div className="w-[1px] h-full bg-[#7ACAD2]"></div>

              <NavItem
                label="Powered by JoinNow Fandom"
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

export default ExclusiveFooter;

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
          target="_blank"
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
