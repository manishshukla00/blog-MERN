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
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
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
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {isLogedIn ? (
            <Button
              onClick={() => dispatch(authActions.logout())}
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
