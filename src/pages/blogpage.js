import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "react-router-dom";
import BlogDataService from "../services/blog.service";
import { useParams } from "react-router-dom";

const BlogPage = (props) => {
  let { id } = useParams();

  const initialBlogState = {
    title: "",
    content: "",
  };
  const [blog, setBlog] = useState(initialBlogState);

  const getBlog = (id) => {
    BlogDataService.getBlog(id)
      .then((response) => {
        console.log(response.data);
        setBlog(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(id);
    getBlog(id);
  }, [id]);

  return (
    <section className="section">
      <h2>{blog.title}</h2>
      <br />
      <br />
      <p>{blog.content}</p>
    </section>
  );
};

export default BlogPage;
