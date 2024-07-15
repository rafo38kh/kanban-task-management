import React from "react";

import { v4 as uuidv4 } from "uuid";

export default function MainBoardLoading() {
  return (
    <ul className="flex flex-row gap-4 p-4">
      {Array.from({ length: 5 }).map((_) => (
        <li key={uuidv4()} className="">
          <div className="mb-4 flex max-w-[17.5rem] animate-pulse items-center justify-start gap-2 text-sm uppercase text-kanbanLightGrey">
            <span className="rounded-full bg-slate-600 p-2" />
            <span className="w-full rounded-lg bg-slate-600 p-2" />
          </div>
          <ul className="flex h-full flex-col gap-4 overflow-y-scroll pt-0">
            {Array.from({ length: 8 }).map((_) => (
              <li
                key={uuidv4()}
                className="flex w-[17.5rem] animate-pulse flex-col items-start justify-center gap-2 rounded-lg bg-kanbanVeryLightGrey p-4 transition-all duration-200 dark:bg-kanbanDarkGrey"
              >
                <span className="w-1/3 rounded-lg bg-slate-600 p-2" />
                <span className="w-1/2 rounded-full bg-slate-600 p-2" />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
