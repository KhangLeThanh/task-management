import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardHeader,
  Grid,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "@/ultils/enum";
import { Task } from "@/ultils/types";
import { getTask } from "@/api/taskApi";

type TaskCardProps = {
  userId: string;
  setSelectedTask: (task: Task) => void;
  setTaskDialogOpen: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  userId,
  setSelectedTask,
  setIsEdit,
  setTaskDialogOpen,
}) => {
  const { data: toDoTask } = useQuery({
    queryKey: ["tasks", userId, TaskStatus.toDO],
    queryFn: () => getTask(userId, TaskStatus.toDO),
    enabled: !!userId,
  });
  const { data: inProgressTask } = useQuery({
    queryKey: ["tasks", userId, TaskStatus.inProgress],
    queryFn: () => getTask(userId, TaskStatus.inProgress),
    enabled: !!userId,
  });
  const { data: doneTask } = useQuery({
    queryKey: ["tasks", userId, TaskStatus.done],
    queryFn: () => getTask(userId, TaskStatus.done),
    enabled: !!userId,
  });
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTask] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (toDoTask) {
      setToDoTasks(toDoTask.personalTasks);
    }
    if (inProgressTask) {
      setInProgressTask(inProgressTask.personalTasks);
    }
    if (doneTask) {
      setDoneTasks(doneTask.personalTasks);
    }
  }, [toDoTask, inProgressTask, doneTask]);
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
    setIsEdit(true);
  };
  console.log("test doneTask", doneTask);
  console.log("test inProgressTask", inProgressTask);

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            To Do
          </Typography>
          {toDoTasks.map((task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Title: {task.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1">Content: {task.content}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 1,
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleEditTask(task)}
                  >
                    Edit
                  </Button>
                  <Button size="small" color="error">
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            In Progress
          </Typography>
          {inProgressTasks.map((task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Title: {task.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1">Content: {task.content}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 1,
                  }}
                >
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="error">
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Done
          </Typography>
          {doneTasks.map((task) => (
            <Card key={task._id} sx={{ marginBottom: 2 }}>
              <CardHeader
                title={
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Title: {task.title}
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body1">Content: {task.content}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 1,
                  }}
                >
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="error">
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskCard;
