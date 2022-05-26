dataJson = JSON.parse(dataJson);
function SavedCardsJS(props) {
  const [data, setData] = useState(dataJson);
  const [deleteid, setDeleteid] = useState(0);

  return (
    <div className="p-3">
      <div className="d-flex flex-row">
        <a
          href={"/?root=savedCards&order=" + order}
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
            href="/SavedCards/?order=newest"
            className={
              "btn btn-outline-primary " + (order == "newest" ? "active" : null)
            }
            aria-current="page"
          >
            Newest
          </a>
          <a
            href="/SavedCards/?order=oldest"
            className={
              "btn btn-outline-primary " + (order == "oldest" ? "active" : null)
            }
          >
            oldest
          </a>
          <a
            href="/SavedCards/?order=random"
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
          href={"/SavedCards/order=" + order + "/page=" + (parseInt(page) + 1)}
          className={"btn btn-outline-primary " + (hasNext ? "" : " d-none")}
        >
          Next Page
        </a>
      </div>
    </div>
  );
}

let root = document.getElementById("savedcardsComponent");
ReactDOM.render(<SavedCardsJS />, root);
