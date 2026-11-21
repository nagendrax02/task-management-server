export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}
