"use client";
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
  if (!isOpen) return null;

  useEffect(() => {
    const handleBodyClass = () => {
      if (isOpen) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    };

    handleBodyClass(); // Call once on mount to set initial state

    // Add/remove class on isOpen change
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleClickOutsideModal = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutsideModal);
      return () => {
        document.removeEventListener("mousedown", handleClickOutsideModal);
      };
    }
  }, [isOpen, setIsOpen]);

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
