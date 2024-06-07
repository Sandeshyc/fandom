import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
const Footer = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <>
      <div className="mainFooter p-4 sm:px-10 bg-[#11355E] text-white w-full">
        <div className="px-4 max-w-[2400px] mx-auto">
          <div className="flex flex-wrap justify-between text-center">
            <div className="w-full sm:w-fit flex flex-wrap flex-col gap-4 items-center sm:flex-row">
              <Link href="https://www.abs-cbn.com/privacy" target="_blank">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/privacy-seal.png"
                    width={20}
                    height={38}
                    alt="NPC Seal"
                    className="-mt-1"
                  />
                  <p className="flex items-center text-sm cursor-pointer">
                    NPC Seal of Registration
                  </p>
                </div>
              </Link>
              <NavItem
                label="Terms & Conditions"
                route="https://www.abs-cbn.com/terms"
                activeRoute={""}
              />
              <NavItem
                label="Privacy Policy"
                route="https://www.abs-cbn.com/privacyinternational"
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
