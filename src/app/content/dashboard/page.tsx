"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../layout";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { UIButtonVariants } from "@/ultils/enum";
import { getAllUsers } from "@/api/userApi";
import TaskDialog from "./TaskDialog";
import TaskCard from "./TaskCard";
import Label from "@/app/content/components/Label";
import { PersonalTask, Task } from "@/ultils/types";

export default function DashboardPage() {
  const { user, errorUser } = useUser();
  const [listUserId, setListUserId] = useState<string[]>([]);

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleOpenDialog = () => {
    setTaskDialogOpen(true);
    setSelectedTask(null);
    setIsEdit(false);
  };
  const handleChange = (event: SelectChangeEvent<typeof listUserId>) => {
    const {
      target: { value },
    } = event;
    setListUserId(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <main>
      <Typography variant="h3">Dashboard</Typography>
      <Grid container spacing={1}>
        <Grid size={2}>
          <Button
            variant={UIButtonVariants.CONTAINED}
            onClick={handleOpenDialog}
          >
            Create Task
          </Button>
        </Grid>
        <Grid size={2}>
          <FormControl fullWidth>
            {!isLoading && allUsers && (
              <Select
                value={listUserId}
                multiple
                onChange={handleChange}
                renderValue={(selected) => {
                  const selectedUserNames = allUsers
                    .filter((user: PersonalTask) => selected.includes(user._id))
                    .map((user: PersonalTask) => user.userName)
                    .join(", ");
                  return selectedUserNames;
                }}
              >
                {allUsers.map((user: PersonalTask) => (
                  <MenuItem key={user._id} value={user._id}>
                    <Checkbox checked={listUserId.includes(user._id)} />
                    <ListItemText primary={user.userName} />
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
      </Grid>
      {errorUser && <p style={{ color: "red" }}>{errorUser}</p>}
      {user ? (
        <TaskDialog
          isOpen={isTaskDialogOpen}
          userId={user?._id}
          onClose={() => {
            setTaskDialogOpen(false);
          }}
          onConfirm={() => {
            setTaskDialogOpen(false);
          }}
          task={selectedTask}
          isEdit={isEdit}
        />
      ) : (
        !errorUser && <p>Loading user data...</p>
      )}
      {user && (
        <TaskCard
          listUserId={listUserId}
          setSelectedTask={setSelectedTask}
          setTaskDialogOpen={setTaskDialogOpen}
          setIsEdit={setIsEdit}
        />
      )}
    </main>
  );
}
