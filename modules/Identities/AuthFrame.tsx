import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  pageHeading?: string;
  authLoading: boolean;
  children: any;
};

const AuthFrame = ({ pageHeading, authLoading, children }: Props) => {
  return (
    <>
      {authLoading ? (
        <div className="w-full h-full fixed left-0 top-0 bg-gray-500/50 z-50 cursor-wait"></div>
      ) : null}

      <div className="relative min-h-screen lg:p-10 w-full bg-[#11355E] flex flex-wrap items-center justify-center lg:items-stretch">
        <div className="w-full h-full my-auto flex flex-col items-center justify-center">
          <div className="w-full min-h-screen sm:min-h-[624px] sm:h-fit flex flex-col items-center justify-between gap-6 bg-white sm:rounded-lg sm:max-w-[448px] lg:max-w-[526px] p-6 text-center self-center">
            <Link href="/bini">
              <div className="w-full flex items-center justify-center gap-[10px]">
                <Image
                  src="/images/join-now.png"
                  width={134}
                  height={63}
                  alt="join-now"
                />
                <p className="text-[#11355E] text-[26px] italic font-inter font-extrabold">
                  Fandom
                </p>
              </div>
            </Link>

            <div className="w-full">
              <h1 className="text-[#454545] text-[24px] mb-6 font-semibold">
                {pageHeading}
              </h1>
              {children}
            </div>

            <div className="flex sm:invisible">
              <div className="flex sm:hidden flex-col items-center gap-2 text-center text-sm mx-auto text-[#454545] mt-8">
                <Link href="https://www.abs-cbn.com/terms" target="_blank">
                  Terms & Conditions
                </Link>
                <Link
                  href="https://www.abs-cbn.com/privacyinternational"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
                <p>Do Not Sell My Personal Information</p>
                <p>© 2024 ABS-CBN Corporation. All Rights Reserved.</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-2 text-center mx-auto text-white mt-8">
            <div className="flex items-center gap-4 ">
              <Link href="https://www.abs-cbn.com/terms" target="_blank">
                Terms & Conditions
              </Link>
              <Link
                href="https://www.abs-cbn.com/privacyinternational"
                target="_blank"
              >
                Privacy Policy
              </Link>
              <p>Do Not Sell My Personal Information</p>
            </div>
            <p>© 2024 ABS-CBN Corporation. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthFrame;
