var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export default function CreateCard(props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      enSent = _useState2[0],
      setEnSent = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      dataAvailable = _useState6[0],
      setDataAvailable = _useState6[1];

  var _useState7 = useState(""),
      _useState8 = _slicedToArray(_useState7, 2),
      translation = _useState8[0],
      setTranslation = _useState8[1];

  var _useState9 = useState([-1000]),
      _useState10 = _slicedToArray(_useState9, 2),
      selectedWords = _useState10[0],
      setSelectedWords = _useState10[1];

  var _useState11 = useState(""),
      _useState12 = _slicedToArray(_useState11, 2),
      Qtext = _useState12[0],
      setQtext = _useState12[1];

  var _useState13 = useState(""),
      _useState14 = _slicedToArray(_useState13, 2),
      Atext = _useState14[0],
      setAtext = _useState14[1];

  var _useState15 = useState([]),
      _useState16 = _slicedToArray(_useState15, 2),
      color = _useState16[0],
      setColor = _useState16[1];

  var _useState17 = useState([]),
      _useState18 = _slicedToArray(_useState17, 2),
      morph = _useState18[0],
      setMorph = _useState18[1];

  var _useState19 = useState([]),
      _useState20 = _slicedToArray(_useState19, 2),
      CERF = _useState20[0],
      setCERF = _useState20[1];

  var _useState21 = useState([]),
      _useState22 = _slicedToArray(_useState21, 2),
      selectedCERFs = _useState22[0],
      setSelectedCERFs = _useState22[1];

  var _useState23 = useState(""),
      _useState24 = _slicedToArray(_useState23, 2),
      CERFtext = _useState24[0],
      setCERFtext = _useState24[1];

  var _useState25 = useState(""),
      _useState26 = _slicedToArray(_useState25, 2),
      ahhh = _useState26[0],
      setAhhh = _useState26[1];

  var _useState27 = useState(""),
      _useState28 = _slicedToArray(_useState27, 2),
      message = _useState28[0],
      setMessage = _useState28[1];

  function getTranslations() {
    fetch("/api/translate/", {
      method: "POST",
      body: JSON.stringify({ data: enSent }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken
      },
      credentials: "include"
    }).then(function (res) {
      return res.json();
    }).then(function (response) {
      setData(response);
      setDataAvailable("ready");
    });
  }

  function handleSubmit() {
    if (dataAvailable) {
      var sdata = {
        Qtext: Qtext,
        Atext: Atext,
        CERF: CERFtext,
        morph: JSON.stringify(morph),
        sent: enSent,
        translations: data.translations
      };
      fetch("/api/submitcard/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        credentials: "include",
        body: JSON.stringify(sdata)
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        console.log(response);
        setSelectedWords([-1000]);
        setMessage(response["message"]);
        var toastLiveExample = document.getElementById("liveToast");
        var toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
      });
    }
  }

  useEffect(function () {
    if (dataAvailable === "ready") {
      var numCERF = [];
      setTranslation(data.translations[userlang]);
      var temp = [];
      data.expertAI.map(function (item) {
        if (item.CERF === "A1") {
          numCERF.push(1);
          temp.push("bg-info");
        } else if (item.CERF === "A2") {
          numCERF.push(2);
          temp.push("bg-primary");
        } else if (item.CERF === "B1") {
          numCERF.push(3);
          temp.push("bg-success");
        } else if (item.CERF === "B2") {
          numCERF.push(4);
          temp.push("bg-warning");
        } else if (item.CERF === "C1") {
          numCERF.push(5);
          temp.push("bg-danger");
        } else {
          numCERF.push(6);
          temp.push("bg-dark");
        }
      });
      setColor(temp);
      setCERF(numCERF);
    }
  }, [dataAvailable]);

  useEffect(function () {
    if (dataAvailable === "ready") {
      var Qtemp = "";
      var Atemp = "";
      var Mtemp = [];
      var CERFtemp = [];
      data.expertAI.map(function (item, index) {
        if (selectedWords.indexOf(index) < 0) {
          Qtemp = Qtemp + item.text + " ";
        } else {
          Qtemp = Qtemp + "_".repeat(item.text.length) + " ";
          Atemp = Atemp + item.text + " ";
          Mtemp.push(item.morph);
          CERFtemp.push(CERF[index]);
          setMorph(Mtemp);
        }
      });
      Qtemp = Qtemp.replace(" . ", ".");
      setQtext(Qtemp);
      setAtext(Atemp);
      setSelectedCERFs(CERF.indexOf(Math.max.apply(Math, CERFtemp)));
      switch (Math.max.apply(Math, CERFtemp)) {
        case 1:
          setCERFtext("A1");
          break;
        case 2:
          setCERFtext("A2");
          break;
        case 3:
          setCERFtext("B1");
          break;
        case 4:
          setCERFtext("B2");
          break;
        case 5:
          setCERFtext("C1");
          break;
        case 6:
          setCERFtext("OL");
          break;
      }
    }
  }, [ahhh]);

  useEffect(function () {
    if (username === "") {
      window.location.href = "/login/";
    }
  }, []);

  var translationField = void 0;
  if (data.expertAI != null) {
    translationField = React.createElement(
      "div",
      { className: "card" },
      React.createElement(
        "div",
        { className: "card-body" },
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement(
            "span",
            { className: "input-group-text" },
            "Translation"
          ),
          React.createElement("input", {
            className: "form-control",
            type: "text",
            defaultValue: translation,
            onChange: function onChange(e) {
              setTranslation(e.target.value);
              var temp = data;
              temp.translations[userlang] = e.target.value;
              setData(temp);
            },
            dir: userlang === "fa" || userlang === "ar" ? "rtl" : "ltr"
          })
        ),
        React.createElement(
          "div",
          { className: "text-muted" },
          React.createElement(
            "small",
            null,
            "Translations are provided by Google Translator API."
          )
        ),
        React.createElement(
          "div",
          { className: "text-muted" },
          React.createElement(
            "small",
            null,
            "Feel free to improve it."
          )
        )
      )
    );
  } else {
    translationField = React.createElement(
      "div",
      { className: "card", "aria-hidden": "true" },
      React.createElement(
        "div",
        { className: "card-body" },
        React.createElement(
          "div",
          { className: "card-title" },
          React.createElement("span", { className: "placeholder col-6" })
        ),
        React.createElement(
          "p",
          { className: "card-text" },
          React.createElement("span", { className: "placeholder col-7" }),
          React.createElement("span", { className: "placeholder col-4" }),
          React.createElement("span", { className: "placeholder col-4" }),
          React.createElement("span", { className: "placeholder col-6" }),
          React.createElement("span", { className: "placeholder col-8" })
        )
      )
    );
  }

  var selectionBox = void 0;
  if (dataAvailable === "ready") {
    selectionBox = React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        "Select the blanks"
      ),
      React.createElement(
        "div",
        { className: "d-flex flex-wrap" },
        data.expertAI.map(function (item, index) {
          return React.createElement(
            "a",
            {
              href: "#",
              key: index,
              className: "card m-1 text-decoration-none text-body" + (selectedWords.indexOf(index) > 0 ? " bg-light border-primary" : " "),
              onClick: function onClick() {
                var temp = selectedWords;
                if (selectedWords.indexOf(index) === -1) {
                  temp.push(index);
                  setSelectedWords(temp);
                  setAhhh(temp.toString());
                } else {
                  temp.splice(temp.indexOf(index), 1);
                  setSelectedWords(temp);
                  setAhhh(temp.toString());
                }
              }
            },
            React.createElement(
              "div",
              { className: "card-body p-2 text-center" },
              React.createElement(
                "div",
                null,
                item.text
              ),
              React.createElement(
                "div",
                {
                  className: "text-center badge rounded-pill " + color[index]
                },
                item.CERF
              )
            )
          );
        })
      )
    );
  } else {
    selectionBox = React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        { className: "card-text" },
        React.createElement("span", { className: "placeholder col-9" })
      ),
      React.createElement(
        "div",
        { className: "d-flex flex-wrap" },
        React.createElement(
          "div",
          { className: "col-2 card mx-1" },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "p",
              { className: "card-text" },
              React.createElement("span", { className: "placeholder col-12" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-3 card mx-1" },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "p",
              { className: "card-text" },
              React.createElement("span", { className: "placeholder col-12" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-2 card mx-1" },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "p",
              { className: "card-text" },
              React.createElement("span", { className: "placeholder col-12" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "col-2 card mx-1" },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "p",
              { className: "card-text" },
              React.createElement("span", { className: "placeholder col-12" })
            )
          )
        )
      )
    );
  }

  var result = void 0;
  if (selectedWords.length > 1) {
    result = React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "card-header" },
        "Preview and Submit"
      ),
      React.createElement(
        "div",
        { className: "card-body" },
        React.createElement(
          "div",
          { className: "text-muted" },
          React.createElement(
            "small",
            null,
            "Translation:"
          )
        ),
        React.createElement(
          "p",
          {
            className: "ps-3",
            dir: userlang === "fa" || userlang === "ar" ? "rtl" : "ltr"
          },
          translation
        ),
        React.createElement(
          "div",
          { className: "text-muted" },
          React.createElement(
            "small",
            null,
            "Question text:"
          )
        ),
        React.createElement(
          "p",
          { className: "ps-3" },
          Qtext
        ),
        React.createElement(
          "div",
          { className: "text-muted" },
          React.createElement(
            "small",
            null,
            "Answer:"
          )
        ),
        React.createElement(
          "p",
          { className: "ps-3" },
          Atext
        ),
        React.createElement(
          "div",
          { className: "text-muted" },
          React.createElement(
            "small",
            null,
            "CERF:"
          )
        ),
        React.createElement(
          "p",
          {
            className: "ms-3 text-center badge rounded-pill " + color[selectedCERFs]
          },
          CERFtext
        ),
        React.createElement(
          "div",
          { className: "text-muted" },
          React.createElement(
            "small",
            null,
            "Morphology:"
          )
        ),
        morph.map(function (item, index) {
          return React.createElement(
            "div",
            { key: index, className: "ps-3 font-monospace" },
            item.map(function (aa, bb) {
              return React.createElement(
                "span",
                { key: bb },
                aa,
                " "
              );
            })
          );
        })
      ),
      React.createElement(
        "div",
        { className: "card-footer bg-body text-center" },
        React.createElement(
          "div",
          { className: "btn btn-info px-5", onClick: function onClick() {
              return handleSubmit();
            } },
          "Submit"
        )
      )
    );
  } else {
    result = React.createElement(
      "div",
      { className: "card-body" },
      React.createElement(
        "p",
        { className: "card-text" },
        React.createElement("span", { className: "placeholder col-9" }),
        React.createElement("span", { className: "placeholder col-7" }),
        React.createElement("span", { className: "placeholder col-8" }),
        React.createElement("span", { className: "placeholder col-6" })
      ),
      React.createElement("a", { className: "btn btn-info disabled placeholder col-12" })
    );
  }

  return React.createElement(
    "div",
    { className: "p-3" },
    React.createElement(
      "div",
      { className: "text-center fs-4 border-bottom m-2" },
      "Blanku Card Generator"
    ),
    React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "input-group p-3" },
        React.createElement("input", {
          className: "form-control border-end-0",
          id: "traninput",
          type: "text",
          placeholder: "Write down you english sentence here...",
          onChange: function onChange(event) {
            setEnSent(event.target.value);
            setSelectedWords([-1000]);
            setDataAvailable(false);
            setData([]);
            setTranslation("");
          }
        }),
        React.createElement(
          "a",
          {
            href: "#",
            className: "input-group-text bg-body text-secondary border-start-0",
            onClick: function onClick() {
              var elem = document.getElementById("traninput");
              elem.value = "";
            }
          },
          React.createElement("i", { className: "bi bi-x-circle-fill fs-5" })
        ),
        React.createElement(
          "span",
          {
            className: "input-group-text " + (enSent.length > 70 ? "text-danger" : " ")
          },
          enSent.length,
          "/70"
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-info",
            type: "bottom",
            disabled: enSent.length > 70 || enSent.length === 0 ? 1 : 0,
            onClick: function onClick() {
              setDataAvailable("loading");
              getTranslations();
            }
          },
          dataAvailable === "loading" ? "Loading..." : "Analyse"
        )
      ),
      React.createElement(
        "div",
        { className: "mx-3" },
        translationField
      ),
      React.createElement(
        "div",
        { className: "card mx-3 my-1" },
        React.createElement(
          "div",
          { className: "card-body" },
          selectionBox
        )
      ),
      React.createElement(
        "div",
        { className: "card mx-3" },
        result
      )
    ),
    React.createElement(
      "div",
      { className: "position-fixed bottom-0 end-0 p-3" },
      React.createElement(
        "div",
        {
          id: "liveToast",
          className: "toast",
          role: "alert",
          "aria-live": "assertive",
          "aria-atomic": "true",
          "data-bs-autohide": "true"
        },
        React.createElement(
          "div",
          {
            className: "toast-header text-white " + (message == "card created" ? "bg-success" : "bg-danger")
          },
          "Message"
        ),
        React.createElement(
          "div",
          { className: "toast-body" },
          message
        )
      )
    )
  );
}

var rootGenerator = window.document.getElementById("generatorComponent");
ReactDOM.render(React.createElement(CreateCard, null), rootGenerator);