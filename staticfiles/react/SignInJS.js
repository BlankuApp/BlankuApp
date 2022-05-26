var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export default function SignIn(props) {
  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      password = _useState4[0],
      setPassword = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loggedIn = _useState6[0],
      setLoggedIn = _useState6[1];

  var _useState7 = useState(""),
      _useState8 = _slicedToArray(_useState7, 2),
      err = _useState8[0],
      setErr = _useState8[1];

  useEffect(function () {
    return setLoggedIn(false);
  });

  var handleSignIn = function handleSignIn(e) {
    e.preventDefault();
    fetch("/api/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(function (res) {
      return res.json();
    }).then(function (response) {
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

    (function () {
      fetch("/api/user/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        credentials: "include"
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log(result);
      });
    })();
  };

  useEffect(function () {
    if (loggedIn) {
      window.location.href = "/";
    }
  }, [loggedIn]);
  return React.createElement(
    "div",
    { className: "form-signin pt-5" },
    React.createElement(
      "form",
      null,
      React.createElement(
        "h1",
        { className: "h3 mb-3 fw-normal" },
        "Sign in"
      ),
      React.createElement(
        "div",
        { className: "form-floating" },
        React.createElement("input", {
          type: "email",
          className: "form-control",
          placeholder: "name@example.com",
          onChange: function onChange(e) {
            return setEmail(e.target.value);
          }
        }),
        React.createElement(
          "label",
          { htmlFor: "floatingInput" },
          "Email address"
        )
      ),
      React.createElement(
        "div",
        { className: "form-floating" },
        React.createElement("input", {
          type: "password",
          className: "form-control",
          placeholder: "Password",
          onChange: function onChange(e) {
            return setPassword(e.target.value);
          }
        }),
        React.createElement(
          "label",
          { htmlFor: "floatingPassword" },
          "Password"
        )
      ),
      React.createElement(
        "p",
        { className: "text-danger ps-2" },
        err
      ),
      React.createElement(
        "button",
        {
          className: "w-100 btn btn-dark fs-5",
          type: "submit",
          onClick: function onClick(e) {
            return handleSignIn(e);
          }
        },
        "Sign in"
      )
    ),
    "Don't have an account? ",
    React.createElement(
      "a",
      { href: "/Register" },
      "Register now"
    )
  );
}

var signInRoot = document.getElementById("signInComponent");
ReactDOM.render(React.createElement(SignIn, null), signInRoot);