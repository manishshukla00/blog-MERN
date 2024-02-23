import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const Header = () => {
  return (
    <AppBar style={{ background: "orange" }}>
      <Toolbar>
        <Typography variant="h4">Blogs-App</Typography>
        <Box display="flex" marginLeft="auto">
          <Button sx={{ margin: 1, borderRadius: 10 }} variant="contained">
            Login
          </Button>
          <Button sx={{ margin: 1, borderRadius: 10 }} variant="contained">
            Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
