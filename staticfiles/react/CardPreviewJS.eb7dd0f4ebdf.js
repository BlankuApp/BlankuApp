import { Morph } from "/static/react/Morph.js";
import { AnswerBox } from "/static/react/AnswerBox.js";
import { TranslationBox } from "/static/react/TranslationBox.js";
var data = JSON.parse(dataJson);
var dics = JSON.parse(dicsJson);

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
          React.createElement("i", {
            className: "bi bi-calendar2-event fs-5 pe-1",
          }),
          data.date
        ),
        React.createElement(
          "a",
          {
            href: "/cards/" + data.id,
            className:
              "d-flex flex-row align-items-center text-decoration-none text-dark me-3",
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
          React.createElement("i", {
            className: "bi bi-speedometer2 fs-5 pe-1",
          }),
          React.createElement(
            "div",
            { className: "progress w-100" },
            React.createElement(
              "div",
              {
                className: "progress-bar bg-dark",
                role: "progressbar",
                style: { width: (100 * data.succeed) / data.reviewed + "%" },
              },
              ((100 * data.succeed) / data.reviewed).toPrecision(3) + "%"
            )
          )
        ),
        React.createElement(
          "a",
          {
            href: "#",
            className:
              "d-flex text-danger flex-row align-items-center " +
              (username === data.user ? "d-none" : " "),
          },
          React.createElement("i", {
            className: "bi bi-shield-exclamation fs-5 pe-1",
          })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "p-1 p-sm-3 border" },
      React.createElement(
        "div",
        { className: "text-muted fw-light" },
        React.createElement("small", null, "Translation:")
      ),
      React.createElement(
        "div",
        { className: "px-sm-3 pb-sm-3" },
        React.createElement(TranslationBox, {
          key: -data.id,
          trans: data.trans,
          dir: Lang === "fa" || Lang === "ar" ? "rtl" : "ltr",
          user: username,
        })
      ),
      React.createElement(
        "div",
        { className: "text-muted fw-light" },
        React.createElement("small", null, "Question text:")
      ),
      React.createElement("p", { className: "ps-sm-3 fs-4" }, data.Qtext),
      React.createElement(
        "div",
        { className: "text-muted fw-light d-none d-sm-block" },
        React.createElement("small", null, "Morphology:")
      ),
      React.createElement(
        "div",
        { className: "d-none d-sm-block" },
        React.createElement(Morph, { morph: data.morph })
      ),
      React.createElement("hr", { className: "my-0" }),
      React.createElement(AnswerBox, { ans: data.Atext, id: data.id })
    ),
    dics.map(function (value, idx) {
      return React.createElement(
        "div",
        { className: "d-none", name: "dic", key: idx },
        React.createElement(
          "div",
          { className: "card-header border-info" },
          React.createElement(
            "div",
            { className: "d-flex align-items-start" },
            React.createElement("h2", { className: "mb-0" }, value.word),
            value.phonetics.map(function (phon, idxphon) {
              if (phon.audio) {
                return React.createElement(
                  "a",
                  {
                    className:
                      "btn btn-primary btn-sm ms-2 p-0 text-decoration-none",
                    key: idxphon,
                    onClick: function onClick() {
                      var audio = new Audio(phon.audio);
                      audio.play();
                    },
                  },
                  phon.audio.slice(-6, -4),
                  React.createElement("i", { className: "bi bi-volume-up" })
                );
              }
            })
          )
        ),
        React.createElement(
          "ul",
          { className: "list-group list-group-flush" },
          value.meanings.map(function (meaning, idxmeaning) {
            return React.createElement(
              "li",
              { className: "list-group-item", key: idxmeaning },
              React.createElement(
                "span",
                { className: "badge bg-success" },
                meaning.partOfSpeech
              ),
              meaning.synonyms.length
                ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "small",
                      null,
                      React.createElement("strong", null, "Synonyms:"),
                      " ",
                      meaning.synonyms.join(", ")
                    )
                  )
                : null,
              meaning.antonyms.length
                ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "small",
                      null,
                      React.createElement("strong", null, "Antonyms:"),
                      " ",
                      meaning.antonyms.join(", ")
                    )
                  )
                : null,
              React.createElement(
                "ul",
                null,
                meaning.definitions.map(function (definition, idxdef) {
                  return React.createElement(
                    "li",
                    { key: idxdef },
                    definition.definition,
                    definition.example
                      ? React.createElement(
                          "span",
                          null,
                          React.createElement("br", null),
                          React.createElement(
                            "small",
                            null,
                            React.createElement("strong", null, "EXAMPLE:"),
                            React.createElement("em", null, definition.example)
                          )
                        )
                      : "bye"
                  );
                })
              )
            );
          })
        )
      );
    })
  );
}

var rootSingleCard = document.getElementById("singleCardComponent");
ReactDOM.render(React.createElement(CardPreviewJS, null), rootSingleCard);
