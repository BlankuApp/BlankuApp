var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

export function Morph(props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      text = _useState4[0],
      setText = _useState4[1];

  useEffect(function () {
    if (props) {
      var temp = JSON.parse(props.morph);
      var tem = [];
      temp.map(function (item) {
        return tem.push(item[0]);
      });
      setData(tem);
    }
  }, []);

  function handleClick(item) {
    if (data) {
      if (item === "Degree=Pos") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "pos-positive-first-degree" },
            React.createElement(
              "a",
              { name: "Pos" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Pos"
              )
            ),
            ": positive, first degree"
          ),
          React.createElement(
            "p",
            null,
            "This is the base form that merely states a quality of something, without comparing it to qualities of others. Note that although this degree is traditionally called \u201Cpositive\u201D, negative properties can be compared, too. All words with PTB tags",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "JJ"
            ),
            " ",
            "have this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "young"
                ),
                " woman"
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "Additionally, the following adverbs with PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "RB"
            ),
            " ",
            "also have this feature:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "hard, fast, late, long, high, easy, early, far, soon, low, close, well, badly, little"
              )
            )
          )
        ));
      } else if (item === "Degree=Cmp") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "cmp-comparative-second-degree" },
            React.createElement(
              "a",
              { name: "Cmp" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Cmp"
              )
            ),
            ": comparative, second degree"
          ),
          React.createElement(
            "p",
            null,
            "The quality of one object is compared to the same quality of another object. All words with PTB tags",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "JJR"
            ),
            " ",
            "are marked with this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "The man is ",
                React.createElement(
                  "b",
                  null,
                  "younger"
                ),
                " than me."
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "The following adverbs with PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "RBR"
            ),
            " ",
            "also have this feature:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "more, harder, faster, later, longer, higher, easier, earlier, further, farther, sooner, lower, closer, better, worse, less, quicker, slower"
              )
            )
          )
        ));
      } else if (item === "Degree=Sup") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "sup-superlative-third-degree" },
            React.createElement(
              "a",
              { name: "Sup" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Sup"
              )
            ),
            ": superlative, third degree"
          ),
          React.createElement(
            "p",
            null,
            "The quality of one object is compared to the same quality of all other objects within a set. All words with PTB tags",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "JJS"
            ),
            " ",
            "are marked with this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples-2" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "This is the ",
                React.createElement(
                  "b",
                  null,
                  "youngest"
                ),
                " woman in our team."
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "The following adverbs with PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "RBS"
            ),
            " ",
            "also have this feature:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "most, hardest, fastest, latest, longest, highest, easiest, earliest, furthest, farthest, soonest, lowest, closest, best, worst, least, quickest, slowest"
              )
            )
          )
        ));
      } else if (item === "Gender=Masc") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "masc-masculine-gender" },
            React.createElement(
              "a",
              { name: "Masc" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Masc"
              )
            ),
            ": masculine gender"
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "he, his, him, himself"
              )
            )
          )
        ));
      } else if (item === "Gender=Fem") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "fem-feminine-gender" },
            React.createElement(
              "a",
              { name: "Fem" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Fem"
              )
            ),
            ": feminine gender"
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "she, her, hers, herself"
              )
            )
          )
        ));
      } else if (item === "Gender=Neut") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "neut-neuter-gender" },
            React.createElement(
              "a",
              { name: "Neut" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Neut"
              )
            ),
            ": neuter gender"
          ),
          React.createElement(
            "h4",
            { id: "examples-2" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "it, its, itself"
              )
            )
          )
        ));
      } else if (item === "Animacy=Anim") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "anim-animate" },
            React.createElement(
              "a",
              { name: "Anim" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Anim"
              )
            ),
            ": animate"
          ),
          React.createElement(
            "p",
            null,
            "Human beings, animals, fictional characters, names of professions etc. are normally animate. Even nouns that are normally inanimate can be inflected as animate if they are personified. And some words in some languages can grammatically behave like animates although there is no obvious semantic reason for that."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[cs]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "mal\xED kluci"
                )
              ),
              " ",
              "\u201Csmall boys\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[cs]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "mal\xED psi"
                )
              ),
              " ",
              "\u201Csmall dogs\u201D"
            )
          )
        ));
      } else if (item === "Animacy=Hum") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "inan-inanimate" },
            React.createElement(
              "a",
              { name: "Inan" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Inan"
              )
            ),
            ": inanimate"
          ),
          React.createElement(
            "p",
            null,
            "Nouns that are not animate are inanimate."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[cs]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "mal\xE9 domy"
                )
              ),
              " ",
              "\u201Csmall houses\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[pl]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "ma\u0142e domy"
                )
              ),
              " ",
              "\u201Csmall houses\u201D"
            )
          )
        ));
      } else if (item === "Animacy=Inan") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "hum-human" },
            React.createElement(
              "a",
              { name: "Hum" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Hum"
              )
            ),
            ": human"
          ),
          React.createElement(
            "p",
            null,
            "A subset of animates where the prototypical member is a human being but not an animal. Again, there may be exceptions that do not fit the class semantically but belong to it grammatically."
          ),
          React.createElement(
            "h4",
            { id: "examples-2" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[pl]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "mali ch\u0142opcy"
                )
              ),
              " ",
              "\u201Csmall boys\u201D"
            )
          )
        ));
      } else if (item === "Animacy=Nhum") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "nhum-non-human" },
            React.createElement(
              "a",
              { name: "Nhum" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Nhum"
              )
            ),
            ": non-human"
          ),
          React.createElement(
            "p",
            null,
            "In languages that only distinguish human from non-human, this value includes inanimates. In languages that distinguish human animates, non-human animates and inanimates, this value is used only for non-human animates, while",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "Inan"
            ),
            "is used for inanimates."
          ),
          React.createElement(
            "h4",
            { id: "examples-3" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[pl]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "ma\u0142e psy"
                )
              ),
              " ",
              "\u201Csmall dogs\u201D"
            )
          )
        ));
      } else if (item === "Number=Sing") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "sing-singular" },
            React.createElement(
              "a",
              { name: "Sing" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Sing"
              )
            ),
            ": singular"
          ),
          React.createElement(
            "p",
            null,
            "A singular noun denotes one person, animal or thing. Every noun with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "NN"
            ),
            " ",
            "or",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "NNP"
            ),
            " ",
            "is marked with this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "an ",
                React.createElement(
                  "b",
                  null,
                  "apple"
                ),
                ", a ",
                React.createElement(
                  "b",
                  null,
                  "train"
                )
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "Pronouns that refer to a single person, an animal or a thing are also marked with this feature."
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I, me, my, myself, he, his, him, himself, she, her, hers, herself, it, its, itself"
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "We also mark all verbs with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBZ"
            ),
            " ",
            "with this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "she ",
                React.createElement(
                  "b",
                  null,
                  "does"
                )
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "he ",
                React.createElement(
                  "b",
                  null,
                  "walks"
                )
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "Further, we mark inflections of",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "be"
            ),
            " ",
            "that can only have a singular noun or pronoun in subject position with this feature."
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "am, is, was"
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "Demonstrative determiners of singular nouns and demonstrative pronouns that refer to singular nouns are also marked with this feature."
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "this, that"
              )
            )
          )
        ));
      } else if (item === "Number=Plur") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "plur-plural" },
            React.createElement(
              "a",
              { name: "Plur" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Plur"
              )
            ),
            ": plural"
          ),
          React.createElement(
            "p",
            null,
            "A plural noun denotes several persons, animals or things. Every noun with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "NNS"
            ),
            " ",
            "or",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "NNPS"
            ),
            " ",
            "is marked with this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples-2" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "several ",
                React.createElement(
                  "b",
                  null,
                  "apples"
                ),
                ", two ",
                React.createElement(
                  "b",
                  null,
                  "trains"
                )
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "Pronouns that refer to a single person, an animal or a thing are also marked with this feature."
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "we, us, our, ours, ourselves, yourselves, they, them, their, theirs, themselves"
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "Demonstrative determiners of plural nouns and demonstrative pronouns that refer to plural nouns are also marked with this feature."
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "these, those"
              )
            )
          )
        ));
      } else if (item === "Case=Nom") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "nom-direct" },
            React.createElement(
              "a",
              { name: "Nom" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Nom"
              )
            ),
            ": direct"
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "p",
            null,
            "The following pronouns are in the direct case:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I, you, he, she, it, we, they"
              )
            )
          )
        ));
      } else if (item === "Case=Acc") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "acc-oblique" },
            React.createElement(
              "a",
              { name: "Acc" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Acc"
              )
            ),
            ": oblique"
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "p",
            null,
            "The following pronouns are in the oblique case:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "me, you, him, her, it, us, them, myself, yourself, himself, herself, itself, ourselves, yourselves, themselves"
              )
            )
          )
        ));
      } else if (item === "VerbForm=Fin") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "fin-finite-verb" },
            React.createElement(
              "a",
              { name: "Fin" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Fin"
              )
            ),
            ": finite verb"
          ),
          React.createElement(
            "p",
            null,
            "Rule of thumb: if it has non-empty ",
            React.createElement(
              "a",
              { href: "Mood" },
              "Mood"
            ),
            ", it is finite. English verbs with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBZ"
            ),
            ",",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBD"
            ),
            " ",
            "or",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBP"
            ),
            " ",
            "and modals with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "MD"
            ),
            " ",
            "have this feature. Further, verbs with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VB"
            ),
            " ",
            "have this feature if they don\u2019t have an auxiliary or modal verb attached to it."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I ",
                React.createElement(
                  "b",
                  null,
                  "do"
                ),
                ", she ",
                React.createElement(
                  "b",
                  null,
                  "has"
                )
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "Read"
                ),
                " the book!"
              )
            )
          )
        ));
      } else if (item === "VerbForm=Inf") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "inf-infinitive" },
            React.createElement(
              "a",
              { name: "Inf" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Inf"
              )
            ),
            ": infinitive"
          ),
          React.createElement(
            "p",
            null,
            "Infinitive is the citation form of verbs in many languages. Infinitives may be used together with auxiliaries to form periphrastic ",
            React.createElement(
              "a",
              { href: "Tense" },
              "tenses"
            ),
            " (e.g. future tense",
            " ",
            React.createElement(
              "em",
              null,
              "I will ",
              React.createElement(
                "b",
                null,
                "sit"
              ),
              " in a plane"
            ),
            "), they appear as arguments of modal verbs etc. English verbs with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VB"
            ),
            " ",
            "have this feature if they have an auxiliary or modal verb or the inifinitval ",
            React.createElement(
              "em",
              null,
              "to"
            ),
            " attached to it."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I have to ",
                React.createElement(
                  "b",
                  null,
                  "leave"
                )
              ),
              "."
            )
          )
        ));
      } else if (item === "VerbForm=Part") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "part-participle" },
            React.createElement(
              "a",
              { name: "Part" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Part"
              )
            ),
            ": participle"
          ),
          React.createElement(
            "p",
            null,
            "Participle is a non-finite verb form that shares properties of verbs and adjectives. It is used to form various periphrastic verb forms such as complex tenses and passives. In English, all words with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBD"
            ),
            " ",
            "have this feature. Further, words with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBG"
            ),
            " ",
            "can also have this feature if they are preceded by an inflection of ",
            React.createElement(
              "em",
              null,
              "to be"
            ),
            "."
          ),
          React.createElement(
            "h4",
            { id: "examples-2" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "He could have ",
                React.createElement(
                  "b",
                  null,
                  "been prepared"
                ),
                " if he had forseen it"
              ),
              "."
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I will be ",
                React.createElement(
                  "b",
                  null,
                  "driving"
                ),
                " home"
              ),
              "."
            )
          )
        ));
      } else if (item === "VerbForm=Ger") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "ger-gerund" },
            React.createElement(
              "a",
              { name: "Ger" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Ger"
              )
            ),
            ": gerund"
          ),
          React.createElement(
            "p",
            null,
            "Gerund is a non-finite verb form that shares properties of verbs and nouns. In English, all words with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBG"
            ),
            " ",
            "have this feature if they are not preceded by an inflection of",
            " ",
            React.createElement(
              "em",
              null,
              "to be"
            ),
            "."
          ),
          React.createElement(
            "h4",
            { id: "examples-3" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I look forward to ",
                React.createElement(
                  "b",
                  null,
                  "seeing"
                ),
                " you."
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "She turns a blind eye to my ",
                React.createElement(
                  "b",
                  null,
                  "being"
                ),
                " late."
              )
            )
          )
        ));
      } else if (item === "Mood=Ind") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "ind-indicative" },
            React.createElement(
              "a",
              { name: "Ind" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Ind"
              )
            ),
            ": indicative"
          ),
          React.createElement(
            "p",
            null,
            "The indicative can be considered the default mood. A verb in indicative merely states that something happens, has happened or will happen, without adding any attitude of the speaker."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "He ",
                React.createElement(
                  "b",
                  null,
                  "makes"
                ),
                " a sandwich."
              )
            )
          )
        ));
      } else if (item === "Mood=Imp") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "imp-imperative" },
            React.createElement(
              "a",
              { name: "Imp" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Imp"
              )
            ),
            ": imperative"
          ),
          React.createElement(
            "p",
            null,
            "The speaker uses imperative to order or ask the addressee to do the action of the verb."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "Make"
                ),
                " a sandwich!"
              )
            )
          )
        ));
      } else if (item === "Mood=Sup") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "sub-subjunctive" },
            React.createElement(
              "a",
              { name: "Sub" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Sub"
              )
            ),
            ": subjunctive"
          ),
          React.createElement(
            "p",
            null,
            "The subjunctive mood is used under certain circumstances in subordinate clauses, typically for actions that are subjective or otherwise uncertain such as expressing an opinion or describing one\u2019s state of mind. It is also used to make statements contrary to fact."
          ),
          React.createElement(
            "h4",
            { id: "examples-2" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I suggest that he ",
                React.createElement(
                  "b",
                  null,
                  "see"
                ),
                " a doctor."
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "If I ",
                React.createElement(
                  "b",
                  null,
                  "were"
                ),
                " rich\u2026"
              )
            )
          )
        ));
      } else if (item === "Tense=Pres") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "pres-present-tense" },
            React.createElement(
              "a",
              { name: "Pres" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Pres"
              )
            ),
            ": present tense"
          ),
          React.createElement(
            "p",
            null,
            "The present tense denotes actions that are happening right now or that usually happen. All verbs with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBP"
            ),
            " ",
            "or",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBZ"
            ),
            " ",
            "have this feature. ",
            React.createElement(
              "a",
              { href: "Mood" },
              "Subjunctives"
            ),
            " with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VB"
            ),
            " ",
            "also have this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "She ",
                React.createElement(
                  "b",
                  null,
                  "goes"
                ),
                " home."
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "I suggest that he ",
                React.createElement(
                  "b",
                  null,
                  "see"
                ),
                " a doctor."
              )
            )
          )
        ));
      } else if (item === "Tense=Past") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "past-past-tense" },
            React.createElement(
              "a",
              { name: "Past" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Past"
              )
            ),
            ": past tense"
          ),
          React.createElement(
            "p",
            null,
            "The past tense denotes actions that happened before the current moment. All verbs with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBD"
            ),
            " ",
            "and",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBN"
            ),
            " ",
            "have this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "She ",
                React.createElement(
                  "b",
                  null,
                  "went"
                ),
                " home."
              )
            )
          )
        ));
      } else if (item === "Aspect=Imp") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "imp-imperfect-aspect" },
            React.createElement(
              "a",
              { name: "Imp" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Imp"
              )
            ),
            ": imperfect aspect"
          ),
          React.createElement(
            "p",
            null,
            "The action took / takes / will take some time span and there is no information whether and when it was / will be completed."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[cs] ",
              React.createElement(
                "em",
                null,
                "p\xE9ci"
              ),
              " \u201Cto bake\u201D (Imp);",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "pekl"
                ),
                " chleba"
              ),
              " ",
              "\u201Che baked / was baking a bread\u201D"
            )
          )
        ));
      } else if (item === "Aspect=Pref") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "perf-perfect-aspect" },
            React.createElement(
              "a",
              { name: "Perf" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Perf"
              )
            ),
            ": perfect aspect"
          ),
          React.createElement(
            "p",
            null,
            "The action has been / will have been completed. Since there is emphasis on one point on the time scale (the point of completion), this aspect does not work well with the present tense. For example, Czech morphology can create present forms of perfective verbs but these actually have a future meaning."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[cs] ",
              React.createElement(
                "em",
                null,
                "up\xE9ci"
              ),
              " \u201Cto bake\u201D (Perf);",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "upekl"
                ),
                " chleba"
              ),
              " ",
              "\u201Che baked / has baked a bread\u201D"
            )
          )
        ));
      } else if (item === "Aspect=Prosp") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "perf-perfect-aspect" },
            React.createElement(
              "a",
              { name: "Perf" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Perf"
              )
            ),
            ": perfect aspect"
          ),
          React.createElement(
            "p",
            null,
            "The action has been / will have been completed. Since there is emphasis on one point on the time scale (the point of completion), this aspect does not work well with the present tense. For example, Czech morphology can create present forms of perfective verbs but these actually have a future meaning."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[cs] ",
              React.createElement(
                "em",
                null,
                "up\xE9ci"
              ),
              " \u201Cto bake\u201D (Perf);",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "upekl"
                ),
                " chleba"
              ),
              " ",
              "\u201Che baked / has baked a bread\u201D"
            )
          )
        ));
      } else if (item === "Aspect=Prog") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "prog-progressive-aspect" },
            React.createElement(
              "a",
              { name: "Prog" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Prog"
              )
            ),
            ": progressive aspect"
          ),
          React.createElement(
            "p",
            null,
            "English progressive tenses (",
            React.createElement(
              "em",
              null,
              "I am eating, I have been doing \u2026"
            ),
            ") have this aspect. They are constructed analytically (auxiliary + present participle) but the ",
            React.createElement(
              "em",
              null,
              "-ing"
            ),
            " participle is so bound to progressive meaning that it seems a good idea to annotate it with this feature (we have to distinguish it from the past participle somehow; we may use both the \u201CTense\u201D and the \u201CAspect\u201D features)."
          ),
          React.createElement(
            "p",
            null,
            "In languages other than English, the progressive meaning may be expressed by morphemes bound to the main verb, which makes this value even more justified. Example is Turkish with its two distinct progressive morphemes, ",
            React.createElement(
              "em",
              null,
              "-yor"
            ),
            " and ",
            React.createElement(
              "em",
              null,
              "-mekte."
            )
          ),
          React.createElement(
            "h4",
            { id: "examples-3" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[tr]",
              " ",
              React.createElement(
                "em",
                null,
                "eve ",
                React.createElement(
                  "b",
                  null,
                  "gidiyor"
                )
              ),
              " ",
              "\u201Cshe is going home (now)\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[tr]",
              " ",
              React.createElement(
                "em",
                null,
                "eve ",
                React.createElement(
                  "b",
                  null,
                  "gitmekte"
                )
              ),
              " ",
              "\u201Cshe is going home (now)\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[tr]",
              " ",
              React.createElement(
                "em",
                null,
                "eve ",
                React.createElement(
                  "b",
                  null,
                  "gidiyordu"
                )
              ),
              " ",
              "\u201Cshe was going home (when I saw her)\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[tr]",
              " ",
              React.createElement(
                "em",
                null,
                "eve ",
                React.createElement(
                  "b",
                  null,
                  "gimekteydi"
                )
              ),
              " ",
              "\u201Cshe was going home (when I saw her)\u201D"
            )
          )
        ));
      } else if (item === "Aspect=Hab") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "hab-habitual-aspect" },
            React.createElement(
              "a",
              { name: "Hab" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Hab"
              )
            ),
            ": habitual aspect"
          ),
          React.createElement(
            "p",
            null,
            "English simple present has this aspect."
          ),
          React.createElement(
            "h4",
            { id: "examples-4" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[en]",
              " ",
              React.createElement(
                "em",
                null,
                "he ",
                React.createElement(
                  "b",
                  null,
                  "attends"
                ),
                " classes of Japanese"
              )
            )
          )
        ));
      } else if (item === "Aspect=Iter") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "iter-iterative--frequentative-aspect" },
            React.createElement(
              "a",
              { name: "Iter" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Iter"
              )
            ),
            ": iterative / frequentative aspect"
          ),
          React.createElement(
            "p",
            null,
            "Denotes repeated action. Attested e.g. in Hungarian. Iteratives also exist in Czech with this name but their meaning is rather habitual. They can be formed only from imperfective verbs and they are usually not classified as a separate aspect; they are just",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "Aspect=Imp."
            )
          ),
          React.createElement(
            "p",
            null,
            "Note: This value is new in UD v2 but a similar value has been used in UD v1 as language-specific for Hungarian, though it was called",
            " ",
            React.createElement(
              "em",
              null,
              "frequentative"
            ),
            " there (",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "Freq"
            ),
            ")."
          ),
          React.createElement(
            "h4",
            { id: "examples-5" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[hu] ",
              React.createElement(
                "em",
                null,
                "\xFCt"
              ),
              " \u201Chit\u201D,",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "\xFCt\xF6get"
                )
              ),
              " ",
              "\u201Chit several times\u201D",
              " "
            )
          )
        ));
      } else if (item === "Voice=Pass") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "pass-passsive" },
            React.createElement(
              "a",
              { name: "Pass" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Pass"
              )
            ),
            ": passsive"
          ),
          React.createElement(
            "p",
            null,
            "All verbs with the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBN"
            ),
            " ",
            "that have a ",
            React.createElement(
              "a",
              { href: "en-dep/auxpass" },
              "passive auxiliary"
            ),
            " have this feature."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "Kennedy was ",
                React.createElement(
                  "b",
                  null,
                  "killed"
                ),
                "."
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "He got ",
                React.createElement(
                  "b",
                  null,
                  "shot"
                ),
                "."
              )
            )
          )
        ));
      } else if (item === "Person=1") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "1-first-person" },
            React.createElement(
              "a",
              { name: "1" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "1"
              )
            ),
            ": first person"
          ),
          React.createElement(
            "p",
            null,
            "In singular, the first person refers just to the speaker / author. In plural, it must include the speaker and one or more additional persons."
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "p",
            null,
            "This feature is only used for pronouns and two inflections of",
            " ",
            React.createElement(
              "em",
              null,
              "be"
            ),
            ":"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "am, was"
              ),
              " (if ",
              React.createElement(
                "em",
                null,
                "I"
              ),
              " is its subject)",
              React.createElement(
                "em",
                null,
                ", I, we, me, us, my, mine, our, ours, myself, ourselves"
              )
            )
          )
        ));
      } else if (item === "Person=2") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "2-second-person" },
            React.createElement(
              "a",
              { name: "2" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "2"
              )
            ),
            ": second person"
          ),
          React.createElement(
            "p",
            null,
            "In singular, the second person refers to the addressee of the utterance / text. In plural, it may mean several addressees and optionally some third persons too."
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "p",
            null,
            "This feature is only used for pronouns:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "you, your, yours, yourself, yourselves"
              )
            )
          )
        ));
      } else if (item === "Person=3") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "3-third-person" },
            React.createElement(
              "a",
              { name: "3" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "3"
              )
            ),
            ": third person"
          ),
          React.createElement(
            "p",
            null,
            "The third person refers to one or more persons that are neither speakers nor addressees."
          ),
          React.createElement(
            "h4",
            { id: "examples-2" },
            "Examples"
          ),
          React.createElement(
            "p",
            null,
            "It is used for the following pronouns:"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "he, she, it, they, him, her, them, his, hers, their, theirs, himself, herself, itself, themselves"
              )
            )
          ),
          React.createElement(
            "p",
            null,
            "Additionally, it is used for verbs that require a third person singular subject which have the PTB tag",
            " ",
            React.createElement(
              "code",
              { className: "language-plaintext highlighter-rouge" },
              "VBZ"
            ),
            "."
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "he ",
                React.createElement(
                  "b",
                  null,
                  "walks"
                )
              )
            ),
            React.createElement(
              "li",
              null,
              React.createElement(
                "em",
                null,
                "she ",
                React.createElement(
                  "b",
                  null,
                  "is"
                )
              )
            )
          )
        ));
      } else if (item === "Polarity=Pos") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "pos-positive-affirmative" },
            React.createElement(
              "a",
              { name: "Pos" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Pos"
              )
            ),
            ": positive, affirmative"
          ),
          React.createElement(
            "h4",
            { id: "examples" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[cs]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "p\u0159i\u0161el"
                )
              ),
              " ",
              "\u201Che came\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[cs]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "velk\xFD"
                )
              ),
              " ",
              "\u201Cbig\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[en]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "yes"
                )
              )
            )
          )
        ));
      } else if (item === "Polarity=Neg") {
        setText(React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { id: "neg-negative" },
            React.createElement(
              "a",
              { name: "Neg" },
              React.createElement(
                "code",
                { className: "language-plaintext highlighter-rouge" },
                "Neg"
              )
            ),
            ": negative"
          ),
          React.createElement(
            "h4",
            { id: "examples-1" },
            "Examples"
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              "[cs]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "nep\u0159i\u0161el"
                )
              ),
              " ",
              "\u201Che did not come\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[cs]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "nevelk\xFD"
                )
              ),
              " ",
              "\u201Cnot big\u201D"
            ),
            React.createElement(
              "li",
              null,
              "[en]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "not"
                )
              )
            ),
            React.createElement(
              "li",
              null,
              "[en]",
              " ",
              React.createElement(
                "em",
                null,
                React.createElement(
                  "b",
                  null,
                  "no"
                )
              ),
              " ",
              "as in ",
              React.createElement(
                "em",
                null,
                "no, I don\u2019t think so;"
              ),
              " but not as in",
              " ",
              React.createElement(
                "em",
                null,
                "we have no bananas"
              )
            )
          )
        ));
      }
    }
  }

  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      { className: "px-3" },
      data.map(function (item, idx) {
        return React.createElement(
          "a",
          {
            key: idx,
            className: "btn btn-outline-dark btn-sm me-1 font-monospace py-0",
            "data-bs-toggle": "collapse",
            href: "#collapseExample",
            role: "button",
            "aria-expanded": "false",
            "aria-controls": "collapseExample",
            onClick: function onClick() {
              handleClick(item);
            }
          },
          item
        );
      })
    ),
    React.createElement(
      "div",
      { className: "collapse", id: "collapseExample" },
      React.createElement(
        "div",
        { className: "card card-body" },
        text
      )
    )
  );
}