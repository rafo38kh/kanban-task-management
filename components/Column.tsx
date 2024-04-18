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

    // { cardName: "Build UI for onboarding flow", cardTask: "0 of 3 substasks" },
    // { cardName: "Build UI for onboarding flow", cardTask: "0 of 3 substasks" },
    // { cardName: "Build UI for onboarding flow", cardTask: "0 of 3 substasks" },
    // { cardName: "Build UI for onboarding flow", cardTask: "0 of 3 substasks" },
    // { cardName: "Build UI for onboarding flow", cardTask: "0 of 3 substasks" },
  ];
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <span className="px-4">TODO {datas.length}</span>
      <ul className="flex h-full flex-col  gap-4 overflow-y-scroll p-4">
        {datas?.map((data) => (
          <li className="h-full">
            <Card />
          </li>
        ))}
      </ul>
    </div>
  );
}
