"use client";
import { useState } from "react";

import TopNavigation from "@/components/TopNavigation";
import SideNavigation from "@/components/SideNavigation";

export default function Navigations() {
  const [isSideBarshow, setIsSideBarShow] = useState(false);

  return (
    <div>
      <TopNavigation
        setIsSideBarShow={setIsSideBarShow}
        isSideBarshow={isSideBarshow}
      />

      {isSideBarshow && (
        <div className="md:revert fixed z-50 min-h-screen w-full bg-black/80">
          <SideNavigation />
        </div>
      )}
    </div>
  );
}
