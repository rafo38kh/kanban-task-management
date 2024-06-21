import Card from "./Card";
import { useAppContext } from "@/contexts/AppContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { useQuery } from "react-query";
import api from "@/lib/api";
import { TaskData } from "@/types/SharedTypes";

type ColumnProps = {
  column: {
    id: string;
    color: string;
    createdAt: string;
    name: string;
    tasks_count: number;
    parent_board_id: string;
    updatedAt: string;
    user_id: string;
  };
};

export default function Column({ column }: ColumnProps) {
  const { curBoardId } = useAppContext();
  const parsedUser = useGetUsersInfo();

  const {
    data: tasksData,
    error: tasksError,
    isError: isTasksError,
    isLoading: isTasksLoading,
  } = useQuery<TaskData[]>({
    queryKey: ["tasks"],
    queryFn: async () => await api.getTasks(parsedUser.userID, curBoardId),
  });

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <span className="px-4">
        {column?.name} ({column?.tasks_count})
      </span>
      <ul className="flex h-full flex-col  gap-4 overflow-y-scroll p-4 pt-0">
        {tasksData
          ?.filter((task) => task?.current_status === column?.name)
          ?.map((cardItem) => (
            <Card
              id={cardItem?.id}
              title={cardItem?.title}
              subtaskCount={cardItem?.subtasks?.length}
            />
          ))}
      </ul>
    </div>
  );
}
