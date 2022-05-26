var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { Morph } from "/static/react/Morph.js";
import { AnswerBox } from "/static/react/AnswerBox.js";
import { TranslationBox } from "/static/react/TranslationBox.js";
dataJson = JSON.parse(dataJson);

function ReviewerJs(props) {
  var _useState = useState(dataJson),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(dataJson[0]),
      _useState4 = _slicedToArray(_useState3, 2),
      card = _useState4[0],
      setCard = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      number = _useState6[0],
      setNumber = _useState6[1];

  var _useState7 = useState(dataJson[0].read_by_me),
      _useState8 = _slicedToArray(_useState7, 2),
      readByMe = _useState8[0],
      setReadByMe = _useState8[1];

  var _useState9 = useState(dataJson[0].liked_by_me),
      _useState10 = _slicedToArray(_useState9, 2),
      likedByMe = _useState10[0],
      setLikedByMe = _useState10[1];

  var _useState11 = useState(dataJson[0].saved_by_me),
      _useState12 = _slicedToArray(_useState11, 2),
      savedByMe = _useState12[0],
      setSavedByMe = _useState12[1];

  useEffect(function () {
    if (username === "" && Lang === null) {
      if (card.trans != null) {
        var selectLang = new bootstrap.Modal(document.getElementById("selectLang"));
        selectLang.show();
      }
    }
  }, []);

  useEffect(function () {
    setCard(data[number]);
    setReadByMe(data[number].read_by_me);
    setLikedByMe(data[number].liked_by_me);
    setSavedByMe(data[number].saved_by_me);
  }, [number]);

  useEffect(function () {
    if (card.id != null) {
      handleRead();
    }
  }, [card]);

  var handleNext = function handleNext() {
    window.scrollTo(0, 0);
    if (number < 4) {
      setNumber(Math.min(number + 1, data.length - 1));
    } else {
      if (hasNext) {
        window.location.href = "/?root=" + root + "&read=" + read + "&order=" + order + "&page=" + (parseInt(page) + 1);
      }
    }
  };

  var handleSave = function handleSave() {
    if (username === "guest") {
      window.location.href = "/login";
    } else {
      fetch("/api/savecard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
          id: card.id,
          save: savedByMe
        })
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        setSavedByMe(!savedByMe);
      });
    }
  };

  var handleLike = function handleLike() {
    if (username === "") {
      window.location.href = "/login/";
    } else {
      fetch("/api/likecard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
          id: card.id,
          like: likedByMe
        })
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        setLikedByMe(!likedByMe);
      });
    }
  };

  var handleRead = function handleRead() {
    if (username != "") {
      fetch("/api/readcard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({
          id: card.id,
          read: readByMe
        })
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        setReadByMe(!readByMe);
      });
    }
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "flex-row d-none d-sm-flex" },
      root === "home" ? React.createElement(
        "div",
        { className: "btn-group btn-group-sm me-auto m-1" },
        React.createElement(
          "a",
          {
            href: username === "" ? "/login/" : "/?root=" + root + "&read=unread" + "&order=" + order + "&page=" + parseInt(page),
            className: "btn btn-outline-secondary " + (read == "unread" ? "active" : null)
          },
          "Unread"
        ),
        React.createElement(
          "a",
          {
            href: username === "" ? "/login/" : "/?root=" + root + "&read=readOnly" + "&order=" + order + "&page=" + parseInt(page),
            className: "btn btn-outline-secondary " + (read == "readOnly" ? "active" : null)
          },
          "Read Only"
        ),
        React.createElement(
          "a",
          {
            href: "/?root=" + root + "&read=all" + "&order=" + order + "&page=" + parseInt(page),
            className: "btn btn-outline-secondary " + (read == "all" ? "active" : null)
          },
          "All"
        )
      ) : React.createElement("div", { className: "me-auto" }),
      React.createElement(
        "div",
        { className: "btn-group btn-group-sm m-1" },
        React.createElement(
          "a",
          {
            href: "/?root=" + root + "&read=" + read + "&order=trikiest" + "&page=" + parseInt(page),
            className: "btn btn-outline-secondary " + (order == "trikiest" ? "active" : null)
          },
          "Trickiest",
          " ",
          React.createElement(
            "span",
            { className: "badge rounded-pill bg-danger align-top" },
            "New"
          )
        ),
        React.createElement(
          "a",
          {
            href: "/?root=" + root + "&read=" + read + "&order=newest" + "&page=" + parseInt(page),
            className: "btn btn-outline-secondary " + (order == "newest" ? "active" : null)
          },
          "Newest"
        ),
        React.createElement(
          "a",
          {
            href: "/?root=" + root + "&read=" + read + "&order=oldest" + "&page=" + parseInt(page),
            className: "btn btn-outline-secondary " + (order == "oldest" ? "active" : null)
          },
          "Oldest"
        ),
        React.createElement(
          "a",
          {
            href: "/?root=" + root + "&read=" + read + "&order=random" + "&page=" + parseInt(page),
            className: "btn btn-outline-secondary " + (order == "random" ? "active" : null)
          },
          "Random"
        )
      )
    ),
    React.createElement(
      "div",
      { className: "my-0 px-1 px-sm-3 py-0 py-sm-1 d-none d-sm-block fw-light" },
      React.createElement(
        "div",
        { className: "d-flex flex-row flex-wrap" },
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-heart fs-5 pe-1" }),
          card.likes_count
        ),
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-person fs-5" }),
          card.user
        ),
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-calendar2-event fs-5 pe-1" }),
          card.date
        ),
        React.createElement(
          "a",
          {
            href: "/cards/" + card.id + "/",
            className: "d-flex flex-row align-items-center text-decoration-none text-dark me-3"
          },
          React.createElement("i", { className: "bi bi-link-45deg fs-5" }),
          card.id
        ),
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-tag fs-5 pe-1" }),
          card.CERF
        ),
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center w-25 me-auto" },
          React.createElement("i", { className: "bi bi-speedometer2 fs-5 pe-1" }),
          React.createElement(
            "div",
            { className: "progress w-100" },
            React.createElement(
              "div",
              {
                className: "progress-bar bg-dark",
                role: "progressbar",
                style: { width: 100 * card.succeed / card.reviewed + "%" }
              },
              (100 * card.succeed / card.reviewed).toPrecision(3) + "%"
            )
          )
        ),
        React.createElement(
          "a",
          {
            href: "#",
            className: "d-flex text-danger flex-row align-items-center " + (username === card.user ? "d-none" : "")
          },
          React.createElement("i", { className: "bi bi-shield-exclamation fs-5 pe-1" })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "p-1 p-sm-3 border" },
      React.createElement(
        "div",
        { className: "text-muted fw-light" },
        React.createElement(
          "small",
          null,
          "Translation:"
        )
      ),
      React.createElement(
        "div",
        { className: "px-sm-3 pb-sm-3" },
        React.createElement(TranslationBox, {
          key: -card.id,
          trans: card.trans,
          dir: userlang === "fa" || userlang === "ar" || Lang === "fa" || Lang === "ar" ? "rtl" : "ltr",
          user: username
        })
      ),
      React.createElement(
        "div",
        { className: "text-muted fw-light" },
        React.createElement(
          "small",
          null,
          "Question text:"
        )
      ),
      React.createElement(
        "p",
        { className: "ps-sm-3 fs-4" },
        card.Qtext
      ),
      React.createElement(
        "div",
        { className: "text-muted fw-light d-none d-sm-block" },
        React.createElement(
          "small",
          null,
          "Morphology:"
        )
      ),
      React.createElement(
        "div",
        { className: "d-none d-sm-block" },
        React.createElement(Morph, { morph: card.morph })
      ),
      React.createElement("hr", { className: "my-0" }),
      React.createElement(AnswerBox, { key: card.id, ans: card.Atext, id: card.id })
    ),
    React.createElement(
      "div",
      { className: "mt-1" },
      React.createElement(
        "div",
        { className: "d-flex flex-row" },
        React.createElement(
          "button",
          {
            className: "btn btn-social fw-light",
            onClick: function onClick() {
              return handleRead();
            }
          },
          React.createElement("i", {
            className: "fs-5 me-1 bi " + (readByMe ? "bi-square" : "bi-check2-square")
          }),
          "Unread"
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-social fw-light",
            onClick: function onClick() {
              return handleLike();
            }
          },
          React.createElement("i", {
            className: "fs-5 me-1 bi bi-heart" + (likedByMe ? "-fill" : "")
          }),
          " ",
          "Like"
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-social fw-light me-auto",
            onClick: function onClick() {
              return handleSave();
            }
          },
          React.createElement("i", {
            className: "fs-5 pe-1 bi bi-bookmark" + (savedByMe ? "-fill" : "")
          }),
          " ",
          "Save"
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-social fw-light",
            onClick: function onClick() {
              return handleNext();
            }
          },
          "Next",
          React.createElement("i", { className: "bi bi-chevron-double-right fs-5" })
        )
      )
    )
  );
}

var rootReviewer = document.getElementById("reviewerComponent");
ReactDOM.render(React.createElement(ReviewerJs, null), rootReviewer);