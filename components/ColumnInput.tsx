import { Dispatch, SetStateAction, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "@/hooks/useClickOutside";

import { BoardData, Column } from "./Modals/NewAndEditBoard";

type ColumnInputProps = {
  column: Column;
  boardData: BoardData;
  handleDeletColumn: (id: string) => void;
  handleInputOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    column: Column,
  ) => void;
  setBoardData: Dispatch<SetStateAction<BoardData>>;
};

export default function ColumnInput({
  column,
  setBoardData,
  handleDeletColumn,
  handleInputOnChange,
}: ColumnInputProps) {
  const popover = useRef<HTMLDivElement>(null);

  const [showColorPick, setShowColorPick] = useState(false);

  useClickOutside(popover, () => setShowColorPick(false));

  const handleColorChange = (id: string, newColor: string) => {
    setBoardData((prevState) => ({
      ...prevState,
      boardColumns: prevState.boardColumns.map((col) =>
        col.id === id ? { ...col, color: newColor } : col,
      ),
    }));
  };

  return (
    <li
      key={column?.id}
      className="mb-5 mt-2 flex flex-row items-center justify-between gap-4"
    >
      <div className="picker">
        <button
          type="button"
          onClick={() => setShowColorPick(true)}
          style={{ backgroundColor: column?.color }}
          className="swatch  h-6 w-6 rounded-full"
        />

        {showColorPick && (
          <div className="popover absolute z-50" ref={popover}>
            <HexColorPicker
              color={column?.color}
              onChange={(color) => handleColorChange(column.id, color)}
            />
          </div>
        )}
      </div>
      <input
        type="text"
        value={column?.column_name}
        placeholder="e.g. Make coffee"
        onChange={(e) => handleInputOnChange(e, column)}
        className="w-full rounded-md border-[1px] border-kanbanLightGrey bg-transparent p-2 text-xs"
      />
      <button type="button" onClick={() => handleDeletColumn(column?.id)}>
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
          <g fill="#828FA3" fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </button>
    </li>
  );
}
