"use client";
import React from "react";
import { createPortal } from "react-dom";

import SwitchTheme from "./SwitchTheme";

export default function SideNavigation() {
  const boards = [
    { boardName: "Platform Launch" },
    { boardName: "Marketing Plan" },
    { boardName: "Roadmap" },
  ];
  return createPortal(
    <div className="absolute left-14 top-20 z-50 flex w-[16.5rem] flex-col items-center justify-start rounded-lg bg-white p-4 pl-0 dark:bg-kanbanGrey">
      <div>
        <div className="flex items-center justify-start gap-2 p-4 pt-2 font-bold tracking-widest text-kanbanLightGrey">
          <span className="uppercase ">All boards</span>
          <span>(1)</span>
        </div>
        <ul>
          {boards.map((board, idx) => (
            <button
              type="button"
              key={idx}
              className=" h-full w-full rounded-r-full bg-kanbanPurpule py-3 pl-4"
            >
              <li className="flex flex-row items-center justify-start gap-2">
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                    fill="#828FA3"
                  />
                </svg>
                <span className="text-kanbanLightGrey">{board.boardName}</span>
              </li>
            </button>
          ))}
        </ul>
        <button
          type="button"
          className="flex items-center justify-start gap-2 p-4 text-kanbanPurpule"
        >
          <svg
            className="stroke-kanbanPurpule"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
          </svg>
          + Create New Board
        </button>
      </div>
      <div className="ml-4 w-full rounded-lg bg-kanbanVeryLightGrey px-6 py-2 text-center dark:bg-kanbanDarkGreyBG">
        <SwitchTheme />
      </div>
    </div>,
    document.body,
  );
}
