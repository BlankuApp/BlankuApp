dataJson = JSON.parse(dataJson);
function MyCardsJs(props) {
  const [data, setData] = useState(dataJson);
  // const [hasNext, setHasNext] = useState(true);
  const [reload, setReload] = useState(false);
  const [deleteid, setDeleteid] = useState(0);

  function handleRemove(idx) {
    setDeleteid(idx);
    var selectLang = new bootstrap.Modal(
      document.getElementById("confirmation")
    );
    selectLang.show();
  }

  function handleDelete(idx) {
    if (deleteid > 0) {
      fetch("/api/deletecard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ id: deleteid }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          const index = [...data].findIndex((item) => item.id === deleteid);
          let array1 = data.slice(0, index);
          let array2 = data.slice(index + 1);
          let array3 = array1.concat(array2);
          setData(array3);
          setDeleteid(0);
        });
    }
  }

  return (
    <div className="p-3">
      <div className="d-flex flex-row">
        <a
          href={"/?root=recentlyRead&order=" + order}
          className="btn btn-sm btn-primary me-auto"
        >
          Review
        </a>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic radio toggle button group"
          onChange={(e) => setOrder(e.target.id)}
        >
          <a
            href="/RecentlyRead/?order=newest"
            className={
              "btn btn-outline-primary " + (order == "newest" ? "active" : null)
            }
            aria-current="page"
          >
            Newest
          </a>
          <a
            href="/RecentlyRead/?order=oldest"
            className={
              "btn btn-outline-primary " + (order == "oldest" ? "active" : null)
            }
          >
            oldest
          </a>
          <a
            href="/RecentlyRead/?order=random"
            className={
              "btn btn-outline-primary " + (order == "random" ? "active" : null)
            }
          >
            Random
          </a>
        </div>
      </div>
      <div className="pt-3">
        {data.map((item) => {
          return (
            <div key={Math.random()}>
              <div className="card my-2 text-decoration-none text-body">
                <div className="card-header">
                  <div className="d-flex flex-row">
                    <small className="d-flex flex-row align-items-center text-muted">
                      <i className="bi bi-person fs-5"></i>
                      {item.user}
                    </small>
                    <small className="d-flex flex-row align-items-center text-muted mx-3">
                      <i className="bi bi-calendar2-event fs-5 pe-1"></i>
                      {item.date}
                    </small>
                    <small className="d-flex flex-row align-items-center text-muted">
                      <i className="bi bi-hash fs-5"></i>
                      {item.id}
                    </small>
                    <small className="d-flex flex-row align-items-center text-muted mx-3">
                      <i className="bi bi-tag fs-5 pe-1"></i>
                      {item.CERF}
                    </small>
                    <small className="d-flex flex-row align-items-center text-muted">
                      <i className="bi bi-heart fs-5 pe-1"></i>
                      {item.likes_count}
                    </small>
                    <a
                      href={
                        "https://front-blanku.herokuapp.com/cards/" + item.id
                      }
                      className="btn btn-outline-primary btn-sm ms-auto me-1"
                    >
                      Preview
                    </a>
                    {/* <button
                      type="button"
                      className="btn btn-outline-danger btn-sm text-center"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button> */}
                  </div>
                </div>
                <div className="card-body">
                  <div className="text-muted">
                    <small>Translation:</small>
                  </div>
                  <div
                    className="ps-3"
                    dir={userlang === "fa" || userlang === "ar" ? "rtl" : "ltr"}
                  >
                    {item.trans[0].text}
                  </div>
                  <div className="text-muted">
                    <small>Question text:</small>
                  </div>
                  <div className="ps-3">{item.Qtext}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center pt-3">
        <a
          href={
            "/RecentlyRead/order=" + order + "/page=" + (parseInt(page) + 1)
          }
          className={"btn btn-outline-primary " + (hasNext ? "" : " d-none")}
        >
          Next Page
        </a>
      </div>

      <div className="modal" id="confirmation" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">
                <i className="bi bi-exclamation-triangle-fill pe-2"></i>
                Are you sure?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Do you really want to delete the card {deleteid}? This process
                cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(data.id)}
              >
                DELETE!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let root = document.getElementById("recentlyreadComponent");
ReactDOM.render(<MyCardsJs />, root);
