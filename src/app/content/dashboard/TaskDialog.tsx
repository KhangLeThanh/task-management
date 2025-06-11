import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createTask, updateTask } from "@/api/taskApi";
import { getAllUsers } from "@/api/userApi";
import FormDialog from "@/app/content/components/FormDialog";
import Label from "@/app/content/components/Label";
import { PersonalTask, Task, TaskResponse } from "@/ultils/types";
import { TaskStatus } from "@/ultils/enum";
import { taskStatus } from "@/constant/constantTaskStatus";

type TaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
  isEdit?: boolean;
  userId: string;
};

type ErrorResponse = {
  message: string;
};
const TaskDialog: React.FC<TaskDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  task,
  isEdit = false,
  userId,
}) => {
  const [status, setStatus] = useState<TaskStatus | string>(TaskStatus.toDO);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [taskId, setTaskId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const queryClient = useQueryClient();
  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  useEffect(() => {
    if (task && task._id) {
      setStatus(task.status);
      setContent(task.content);
      setTitle(task.title);
      setTaskId(task._id);
      setAssignedUserId(task.assignedTo ? task.assignedTo._id : "");
    } else {
      setStatus(TaskStatus.toDO);
      setTitle("");
      setContent("");
      setTaskId("");
      setAssignedUserId("");
    }
  }, [task]);
  const invalidateAllTaskQueries = () => {
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === "tasks",
    });
  };
  // Mutation for creating a task
  const { mutateAsync: createUserTask } = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      invalidateAllTaskQueries();
      onConfirm();
      onClose();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        error.response?.data?.message || "Error creating user task"
      );
    },
  });
  // Mutation for updating a task
  const { mutateAsync: updateUserTask } = useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      invalidateAllTaskQueries();
      onConfirm();
      onClose();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        error.response?.data?.message || "Error updating user task"
      );
    },
  });
  // Handle confirm action (Create or Update)
  const handleConfirm = async () => {
    let personalTask: TaskResponse = {
      title,
      content,
      status,
      assignedTo: assignedUserId,
    };
    if (isEdit) {
      await updateUserTask({ taskId, personalTask });
    } else {
      personalTask = { ...personalTask, user: userId };

      await createUserTask({ personalTask });
    }
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Task" : "Create Task"}
      onConfirm={handleConfirm}
    >
      <Label text="Title:" />
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <Label text="Content:" />
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <Label text="Status:" />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          {taskStatus.map((menu) => (
            <MenuItem key={menu.value} value={menu.value}>
              {menu.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Label text="Assigned to:" />
        {!isLoading && allUsers && (
          <Select
            value={assignedUserId}
            onChange={(e) => setAssignedUserId(e.target.value)}
          >
            {allUsers.map((user: PersonalTask) => (
              <MenuItem key={user._id} value={user._id}>
                {user.userName}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </FormDialog>
  );
};

export default TaskDialog;
