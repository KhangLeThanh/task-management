"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Sidebar from "@/app/content/components/Sidebar";
import axios from "axios";
import { APIURL } from "@/constant/baseUrl";
import { PersonalTask } from "@/ultils/types";

// Create a UserContext to provide user data to children
const UserContext = createContext<{
  user: PersonalTask | null;
  errorUser: string;
}>({
  user: null,
  errorUser: "",
});

export function useUser() {
  return useContext(UserContext);
}

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<PersonalTask | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found");
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${APIURL}/users/${userId}`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch user");
      }
    };
    fetchUser();
  }, []);
  const handleLogOut = async () => {
    try {
      await axios.post(`${APIURL}/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem("userId");
      router.push("/auth/login");
    } catch (error: any) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Login failed");
      }
    }
  };
  return (
    <UserContext.Provider value={{ user, errorUser: error }}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Navbar */}
          <AppBar
            position="static"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" component="div">
                MyLogo
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar alt={user?.userName || ""} src="/avatar.jpg" />
                <IconButton onClick={handleLogOut}>
                  <ArrowDropDownIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Page content */}
          <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>{children}</Box>
        </Box>
      </Box>
    </UserContext.Provider>
  );
}
