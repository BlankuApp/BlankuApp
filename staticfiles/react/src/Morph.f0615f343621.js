export function Morph(props) {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    if (props) {
      let temp = JSON.parse(props.morph);
      let tem = [];
      temp.map((item) => tem.push(item[0]));
      setData(tem);
    }
  }, []);

  function handleClick(item) {
    if (data) {
      if (item === "Degree=Pos") {
        setText(
          <div>
            <h3 id="pos-positive-first-degree">
              <a name="Pos">
                <code className="language-plaintext highlighter-rouge">
                  Pos
                </code>
              </a>
              : positive, first degree
            </h3>

            <p>
              This is the base form that merely states a quality of something,
              without comparing it to qualities of others. Note that although
              this degree is traditionally called “positive”, negative
              properties can be compared, too. All words with PTB tags{" "}
              <code className="language-plaintext highlighter-rouge">JJ</code>{" "}
              have this feature.
            </p>

            <h4 id="examples">Examples</h4>

            <ul>
              <li>
                <em>
                  <b>young</b> woman
                </em>
              </li>
            </ul>

            <p>
              Additionally, the following adverbs with PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">RB</code>{" "}
              also have this feature:
            </p>

            <ul>
              <li>
                <em>
                  hard, fast, late, long, high, easy, early, far, soon, low,
                  close, well, badly, little
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Degree=Cmp") {
        setText(
          <div>
            <h3 id="cmp-comparative-second-degree">
              <a name="Cmp">
                <code className="language-plaintext highlighter-rouge">
                  Cmp
                </code>
              </a>
              : comparative, second degree
            </h3>

            <p>
              The quality of one object is compared to the same quality of
              another object. All words with PTB tags{" "}
              <code className="language-plaintext highlighter-rouge">JJR</code>{" "}
              are marked with this feature.
            </p>

            <h4 id="examples-1">Examples</h4>

            <ul>
              <li>
                <em>
                  The man is <b>younger</b> than me.
                </em>
              </li>
            </ul>

            <p>
              The following adverbs with PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">RBR</code>{" "}
              also have this feature:
            </p>

            <ul>
              <li>
                <em>
                  more, harder, faster, later, longer, higher, easier, earlier,
                  further, farther, sooner, lower, closer, better, worse, less,
                  quicker, slower
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Degree=Sup") {
        setText(
          <div>
            <h3 id="sup-superlative-third-degree">
              <a name="Sup">
                <code className="language-plaintext highlighter-rouge">
                  Sup
                </code>
              </a>
              : superlative, third degree
            </h3>

            <p>
              The quality of one object is compared to the same quality of all
              other objects within a set. All words with PTB tags{" "}
              <code className="language-plaintext highlighter-rouge">JJS</code>{" "}
              are marked with this feature.
            </p>

            <h4 id="examples-2">Examples</h4>

            <ul>
              <li>
                <em>
                  This is the <b>youngest</b> woman in our team.
                </em>
              </li>
            </ul>

            <p>
              The following adverbs with PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">RBS</code>{" "}
              also have this feature:
            </p>

            <ul>
              <li>
                <em>
                  most, hardest, fastest, latest, longest, highest, easiest,
                  earliest, furthest, farthest, soonest, lowest, closest, best,
                  worst, least, quickest, slowest
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Gender=Masc") {
        setText(
          <div>
            <h3 id="masc-masculine-gender">
              <a name="Masc">
                <code className="language-plaintext highlighter-rouge">
                  Masc
                </code>
              </a>
              : masculine gender
            </h3>

            <h4 id="examples">Examples</h4>

            <ul>
              <li>
                <em>he, his, him, himself</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Gender=Fem") {
        setText(
          <div>
            <h3 id="fem-feminine-gender">
              <a name="Fem">
                <code className="language-plaintext highlighter-rouge">
                  Fem
                </code>
              </a>
              : feminine gender
            </h3>

            <h4 id="examples-1">Examples</h4>

            <ul>
              <li>
                <em>she, her, hers, herself</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Gender=Neut") {
        setText(
          <div>
            <h3 id="neut-neuter-gender">
              <a name="Neut">
                <code className="language-plaintext highlighter-rouge">
                  Neut
                </code>
              </a>
              : neuter gender
            </h3>

            <h4 id="examples-2">Examples</h4>

            <ul>
              <li>
                <em>it, its, itself</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Animacy=Anim") {
        setText(
          <div>
            <h3 id="anim-animate">
              <a name="Anim">
                <code className="language-plaintext highlighter-rouge">
                  Anim
                </code>
              </a>
              : animate
            </h3>

            <p>
              Human beings, animals, fictional characters, names of professions
              etc. are normally animate. Even nouns that are normally inanimate
              can be inflected as animate if they are personified. And some
              words in some languages can grammatically behave like animates
              although there is no obvious semantic reason for that.
            </p>

            <h4 id="examples">Examples</h4>

            <ul>
              <li>
                [cs]{" "}
                <em>
                  <b>malí kluci</b>
                </em>{" "}
                “small boys”
              </li>
              <li>
                [cs]{" "}
                <em>
                  <b>malí psi</b>
                </em>{" "}
                “small dogs”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Animacy=Hum") {
        setText(
          <div>
            <h3 id="inan-inanimate">
              <a name="Inan">
                <code className="language-plaintext highlighter-rouge">
                  Inan
                </code>
              </a>
              : inanimate
            </h3>

            <p>Nouns that are not animate are inanimate.</p>

            <h4 id="examples-1">Examples</h4>

            <ul>
              <li>
                [cs]{" "}
                <em>
                  <b>malé domy</b>
                </em>{" "}
                “small houses”
              </li>
              <li>
                [pl]{" "}
                <em>
                  <b>małe domy</b>
                </em>{" "}
                “small houses”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Animacy=Inan") {
        setText(
          <div>
            <h3 id="hum-human">
              <a name="Hum">
                <code className="language-plaintext highlighter-rouge">
                  Hum
                </code>
              </a>
              : human
            </h3>

            <p>
              A subset of animates where the prototypical member is a human
              being but not an animal. Again, there may be exceptions that do
              not fit the class semantically but belong to it grammatically.
            </p>

            <h4 id="examples-2">Examples</h4>

            <ul>
              <li>
                [pl]{" "}
                <em>
                  <b>mali chłopcy</b>
                </em>{" "}
                “small boys”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Animacy=Nhum") {
        setText(
          <div>
            <h3 id="nhum-non-human">
              <a name="Nhum">
                <code className="language-plaintext highlighter-rouge">
                  Nhum
                </code>
              </a>
              : non-human
            </h3>

            <p>
              In languages that only distinguish human from non-human, this
              value includes inanimates. In languages that distinguish human
              animates, non-human animates and inanimates, this value is used
              only for non-human animates, while{" "}
              <code className="language-plaintext highlighter-rouge">Inan</code>
              is used for inanimates.
            </p>

            <h4 id="examples-3">Examples</h4>

            <ul>
              <li>
                [pl]{" "}
                <em>
                  <b>małe psy</b>
                </em>{" "}
                “small dogs”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Number=Sing") {
        setText(
          <div>
            <h3 id="sing-singular">
              <a name="Sing">
                <code className="language-plaintext highlighter-rouge">
                  Sing
                </code>
              </a>
              : singular
            </h3>

            <p>
              A singular noun denotes one person, animal or thing. Every noun
              with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">NN</code>{" "}
              or{" "}
              <code className="language-plaintext highlighter-rouge">NNP</code>{" "}
              is marked with this feature.
            </p>

            <h4 id="examples">Examples:</h4>

            <ul>
              <li>
                <em>
                  an <b>apple</b>, a <b>train</b>
                </em>
              </li>
            </ul>

            <p>
              Pronouns that refer to a single person, an animal or a thing are
              also marked with this feature.
            </p>

            <ul>
              <li>
                <em>
                  I, me, my, myself, he, his, him, himself, she, her, hers,
                  herself, it, its, itself
                </em>
              </li>
            </ul>

            <p>
              We also mark all verbs with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBZ</code>{" "}
              with this feature.
            </p>

            <h4 id="examples-1">Examples:</h4>

            <ul>
              <li>
                <em>
                  she <b>does</b>
                </em>
              </li>
              <li>
                <em>
                  he <b>walks</b>
                </em>
              </li>
            </ul>

            <p>
              Further, we mark inflections of{" "}
              <code className="language-plaintext highlighter-rouge">be</code>{" "}
              that can only have a singular noun or pronoun in subject position
              with this feature.
            </p>

            <ul>
              <li>
                <em>am, is, was</em>
              </li>
            </ul>

            <p>
              Demonstrative determiners of singular nouns and demonstrative
              pronouns that refer to singular nouns are also marked with this
              feature.
            </p>

            <ul>
              <li>
                <em>this, that</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Number=Plur") {
        setText(
          <div>
            <h3 id="plur-plural">
              <a name="Plur">
                <code className="language-plaintext highlighter-rouge">
                  Plur
                </code>
              </a>
              : plural
            </h3>

            <p>
              A plural noun denotes several persons, animals or things. Every
              noun with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">NNS</code>{" "}
              or{" "}
              <code className="language-plaintext highlighter-rouge">NNPS</code>{" "}
              is marked with this feature.
            </p>

            <h4 id="examples-2">Examples:</h4>

            <ul>
              <li>
                <em>
                  several <b>apples</b>, two <b>trains</b>
                </em>
              </li>
            </ul>

            <p>
              Pronouns that refer to a single person, an animal or a thing are
              also marked with this feature.
            </p>

            <ul>
              <li>
                <em>
                  we, us, our, ours, ourselves, yourselves, they, them, their,
                  theirs, themselves
                </em>
              </li>
            </ul>

            <p>
              Demonstrative determiners of plural nouns and demonstrative
              pronouns that refer to plural nouns are also marked with this
              feature.
            </p>

            <ul>
              <li>
                <em>these, those</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Case=Nom") {
        setText(
          <div>
            <h3 id="nom-direct">
              <a name="Nom">
                <code className="language-plaintext highlighter-rouge">
                  Nom
                </code>
              </a>
              : direct
            </h3>

            <h4 id="examples">Examples</h4>

            <p>The following pronouns are in the direct case:</p>

            <ul>
              <li>
                <em>I, you, he, she, it, we, they</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Case=Acc") {
        setText(
          <div>
            <h3 id="acc-oblique">
              <a name="Acc">
                <code className="language-plaintext highlighter-rouge">
                  Acc
                </code>
              </a>
              : oblique
            </h3>

            <h4 id="examples-1">Examples</h4>

            <p>The following pronouns are in the oblique case:</p>

            <ul>
              <li>
                <em>
                  me, you, him, her, it, us, them, myself, yourself, himself,
                  herself, itself, ourselves, yourselves, themselves
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "VerbForm=Fin") {
        setText(
          <div>
            <h3 id="fin-finite-verb">
              <a name="Fin">
                <code className="language-plaintext highlighter-rouge">
                  Fin
                </code>
              </a>
              : finite verb
            </h3>

            <p>
              Rule of thumb: if it has non-empty <a href="Mood">Mood</a>, it is
              finite. English verbs with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBZ</code>,{" "}
              <code className="language-plaintext highlighter-rouge">VBD</code>{" "}
              or{" "}
              <code className="language-plaintext highlighter-rouge">VBP</code>{" "}
              and modals with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">MD</code>{" "}
              have this feature. Further, verbs with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VB</code>{" "}
              have this feature if they don’t have an auxiliary or modal verb
              attached to it.
            </p>

            <h4 id="examples">Examples:</h4>

            <ul>
              <li>
                <em>
                  I <b>do</b>, she <b>has</b>
                </em>
              </li>
              <li>
                <em>
                  <b>Read</b> the book!
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "VerbForm=Inf") {
        setText(
          <div>
            <h3 id="inf-infinitive">
              <a name="Inf">
                <code className="language-plaintext highlighter-rouge">
                  Inf
                </code>
              </a>
              : infinitive
            </h3>

            <p>
              Infinitive is the citation form of verbs in many languages.
              Infinitives may be used together with auxiliaries to form
              periphrastic <a href="Tense">tenses</a> (e.g. future tense{" "}
              <em>
                I will <b>sit</b> in a plane
              </em>
              ), they appear as arguments of modal verbs etc. English verbs with
              the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VB</code>{" "}
              have this feature if they have an auxiliary or modal verb or the
              inifinitval <em>to</em> attached to it.
            </p>

            <h4 id="examples-1">Examples:</h4>

            <ul>
              <li>
                <em>
                  I have to <b>leave</b>
                </em>
                .
              </li>
            </ul>
          </div>
        );
      } else if (item === "VerbForm=Part") {
        setText(
          <div>
            <h3 id="part-participle">
              <a name="Part">
                <code className="language-plaintext highlighter-rouge">
                  Part
                </code>
              </a>
              : participle
            </h3>

            <p>
              Participle is a non-finite verb form that shares properties of
              verbs and adjectives. It is used to form various periphrastic verb
              forms such as complex tenses and passives. In English, all words
              with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBD</code>{" "}
              have this feature. Further, words with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBG</code>{" "}
              can also have this feature if they are preceded by an inflection
              of <em>to be</em>.
            </p>

            <h4 id="examples-2">Examples:</h4>

            <ul>
              <li>
                <em>
                  He could have <b>been prepared</b> if he had forseen it
                </em>
                .
              </li>
              <li>
                <em>
                  I will be <b>driving</b> home
                </em>
                .
              </li>
            </ul>
          </div>
        );
      } else if (item === "VerbForm=Ger") {
        setText(
          <div>
            <h3 id="ger-gerund">
              <a name="Ger">
                <code className="language-plaintext highlighter-rouge">
                  Ger
                </code>
              </a>
              : gerund
            </h3>

            <p>
              Gerund is a non-finite verb form that shares properties of verbs
              and nouns. In English, all words with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBG</code>{" "}
              have this feature if they are not preceded by an inflection of{" "}
              <em>to be</em>.
            </p>

            <h4 id="examples-3">Examples:</h4>

            <ul>
              <li>
                <em>
                  I look forward to <b>seeing</b> you.
                </em>
              </li>
              <li>
                <em>
                  She turns a blind eye to my <b>being</b> late.
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Mood=Ind") {
        setText(
          <div>
            <h3 id="ind-indicative">
              <a name="Ind">
                <code className="language-plaintext highlighter-rouge">
                  Ind
                </code>
              </a>
              : indicative
            </h3>

            <p>
              The indicative can be considered the default mood. A verb in
              indicative merely states that something happens, has happened or
              will happen, without adding any attitude of the speaker.
            </p>

            <h4 id="examples">Examples</h4>

            <ul>
              <li>
                <em>
                  He <b>makes</b> a sandwich.
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Mood=Imp") {
        setText(
          <div>
            <h3 id="imp-imperative">
              <a name="Imp">
                <code className="language-plaintext highlighter-rouge">
                  Imp
                </code>
              </a>
              : imperative
            </h3>

            <p>
              The speaker uses imperative to order or ask the addressee to do
              the action of the verb.
            </p>

            <h4 id="examples-1">Examples</h4>

            <ul>
              <li>
                <em>
                  <b>Make</b> a sandwich!
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Mood=Sup") {
        setText(
          <div>
            <h3 id="sub-subjunctive">
              <a name="Sub">
                <code className="language-plaintext highlighter-rouge">
                  Sub
                </code>
              </a>
              : subjunctive
            </h3>

            <p>
              The subjunctive mood is used under certain circumstances in
              subordinate clauses, typically for actions that are subjective or
              otherwise uncertain such as expressing an opinion or describing
              one’s state of mind. It is also used to make statements contrary
              to fact.
            </p>

            <h4 id="examples-2">Examples</h4>

            <ul>
              <li>
                <em>
                  I suggest that he <b>see</b> a doctor.
                </em>
              </li>
              <li>
                <em>
                  If I <b>were</b> rich…
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Tense=Pres") {
        setText(
          <div>
            <h3 id="pres-present-tense">
              <a name="Pres">
                <code className="language-plaintext highlighter-rouge">
                  Pres
                </code>
              </a>
              : present tense
            </h3>

            <p>
              The present tense denotes actions that are happening right now or
              that usually happen. All verbs with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBP</code>{" "}
              or{" "}
              <code className="language-plaintext highlighter-rouge">VBZ</code>{" "}
              have this feature. <a href="Mood">Subjunctives</a> with the PTB
              tag{" "}
              <code className="language-plaintext highlighter-rouge">VB</code>{" "}
              also have this feature.
            </p>

            <h4 id="examples">Examples:</h4>

            <ul>
              <li>
                <em>
                  She <b>goes</b> home.
                </em>
              </li>
              <li>
                <em>
                  I suggest that he <b>see</b> a doctor.
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Tense=Past") {
        setText(
          <div>
            <h3 id="past-past-tense">
              <a name="Past">
                <code className="language-plaintext highlighter-rouge">
                  Past
                </code>
              </a>
              : past tense
            </h3>

            <p>
              The past tense denotes actions that happened before the current
              moment. All verbs with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBD</code>{" "}
              and{" "}
              <code className="language-plaintext highlighter-rouge">VBN</code>{" "}
              have this feature.
            </p>

            <h4 id="examples-1">Examples:</h4>

            <ul>
              <li>
                <em>
                  She <b>went</b> home.
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Aspect=Imp") {
        setText(
          <div>
            <h3 id="imp-imperfect-aspect">
              <a name="Imp">
                <code className="language-plaintext highlighter-rouge">
                  Imp
                </code>
              </a>
              : imperfect aspect
            </h3>

            <p>
              The action took / takes / will take some time span and there is no
              information whether and when it was / will be completed.
            </p>

            <h4 id="examples">Examples</h4>

            <ul>
              <li>
                [cs] <em>péci</em> “to bake” (Imp);{" "}
                <em>
                  <b>pekl</b> chleba
                </em>{" "}
                “he baked / was baking a bread”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Aspect=Pref") {
        setText(
          <div>
            <h3 id="perf-perfect-aspect">
              <a name="Perf">
                <code className="language-plaintext highlighter-rouge">
                  Perf
                </code>
              </a>
              : perfect aspect
            </h3>

            <p>
              The action has been / will have been completed. Since there is
              emphasis on one point on the time scale (the point of completion),
              this aspect does not work well with the present tense. For
              example, Czech morphology can create present forms of perfective
              verbs but these actually have a future meaning.
            </p>

            <h4 id="examples-1">Examples</h4>

            <ul>
              <li>
                [cs] <em>upéci</em> “to bake” (Perf);{" "}
                <em>
                  <b>upekl</b> chleba
                </em>{" "}
                “he baked / has baked a bread”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Aspect=Prosp") {
        setText(
          <div>
            <h3 id="perf-perfect-aspect">
              <a name="Perf">
                <code className="language-plaintext highlighter-rouge">
                  Perf
                </code>
              </a>
              : perfect aspect
            </h3>

            <p>
              The action has been / will have been completed. Since there is
              emphasis on one point on the time scale (the point of completion),
              this aspect does not work well with the present tense. For
              example, Czech morphology can create present forms of perfective
              verbs but these actually have a future meaning.
            </p>

            <h4 id="examples-1">Examples</h4>

            <ul>
              <li>
                [cs] <em>upéci</em> “to bake” (Perf);{" "}
                <em>
                  <b>upekl</b> chleba
                </em>{" "}
                “he baked / has baked a bread”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Aspect=Prog") {
        setText(
          <div>
            <h3 id="prog-progressive-aspect">
              <a name="Prog">
                <code className="language-plaintext highlighter-rouge">
                  Prog
                </code>
              </a>
              : progressive aspect
            </h3>

            <p>
              English progressive tenses (
              <em>I am eating, I have been doing …</em>) have this aspect. They
              are constructed analytically (auxiliary + present participle) but
              the <em>-ing</em> participle is so bound to progressive meaning
              that it seems a good idea to annotate it with this feature (we
              have to distinguish it from the past participle somehow; we may
              use both the “Tense” and the “Aspect” features).
            </p>

            <p>
              In languages other than English, the progressive meaning may be
              expressed by morphemes bound to the main verb, which makes this
              value even more justified. Example is Turkish with its two
              distinct progressive morphemes, <em>-yor</em> and <em>-mekte.</em>
            </p>

            <h4 id="examples-3">Examples</h4>

            <ul>
              <li>
                [tr]{" "}
                <em>
                  eve <b>gidiyor</b>
                </em>{" "}
                “she is going home (now)”
              </li>
              <li>
                [tr]{" "}
                <em>
                  eve <b>gitmekte</b>
                </em>{" "}
                “she is going home (now)”
              </li>
              <li>
                [tr]{" "}
                <em>
                  eve <b>gidiyordu</b>
                </em>{" "}
                “she was going home (when I saw her)”
              </li>
              <li>
                [tr]{" "}
                <em>
                  eve <b>gimekteydi</b>
                </em>{" "}
                “she was going home (when I saw her)”
              </li>
            </ul>
          </div>
        );
      } else if (item === "Aspect=Hab") {
        setText(
          <div>
            <h3 id="hab-habitual-aspect">
              <a name="Hab">
                <code className="language-plaintext highlighter-rouge">
                  Hab
                </code>
              </a>
              : habitual aspect
            </h3>

            <p>English simple present has this aspect.</p>

            <h4 id="examples-4">Examples</h4>

            <ul>
              <li>
                [en]{" "}
                <em>
                  he <b>attends</b> classes of Japanese
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Aspect=Iter") {
        setText(
          <div>
            <h3 id="iter-iterative--frequentative-aspect">
              <a name="Iter">
                <code className="language-plaintext highlighter-rouge">
                  Iter
                </code>
              </a>
              : iterative / frequentative aspect
            </h3>

            <p>
              Denotes repeated action. Attested e.g. in Hungarian. Iteratives
              also exist in Czech with this name but their meaning is rather
              habitual. They can be formed only from imperfective verbs and they
              are usually not classified as a separate aspect; they are just{" "}
              <code className="language-plaintext highlighter-rouge">
                Aspect=Imp.
              </code>
            </p>

            <p>
              Note: This value is new in UD v2 but a similar value has been used
              in UD v1 as language-specific for Hungarian, though it was called{" "}
              <em>frequentative</em> there (
              <code className="language-plaintext highlighter-rouge">Freq</code>
              ).
            </p>

            <h4 id="examples-5">Examples</h4>

            <ul>
              <li>
                [hu] <em>üt</em> “hit”,{" "}
                <em>
                  <b>ütöget</b>
                </em>{" "}
                “hit several times”{" "}
              </li>
            </ul>
          </div>
        );
      } else if (item === "Voice=Pass") {
        setText(
          <div>
            <h3 id="pass-passsive">
              <a name="Pass">
                <code className="language-plaintext highlighter-rouge">
                  Pass
                </code>
              </a>
              : passsive
            </h3>

            <p>
              All verbs with the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBN</code>{" "}
              that have a <a href="en-dep/auxpass">passive auxiliary</a> have
              this feature.
            </p>

            <h4 id="examples">Examples:</h4>

            <ul>
              <li>
                <em>
                  Kennedy was <b>killed</b>.
                </em>
              </li>
              <li>
                <em>
                  He got <b>shot</b>.
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Person=1") {
        setText(
          <div>
            <h3 id="1-first-person">
              <a name="1">
                <code className="language-plaintext highlighter-rouge">1</code>
              </a>
              : first person
            </h3>

            <p>
              In singular, the first person refers just to the speaker / author.
              In plural, it must include the speaker and one or more additional
              persons.
            </p>

            <h4 id="examples">Examples</h4>

            <p>
              This feature is only used for pronouns and two inflections of{" "}
              <em>be</em>:
            </p>

            <ul>
              <li>
                <em>am, was</em> (if <em>I</em> is its subject)
                <em>, I, we, me, us, my, mine, our, ours, myself, ourselves</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Person=2") {
        setText(
          <div>
            <h3 id="2-second-person">
              <a name="2">
                <code className="language-plaintext highlighter-rouge">2</code>
              </a>
              : second person
            </h3>

            <p>
              In singular, the second person refers to the addressee of the
              utterance / text. In plural, it may mean several addressees and
              optionally some third persons too.
            </p>

            <h4 id="examples-1">Examples</h4>

            <p>This feature is only used for pronouns:</p>

            <ul>
              <li>
                <em>you, your, yours, yourself, yourselves</em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Person=3") {
        setText(
          <div>
            <h3 id="3-third-person">
              <a name="3">
                <code className="language-plaintext highlighter-rouge">3</code>
              </a>
              : third person
            </h3>

            <p>
              The third person refers to one or more persons that are neither
              speakers nor addressees.
            </p>

            <h4 id="examples-2">Examples</h4>

            <p>It is used for the following pronouns:</p>

            <ul>
              <li>
                <em>
                  he, she, it, they, him, her, them, his, hers, their, theirs,
                  himself, herself, itself, themselves
                </em>
              </li>
            </ul>

            <p>
              Additionally, it is used for verbs that require a third person
              singular subject which have the PTB tag{" "}
              <code className="language-plaintext highlighter-rouge">VBZ</code>.
            </p>

            <ul>
              <li>
                <em>
                  he <b>walks</b>
                </em>
              </li>
              <li>
                <em>
                  she <b>is</b>
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Polarity=Pos") {
        setText(
          <div>
            <h3 id="pos-positive-affirmative">
              <a name="Pos">
                <code className="language-plaintext highlighter-rouge">
                  Pos
                </code>
              </a>
              : positive, affirmative
            </h3>

            <h4 id="examples">Examples</h4>

            <ul>
              <li>
                [cs]{" "}
                <em>
                  <b>přišel</b>
                </em>{" "}
                “he came”
              </li>
              <li>
                [cs]{" "}
                <em>
                  <b>velký</b>
                </em>{" "}
                “big”
              </li>
              <li>
                [en]{" "}
                <em>
                  <b>yes</b>
                </em>
              </li>
            </ul>
          </div>
        );
      } else if (item === "Polarity=Neg") {
        setText(
          <div>
            <h3 id="neg-negative">
              <a name="Neg">
                <code className="language-plaintext highlighter-rouge">
                  Neg
                </code>
              </a>
              : negative
            </h3>

            <h4 id="examples-1">Examples</h4>

            <ul>
              <li>
                [cs]{" "}
                <em>
                  <b>nepřišel</b>
                </em>{" "}
                “he did not come”
              </li>
              <li>
                [cs]{" "}
                <em>
                  <b>nevelký</b>
                </em>{" "}
                “not big”
              </li>
              <li>
                [en]{" "}
                <em>
                  <b>not</b>
                </em>
              </li>
              <li>
                [en]{" "}
                <em>
                  <b>no</b>
                </em>{" "}
                as in <em>no, I don’t think so;</em> but not as in{" "}
                <em>we have no bananas</em>
              </li>
            </ul>
          </div>
        );
      }
    }
  }

  return (
    <div>
      <p className="px-3">
        {data.map((item, idx) => {
          return (
            <a
              key={idx}
              className="btn btn-outline-dark btn-sm me-1 font-monospace py-0"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              onClick={() => {
                handleClick(item);
              }}
            >
              {item}
            </a>
          );
        })}
      </p>

      <div className="collapse" id="collapseExample">
        <div className="card card-body">{text}</div>
      </div>
    </div>
  );
}
