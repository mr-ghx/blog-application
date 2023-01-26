import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="section">
      <h2>404, Not Found!</h2>
      <p>Page not found!</p>
      <Link to="/" className="btn">
        back home
      </Link>
    </section>
  );
};

export default Error;
