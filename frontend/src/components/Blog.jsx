import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

const Blog = ({ title, description, imageUrl, username, isUser, id }) => {
  const mediaStyle = {
    height: 600,
    objectFit: "contain",
  };

  console.log(id);
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const handleDelete = async () => {
    const res = axios
      .delete(`https://blog-mern-39f5.onrender.com/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    navigate("/blogs");
  };

  return (
    <div>
      <Card
        sx={{
          width: "80%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "orange" }} aria-label="recipe"></Avatar>
          }
          title={title}
          subheader={new Date().toLocaleDateString()}
        />
        <CardMedia
          component="img"
          style={mediaStyle}
          s
          image={imageUrl}
          alt={username}
        />
        {/* <div className="w-full h-full">
          <img
            className="w-full h-[500px] object-cover rounded-lg"
            src={imageUrl}
            alt={username}
          />
        </div> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
