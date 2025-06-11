import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardHeader,
  Grid,
  Avatar,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "@/ultils/enum";
import { Task } from "@/ultils/types";
import { getTask } from "@/api/taskApi";

type TaskCardProps = {
  setSelectedTask: (task: Task) => void;
  setTaskDialogOpen: (open: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  listUserId: string[];
};

const TaskCard: React.FC<TaskCardProps> = ({
  setSelectedTask,
  setIsEdit,
  setTaskDialogOpen,
  listUserId,
}) => {
  const assignedToParam =
    listUserId.length > 0 ? listUserId.join(",") : undefined;

  const { data: toDoTask } = useQuery<Task[]>({
    queryKey: ["tasks", TaskStatus.toDO, assignedToParam],
    queryFn: () => getTask(TaskStatus.toDO, assignedToParam),
  });
  const { data: inProgressTask } = useQuery<Task[]>({
    queryKey: ["tasks", TaskStatus.inProgress, assignedToParam],
    queryFn: () => getTask(TaskStatus.inProgress, assignedToParam),
  });
  const { data: doneTask } = useQuery<Task[]>({
    queryKey: ["tasks", TaskStatus.done, assignedToParam],
    queryFn: () => getTask(TaskStatus.done, assignedToParam),
  });

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
    setIsEdit(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid size={4}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            To Do
          </Typography>
          {toDoTask &&
            toDoTask.map((task) => (
              <Card key={task._id} sx={{ marginBottom: 2 }}>
                <CardHeader
                  title={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Title: {task.title}
                      </Typography>
                      {Object.hasOwn(task, "assignedTo") && (
                        <Avatar> {task.assignedTo?.userName.charAt(0)}</Avatar>
                      )}
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    Content: {task.content}
                  </Typography>
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
          {inProgressTask &&
            inProgressTask.map((task) => (
              <Card key={task._id} sx={{ marginBottom: 2 }}>
                <CardHeader
                  title={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Title: {task.title}
                      </Typography>
                      {Object.hasOwn(task, "assignedTo") && (
                        <Avatar> {task.assignedTo?.userName.charAt(0)}</Avatar>
                      )}
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    Content: {task.content}
                  </Typography>
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
            Done
          </Typography>
          {doneTask &&
            doneTask.map((task) => (
              <Card key={task._id} sx={{ marginBottom: 2 }}>
                <CardHeader
                  title={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Title: {task.title}
                      </Typography>
                      {Object.hasOwn(task, "assignedTo") && (
                        <Avatar> {task.assignedTo?.userName.charAt(0)}</Avatar>
                      )}
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    Content: {task.content}
                  </Typography>
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
      </Grid>
    </Box>
  );
};

export default TaskCard;
