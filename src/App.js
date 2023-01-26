import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/homepage";
import Blogs from "./pages/blogs";
import BlogPage from "./pages/blogpage";
import Login from "./pages/login";
import Error from "./pages/error";
import SharedLayout from "./components/shared_layout";

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    console.log(user);
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout user={user} logout={logout} />}>
          <Route index element={<HomePage user={user} />} />
          <Route path="/blogs" element={<Blogs user={user} setUser={setUser} />} />
          <Route path="/blog/:id" element={<BlogPage user={user} />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/Login" element={<Login login={login} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
