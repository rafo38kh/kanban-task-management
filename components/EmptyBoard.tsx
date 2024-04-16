"use client";
import Button from "./Button";

export default function EmptyBoard() {
  return (
    <div className="flex max-w-64 flex-col items-center justify-center gap-8 text-center text-kanbanLightGrey">
      <span>This board is empty. Create a new column to get started.</span>
      <Button
        textColor={"text-white"}
        text={"+ Add New Column"}
        bgColor={"bg-kanbanPurpule"}
        onClick={() => {
          console.log("+ Add New Column");
        }}
      />
    </div>
  );
}
