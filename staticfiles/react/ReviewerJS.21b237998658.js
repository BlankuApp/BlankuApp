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
            href: "/cards/" + card.id,
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
    ),
    React.createElement(
      "div",
      { className: "modal", id: "selectLang", tabIndex: "-1" },
      React.createElement(
        "div",
        { className: "modal-dialog" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-body" },
            React.createElement(
              "div",
              null,
              "Are you new to Blanku?"
            ),
            React.createElement(
              "p",
              null,
              "Then select your first language and start learning with us"
            ),
            React.createElement(
              "div",
              { className: "d-flex flex-wrap" },
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=cn",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 512 512",
                    width: "32",
                    height: "32"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#d80027", d: "M0 0h512v512H0z" }),
                    React.createElement("path", {
                      fill: "#ffda44",
                      d: "m140.1 155.8 22.1 68h71.5l-57.8 42.1 22.1 68-57.9-42-57.9 42 22.2-68-57.9-42.1H118zm163.4 240.7-16.9-20.8-25 9.7 14.5-22.5-16.9-20.9 25.9 6.9 14.6-22.5 1.4 26.8 26 6.9-25.1 9.6zm33.6-61 8-25.6-21.9-15.5 26.8-.4 7.9-25.6 8.7 25.4 26.8-.3-21.5 16 8.6 25.4-21.9-15.5zm45.3-147.6L370.6 212l19.2 18.7-26.5-3.8-11.8 24-4.6-26.4-26.6-3.8 23.8-12.5-4.6-26.5 19.2 18.7zm-78.2-73-2 26.7 24.9 10.1-26.1 6.4-1.9 26.8-14.1-22.8-26.1 6.4 17.3-20.5-14.2-22.7 24.9 10.1z"
                    })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\u6C49\u8BED"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=es",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "mask",
                    { id: "b" },
                    React.createElement("path", {
                      fill: "#fff",
                      d: "M160 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z"
                    })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#d80027", d: "M0 0h512v512H0z" }),
                    React.createElement("path", { fill: "#ffda44", d: "M0 128h512v256H0z" }),
                    React.createElement(
                      "g",
                      { fill: "#eee" },
                      React.createElement("path", { d: "M144 304h-16v-80h16zm128 0h16v-80h-16z" }),
                      React.createElement("ellipse", { cx: "208", cy: "296", rx: "48", ry: "32" })
                    ),
                    React.createElement(
                      "g",
                      { fill: "#d80027" },
                      React.createElement("rect", { width: "16", height: "24", x: "128", y: "192", rx: "8" }),
                      React.createElement("rect", { width: "16", height: "24", x: "272", y: "192", rx: "8" }),
                      React.createElement("path", { d: "M208 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z" })
                    ),
                    React.createElement(
                      "g",
                      { fill: "#ff9811" },
                      React.createElement("rect", { width: "32", height: "16", x: "120", y: "208", ry: "8" }),
                      React.createElement("rect", { width: "32", height: "16", x: "264", y: "208", ry: "8" }),
                      React.createElement("rect", { width: "32", height: "16", x: "120", y: "304", rx: "8" }),
                      React.createElement("rect", { width: "32", height: "16", x: "264", y: "304", rx: "8" }),
                      React.createElement("path", { d: "M160 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z" })
                    ),
                    React.createElement("path", { d: "M122 252h172m-172 24h28m116 0h28" }),
                    React.createElement("path", {
                      fill: "#d80027",
                      d: "M122 248a4 4 0 0 0-4 4 4 4 0 0 0 4 4h172a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm0 24a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4z"
                    }),
                    React.createElement("path", {
                      fill: "#eee",
                      d: "M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4 16 16 0 0 0 17 4 16 16 0 1 0 10-20 16 16 0 0 0-27-5c-3-4-7-6-12-6zm0 8c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm24 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm-44 10 4 1 4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8zm64 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-7l4-8 4-1z"
                    }),
                    React.createElement("path", {
                      fill: "none",
                      d: "M220 284v12c0 7 5 12 12 12s12-5 12-12v-12z"
                    }),
                    React.createElement("path", { fill: "#ff9811", d: "M200 160h16v32h-16z" }),
                    React.createElement("path", { fill: "#eee", d: "M208 224h48v48h-48z" }),
                    React.createElement(
                      "g",
                      { fill: "#d80027" },
                      React.createElement("path", { d: "m248 208-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24zm-88 16h48v48h-48z" }),
                      React.createElement("rect", {
                        width: "20",
                        height: "32",
                        x: "222",
                        y: "232",
                        rx: "10",
                        ry: "10"
                      }),
                      React.createElement(
                        "g",
                        { mask: "url(#b)" },
                        React.createElement("path", { d: "M170 272h10v48h-10zm19 0h10v48h-10z" })
                      )
                    ),
                    React.createElement("path", {
                      fill: "#ff9811",
                      d: "M168 232v8h8v16h-8v8h32v-8h-8v-16h8v-8zm8-16h64v8h-64z"
                    }),
                    React.createElement(
                      "g",
                      { fill: "#ffda44" },
                      React.createElement("circle", { cx: "186", cy: "202", r: "6" }),
                      React.createElement("circle", { cx: "208", cy: "202", r: "6" }),
                      React.createElement("circle", { cx: "230", cy: "202", r: "6" })
                    ),
                    React.createElement(
                      "g",
                      { fill: "#338af3" },
                      React.createElement("circle", { cx: "208", cy: "272", r: "16" }),
                      React.createElement("rect", { width: "32", height: "16", x: "264", y: "320", ry: "8" }),
                      React.createElement("rect", { width: "32", height: "16", x: "120", y: "320", ry: "8" })
                    )
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "Spanish"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=hi",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", {
                      fill: "#eee",
                      d: "m0 144.7 255.3-36.5L512 144.7v222.6L250.5 407 0 367.3z"
                    }),
                    React.createElement("path", { fill: "#ff9811", d: "M0 0h512v144.7H0z" }),
                    React.createElement("path", { fill: "#6da544", d: "M0 367.3h512V512H0z" }),
                    React.createElement("circle", { cx: "256", cy: "256", r: "89", fill: "#0052b4" }),
                    React.createElement("circle", { cx: "256", cy: "256", r: "55.7", fill: "#eee" }),
                    React.createElement("path", {
                      fill: "#0052b4",
                      d: "m256 187.3 17.2 39 42.3-4.6-25.2 34.3 25.2 34.3-42.3-4.6-17.2 39-17.2-39-42.3 4.6 25.2-34.3-25.2-34.3 42.3 4.6z"
                    })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\u0939\u093F\u0902\u0926\u0940"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=jp",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#eee", d: "M0 0h512v512H0z" }),
                    React.createElement("circle", { cx: "256", cy: "256", r: "111.3", fill: "#d80027" })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\u65E5\u672C\u8A9E"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=bn",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#496e2d", d: "M0 0h512v512H0z" }),
                    React.createElement("circle", { cx: "200.3", cy: "256", r: "111.3", fill: "#d80027" })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\u09AC\u09BE\u0982\u09B2\u09BE"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=ru",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", {
                      fill: "#0052b4",
                      d: "m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z"
                    }),
                    React.createElement("path", { fill: "#eee", d: "M0 0h512v167H0z" }),
                    React.createElement("path", { fill: "#d80027", d: "M0 345h512v167H0z" })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\u0440\u0443\u0441\u0441\u043A\u0438\u0439 \u044F\u0437\u044B\u043A"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=fa",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", {
                      fill: "#eee",
                      d: "M0 144.7 258.8 39.6 512 144.7v222.6L257 493 0 367.3z"
                    }),
                    React.createElement("path", {
                      fill: "#6da544",
                      d: "M0 0v144.7h105.6v-22.2h33.6v22.2h33.3v-22.2h33.6v22.2h33.3v-22.2H273v22.2h33v-22.2h33.6v22.2h33.2v-22.2h33.6v22.2H512V0z"
                    }),
                    React.createElement("path", {
                      fill: "#d80027",
                      d: "M0 367.3V512h512V367.3H406.4v22.4h-33.6v-22.4h-33.2v22.4H306v-22.4h-33v22.4h-33.6v-22.4h-33.3v22.4h-33.6v-22.4h-33.3v22.4h-33.6v-22.4zm339.1-178h-33.4c.2 3.7.4 7.4.4 11.1 0 24.8-6.2 48.8-17 66-3.3 5.2-9 12.6-16.4 17.6v-94.7h-33.4v94.8c-7.5-5-13-12.4-16.4-17.7-10.8-17-17-41-17-65.9 0-3.7.2-7.4.4-11H173a190 190 0 0 0-.4 11c0 68.7 36.7 122.5 83.5 122.5s83.5-53.8 83.5-122.5c0-3.7-.1-7.4-.4-11z"
                    })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\u0641\u0627\u0631\u0633\u06CC"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=ar",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#496e2d", d: "M0 0h512v512H0z" }),
                    React.createElement(
                      "g",
                      { fill: "#eee" },
                      React.createElement("path", { d: "M144.7 306c0 18.5 15 33.5 33.4 33.5h100.2a27.8 27.8 0 0 0 27.8 27.8h33.4a27.8 27.8 0 0 0 27.8-27.8V306zm225.4-161.3v78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9H370zm-239.3 78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9h-33.4z" }),
                      React.createElement("path", { d: "M320 144.7h33.4v78H320zm-50 44.5a5.6 5.6 0 0 1-11.2 0v-44.5h-33.4v44.5a5.6 5.6 0 0 1-11.1 0v-44.5h-33.4v44.5a39 39 0 0 0 39 39 38.7 38.7 0 0 0 22.2-7 38.7 38.7 0 0 0 22.2 7c1.7 0 3.4-.1 5-.3a22.3 22.3 0 0 1-21.6 17v33.4c30.6 0 55.6-25 55.6-55.7v-77.9H270z" }),
                      React.createElement("path", { d: "M180.9 244.9h50v33.4h-50z" })
                    )
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\u0627\u064E\u0644\u0652\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u064E\u0651\u0629\u064F"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=de",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", {
                      fill: "#ffda44",
                      d: "m0 345 256.7-25.5L512 345v167H0z"
                    }),
                    React.createElement("path", { fill: "#d80027", d: "m0 167 255-23 257 23v178H0z" }),
                    React.createElement("path", { fill: "#333", d: "M0 0h512v167H0z" })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "Deutsch"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=fr",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", {
                      fill: "#eee",
                      d: "M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z"
                    }),
                    React.createElement("path", { fill: "#0052b4", d: "M0 0h167v512H0z" }),
                    React.createElement("path", { fill: "#d80027", d: "M345 0h167v512H345z" })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "Fran\xE7ais"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=id",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#eee", d: "m0 256 249.6-41.3L512 256v256H0z" }),
                    React.createElement("path", { fill: "#a2001d", d: "M0 0h512v256H0z" })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "Bahasa Indonesia"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=ko",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#eee", d: "M0 0h512v512H0z" }),
                    React.createElement("path", {
                      fill: "#d80027",
                      d: "M345 256c0 22.3-39.8 78-89 78s-89-55.7-89-78a89 89 0 1 1 178 0z"
                    }),
                    React.createElement("path", { fill: "#0052b4", d: "M345 256a89 89 0 1 1-178 0" }),
                    React.createElement("path", {
                      fill: "#333",
                      d: "m350.4 334.7 23.7-23.6 15.7 15.7-23.6 23.6zm-39.3 39.4 23.6-23.7 15.7 15.8-23.6 23.6zm86.6 7.8 23.6-23.6L437 374l-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7L374 437zm15.8-63 23.6-23.6 15.7 15.7-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7-23.7 23.6zm63-220.4-63-63 15.8-15.7 63 63zm-63-15.7-23.6-23.7 15.7-15.7 23.7 23.6zm39.4 39.3-23.7-23.6 15.8-15.7 23.6 23.6zm7.8-86.6-23.6-23.6L374 75l23.7 23.6zm39.4 39.4L397.7 130l15.7-15.8L437 138zM90.7 358.3l63 63-15.8 15.7-63-63zm63 15.7 23.6 23.7-15.7 15.7-23.7-23.6zm-39.4-39.3 23.6 23.6-15.7 15.8-23.6-23.7zm23.6-23.6 63 63-15.7 15.7-63-63zm15.8-220.4-63 63L75 137.9l63-63zm23.6 23.6-63 63-15.7-15.8 63-63zm23.6 23.6-63 63-15.7-15.7 63-63z"
                    })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "\uD55C\uAD6D\uC5B4"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=nl",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", {
                      fill: "#eee",
                      d: "m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z"
                    }),
                    React.createElement("path", { fill: "#a2001d", d: "M0 0h512v167H0z" }),
                    React.createElement("path", { fill: "#0052b4", d: "M0 345h512v167H0z" })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "Nederlands"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=pt",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#6da544", d: "M0 512h167l37.9-260.3L167 0H0z" }),
                    React.createElement("path", { fill: "#d80027", d: "M512 0H167v512h345z" }),
                    React.createElement("circle", { cx: "167", cy: "256", r: "89", fill: "#ffda44" }),
                    React.createElement("path", {
                      fill: "#d80027",
                      d: "M116.9 211.5V267a50 50 0 1 0 100.1 0v-55.6H117z"
                    }),
                    React.createElement("path", {
                      fill: "#eee",
                      d: "M167 283.8c-9.2 0-16.7-7.5-16.7-16.7V245h33.4v22c0 9.2-7.5 16.7-16.7 16.7z"
                    })
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "Portugu\xEAs"
                )
              ),
              React.createElement(
                "a",
                {
                  href: "/api/setLang/?Lang=tr",
                  className: "btn btn-outline-primary m-1 py-1"
                },
                React.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32",
                    viewBox: "0 0 512 512"
                  },
                  React.createElement(
                    "mask",
                    { id: "a" },
                    React.createElement("circle", { cx: "256", cy: "256", r: "256", fill: "#fff" })
                  ),
                  React.createElement(
                    "g",
                    { mask: "url(#a)" },
                    React.createElement("path", { fill: "#d80027", d: "M0 0h512v512H0z" }),
                    React.createElement(
                      "g",
                      { fill: "#eee" },
                      React.createElement("path", { d: "m245.5 209.2 21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11z" }),
                      React.createElement("path", { d: "M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" })
                    )
                  )
                ),
                React.createElement(
                  "span",
                  { className: "align-middle ms-1" },
                  "T\xFCrk dili"
                )
              )
            )
          )
        )
      )
    )
  );
}

var rootReviewer = document.getElementById("reviewerComponent");
ReactDOM.render(React.createElement(ReviewerJs, null), rootReviewer);