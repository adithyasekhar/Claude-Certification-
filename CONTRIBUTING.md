# Contributing

The point of this repository is to help people pass these exams without paying for a course. Contributions that serve that are very welcome.

## The one hard rule

**Do not contribute anything from a live exam.**

If you have sat one of these certifications, you agreed not to disclose its contents. That agreement is not a formality — reproducing exam items devalues the credential for everyone holding it and would get this repository removed.

That means no remembered questions, no "I saw something like this", no reconstructed items, and no content copied from another study provider's paid material. Write questions from the published blueprint and from your own understanding of how Claude systems actually work.

If a pull request looks like recalled exam content, it gets closed. No hard feelings, but it gets closed.

## What helps most

**Corrections**, in order of value:

1. A study note that is technically wrong. This is the worst kind of bug here, because people will study it.
2. A blueprint that has moved — domains renamed, weights changed, a new exam guide version.
3. An exam fact that is out of date: fee, item count, time limit, retake policy.
4. A question whose stated answer is arguable, or whose explanation does not actually explain.

**Additions**:

- More practice questions. All four banks are at full exam length, so new questions act as **alternates**: the more a domain holds beyond its blueprint quota, the more genuinely different each re-sit is. Heavy domains (CCDV-F Domain 2 at 33.1%, CCAR-P Domain 3 at 19%, CCAR-F Domain 1 at 27%) give the most value per question.
- Worked examples inside study notes.
- A new track, if Anthropic publishes one.

## Writing a good question

The exams lean on judgement under a scenario, so definition-recall questions are poor practice for them.

**Good**: a concrete situation with real constraints, where the candidate has to pick the right trade-off and every wrong option is something a half-prepared person would genuinely choose.

**Poor**: "What does MCP stand for?" — nobody fails for that reason.

Checklist before you open the PR:

- [ ] The stem describes a situation, not a term.
- [ ] Every distractor is plausible to someone who has studied but not understood.
- [ ] Exactly one option (or exactly `select` options) is defensibly correct. If two could be argued, tighten the stem.
- [ ] The `why` explains the correct answer *and* dismisses the most tempting wrong one.
- [ ] `domain` matches a domain id in the same file, and `id` is unique.
- [ ] You have opened it in a browser and answered it once.

## Technical notes

There is no build step and no dependencies. Edit a file, refresh the browser.

- Data lives in `data/<track>.js`. Each file is one `ClaudeCertPrep.register({...})` call.
- `answer` holds indices into `options` **as you typed them**. The engine shuffles at runtime and remaps.
- Study notes support `**bold**` and `` `code` `` and nothing else. Anything else is escaped.
- Keep the site working from `file://`. That is why data files are `.js` and not `.json` — no `fetch`, no server required.
- No frameworks, no CDN JavaScript. Fonts from Google Fonts are the only external request.

## Style

Write like you are explaining it to a competent colleague who is short on time. Plain sentences. No filler, no hype, no "in today's fast-moving AI landscape". If a sentence does not help somebody pass, cut it.
