export function AnswerBox(props) {
  const [ans, setAns] = useState(props.ans);
  const [text, setText] = useState("");
  const [attempt, setAttempt] = useState("");
  const [blinker, setBlinker] = useState("");
  const [congrats, setCongrats] = useState(false);
  const [breakPoint, setBreakPoint] = useState();
  const [hintNum, setHintNum] = useState();
  const [cheated, setCheated] = useState(false);
  const [vis, setVis] = useState("invisible");
  const [hint, setHint] = useState(false);

  useEffect(() => {
    let temp = ans.trim().toLowerCase();
    let bp = temp.indexOf(" ");
    if (bp >= 0) {
      setBreakPoint(bp);
      setAns(temp.slice(0, bp) + temp.slice(bp + 1));
    } else {
      setAns(temp);
    }
    setHintNum(Math.trunc(0.4 * ans.length));
  }, []);

  const logKey = (e) => {
    if (e.keyCode === 32) {
      handleHint();
    } else if (e.key === "Backspace") {
      let temp = text;
      temp = temp.substring(0, temp.length - 1);
      setText(temp);
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      if (text.length < ans.length || text.length == 0) {
        setText(text + e.key.toLowerCase());
      }
    }
  };

  useEffect(() => {
    setAttempt(text + blinker);
    const interval = setInterval(() => {
      blinker === "" ? setBlinker("_") : setBlinker("");
    }, 500);
    return () => clearInterval(interval);
  }, [text, blinker]);

  useEffect(() => {
    if (text.length > 1) {
      if (ans === text) {
        setCongrats(true);
      }
    }
    window.addEventListener("keyup", logKey);
    return () => {
      window.removeEventListener("keyup", logKey);
    };
  }, [text]);

  const handleHint = () => {
    if (hintNum > 0 && !congrats) {
      let temp = text;
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

  const handleShow = () => {
    if (
      window.location.pathname === "/" &&
      window.location.hash === "" &&
      window.location.search === ""
    ) {
      if (!congrats) {
        fetch("/api/cheated/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ id: props.id }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
          });
        setCheated(true);
        setText(ans);
      }
    }
  };

  function handleClick() {
    console.log("pop up keyboard");
    let inpf = document.getElementById("dummy");
    inpf.setAttribute("class", "form-control border-1");
    inpf.focus();
    inpf.setAttribute("class", "form-control border-1 invisible");
  }

  useEffect(() => {
    if (
      location.pathname === "/" &&
      location.hash === "" &&
      location.search === ""
    ) {
      if (congrats && !cheated) {
        let point = 1;
        if (hint) {
          point = 0.5;
        }
        fetch("/api/succeeded/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ id: props.id, point: point }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
          });
      }
    }
  }, [congrats]);

  return (
    <div>
      {/* <Confetti
        run={congrats && !cheated}
        recycle={false}
        numberOfPieces={4000}
        tweenDuration={30000}
      /> */}
      <div className="text-muted fw-light" onClick={() => handleClick()}>
        Guess the answer:
      </div>
      <div
        className="d-flex flex-row flex-wrap justify-content-center"
        onClick={() => {
          handleClick();
        }}
      >
        {[...ans].map((item, idx) =>
          idx == breakPoint ? (
            <div key={idx} className=" ms-5">
              <Lbox key={idx} let={ans[idx]} cur={attempt[idx]} />
            </div>
          ) : (
            <Lbox key={idx} let={ans[idx]} cur={attempt[idx]} />
          )
        )}
      </div>
      <div className="text-center m-1 m-sm-3">
        <button
          className="btn btn-outline-dark me-1 px-5"
          onClick={() => handleHint()}
        >
          Hint({hintNum})
        </button>
        <button
          className="btn btn-outline-dark ms-1 px-5"
          onClick={() => handleShow()}
        >
          Show
        </button>
      </div>
    </div>
  );
}

function Lbox(props) {
  let color = "";
  if (props.cur === props.let) {
    color = " bg-success";
  } else if (props.cur == null || props.cur == "_") {
    color = " bg-dark";
  } else {
    color = " bg-danger";
  }
  return <div className={"shadow box " + color}>{props.cur}</div>;
}
