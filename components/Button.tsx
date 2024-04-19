"use client";

type ButtonProps = {
  text: string;
  styles: string;
  onClick: () => void;
};

export default function Button({ text, styles, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-full bg-kanbanPurpule p-2 text-[13px] font-bold ${styles} `}
    >
      {text}
    </button>
  );
}
