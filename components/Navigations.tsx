"use client";
import { useContext } from "react";

import { ModalContext } from "../contexts/ModalContextProvider";

import TopNavigation from "@/components/TopNavigation";
import MobileNavigation from "@/components/MobileNavigation";

type NavigationsProps = {
  isSideNavOpen: boolean;
};

export default function Navigations({ isSideNavOpen }: NavigationsProps) {
  const { isSideBarshow, setIsSideBarShow } = useContext(ModalContext);

  return (
    <div>
      <TopNavigation
        isSideBarshow={isSideBarshow}
        setIsSideBarShow={setIsSideBarShow}
        isSideNavOpen={isSideNavOpen}
      />

      {isSideBarshow && (
        <div className="md:revert fixed z-50 min-h-screen w-full bg-black/80">
          <MobileNavigation />
        </div>
      )}
    </div>
  );
}
