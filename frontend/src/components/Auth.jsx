import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth="400px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          boxShadow="10px 10px 20px #ccc"
          marginTop={4}
          marginLeft="auto"
          marginRight="auto"
          padding={4}
          borderRadius={4}
        >
          <Typography variant="h4" padding={2} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              onChange={handleChange}
              value={inputs.username}
              name="username"
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            onChange={handleChange}
            value={inputs.email}
            type="email"
            name="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            onChange={handleChange}
            value={inputs.password}
            type="password"
            name="password"
            placeholder="Password"
            margin="normal"
          />
          <Button type="submit" sx={{ borderRadius: 4, marginTop: 2 }}>
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 4, marginTop: 2 }}
          >
            Change this form to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
