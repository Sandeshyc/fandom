import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from 'next/navigation';
import Preloader from "@/modules/skeletons/Preloader";
const contentId = "6641a3eba9e8e0ae2a7786b8";
const  Discover = () => {
  const router = useRouter();
   useEffect(() => {
     router.push(`/bini`);
     window.location.replace(`/bini`);
   }, []);
  return <Preloader />;
};
export default Discover;