export type UserName = {
  userName: string;
  passWord: string;
};
export type Profile = {
  age: number | null;
  bio: string;
  location: string;
};
export type UserProfie = {
  userName: string;
  profile: Profile;
};
export type Task = {
  title: string;
  content: string;
  status: string;
  _id?: string;
  user?: { _id: string; userName: string };
  assignedTo?: { _id: string; userName: string };
};
export type TaskResponse = {
  title: string;
  content: string;
  status: string;
  _id?: string;
  user?: string;
  assignedTo?: string;
};
export type PersonalTask = {
  userName: string;
  _id: string;
  personalTasks: Task[];
};
