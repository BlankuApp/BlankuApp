import { Morph } from "/static/react/Morph.js";
import { AnswerBox } from "/static/react/AnswerBox.js";
import { TranslationBox } from "/static/react/TranslationBox.js";
dataJson = JSON.parse(dataJson);

function ReviewerJs(props) {
  const [data, setData] = useState(dataJson);
  const [card, setCard] = useState(dataJson[0]);
  const [number, setNumber] = useState(0);
  const [readByMe, setReadByMe] = useState(dataJson[0].read_by_me);
  const [likedByMe, setLikedByMe] = useState(dataJson[0].liked_by_me);
  const [savedByMe, setSavedByMe] = useState(dataJson[0].saved_by_me);

  useEffect(() => {
    if (username === "" && Lang === null) {
      if (card.trans != null) {
        var selectLang = new bootstrap.Modal(
          document.getElementById("selectLang")
        );
        selectLang.show();
      }
    }
  }, []);

  useEffect(() => {
    setCard(data[number]);
    setReadByMe(data[number].read_by_me);
    setLikedByMe(data[number].liked_by_me);
    setSavedByMe(data[number].saved_by_me);
  }, [number]);

  useEffect(() => {
    if (card.id != null) {
      handleRead();
    }
  }, [card]);

  const handleNext = () => {
    window.scrollTo(0, 0);
    if (number < 4) {
      setNumber(Math.min(number + 1, data.length - 1));
    } else {
      if (hasNext) {
        window.location.href =
          "/?root=" +
          root +
          "&read=" +
          read +
          "&order=" +
          order +
          "&page=" +
          (parseInt(page) + 1);
      }
    }
  };

  const handleSave = () => {
    if (username === "guest") {
      window.location.href = "/login";
    } else {
      fetch("/api/savecard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          id: card.id,
          save: savedByMe,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setSavedByMe(!savedByMe);
        });
    }
  };

  const handleLike = () => {
    if (username === "") {
      window.location.href = "/login/";
    } else {
      fetch("/api/likecard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          id: card.id,
          like: likedByMe,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setLikedByMe(!likedByMe);
        });
    }
  };

  const handleRead = () => {
    if (username != "") {
      fetch("/api/readcard/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          id: card.id,
          read: readByMe,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setReadByMe(!readByMe);
        });
    }
  };

  return (
    <div>
      <div className="flex-row d-none d-sm-flex">
        {root === "home" ? (
          <div className="btn-group btn-group-sm me-auto m-1">
            <a
              href={
                username === ""
                  ? "/login/"
                  : "/?root=" +
                    root +
                    "&read=unread" +
                    "&order=" +
                    order +
                    "&page=" +
                    parseInt(page)
              }
              className={
                "btn btn-outline-secondary " +
                (read == "unread" ? "active" : null)
              }
            >
              Unread
            </a>
            <a
              href={
                username === ""
                  ? "/login/"
                  : "/?root=" +
                    root +
                    "&read=readOnly" +
                    "&order=" +
                    order +
                    "&page=" +
                    parseInt(page)
              }
              className={
                "btn btn-outline-secondary " +
                (read == "readOnly" ? "active" : null)
              }
            >
              Read Only
            </a>
            <a
              href={
                "/?root=" +
                root +
                "&read=all" +
                "&order=" +
                order +
                "&page=" +
                parseInt(page)
              }
              className={
                "btn btn-outline-secondary " + (read == "all" ? "active" : null)
              }
            >
              All
            </a>
          </div>
        ) : (
          <div className="me-auto"></div>
        )}

        <div className="btn-group btn-group-sm m-1">
          <a
            href={
              "/?root=" +
              root +
              "&read=" +
              read +
              "&order=trikiest" +
              "&page=" +
              parseInt(page)
            }
            className={
              "btn btn-outline-secondary " +
              (order == "trikiest" ? "active" : null)
            }
          >
            Trickiest{" "}
            <span className="badge rounded-pill bg-danger align-top">New</span>
          </a>

          <a
            href={
              "/?root=" +
              root +
              "&read=" +
              read +
              "&order=newest" +
              "&page=" +
              parseInt(page)
            }
            className={
              "btn btn-outline-secondary " +
              (order == "newest" ? "active" : null)
            }
          >
            Newest
          </a>

          <a
            href={
              "/?root=" +
              root +
              "&read=" +
              read +
              "&order=oldest" +
              "&page=" +
              parseInt(page)
            }
            className={
              "btn btn-outline-secondary " +
              (order == "oldest" ? "active" : null)
            }
          >
            Oldest
          </a>

          <a
            href={
              "/?root=" +
              root +
              "&read=" +
              read +
              "&order=random" +
              "&page=" +
              parseInt(page)
            }
            className={
              "btn btn-outline-secondary " +
              (order == "random" ? "active" : null)
            }
          >
            Random
          </a>
        </div>
      </div>
      <div className="my-0 px-1 px-sm-3 py-0 py-sm-1 d-none d-sm-block fw-light">
        <div className="d-flex flex-row flex-wrap">
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-heart fs-5 pe-1"></i>
            {card.likes_count}
          </div>
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-person fs-5"></i>
            {card.user}
          </div>
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-calendar2-event fs-5 pe-1"></i>
            {card.date}
          </div>
          <a
            href={"/cards/" + card.id + "/"}
            className="d-flex flex-row align-items-center text-decoration-none text-dark me-3"
          >
            <i className="bi bi-link-45deg fs-5"></i>
            {card.id}
          </a>
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-tag fs-5 pe-1"></i>
            {card.CERF}
          </div>
          <div className="d-flex flex-row align-items-center w-25 me-auto">
            <i className="bi bi-speedometer2 fs-5 pe-1"></i>
            <div className="progress w-100">
              <div
                className="progress-bar bg-dark"
                role="progressbar"
                style={{ width: (100 * card.succeed) / card.reviewed + "%" }}
              >
                {((100 * card.succeed) / card.reviewed).toPrecision(3) + "%"}
              </div>
            </div>
          </div>
          <a
            href="#"
            className={
              "d-flex text-danger flex-row align-items-center " +
              (username === card.user ? "d-none" : "")
            }
          >
            <i className="bi bi-shield-exclamation fs-5 pe-1"></i>
          </a>
        </div>
      </div>

      <div className="p-1 p-sm-3 border">
        <div className="text-muted fw-light">
          <small>Translation:</small>
        </div>
        <div className="px-sm-3 pb-sm-3">
          <TranslationBox
            key={-card.id}
            trans={card.trans}
            dir={
              userlang === "fa" ||
              userlang === "ar" ||
              Lang === "fa" ||
              Lang === "ar"
                ? "rtl"
                : "ltr"
            }
            user={username}
          />
        </div>

        <div className="text-muted fw-light">
          <small>Question text:</small>
        </div>
        <p className="ps-sm-3 fs-4">{card.Qtext}</p>
        <div className="text-muted fw-light d-none d-sm-block">
          <small>Morphology:</small>
        </div>
        <div className="d-none d-sm-block">
          <Morph morph={card.morph} />
        </div>
        <hr className="my-0" />
        <AnswerBox key={card.id} ans={card.Atext} id={card.id} />
      </div>

      <div className="mt-1">
        <div className="d-flex flex-row">
          <button
            className="btn btn-social fw-light"
            onClick={() => handleRead()}
          >
            <i
              className={
                "fs-5 me-1 bi " + (readByMe ? "bi-square" : "bi-check2-square")
              }
            ></i>
            Unread
          </button>
          <button
            className="btn btn-social fw-light"
            onClick={() => handleLike()}
          >
            <i
              className={"fs-5 me-1 bi bi-heart" + (likedByMe ? "-fill" : "")}
            ></i>{" "}
            Like
          </button>
          <button
            className="btn btn-social fw-light me-auto"
            onClick={() => handleSave()}
          >
            <i
              className={
                "fs-5 pe-1 bi bi-bookmark" + (savedByMe ? "-fill" : "")
              }
            ></i>{" "}
            Save
          </button>
          <button
            className="btn btn-social fw-light"
            onClick={() => handleNext()}
          >
            Next
            <i className="bi bi-chevron-double-right fs-5"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const rootReviewer = document.getElementById("reviewerComponent");
ReactDOM.render(<ReviewerJs />, rootReviewer);
