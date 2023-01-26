import http from "../http_common";

class BlogDataService {
  getBlogs() {
    return http.get("/blogs");
  }

  getBlog(id) {
    console.log(id);
    return http.get(`/blogs/${id}`);
  }
}

export default new BlogDataService();
