export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => setLoggedIn(false));

  const handleSignIn = (e) => {
    e.preventDefault();
    fetch("/api/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.detail === "User not found...") {
          setErr("User not found...");
          console.log("User not found...");
        } else if (response.detail === "Incorrect password...") {
          setErr("Incorrect password...");
          console.log("Incorrect password...");
        } else {
          setLoggedIn(true);
          // props.setUserContent(response);
        }
      });

    (() => {
      fetch("/api/user/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    })();
  };

  useEffect(() => {
    if (loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);
  return (
    <div className="form-signin pt-5">
      <form>
        <h1 className="h3 mb-3 fw-normal">Sign in</h1>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <p className="text-danger ps-2">{err}</p>
        <button
          className="w-100 btn btn-dark fs-5"
          type="submit"
          onClick={(e) => handleSignIn(e)}
        >
          Sign in
        </button>
      </form>
      Don't have an account? <a href="/Register">Register now</a>
    </div>
  );
}

const signInRoot = document.getElementById("signInComponent");
ReactDOM.render(<SignIn />, signInRoot);
