var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

dataJson = JSON.parse(dataJson);
function MyCardsJs(props) {
  var _useState = useState(dataJson),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      reload = _useState4[0],
      setReload = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      deleteid = _useState6[0],
      setDeleteid = _useState6[1];

  function handleRemove(idx) {
    setDeleteid(idx);
    var selectLang = new bootstrap.Modal(document.getElementById("confirmation"));
    selectLang.show();
  }

  function handleDelete(idx) {
    if (deleteid > 0) {
      fetch("/api/deletecard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify({ id: deleteid })
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log(result);
        var index = [].concat(_toConsumableArray(data)).findIndex(function (item) {
          return item.id === deleteid;
        });
        var array1 = data.slice(0, index);
        var array2 = data.slice(index + 1);
        var array3 = array1.concat(array2);
        setData(array3);
        setDeleteid(0);
      });
    }
  }

  return React.createElement(
    "div",
    { className: "p-3" },
    React.createElement(
      "div",
      { className: "d-flex flex-row" },
      React.createElement(
        "a",
        {
          href: "/?root=myCards&order=" + order,
          className: "btn btn-sm btn-secondary me-auto"
        },
        "Review"
      ),
      React.createElement(
        "div",
        {
          className: "btn-group btn-group-sm",
          role: "group",
          "aria-label": "Basic radio toggle button group"
        },
        React.createElement(
          "a",
          {
            href: "/MyCards/?order=newest",
            className: "btn btn-outline-secondary " + (order == "newest" ? "active" : null),
            "aria-current": "page"
          },
          "Newest"
        ),
        React.createElement(
          "a",
          {
            href: "/MyCards/?order=oldest",
            className: "btn btn-outline-secondary " + (order == "oldest" ? "active" : null)
          },
          "oldest"
        ),
        React.createElement(
          "a",
          {
            href: "/MyCards/?order=random",
            className: "btn btn-outline-secondary " + (order == "random" ? "active" : null)
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
                    className: "btn btn-outline-secondary btn-sm ms-auto me-1"
                  },
                  "Preview"
                ),
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-outline-danger btn-sm text-center",
                    onClick: function onClick() {
                      return handleRemove(item.id);
                    }
                  },
                  "Remove"
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
          href: "/MyCards/order=" + order + "/page=" + (parseInt(page) + 1),
          className: "btn btn-outline-secondary " + (hasNext ? "" : " d-none")
        },
        "Next Page"
      )
    ),
    React.createElement(
      "div",
      { className: "modal", id: "confirmation", tabIndex: "-1" },
      React.createElement(
        "div",
        { className: "modal-dialog" },
        React.createElement(
          "div",
          { className: "modal-content" },
          React.createElement(
            "div",
            { className: "modal-header" },
            React.createElement(
              "h5",
              { className: "modal-title text-danger" },
              React.createElement("i", { className: "bi bi-exclamation-triangle-fill pe-2" }),
              "Are you sure?"
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
              "p",
              null,
              "Do you really want to delete the card ",
              deleteid,
              "? This process cannot be undone."
            )
          ),
          React.createElement(
            "div",
            { className: "modal-footer" },
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-secondary",
                "data-bs-dismiss": "modal"
              },
              "Cancel"
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className: "btn btn-danger",
                "data-bs-dismiss": "modal",
                onClick: function onClick() {
                  return handleDelete(data.id);
                }
              },
              "DELETE!"
            )
          )
        )
      )
    )
  );
}

var root = document.getElementById("mycardsComponent");
ReactDOM.render(React.createElement(MyCardsJs, null), root);