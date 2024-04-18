"use client";
import { useState } from "react";
import MainBoard from "@/components/MainBoard";
import Navigations from "@/components/Navigations";
import SideNavigation from "@/components/SideNavigation";

export default function Home() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  return (
    // <div className="flex min-h-screen w-full overflow-hidden">
    <div
      className={`grid min-h-screen w-full grid-rows-[auto_1fr] overflow-hidden
      ${isSideNavOpen ? "grid-cols-[auto_1fr]" : "grid-cols-1"}`}
    >
      {isSideNavOpen && <SideNavigation setIsSideNavOpen={setIsSideNavOpen} />}

      <div className="flex h-screen w-full flex-col overflow-x-scroll">
        <Navigations isSideNavOpen={isSideNavOpen} />
        <MainBoard
          setIsSideNavOpen={setIsSideNavOpen}
          isSideNavOpen={isSideNavOpen}
        />
        {/* <button className="h-full w-[17.5rem] bg-kanbanLightGrey">
          + New Column
        </button> */}
      </div>
    </div>
  );
}
