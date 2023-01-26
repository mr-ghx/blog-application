import React, { useState, useEffect } from "react";
import BlogDataService from "../services/blog.service";
import UserDataService from "../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../components/premium_popup";

const Blogs = (props) => {
  let navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    retrieveBlogs();
  }, []);

  const retrieveBlogs = () => {
    BlogDataService.getBlogs()
      .then((response) => {
        console.log(response.data);
        setBlogs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshUserData = () => {
    setModalShow(false);
    UserDataService.getUser(props.user.email)
      .then((response) => {
        console.log(response.data);
        props.setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const reviseContent = (content) => {
    return `${content.substring(0, 100)}....  `;
  };

  console.log(props.user);

  return (
    <section className="section">
      <h2>Blogs</h2>
      <br />
      <div>
        <div className="row">
          {blogs.map((blog) => {
            return (
              <div className="col-lg-4 pb-1">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">
                      {reviseContent(blog.content)}
                      {!props.user ? (
                        <Link to={"/login"}> Read more </Link>
                      ) : new Date(props.user.premiumUntil)< (new Date(Date.now())) ? (
                        <a
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => setModalShow(true)}
                        >
                          <u>Read more</u>
                        </a>
                      ) : (
                        <Link to={"/blog/" + blog._id}> Read more </Link>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <PopUp
          show={modalShow}
          onHide={() => refreshUserData()}
          user={props.user}
        />
      </div>
    </section>
  );
};

export default Blogs;
