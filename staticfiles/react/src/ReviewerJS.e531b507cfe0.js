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
    if (username === "" && guestlang == "None") {
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
          (parseInt(page) + 1) +
          (guestlang ? "&guestLang=" + guestlang : null);
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
                "/?root=" +
                root +
                "&read=unread" +
                "&order=" +
                order +
                "&page=" +
                parseInt(page) +
                (guestlang != "None" ? "&guestLang=" + guestlang : "")
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
                "/?root=" +
                root +
                "&read=readOnly" +
                "&order=" +
                order +
                "&page=" +
                parseInt(page) +
                (guestlang != "None" ? "&guestLang=" + guestlang : "")
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
                parseInt(page) +
                (guestlang != "None" ? "&guestLang=" + guestlang : "")
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
              parseInt(page) +
              (guestlang != "None" ? "&guestLang=" + guestlang : "")
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
              parseInt(page) +
              (guestlang != "None" ? "&guestLang=" + guestlang : "")
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
              parseInt(page) +
              (guestlang != "None" ? "&guestLang=" + guestlang : "")
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
              parseInt(page) +
              (guestlang != "None" ? "&guestLang=" + guestlang : "")
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
            href={"/cards/" + card.id}
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
              guestlang === "fa" ||
              guestlang === "ar"
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
      <div className="modal" id="selectLang" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div>Are you new to Blanku?</div>
              <p>Then select your first language and start learning with us</p>
              <div className="d-flex flex-wrap">
                <a
                  href="/?guestLang=cn"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="32"
                    height="32"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#d80027" d="M0 0h512v512H0z" />
                      <path
                        fill="#ffda44"
                        d="m140.1 155.8 22.1 68h71.5l-57.8 42.1 22.1 68-57.9-42-57.9 42 22.2-68-57.9-42.1H118zm163.4 240.7-16.9-20.8-25 9.7 14.5-22.5-16.9-20.9 25.9 6.9 14.6-22.5 1.4 26.8 26 6.9-25.1 9.6zm33.6-61 8-25.6-21.9-15.5 26.8-.4 7.9-25.6 8.7 25.4 26.8-.3-21.5 16 8.6 25.4-21.9-15.5zm45.3-147.6L370.6 212l19.2 18.7-26.5-3.8-11.8 24-4.6-26.4-26.6-3.8 23.8-12.5-4.6-26.5 19.2 18.7zm-78.2-73-2 26.7 24.9 10.1-26.1 6.4-1.9 26.8-14.1-22.8-26.1 6.4 17.3-20.5-14.2-22.7 24.9 10.1z"
                      />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">汉语</span>
                </a>
                <a
                  href="/?guestLang=es"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <mask id="b">
                      <path
                        fill="#fff"
                        d="M160 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z"
                      />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#d80027" d="M0 0h512v512H0z" />
                      <path fill="#ffda44" d="M0 128h512v256H0z" />
                      <g fill="#eee">
                        <path d="M144 304h-16v-80h16zm128 0h16v-80h-16z" />
                        <ellipse cx="208" cy="296" rx="48" ry="32" />
                      </g>
                      <g fill="#d80027">
                        <rect width="16" height="24" x="128" y="192" rx="8" />
                        <rect width="16" height="24" x="272" y="192" rx="8" />
                        <path d="M208 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z" />
                      </g>
                      <g fill="#ff9811">
                        <rect width="32" height="16" x="120" y="208" ry="8" />
                        <rect width="32" height="16" x="264" y="208" ry="8" />
                        <rect width="32" height="16" x="120" y="304" rx="8" />
                        <rect width="32" height="16" x="264" y="304" rx="8" />
                        <path d="M160 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z" />
                      </g>
                      <path d="M122 252h172m-172 24h28m116 0h28" />
                      <path
                        fill="#d80027"
                        d="M122 248a4 4 0 0 0-4 4 4 4 0 0 0 4 4h172a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm0 24a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4z"
                      />
                      <path
                        fill="#eee"
                        d="M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4 16 16 0 0 0 17 4 16 16 0 1 0 10-20 16 16 0 0 0-27-5c-3-4-7-6-12-6zm0 8c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm24 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm-44 10 4 1 4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8zm64 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-7l4-8 4-1z"
                      />
                      <path
                        fill="none"
                        d="M220 284v12c0 7 5 12 12 12s12-5 12-12v-12z"
                      />
                      <path fill="#ff9811" d="M200 160h16v32h-16z" />
                      <path fill="#eee" d="M208 224h48v48h-48z" />
                      <g fill="#d80027">
                        <path d="m248 208-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24zm-88 16h48v48h-48z" />
                        <rect
                          width="20"
                          height="32"
                          x="222"
                          y="232"
                          rx="10"
                          ry="10"
                        />
                        <g mask="url(#b)">
                          <path d="M170 272h10v48h-10zm19 0h10v48h-10z" />
                        </g>
                      </g>
                      <path
                        fill="#ff9811"
                        d="M168 232v8h8v16h-8v8h32v-8h-8v-16h8v-8zm8-16h64v8h-64z"
                      />
                      <g fill="#ffda44">
                        <circle cx="186" cy="202" r="6" />
                        <circle cx="208" cy="202" r="6" />
                        <circle cx="230" cy="202" r="6" />
                      </g>
                      <g fill="#338af3">
                        <circle cx="208" cy="272" r="16" />
                        <rect width="32" height="16" x="264" y="320" ry="8" />
                        <rect width="32" height="16" x="120" y="320" ry="8" />
                      </g>
                    </g>
                  </svg>
                  <span className="align-middle ms-1">Spanish</span>
                </a>
                <a
                  href="/?guestLang=hi"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path
                        fill="#eee"
                        d="m0 144.7 255.3-36.5L512 144.7v222.6L250.5 407 0 367.3z"
                      />
                      <path fill="#ff9811" d="M0 0h512v144.7H0z" />
                      <path fill="#6da544" d="M0 367.3h512V512H0z" />
                      <circle cx="256" cy="256" r="89" fill="#0052b4" />
                      <circle cx="256" cy="256" r="55.7" fill="#eee" />
                      <path
                        fill="#0052b4"
                        d="m256 187.3 17.2 39 42.3-4.6-25.2 34.3 25.2 34.3-42.3-4.6-17.2 39-17.2-39-42.3 4.6 25.2-34.3-25.2-34.3 42.3 4.6z"
                      />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">हिंदी</span>
                </a>
                <a
                  href="/?guestLang=jp"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#eee" d="M0 0h512v512H0z" />
                      <circle cx="256" cy="256" r="111.3" fill="#d80027" />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">日本語</span>
                </a>
                <a
                  href="/?guestLang=bn"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#496e2d" d="M0 0h512v512H0z" />
                      <circle cx="200.3" cy="256" r="111.3" fill="#d80027" />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">বাংলা</span>
                </a>
                <a
                  href="/?guestLang=ru"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path
                        fill="#0052b4"
                        d="m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z"
                      />
                      <path fill="#eee" d="M0 0h512v167H0z" />
                      <path fill="#d80027" d="M0 345h512v167H0z" />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">русский язык</span>
                </a>
                <a
                  href="/?guestLang=fa"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path
                        fill="#eee"
                        d="M0 144.7 258.8 39.6 512 144.7v222.6L257 493 0 367.3z"
                      />
                      <path
                        fill="#6da544"
                        d="M0 0v144.7h105.6v-22.2h33.6v22.2h33.3v-22.2h33.6v22.2h33.3v-22.2H273v22.2h33v-22.2h33.6v22.2h33.2v-22.2h33.6v22.2H512V0z"
                      />
                      <path
                        fill="#d80027"
                        d="M0 367.3V512h512V367.3H406.4v22.4h-33.6v-22.4h-33.2v22.4H306v-22.4h-33v22.4h-33.6v-22.4h-33.3v22.4h-33.6v-22.4h-33.3v22.4h-33.6v-22.4zm339.1-178h-33.4c.2 3.7.4 7.4.4 11.1 0 24.8-6.2 48.8-17 66-3.3 5.2-9 12.6-16.4 17.6v-94.7h-33.4v94.8c-7.5-5-13-12.4-16.4-17.7-10.8-17-17-41-17-65.9 0-3.7.2-7.4.4-11H173a190 190 0 0 0-.4 11c0 68.7 36.7 122.5 83.5 122.5s83.5-53.8 83.5-122.5c0-3.7-.1-7.4-.4-11z"
                      />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">فارسی</span>
                </a>
                <a
                  href="/?guestLang=ar"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#496e2d" d="M0 0h512v512H0z" />
                      <g fill="#eee">
                        <path d="M144.7 306c0 18.5 15 33.5 33.4 33.5h100.2a27.8 27.8 0 0 0 27.8 27.8h33.4a27.8 27.8 0 0 0 27.8-27.8V306zm225.4-161.3v78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9H370zm-239.3 78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9h-33.4z" />
                        <path d="M320 144.7h33.4v78H320zm-50 44.5a5.6 5.6 0 0 1-11.2 0v-44.5h-33.4v44.5a5.6 5.6 0 0 1-11.1 0v-44.5h-33.4v44.5a39 39 0 0 0 39 39 38.7 38.7 0 0 0 22.2-7 38.7 38.7 0 0 0 22.2 7c1.7 0 3.4-.1 5-.3a22.3 22.3 0 0 1-21.6 17v33.4c30.6 0 55.6-25 55.6-55.7v-77.9H270z" />
                        <path d="M180.9 244.9h50v33.4h-50z" />
                      </g>
                    </g>
                  </svg>
                  <span className="align-middle ms-1">اَلْعَرَبِيَّةُ</span>
                </a>
                <a
                  href="/?guestLang=de"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path
                        fill="#ffda44"
                        d="m0 345 256.7-25.5L512 345v167H0z"
                      />
                      <path fill="#d80027" d="m0 167 255-23 257 23v178H0z" />
                      <path fill="#333" d="M0 0h512v167H0z" />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">Deutsch</span>
                </a>
                <a
                  href="/?guestLang=fr"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path
                        fill="#eee"
                        d="M167 0h178l25.9 252.3L345 512H167l-29.8-253.4z"
                      />
                      <path fill="#0052b4" d="M0 0h167v512H0z" />
                      <path fill="#d80027" d="M345 0h167v512H345z" />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">Français</span>
                </a>
                <a
                  href="/?guestLang=id"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#eee" d="m0 256 249.6-41.3L512 256v256H0z" />
                      <path fill="#a2001d" d="M0 0h512v256H0z" />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">Bahasa Indonesia</span>
                </a>
                <a
                  href="/?guestLang=ko"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#eee" d="M0 0h512v512H0z" />
                      <path
                        fill="#d80027"
                        d="M345 256c0 22.3-39.8 78-89 78s-89-55.7-89-78a89 89 0 1 1 178 0z"
                      />
                      <path fill="#0052b4" d="M345 256a89 89 0 1 1-178 0" />
                      <path
                        fill="#333"
                        d="m350.4 334.7 23.7-23.6 15.7 15.7-23.6 23.6zm-39.3 39.4 23.6-23.7 15.7 15.8-23.6 23.6zm86.6 7.8 23.6-23.6L437 374l-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7L374 437zm15.8-63 23.6-23.6 15.7 15.7-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7-23.7 23.6zm63-220.4-63-63 15.8-15.7 63 63zm-63-15.7-23.6-23.7 15.7-15.7 23.7 23.6zm39.4 39.3-23.7-23.6 15.8-15.7 23.6 23.6zm7.8-86.6-23.6-23.6L374 75l23.7 23.6zm39.4 39.4L397.7 130l15.7-15.8L437 138zM90.7 358.3l63 63-15.8 15.7-63-63zm63 15.7 23.6 23.7-15.7 15.7-23.7-23.6zm-39.4-39.3 23.6 23.6-15.7 15.8-23.6-23.7zm23.6-23.6 63 63-15.7 15.7-63-63zm15.8-220.4-63 63L75 137.9l63-63zm23.6 23.6-63 63-15.7-15.8 63-63zm23.6 23.6-63 63-15.7-15.7 63-63z"
                      />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">한국어</span>
                </a>
                <a
                  href="/?guestLang=nl"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path
                        fill="#eee"
                        d="m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z"
                      />
                      <path fill="#a2001d" d="M0 0h512v167H0z" />
                      <path fill="#0052b4" d="M0 345h512v167H0z" />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">Nederlands</span>
                </a>
                <a
                  href="/?guestLang=pt"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#6da544" d="M0 512h167l37.9-260.3L167 0H0z" />
                      <path fill="#d80027" d="M512 0H167v512h345z" />
                      <circle cx="167" cy="256" r="89" fill="#ffda44" />
                      <path
                        fill="#d80027"
                        d="M116.9 211.5V267a50 50 0 1 0 100.1 0v-55.6H117z"
                      />
                      <path
                        fill="#eee"
                        d="M167 283.8c-9.2 0-16.7-7.5-16.7-16.7V245h33.4v22c0 9.2-7.5 16.7-16.7 16.7z"
                      />
                    </g>
                  </svg>
                  <span className="align-middle ms-1">Português</span>
                </a>
                <a
                  href="/?guestLang=tr"
                  className="btn btn-outline-primary m-1 py-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 512 512"
                  >
                    <mask id="a">
                      <circle cx="256" cy="256" r="256" fill="#fff" />
                    </mask>
                    <g mask="url(#a)">
                      <path fill="#d80027" d="M0 0h512v512H0z" />
                      <g fill="#eee">
                        <path d="m245.5 209.2 21 29 34-11.1-21 29 21 28.9-34-11.1-21 29V267l-34-11.1 34-11z" />
                        <path d="M188.2 328.3a72.3 72.3 0 1 1 34.4-136 89 89 0 1 0 0 127.3 72 72 0 0 1-34.4 8.7z" />
                      </g>
                    </g>
                  </svg>
                  <span className="align-middle ms-1">Türk dili</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootReviewer = document.getElementById("reviewerComponent");
ReactDOM.render(<ReviewerJs />, rootReviewer);
