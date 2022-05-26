import { Morph } from "/static/react/Morph.js";
import { AnswerBox } from "/static/react/AnswerBox.js";
import { TranslationBox } from "/static/react/TranslationBox.js";
let data = JSON.parse(dataJson);
let dics = JSON.parse(dicsJson);
var audio = new Audio(
  "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3"
);
// document.onclick = function () {
//   audio.play();
// };
console.log(dics);
function CardPreviewJS() {
  return (
    <div>
      <div className="mt-3 px-1 px-sm-3 d-none d-sm-block fw-light">
        <div className="d-flex flex-row flex-wrap">
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-heart fs-5 pe-1"></i>
            {data.likes_count}
          </div>
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-person fs-5"></i>
            {data.user}
          </div>
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-calendar2-event fs-5 pe-1"></i>
            {data.date}
          </div>
          <a
            href={"/cards/" + data.id}
            className="d-flex flex-row align-items-center text-decoration-none text-dark me-3"
          >
            <i className="bi bi-link-45deg fs-5"></i>
            {data.id}
          </a>
          <div className="d-flex flex-row align-items-center me-3">
            <i className="bi bi-tag fs-5 pe-1"></i>
            {data.CERF}
          </div>
          <div className="d-flex flex-row align-items-center w-25 me-auto">
            <i className="bi bi-speedometer2 fs-5 pe-1"></i>
            <div className="progress w-100">
              <div
                className="progress-bar bg-dark"
                role="progressbar"
                style={{ width: (100 * data.succeed) / data.reviewed + "%" }}
              >
                {((100 * data.succeed) / data.reviewed).toPrecision(3) + "%"}
              </div>
            </div>
          </div>
          <a
            href="#"
            className={
              "d-flex text-danger flex-row align-items-center " +
              (username === data.user ? "d-none" : " ")
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
            key={-data.id}
            trans={data.trans}
            dir={Lang === "fa" || Lang === "ar" ? "rtl" : "ltr"}
            user={username}
          />
        </div>
        <div className="text-muted fw-light">
          <small>Question text:</small>
        </div>
        <p className="ps-sm-3 fs-4">{data.Qtext}</p>
        <div className="text-muted fw-light d-none d-sm-block">
          <small>Morphology:</small>
        </div>
        <div className="d-none d-sm-block">
          <Morph morph={data.morph} />
        </div>
        <hr className="my-0" />
        <AnswerBox ans={data.Atext} id={data.id} />
      </div>
      {dics.map((value, idx) => {
        return (
          <div className="d-none" name="dic" key={idx}>
            <div className="card-header border-info">
              <div className="d-flex align-items-start">
                <h2 className="mb-0">{value.word}</h2>
                {value.phonetics.map((phon, idxphon) => {
                  if (phon.audio) {
                    return (
                      <a
                        className="btn btn-primary btn-sm ms-2 p-0 text-decoration-none"
                        key={idxphon}
                        onClick={() => {
                          var audio = new Audio(phon.audio);
                          audio.play();
                        }}
                      >
                        {phon.audio.slice(-6, -4)}
                        <i className="bi bi-volume-up"></i>
                      </a>
                    );
                  }
                })}
              </div>
            </div>
            <ul className="list-group list-group-flush">
              {value.meanings.map((meaning, idxmeaning) => {
                return (
                  <li className="list-group-item" key={idxmeaning}>
                    <span className="badge bg-success">
                      {meaning.partOfSpeech}
                    </span>
                    {meaning.synonyms.length ? (
                      <div>
                        <small>
                          <strong>Synonyms:</strong>{" "}
                          {meaning.synonyms.join(", ")}
                        </small>
                      </div>
                    ) : null}
                    {meaning.antonyms.length ? (
                      <div>
                        <small>
                          <strong>Antonyms:</strong>{" "}
                          {meaning.antonyms.join(", ")}
                        </small>
                      </div>
                    ) : null}
                    <ul>
                      {meaning.definitions.map((definition, idxdef) => {
                        return (
                          <li key={idxdef}>
                            {definition.definition}
                            {definition.example ? (
                              <span>
                                <br />
                                <small>
                                  <strong>EXAMPLE:</strong>
                                  <em>{definition.example}</em>
                                </small>
                              </span>
                            ) : (
                              "bye"
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

const rootSingleCard = document.getElementById("singleCardComponent");
ReactDOM.render(<CardPreviewJS />, rootSingleCard);
