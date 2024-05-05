import Column from "./Column";

export default function ColumnsList() {
  const columns = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

  return (
    <ul className="relative flex h-[100vh_-_100px] w-[calc(100&_-_264px)] overflow-scroll p-4">
      {columns?.map((el) => (
        <li key={el} className="h-full">
          <Column />
        </li>
      ))}
      <li className="flex h-full w-[17.5rem] items-center justify-center pl-4">
        <button
          type="button"
          className="mt-auto h-[calc(100%_-_3.5rem)] w-[17.5rem] rounded-lg bg-kanbanVeryLightGrey font-bold text-kanbanLightGrey transition-all duration-200 hover:text-kanbanPurpule dark:bg-[#23242f]"
        >
          + New Column
        </button>
      </li>
    </ul>
  );
}
