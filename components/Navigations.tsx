"use client";
import { useState } from "react";

import TopNavigation from "@/components/TopNavigation";
import SideNavigation from "@/components/SideNavigation";

import React from "react";

export default function Navigations() {
  const [isSideBarshow, setIsSideBarShow] = useState(false);

  return (
    <div>
      <TopNavigation
        setIsSideBarShow={setIsSideBarShow}
        isSideBarshow={isSideBarshow}
      />
      {isSideBarshow && <SideNavigation />}
    </div>
  );
}
