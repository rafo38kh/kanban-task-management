import MainBoard from "@/components/MainBoard";

export default function Home() {
  return (
    <div className="flex h-[calc(100%_-_60px)] w-full flex-col overflow-hidden overflow-x-scroll">
      <MainBoard />
    </div>
  );
}
