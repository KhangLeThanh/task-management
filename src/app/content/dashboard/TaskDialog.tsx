import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "@/api/taskApi";
import FormDialog from "@/app/content/components/FormDialog";
import Label from "@/app/content/components/Label";
import { Task } from "@/ultils/types";
import { TaskStatus } from "@/ultils/enum";
import { taskStatus } from "@/constant/constantTaskStatus";

type TaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  task: Task | null;
  isEdit?: boolean;
  userId: string | null;
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

  const queryClient = useQueryClient();
  useEffect(() => {
    if (task && task._id) {
      setStatus(task.status);
      setContent(task.content);
      setTitle(task.title);
      setTaskId(task._id);
    } else {
      setStatus(TaskStatus.toDO);
      setTitle("");
      setContent("");
      setTaskId("");
    }
  }, [task]);
  // Mutation for creating a task
  const { mutateAsync: createUserTask } = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      const queryKey = userId ? ["tasks", userId] : ["tasks"];
      await queryClient.refetchQueries({ queryKey });
      onConfirm();
      onClose();
      setStatus(TaskStatus.toDO);
      setTitle("");
      setContent("");
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
      const queryKey = userId ? ["tasks", userId] : ["tasks"];
      await queryClient.refetchQueries({ queryKey });
      onConfirm();
      onClose();
      setStatus(TaskStatus.toDO);
      setTitle("");
      setContent("");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(
        error.response?.data?.message || "Error updating user task"
      );
    },
  });
  // Handle confirm action (Create or Update)
  const handleConfirm = async () => {
    const personalTask = { title, content, status };
    if (isEdit) {
      await updateUserTask({ userId, taskId, personalTask });
    } else {
      await createUserTask({ userId, personalTask });
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
    </FormDialog>
  );
};

export default TaskDialog;
