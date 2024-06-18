import Card from "./Card";

type ColumnProps = {
  column: {
    _id: string;
    color: string;
    createdAt: string;
    name: string;
    parent_board_id: string;
    updatedAt: string;
    user_id: string;
  };
};

export default function Column({ column }: ColumnProps) {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <span className="px-4">{column?.name} ()</span>
      <ul className="flex h-full flex-col  gap-4 overflow-y-scroll p-4 pt-0">
        <Card id={column._id} />
      </ul>
    </div>
  );
}
