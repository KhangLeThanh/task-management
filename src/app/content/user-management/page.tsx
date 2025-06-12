"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getAllUsers } from "@/api/userApi";
import { useMemo, useState } from "react";
import { PersonalTask } from "@/ultils/types";
import { MenuPositions, UserStatus } from "@/ultils/enum";
import UserDialog from "./UserDialog";

export default function DashboardPage() {
  const [anchorEl, setAnchorEl] = useState<null | any>(null);
  const [userId, setUserId] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const { data: allUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  const tableColumns = ["User Name", "Status", "Action"];
  const columns = useMemo(() => tableColumns, []);
  const handleOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setUserId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setUserId("");
  };
  const open = Boolean(anchorEl);
  return (
    <main>
      <Typography variant="h3">User Management</Typography>
      <Table aria-labelledby="userTable">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col}>
                <Typography variant="h6">{col}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {allUsers &&
            allUsers.map((user: PersonalTask) => (
              <TableRow key={user._id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>
                  {user.status ? UserStatus.active : UserStatus.inActive}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleOpen(event, user._id)}>
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Menu
        anchorEl={anchorEl}
        id="action-menu"
        open={open}
        onClose={handleClose}
        onClick={(event) => {
          event.stopPropagation;
          handleClose;
        }}
        transformOrigin={{
          horizontal: MenuPositions.RIGHT,
          vertical: MenuPositions.TOP,
        }}
        anchorOrigin={{
          horizontal: MenuPositions.RIGHT,
          vertical: MenuPositions.BOTTOM,
        }}
      >
        <MenuItem
          onClick={() => {
            setShowDialog(true);
            setAnchorEl(null);
          }}
        >
          <EditOutlinedIcon />
          Edit
        </MenuItem>
      </Menu>
      <UserDialog
        isOpen={showDialog}
        userId={userId}
        onClose={() => {
          setShowDialog(false);
        }}
        onConfirm={() => {
          setShowDialog(false);
        }}
      />
    </main>
  );
}
