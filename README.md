# Claude Cert Prep

Free, open-source study guides and timed mock exams for all four of Anthropic's Claude certifications.

No build step, no dependencies, no backend, no sign-up. Four static HTML pages and some JavaScript. Open `index.html` and it works.

**Not affiliated with, endorsed by, or sponsored by Anthropic.**

---

## What's in it

These are four **separate exams**, so this is four separate sets of material — each with its own blueprint, study notes and independent full-length mock.

| Track | Code | Domains | Real exam | Questions here |
|---|---|---|---|---|
| Claude Certified Associate — Foundations | CCAO-F | 7 | 60 items / 120 min | **60** |
| Claude Certified Developer — Foundations | CCDV-F | 8 | 53 items / 120 min | **53** |
| Claude Certified Architect — Foundations | CCAR-F | 5 | 60 items / 120 min | **60** |
| Claude Certified Architect — Professional | CCAR-P | 7 | 63 items / 120 min | **63** |

**236 questions.** Each bank is sized to its real paper and allocated across domains in the exact proportions of the published blueprint — so CCDV-F's Applications and Integration domain holds 17 of its 53 questions, matching its 33.1% weight.

https://adithyasekhar.github.io/Claude-Certification-/

For each track:

- **The blueprint** — every domain with its published weight, drawn as a proportional bar so you can see at a glance where the marks actually are.
- **Study notes** — written out per domain, plus the traps that cost people marks and the vocabulary you're expected to recognise.
- **A full-length timed mock** — the real item count under the real time limit, weighted by domain exactly as the blueprint specifies, with options shuffled every attempt. Single-answer and multiple-response items, each stating how many to pick, as the real exams do. Shorter drills are available at the same weighting.
- **A score report** — overall plus a per-domain breakdown, matching how the real score report works, with your weakest weighted domain called out.

Scores are saved in your browser's local storage. Nothing is uploaded anywhere.

---

## Run it

```bash
git clone https://github.com/adithyasekhar/Claude-Certification-.git
cd claude-cert-prep
open index.html          # macOS — or just double-click the file
```

Data files are plain JavaScript rather than JSON specifically so that opening the file directly works without a local server. If you'd rather serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish it on GitHub Pages

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. Branch `main`, folder `/ (root)`. Save.
4. It'll be live at `https://adithyasekhar.github.io/Claude-Certification-/` within a minute or two.

The `.nojekyll` file is there to stop GitHub's Jekyll processor interfering with the `assets/` directory. Leave it.

Then update the `Source` link in `assets/js/app.js` (`mountChrome`) to point at your repository.

---

## Structure

```
.
├── index.html            Hub — all four tracks, your best scores
├── cert.html             Blueprint and study notes   (?id=ccar-f)
├── exam.html             Timed mock exam             (?id=ccar-f)
├── assets/
│   ├── css/app.css       All styling and design tokens
│   └── js/
│       ├── app.js        Registry, local storage, theme, shared helpers
│       ├── home.js       Scoreboard
│       ├── cert.js       Blueprint and notes renderer
│       └── exam.js       Sampling, timer, scoring, report
└── data/
    ├── ccao-f.js         Associate — Foundations
    ├── ccdv-f.js         Developer — Foundations
    ├── ccar-f.js         Architect — Foundations
    └── ccar-p.js         Architect — Professional
```

Everything about a certification — facts, domains, notes, questions — lives in its one data file. To add a fifth track, copy a data file, change the contents, and add one `<script>` tag to each of the three HTML pages.

---

## Adding questions

This is the part most worth contributing to. Open the relevant file in `data/` and append to the `questions` array:

```js
{
  id: 'ccar-f-26',        // unique, prefix with the track
  domain: 'd3',           // must match a domain id in the same file
  type: 'single',         // or 'multi'
  select: 2,              // multi only — how many to pick
  stem: 'A scenario, then the question.',
  options: ['...', '...', '...', '...'],
  answer: [0],            // indices into options, as authored
  why: 'Why the right answer is right, and why the tempting wrong one is wrong.'
}
```

The engine shuffles options at runtime and tracks where the correct ones moved, so write `answer` against the order you typed.

**What makes a good question here**

- Test a judgement, not a definition. "When does a subagent earn its own context window" beats "what is a subagent".
- Make every distractor something a reasonably prepared person might actually pick. An obviously silly option wastes a slot.
- The `why` should teach. Say why the correct answer is correct *and* why the most tempting wrong answer fails — that's where the learning is.
- Keep the stem concrete. Real numbers, real constraints, a real decision.

---

## Ground rules

**No real exam content.** Every question, distractor, explanation and study note here was written from scratch. If you have sat one of these exams, do not contribute anything you remember from it. Reproducing live exam items breaches the agreement candidates sign, devalues the credential for everyone who holds it, and would get this repository taken down — deservedly.

**Facts get cited.** Item counts, time limits, fees, pass marks and domain weights come from Anthropic's published exam guides (v1.0, effective July 2026). They're reproduced as factual reference and linked to the source. Everything explanatory around them is original writing.

**Corrections beat additions.** If a study note is wrong or a blueprint has changed, that's the most valuable issue you can open.

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Official sources

- Anthropic Partner Certifications — <https://anthropic-partners.skilljar.com/page/partner-certifications>
- Claude API documentation — <https://docs.claude.com/en/api/overview>
- Claude Code documentation — <https://docs.claude.com/en/docs/claude-code/overview>
- Model Context Protocol — <https://github.com/modelcontextprotocol>

Always confirm current exam details against Anthropic's own guide before booking. Fees, formats and blueprints change.

---

## Licence

Code is MIT. Study notes and practice questions are CC BY 4.0 — use them, adapt them, credit the repository. See [LICENSE](LICENSE).
