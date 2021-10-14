import React from "react";
import { Navbar } from "../components/Navbar";
import { Box } from "@mui/material";

export const Layout = ({ children }) => {
  return (
    <main sx={{ display: "flex", height: "100%", background: "#f9f9f9" }}>
      <Navbar />

      <Box
        sx={{
          width: "100%",
          overflow: "scroll",
          height: "calc(100vh - 59px)",
        }}
      >
        {children}
      </Box>
    </main>
  );
};
