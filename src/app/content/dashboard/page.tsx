"use client";
import { useState } from "react";
import { useUser } from "../layout";
import { Button } from "@mui/material";
import { UIButtonVariants } from "@/ultils/enum";
import TaskDialog from "./TaskDialog";
import TaskCard from "./TaskCard";
import { Task } from "@/ultils/types";

export default function DashboardPage() {
  const { user, errorUser } = useUser();
  const [isTaskDialogOpen, setTaskDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleOpenDialog = () => {
    setTaskDialogOpen(true);
    setSelectedTask(null);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <Button variant={UIButtonVariants.CONTAINED} onClick={handleOpenDialog}>
        Create Task
      </Button>

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
          userId={user._id}
          setSelectedTask={setSelectedTask}
          setTaskDialogOpen={setTaskDialogOpen}
          setIsEdit={setIsEdit}
        />
      )}
    </main>
  );
}
