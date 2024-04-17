"use client";
import { useContext } from "react";

import { ModalContext } from "../contexts/ModalContextProvider";

import TopNavigation from "@/components/TopNavigation";
import SideNavigation from "@/components/MobileNavigation";

export default function Navigations() {
  const { isSideBarshow, setIsSideBarShow } = useContext(ModalContext);

  return (
    <div>
      <TopNavigation
        isSideBarshow={isSideBarshow}
        setIsSideBarShow={setIsSideBarShow}
      />

      {isSideBarshow && (
        <div className="md:revert fixed z-50 min-h-screen w-full bg-black/80">
          <SideNavigation />
        </div>
      )}
    </div>
  );
}
