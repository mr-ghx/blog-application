import { propTypes } from "react-bootstrap/esm/Image";
import { Link, Outlet } from "react-router-dom";

const HomePage = (props) => {
  return (
    <section className="section">
      <h2>Welcome to Blog Application</h2>
      <br />
      {!props.user ? (
        <div>
          <h5>Hi user,</h5>
          <Link to="/login" className="btn btn-success">
            Login to continue using the service...
          </Link>
        </div>
      ) : (
        <div>
          <h5>
            Hello <lowercase>{props.user.email}</lowercase>
          </h5>
          {new Date(props.user.premiumUntil) < new Date(Date.now()) ? (
            <p>Free user</p>
          ) : (
            <>
              <p>Premium user</p>
              <p>
                Valid till {new Date(props.user.premiumUntil).toDateString()}
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default HomePage;
