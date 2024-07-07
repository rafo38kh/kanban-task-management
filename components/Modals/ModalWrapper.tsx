"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalWrapperProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function ModalWrapper({
  isOpen,
  setIsOpen,
  children,
}: ModalWrapperProps) {
  useEffect(() => {
    const handleBodyClass = () => {
      if (isOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    handleBodyClass();

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/60">
      <div
        ref={ref}
        className="w-11/12 max-w-[30rem] rounded-lg bg-white p-8 dark:bg-kanbanGrey"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
