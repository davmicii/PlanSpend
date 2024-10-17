export interface Task {
  ptask_id: number;
  p_user_id: number;
  p_title: string;
  p_description: string;
  p_due_date: Date;
  p_is_completed: boolean;
  p_created_at: Date;
}
