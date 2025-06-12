import React, { useState, useEffect } from "react";
import { Select, MenuItem, FormControl, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/api/userApi";
import FormDialog from "@/app/content/components/FormDialog";
import Label from "@/app/content/components/Label";
import { UserStatus } from "@/ultils/enum";
import { PersonalTask } from "@/ultils/types";

type UserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userId: string;
};

type ErrorResponse = {
  message: string;
};
const UserDialog: React.FC<UserDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userId,
}) => {
  const [status, setStatus] = useState<string>("");
  const [userName, setUserName] = useState("");
  const queryClient = useQueryClient();
  const { data: user } = useQuery<PersonalTask>({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
  useEffect(() => {
    if (user) {
      setStatus(user.status ? UserStatus.active : UserStatus.inActive);
      setUserName(user.userName);
    }
  }, [user]);

  // Mutation for updating a task
  const { mutateAsync: updateUserInfo } = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
    await updateUserInfo({
      id: userId,
      userStatus: status === UserStatus.active ? true : false,
    });
  };

  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Update User"
      onConfirm={handleConfirm}
    >
      <Label text="Username:" />
      <Typography variant="body2">{userName}</Typography>

      <FormControl fullWidth margin="normal">
        <Label text="Status:" />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <MenuItem value={UserStatus.active}>{UserStatus.active}</MenuItem>
          <MenuItem value={UserStatus.inActive}>{UserStatus.inActive}</MenuItem>
        </Select>
      </FormControl>
    </FormDialog>
  );
};

export default UserDialog;
