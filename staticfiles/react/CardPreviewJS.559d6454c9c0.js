import { Morph } from "/static/react/Morph.js";
import { AnswerBox } from "/static/react/AnswerBox.js";
import { TranslationBox } from "/static/react/TranslationBox.js";
var data = JSON.parse(dataJson);

function CardPreviewJS() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "mt-3 px-1 px-sm-3 d-none d-sm-block fw-light" },
      React.createElement(
        "div",
        { className: "d-flex flex-row flex-wrap" },
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-heart fs-5 pe-1" }),
          data.likes_count
        ),
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-person fs-5" }),
          data.user
        ),
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-calendar2-event fs-5 pe-1" }),
          data.date
        ),
        React.createElement(
          "a",
          {
            href: "/cards/" + data.id,
            className: "d-flex flex-row align-items-center text-decoration-none text-dark me-3"
          },
          React.createElement("i", { className: "bi bi-link-45deg fs-5" }),
          data.id
        ),
        React.createElement(
          "div",
          { className: "d-flex flex-row align-items-center me-3" },
          React.createElement("i", { className: "bi bi-tag fs-5 pe-1" }),
          data.CERF
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
                style: { width: 100 * data.succeed / data.reviewed + "%" }
              },
              (100 * data.succeed / data.reviewed).toPrecision(3) + "%"
            )
          )
        ),
        React.createElement(
          "a",
          {
            href: "#",
            className: "d-flex text-danger flex-row align-items-center " + (username === data.user ? "d-none" : " ")
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
          key: -data.id,
          trans: data.trans,
          dir: userlang === "fa" || userlang === "ar" ? "rtl" : "ltr",
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
        data.Qtext
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
        React.createElement(Morph, { morph: data.morph })
      ),
      React.createElement("hr", { className: "my-0" }),
      React.createElement(AnswerBox, { ans: data.Atext, id: data.id })
    )
  );
}

var rootSingleCard = document.getElementById("singleCardComponent");
ReactDOM.render(React.createElement(CardPreviewJS, null), rootSingleCard);