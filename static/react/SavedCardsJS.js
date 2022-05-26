var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

dataJson = JSON.parse(dataJson);
function SavedCardsJS(props) {
  var _useState = useState(dataJson),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      deleteid = _useState4[0],
      setDeleteid = _useState4[1];

  return React.createElement(
    "div",
    { className: "p-3" },
    React.createElement(
      "div",
      { className: "d-flex flex-row" },
      React.createElement(
        "a",
        {
          href: "/?root=savedCards&order=" + order,
          className: "btn btn-sm btn-primary me-auto"
        },
        "Review"
      ),
      React.createElement(
        "div",
        {
          className: "btn-group btn-group-sm",
          role: "group",
          "aria-label": "Basic radio toggle button group",
          onChange: function onChange(e) {
            return setOrder(e.target.id);
          }
        },
        React.createElement(
          "a",
          {
            href: "/SavedCards/?order=newest",
            className: "btn btn-outline-primary " + (order == "newest" ? "active" : null),
            "aria-current": "page"
          },
          "Newest"
        ),
        React.createElement(
          "a",
          {
            href: "/SavedCards/?order=oldest",
            className: "btn btn-outline-primary " + (order == "oldest" ? "active" : null)
          },
          "oldest"
        ),
        React.createElement(
          "a",
          {
            href: "/SavedCards/?order=random",
            className: "btn btn-outline-primary " + (order == "random" ? "active" : null)
          },
          "Random"
        )
      )
    ),
    React.createElement(
      "div",
      { className: "pt-3" },
      data.map(function (item) {
        return React.createElement(
          "div",
          { key: Math.random() },
          React.createElement(
            "div",
            { className: "card my-2 text-decoration-none text-body" },
            React.createElement(
              "div",
              { className: "card-header" },
              React.createElement(
                "div",
                { className: "d-flex flex-row" },
                React.createElement(
                  "small",
                  { className: "d-flex flex-row align-items-center text-muted" },
                  React.createElement("i", { className: "bi bi-person fs-5" }),
                  item.user
                ),
                React.createElement(
                  "small",
                  { className: "d-flex flex-row align-items-center text-muted mx-3" },
                  React.createElement("i", { className: "bi bi-calendar2-event fs-5 pe-1" }),
                  item.date
                ),
                React.createElement(
                  "small",
                  { className: "d-flex flex-row align-items-center text-muted" },
                  React.createElement("i", { className: "bi bi-hash fs-5" }),
                  item.id
                ),
                React.createElement(
                  "small",
                  { className: "d-flex flex-row align-items-center text-muted mx-3" },
                  React.createElement("i", { className: "bi bi-tag fs-5 pe-1" }),
                  item.CERF
                ),
                React.createElement(
                  "small",
                  { className: "d-flex flex-row align-items-center text-muted" },
                  React.createElement("i", { className: "bi bi-heart fs-5 pe-1" }),
                  item.likes_count
                ),
                React.createElement(
                  "a",
                  {
                    href: "https://front-blanku.herokuapp.com/cards/" + item.id,
                    className: "btn btn-outline-primary btn-sm ms-auto me-1"
                  },
                  "Preview"
                )
              )
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
                "div",
                {
                  className: "ps-3",
                  dir: userlang === "fa" || userlang === "ar" ? "rtl" : "ltr"
                },
                item.trans[0].text
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
                "div",
                { className: "ps-3" },
                item.Qtext
              )
            )
          )
        );
      })
    ),
    React.createElement(
      "div",
      { className: "text-center pt-3" },
      React.createElement(
        "a",
        {
          href: "/SavedCards/order=" + order + "/page=" + (parseInt(page) + 1),
          className: "btn btn-outline-primary " + (hasNext ? "" : " d-none")
        },
        "Next Page"
      )
    )
  );
}

var root = document.getElementById("savedcardsComponent");
ReactDOM.render(React.createElement(SavedCardsJS, null), root);