var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Modal } from "bootstrap";

export function TranslationBox(props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      direction = _useState4[0],
      setDirection = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      scores = _useState6[0],
      setScores = _useState6[1];

  var _useState7 = useState(""),
      _useState8 = _slicedToArray(_useState7, 2),
      text = _useState8[0],
      setText = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      editted = _useState10[0],
      setEditted = _useState10[1];

  var _useState11 = useState(""),
      _useState12 = _slicedToArray(_useState11, 2),
      message = _useState12[0],
      setMessage = _useState12[1];

  useEffect(function () {
    setData(props.trans);
    setDirection(props.dir);
    var temp = Array(props.trans.length).fill(0);
    setScores(temp);
  }, []);

  useEffect(function () {
    if (text.length > 10) {
      if (editted) {
        fetch("/api/addtrans/", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
          },
          body: JSON.stringify({
            text: text,
            ensentid: data[0].ensent
          })
        }).then(function (res) {
          return res.json();
        }).then(function (result) {
          setMessage(result.message);
          if (result.message === "Trnaslation successfully added.") {
            var temp = data;
            temp.push({ text: text, point: 1, user: props.user });
            setData([].concat(_toConsumableArray(temp)));
            setScores([].concat(_toConsumableArray(scores), [0]));
            setText("");
          }
        });
      }
    }
  }, [editted]);

  useEffect(function () {
    if (data.length) {
      setData(data);
      data.map(function (item) {
        return item.user === props.user ? setEditted(true) : null;
      });
    }
  }, [data]);

  function handleScore(idx, id, score) {
    if (props.user === "guest") {
      console.log('return navigate("signin/");');
    } else {
      var temp = scores;
      temp[idx] = temp[idx] + score;
      console.log(temp);
      fetch("/api/scoretrans/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
          id: id,
          point: data[idx].point + temp[idx]
        })
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        setScores([].concat(_toConsumableArray(temp)));
        console.log(result);
      });
    }
  }

  function handleAddTrans() {
    if (props.user === "guest") {} else {
      var myModal = new Modal(document.getElementById("newTranModal"));
      myModal.show();
    }
  }

  function handleSave() {
    if (props.user === "guest") {} else {
      setEditted(true);
      var temp = data;
      var temp2 = [];
      temp.map(function (item) {
        return item.user === props.user ? null : temp2 = [].concat(_toConsumableArray(temp2), [item]);
      });
      setData(temp2);
    }
  }

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      null,
      data.map(function (item, idx) {
        return React.createElement(
          "div",
          { key: Math.random() },
          React.createElement(
            "div",
            { className: "d-flex flex-row align-items-center", dir: direction },
            React.createElement("a", {
              href: "#",
              className: "btn btn-sm fs-6 bi bi-hand-thumbs-down p-0 " + (scores[idx] == -1 ? "-fill disabled" : ""),
              onClick: function onClick() {
                return handleScore(idx, item.id, -1);
              }
            }),
            item.point + scores[idx],
            React.createElement("a", {
              href: "#",
              className: "btn btn-sm fs-6 bi bi-hand-thumbs-up p-0 " + (scores[idx] == 1 ? "-fill disabled" : ""),
              onClick: function onClick() {
                return handleScore(idx, item.id, 1);
              }
            }),
            React.createElement(
              "span",
              { className: "fs-4" },
              item.text
            ),
            idx == 0 ? null : item.user === props.user ? React.createElement(
              "a",
              {
                className: "btn btn-sm py-0 mx-1 btn-outline-primary",
                onClick: function onClick() {
                  setText(item.text);
                  handleAddTrans();
                }
              },
              "Edit"
            ) : ""
          )
        );
      })
    ),
    React.createElement(
      "div",
      { className: "modal", id: "newTranModal", tabIndex: "-1" },
      React.createElement(
        "div",
        { className: "modal-dialog modal-dialog-centered modal-lg" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-header" },
            React.createElement(
              "h5",
              { className: "modal-title" },
              "New translation box"
            ),
            React.createElement("button", {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            })
          ),
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(
              "div",
              { className: "input-group" },
              React.createElement("input", {
                type: "text",
                className: "form-control",
                placeholder: "Recipient's username",
                "aria-label": "Recipient's username",
                "aria-describedby": "basic-addon2",
                value: text.length ? text : "",
                dir: direction,
                onChange: function onChange(e) {
                  return setText(e.target.value);
                }
              }),
              React.createElement(
                "span",
                {
                  className: "input-group-text " + (text.length > 70 ? "text-danger" : text.length < 10 ? "text-danger" : null),
                  id: "basic-addon2"
                },
                text.length,
                "/70"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "modal-footer d-flex" },
            React.createElement(
              "small",
              { className: "me-auto text-danger" },
              message
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-primary " + (text.length > 70 ? "disabled" : text.length < 10 ? "disabled" : null),
                onClick: function onClick() {
                  return handleSave();
                }
              },
              "Save"
            )
          )
        )
      )
    )
  );
}