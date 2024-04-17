"use client";

type SubModalEditDeleteBtnsProps = {
  handleEditModal: () => void;
  handleDeletModal: () => void;
  firstTextBtn: string;
  secondTextBtn: string;
};

export default function SubModalEditDeleteBtns({
  handleEditModal,
  handleDeletModal,
  firstTextBtn,
  secondTextBtn,
}: SubModalEditDeleteBtnsProps) {
  return (
    <div className="absolute right-5 top-52 flex w-40 flex-col items-start justify-center gap-2 rounded-lg bg-white p-4 dark:bg-kanbanDarkGreyBG">
      <button
        onClick={handleEditModal}
        type="button"
        className="text-sm font-bold text-kanbanLightGrey"
      >
        {firstTextBtn}
      </button>
      <button
        onClick={handleDeletModal}
        type="button"
        className="text-sm font-bold text-kanbanRed"
      >
        {secondTextBtn}
      </button>
    </div>
  );
}
