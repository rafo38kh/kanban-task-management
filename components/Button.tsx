"use client";

type ButtonProps = {
  text: string;
  styles: string;
  disabled: string | any;
  onClick: () => void;
  isLoading: boolean;
};

export default function Button({
  text,
  styles,
  onClick,
  disabled,
  isLoading,
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      type="button"
      onClick={() => {
        if (isLoading) return;
        onClick();
      }}
      className={`w-full rounded-full bg-kanbanPurpule p-2 text-[13px] font-bold ${styles} `}
    >
      {isLoading ? (
        <div className="animate-pulse rounded-full bg-blue-200 px-3 py-1 text-center text-xs font-medium leading-none text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          loading...
        </div>
      ) : (
        text
      )}
    </button>
  );
}
