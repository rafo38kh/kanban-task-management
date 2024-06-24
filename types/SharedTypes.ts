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

export type ColumnNames = {
  column_name: string;
  id: string;
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
  title: string;
  completed: boolean;
  parent_task_id: string;
};

export type TaskData = {
  description: string;
  title: string;
  user_id?: string;
  current_status: string;
  subtasks?: Subtask[];
  parent_board_id: string;
  createdAt?: string; // "2024-04-14T23:26:41.554Z"
  updatedAt?: string; // "2024-04-14T23:26:41.554Z"
  id?: string;
};
