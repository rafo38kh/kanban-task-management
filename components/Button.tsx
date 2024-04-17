"use client";

type ButtonProps = {
  text: string;
  bgColor: string;
  textColor: string;
  margin: string | null;
  onClick: () => void;
};

export default function Button({
  text,
  bgColor,
  onClick,
  margin,
  textColor,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-full bg-kanbanPurpule p-2 text-[13px] font-bold ${bgColor} ${textColor} ${margin}`}
    >
      {text}
    </button>
  );
}