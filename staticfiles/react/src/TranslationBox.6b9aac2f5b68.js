// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Modal } from "bootstrap";

export function TranslationBox(props) {
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState("");
  const [scores, setScores] = useState([]);
  const [text, setText] = useState("");
  const [editted, setEditted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setData(props.trans);
    setDirection(props.dir);
    let temp = Array(props.trans.length).fill(0);
    setScores(temp);
  }, []);

  useEffect(() => {
    if (text.length > 10) {
      if (editted) {
        fetch("/api/addtrans/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            text: text,
            ensentid: data[0].ensent,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            setMessage(result.message);
            if (result.message === "Trnaslation successfully added.") {
              let temp = data;
              temp.push({ text: text, point: 1, user: props.user });
              setData([...temp]);
              setScores([...scores, 0]);
              setText("");
            }
          });
      }
    }
  }, [editted]);

  useEffect(() => {
    if (data.length) {
      setData(data);
      data.map((item) => (item.user === props.user ? setEditted(true) : null));
    }
  }, [data]);

  function handleScore(idx, id, score) {
    if (props.user === "guest") {
      console.log('return navigate("signin/");');
    } else {
      let temp = scores;
      temp[idx] = temp[idx] + score;
      console.log(temp);
      fetch("/api/scoretrans/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          id: id,
          point: data[idx].point + temp[idx],
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setScores([...temp]);
          console.log(result);
        });
    }
  }

  function handleAddTrans() {
    if (props.user === "guest") {
    } else {
      var myModal = new Modal(document.getElementById("newTranModal"));
      myModal.show();
    }
  }

  function handleSave() {
    if (props.user === "guest") {
    } else {
      setEditted(true);
      let temp = data;
      let temp2 = [];
      temp.map((item) =>
        item.user === props.user ? null : (temp2 = [...temp2, item])
      );
      setData(temp2);
    }
  }

  return (
    <div>
      <div>
        {data.map((item, idx) => (
          <div key={Math.random()}>
            <div className="d-flex flex-row align-items-center" dir={direction}>
              <a
                href="#"
                className={
                  "btn btn-sm fs-6 bi bi-hand-thumbs-down p-0 " +
                  (scores[idx] == -1 ? "-fill disabled" : "")
                }
                onClick={() => handleScore(idx, item.id, -1)}
              ></a>
              {item.point + scores[idx]}
              <a
                href="#"
                className={
                  "btn btn-sm fs-6 bi bi-hand-thumbs-up p-0 " +
                  (scores[idx] == 1 ? "-fill disabled" : "")
                }
                onClick={() => handleScore(idx, item.id, 1)}
              ></a>
              <span className="fs-4">{item.text}</span>

              {idx == 0 ? null : item.user === props.user ? (
                <a
                  className="btn btn-sm py-0 mx-1 btn-outline-primary"
                  onClick={() => {
                    setText(item.text);
                    handleAddTrans();
                  }}
                >
                  Edit
                </a>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
        {/* {editted ? null : (
          <div className="mx-2 d-none d-sm-block" dir={direction}>
            <div
              className="btn btn-sm py-0 px-1 btn-outline-secondary"
              dir="ltr"
              onClick={() => handleAddTrans()}
            >
              <i className="bi bi-plus-lg"></i>
            </div>
          </div>
        )} */}
      </div>
      <div className="modal" id="newTranModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New translation box</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={text.length ? text : ""}
                  dir={direction}
                  onChange={(e) => setText(e.target.value)}
                ></input>
                <span
                  className={
                    "input-group-text " +
                    (text.length > 70
                      ? "text-danger"
                      : text.length < 10
                      ? "text-danger"
                      : null)
                  }
                  id="basic-addon2"
                >
                  {text.length}/70
                </span>
              </div>
            </div>
            <div className="modal-footer d-flex">
              <small className="me-auto text-danger">{message}</small>
              <button
                type="button"
                className={
                  "btn btn-primary " +
                  (text.length > 70
                    ? "disabled"
                    : text.length < 10
                    ? "disabled"
                    : null)
                }
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
