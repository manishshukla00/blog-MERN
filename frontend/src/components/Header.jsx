import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [value, setValue] = useState();
  const isLogedIn = useSelector((state) => state.isLogedIn);
  return (
    <AppBar position="sticky" style={{ background: "orange" }}>
      <Toolbar>
        <Typography variant="h4">Blogs-App</Typography>
        {isLogedIn && (
          <Box display="flex" marginRight="auto" marginLeft="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {isLogedIn ? (
            <Button
              LinkComponent={Link}
              to="/auth"
              sx={{ margin: 1, borderRadius: 10 }}
              variant="contained"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: 1, borderRadius: 10 }}
                variant="contained"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: 1, borderRadius: 10 }}
                variant="contained"
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
