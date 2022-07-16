import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <div>
        <h1>IronProfile</h1>
        <p>
          Today we will create an app with authorization, adding some cool
          styles
        </p>
      </div>
      <div>
        {/* Buttons should redirect to the front-end routes /signup and /login, respectively. */}
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
        <Link to="/login">
          <button>Log in</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
