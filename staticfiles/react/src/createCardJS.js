export default function CreateCard(props) {
  const [enSent, setEnSent] = useState([]);
  const [data, setData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [translation, setTranslation] = useState("");
  const [selectedWords, setSelectedWords] = useState([-1000]);
  const [Qtext, setQtext] = useState("");
  const [Atext, setAtext] = useState("");
  const [color, setColor] = useState([]);
  const [morph, setMorph] = useState([]);
  const [CERF, setCERF] = useState([]);
  const [selectedCERFs, setSelectedCERFs] = useState([]);
  const [CERFtext, setCERFtext] = useState("");
  const [ahhh, setAhhh] = useState("");
  const [message, setMessage] = useState("");

  function getTranslations() {
    fetch("/api/translate/", {
      method: "POST",
      body: JSON.stringify({ data: enSent }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setDataAvailable("ready");
      });
  }

  function handleSubmit() {
    if (dataAvailable) {
      let sdata = {
        Qtext: Qtext,
        Atext: Atext,
        CERF: CERFtext,
        morph: JSON.stringify(morph),
        sent: enSent,
        translations: data.translations,
      };
      fetch("/api/submitcard/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
        body: JSON.stringify(sdata),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setSelectedWords([-1000]);
          setMessage(response["message"]);
          var toastLiveExample = document.getElementById("liveToast");
          var toast = new bootstrap.Toast(toastLiveExample);
          toast.show();
        });
    }
  }

  useEffect(() => {
    if (dataAvailable === "ready") {
      let numCERF = [];
      setTranslation(data.translations[userlang]);
      let temp = [];
      data.expertAI.map((item) => {
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

  useEffect(() => {
    if (dataAvailable === "ready") {
      let Qtemp = "";
      let Atemp = "";
      let Mtemp = [];
      let CERFtemp = [];
      data.expertAI.map((item, index) => {
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
      setSelectedCERFs(CERF.indexOf(Math.max(...CERFtemp)));
      switch (Math.max(...CERFtemp)) {
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

  useEffect(() => {
    if (username === "") {
      window.location.href = "/login/";
    }
  }, []);

  let translationField;
  if (data.expertAI != null) {
    translationField = (
      <div className="card">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text">Translation</span>
            <input
              className="form-control"
              type="text"
              defaultValue={translation}
              onChange={(e) => {
                setTranslation(e.target.value);
                let temp = data;
                temp.translations[userlang] = e.target.value;
                setData(temp);
              }}
              dir={userlang === "fa" || userlang === "ar" ? "rtl" : "ltr"}
            />
          </div>
          <div className="text-muted">
            <small>Translations are provided by Google Translator API.</small>
          </div>
          <div className="text-muted">
            <small>Feel free to improve it.</small>
          </div>
        </div>
      </div>
    );
  } else {
    translationField = (
      <div className="card" aria-hidden="true">
        <div className="card-body">
          <div className="card-title">
            <span className="placeholder col-6"></span>
          </div>
          <p className="card-text">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
        </div>
      </div>
    );
  }

  let selectionBox;
  if (dataAvailable === "ready") {
    selectionBox = (
      <div>
        <div>Select the blanks</div>
        <div className="d-flex flex-wrap">
          {data.expertAI.map((item, index) => {
            return (
              <a
                href="#"
                key={index}
                className={
                  "card m-1 text-decoration-none text-body" +
                  (selectedWords.indexOf(index) > 0
                    ? " bg-light border-primary"
                    : " ")
                }
                onClick={() => {
                  let temp = selectedWords;
                  if (selectedWords.indexOf(index) === -1) {
                    temp.push(index);
                    setSelectedWords(temp);
                    setAhhh(temp.toString());
                  } else {
                    temp.splice(temp.indexOf(index), 1);
                    setSelectedWords(temp);
                    setAhhh(temp.toString());
                  }
                }}
              >
                <div className="card-body p-2 text-center">
                  <div>{item.text}</div>
                  <div
                    className={"text-center badge rounded-pill " + color[index]}
                  >
                    {item.CERF}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  } else {
    selectionBox = (
      <div>
        <p className="card-text">
          <span className="placeholder col-9"></span>
        </p>
        <div className="d-flex flex-wrap">
          <div className="col-2 card mx-1">
            <div className="card-body">
              <p className="card-text">
                <span className="placeholder col-12"></span>
              </p>
            </div>
          </div>
          <div className="col-3 card mx-1">
            <div className="card-body">
              <p className="card-text">
                <span className="placeholder col-12"></span>
              </p>
            </div>
          </div>
          <div className="col-2 card mx-1">
            <div className="card-body">
              <p className="card-text">
                <span className="placeholder col-12"></span>
              </p>
            </div>
          </div>
          <div className="col-2 card mx-1">
            <div className="card-body">
              <p className="card-text">
                <span className="placeholder col-12"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let result;
  if (selectedWords.length > 1) {
    result = (
      <div>
        <div className="card-header">Preview and Submit</div>
        <div className="card-body">
          <div className="text-muted">
            <small>Translation:</small>
          </div>
          <p
            className="ps-3"
            dir={userlang === "fa" || userlang === "ar" ? "rtl" : "ltr"}
          >
            {translation}
          </p>
          <div className="text-muted">
            <small>Question text:</small>
          </div>
          <p className="ps-3">{Qtext}</p>
          <div className="text-muted">
            <small>Answer:</small>
          </div>
          <p className="ps-3">{Atext}</p>
          <div className="text-muted">
            <small>CERF:</small>
          </div>
          <p
            className={
              "ms-3 text-center badge rounded-pill " + color[selectedCERFs]
            }
          >
            {CERFtext}
          </p>
          <div className="text-muted">
            <small>Morphology:</small>
          </div>
          {morph.map((item, index) => (
            <div key={index} className="ps-3 font-monospace">
              {item.map((aa, bb) => {
                return <span key={bb}>{aa} </span>;
              })}
            </div>
          ))}
        </div>
        <div className="card-footer bg-body text-center">
          <div className="btn btn-info px-5" onClick={() => handleSubmit()}>
            Submit
          </div>
        </div>
      </div>
    );
  } else {
    result = (
      <div className="card-body">
        <p className="card-text">
          <span className="placeholder col-9"></span>
          <span className="placeholder col-7"></span>
          <span className="placeholder col-8"></span>
          <span className="placeholder col-6"></span>
        </p>
        <a className="btn btn-info disabled placeholder col-12"></a>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="text-center fs-4 border-bottom m-2">
        Blanku Card Generator
      </div>
      <div>
        <div className="input-group p-3">
          <input
            className="form-control border-end-0"
            id="traninput"
            type="text"
            placeholder="Write down you english sentence here..."
            onChange={(event) => {
              setEnSent(event.target.value);
              setSelectedWords([-1000]);
              setDataAvailable(false);
              setData([]);
              setTranslation("");
            }}
          />
          <a
            href="#"
            className="input-group-text bg-body text-secondary border-start-0"
            onClick={() => {
              let elem = document.getElementById("traninput");
              elem.value = "";
            }}
          >
            <i className="bi bi-x-circle-fill fs-5"></i>
          </a>
          <span
            className={
              "input-group-text " + (enSent.length > 70 ? "text-danger" : " ")
            }
          >
            {enSent.length}/70
          </span>
          <button
            className="btn btn-info"
            type="bottom"
            disabled={enSent.length > 70 || enSent.length === 0 ? 1 : 0}
            onClick={() => {
              setDataAvailable("loading");
              getTranslations();
            }}
          >
            {dataAvailable === "loading" ? "Loading..." : "Analyse"}
          </button>
        </div>
        <div className="mx-3">{translationField}</div>
        <div className="card mx-3 my-1">
          <div className="card-body">{selectionBox}</div>
        </div>
        <div className="card mx-3">{result}</div>
      </div>

      <div className="position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-autohide="true"
        >
          <div
            className={
              "toast-header text-white " +
              (message == "card created" ? "bg-success" : "bg-danger")
            }
          >
            Message
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
    </div>
  );
}

const rootGenerator = window.document.getElementById("generatorComponent");
ReactDOM.render(<CreateCard />, rootGenerator);
