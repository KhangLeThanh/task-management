"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

const drawerWidth = 240;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton
            component={Link}
            href="/content/dashboard"
            selected={pathname === "/dashboard"}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            href="/content/user-management"
            selected={pathname === "/user-management"}
          >
            <ListItemText primary="User Management" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
