export type BoardName = {
  id: string;
  name: string;
};

export type BoardSchemaType = {
  id: string;
  name: string;
};

export type ColumnSchemaType = {
  name: string;
  color?: string;
  user_id: string;
  parent_board_id: string;
};

export type SubtaskSchemaType = {
  title: string;
  completed: boolean;
  parent_task_id: string;
};

export type TaskSchemaType = {
  title: string;
  user_id: string;
  subtasks?: string[];
  description?: string;
  current_status: string;
  parent_column_id: string;
};

export type Subtask = {
  id: string;
  subtask: string;
};

export type TaskData = {
  name: string;
  description: string;
  subtasks: Subtask[];
  status: string;
};
