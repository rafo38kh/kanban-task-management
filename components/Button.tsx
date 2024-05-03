"use client";

type ButtonProps = {
  text: string;
  styles: string;
  disabled: string | any;
  onClick: () => void;
};

export default function Button({
  text,
  styles,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`w-full rounded-full bg-kanbanPurpule p-2 text-[13px] font-bold ${styles} `}
    >
      {text}
    </button>
  );
}
