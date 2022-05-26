var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

export function AnswerBox(props) {
  var _useState = useState(props.ans),
      _useState2 = _slicedToArray(_useState, 2),
      ans = _useState2[0],
      setAns = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      text = _useState4[0],
      setText = _useState4[1];

  var _useState5 = useState(""),
      _useState6 = _slicedToArray(_useState5, 2),
      attempt = _useState6[0],
      setAttempt = _useState6[1];

  var _useState7 = useState(""),
      _useState8 = _slicedToArray(_useState7, 2),
      blinker = _useState8[0],
      setBlinker = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      congrats = _useState10[0],
      setCongrats = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray(_useState11, 2),
      breakPoint = _useState12[0],
      setBreakPoint = _useState12[1];

  var _useState13 = useState(),
      _useState14 = _slicedToArray(_useState13, 2),
      hintNum = _useState14[0],
      setHintNum = _useState14[1];

  var _useState15 = useState(false),
      _useState16 = _slicedToArray(_useState15, 2),
      cheated = _useState16[0],
      setCheated = _useState16[1];

  var _useState17 = useState("invisible"),
      _useState18 = _slicedToArray(_useState17, 2),
      vis = _useState18[0],
      setVis = _useState18[1];

  var _useState19 = useState(false),
      _useState20 = _slicedToArray(_useState19, 2),
      hint = _useState20[0],
      setHint = _useState20[1];

  useEffect(function () {
    var temp = ans.trim().toLowerCase();
    var bp = temp.indexOf(" ");
    if (bp >= 0) {
      setBreakPoint(bp);
      setAns(temp.slice(0, bp) + temp.slice(bp + 1));
    } else {
      setAns(temp);
    }
    setHintNum(Math.trunc(0.4 * ans.length));
  }, []);

  var logKey = function logKey(e) {
    if (e.keyCode === 32) {
      handleHint();
    } else if (e.key === "Backspace") {
      var temp = text;
      temp = temp.substring(0, temp.length - 1);
      setText(temp);
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (text.length < ans.length || text.length == 0) {
        setText(text + e.key.toLowerCase());
      }
    }
  };

  useEffect(function () {
    setAttempt(text + blinker);
    var interval = setInterval(function () {
      blinker === "" ? setBlinker("_") : setBlinker("");
    }, 500);
    return function () {
      return clearInterval(interval);
    };
  }, [text, blinker]);

  useEffect(function () {
    if (text.length > 1) {
      if (ans === text) {
        setCongrats(true);
      }
    }
    window.addEventListener("keyup", logKey);
    return function () {
      window.removeEventListener("keyup", logKey);
    };
  }, [text]);

  var handleHint = function handleHint() {
    if (hintNum > 0 && !congrats) {
      var temp = text;
      if (temp === ans.slice(0, temp.length)) {
        temp = temp + ans[temp.length];
        setText(temp);
      }
      if (temp.length) {
        for (var idx = 0; idx < temp.length; idx++) {
          var letter = temp[idx];
          // console.log("letter", letter);
          // console.log("ans[idx]", ans[idx]);
          // console.log("idx", idx);
          if (letter !== ans[idx]) {
            temp = temp.slice(0, idx) + ans[idx] + temp.slice(idx + 1);
            setText(temp);
            break;
          }
        }
      } else {
        setText(ans[0]);
      }
      setHintNum(hintNum - 1);
      setHint(true);
    }
  };

  var handleShow = function handleShow() {
    if (!congrats) {
      fetch("/api/cheated/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({ id: props.id })
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log(result);
      });
      setCheated(true);
      setText(ans);
    }
  };

  function handleClick() {
    console.log("pop up keyboard");
    var inpf = document.getElementById("dummy");
    inpf.setAttribute("class", "form-control border-1");
    inpf.focus({ preventScroll: true });
    inpf.setAttribute("class", "form-control border-1 invisible");
  }

  useEffect(function () {
    if (congrats && !cheated) {
      var point = 1;
      if (hint) {
        point = 0.5;
      }
      fetch("/api/succeeded/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({ id: props.id, point: point })
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log(result);
      });
    }
  }, [congrats]);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "text-muted fw-light", onClick: function onClick() {
          return handleClick();
        } },
      "Guess the answer:"
    ),
    React.createElement(
      "div",
      {
        className: "d-flex flex-row flex-wrap justify-content-center",
        onClick: function onClick() {
          handleClick();
        }
      },
      [].concat(_toConsumableArray(ans)).map(function (item, idx) {
        return idx == breakPoint ? React.createElement(
          "div",
          { key: idx, className: " ms-5" },
          React.createElement(Lbox, { key: idx, "let": ans[idx], cur: attempt[idx] })
        ) : React.createElement(Lbox, { key: idx, "let": ans[idx], cur: attempt[idx] });
      })
    ),
    React.createElement(
      "div",
      { className: "text-center m-1 m-sm-3" },
      React.createElement(
        "button",
        {
          className: "btn btn-outline-dark me-1 px-5",
          onClick: function onClick() {
            return handleHint();
          }
        },
        "Hint(",
        hintNum,
        ")"
      ),
      React.createElement(
        "button",
        {
          className: "btn btn-outline-dark ms-1 px-5",
          onClick: function onClick() {
            return handleShow();
          }
        },
        "Show"
      )
    )
  );
}

function Lbox(props) {
  var color = "";
  if (props.cur === props.let) {
    color = " bg-success";
  } else if (props.cur == null || props.cur == "_") {
    color = " bg-dark";
  } else {
    color = " bg-danger";
  }
  return React.createElement(
    "div",
    { className: "shadow box " + color },
    props.cur
  );
}