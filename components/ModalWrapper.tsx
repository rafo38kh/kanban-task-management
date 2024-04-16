import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalWrapperProps = {
  children: ReactNode;
};

export default function ModalWrapper({ children }: ModalWrapperProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/60">
      <div className="w-11/12 rounded-lg bg-white p-8 dark:bg-kanbanGrey">
        {children}
      </div>
    </div>,
    document.body,
  );
}
