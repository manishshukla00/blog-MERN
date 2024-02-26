import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, InputLabel, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = res.data;
    console.log(data);
    return data;
  };

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myblogs"));
  };

  useEffect(() => {
    fetchDetails().then((data) =>
      setInputs({
        title: data.blogs.title,
        description: data.blogs.description,
        image: data.blogs.image,
      })
    );
  }, [id]);

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            width="50%"
            border={2}
            borderColor="gray"
            borderRadius={10}
            boxShadow={"10px 10px 20px #ccc"}
            padding={2}
            marginLeft="auto"
            marginRight="auto"
            marginTop={4}
            display="flex"
            flexDirection="column"
          >
            <Typography
              variant="h4"
              padding={2}
              fontWeight="bold"
              color="blue"
              textAlign="center"
            >
              Post Your Blog
            </Typography>
            <InputLabel
              sx={{ mb: 2, mt: 2, fontSize: "20px", fontWeight: "bold" }}
            >
              Title
            </InputLabel>
            <TextField
              name="title"
              value={inputs.title}
              onChange={handleChange}
              margin="auto"
              variant="outlined"
            />
            <InputLabel
              sx={{ mb: 2, mt: 2, fontSize: "20px", fontWeight: "bold" }}
            >
              Description
            </InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              onChange={handleChange}
              margin="auto"
              variant="outlined"
            />
            <InputLabel
              sx={{ mb: 2, mt: 2, fontSize: "20px", fontWeight: "bold" }}
            >
              Image-Url
            </InputLabel>
            <TextField
              name="image"
              value={inputs.image}
              onChange={handleChange}
              margin="auto"
              variant="outlined"
            />
            <Button
              sx={{ marginTop: 2, borderRadius: 4 }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
