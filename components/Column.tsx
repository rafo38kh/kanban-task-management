import Card from "./Card";

export default function Column() {
  const datas = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <span className="px-4">TODO {datas.length}</span>
      <ul className="flex h-full flex-col  gap-4 overflow-y-scroll p-4 pt-0">
        {datas?.map((data) => (
          <li key={data} className="h-full">
            <Card />
          </li>
        ))}
      </ul>
    </div>
  );
}
