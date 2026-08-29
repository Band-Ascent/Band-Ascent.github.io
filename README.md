<p align="center">
  <img src="https://github.com/Band-Ascent/Band-Ascent.github.io/blob/9b33532c4c2343cab0daaee9cd6580b5ce6ebe95/logo-wordmark.svg" alt="Band Ascent" width="380">
</p>

<p align="center">
  <b>Free, open-source, offline-first practice for the IELTS exam.</b><br>
  An adaptive test that estimates your band, a study plan built from your weakest
  skills, and nine timed drills over 2,125 tiered questions.<br>
  No account. No server. Nothing leaves your browser.
</p>

<p align="center">
  <a href="#"><img alt="Live app" src="https://img.shields.io/badge/live-GitHub%20Pages-0E7C86?style=flat-square"></a>
  <img alt="Code licence" src="https://img.shields.io/badge/code-MIT-0F2233?style=flat-square">
  <img alt="Content licence" src="https://img.shields.io/badge/content-CC%20BY%204.0-E8A32D?style=flat-square">
  <img alt="Dependencies" src="https://img.shields.io/badge/build%20step-none-3E6076?style=flat-square">
</p>

---

## What it does

**Calibration test** — about 25 minutes across listening, reading, grammar,
vocabulary and writing. Grammar and vocabulary are adaptive: every item is tagged
with the band at which a candidate has roughly even odds of answering it, and the
estimate moves toward or away from that difficulty with each answer. The result is
a band, not a percentage. Short sections are deliberately pulled toward the middle,
because four questions cannot justify an extreme score.

**Study plan** — generated from your two weakest skills, phased against your test
date, with four daily tasks regenerated every morning.

**Nine drills** — Word Rush, Collocation Lock, Paraphrase Sprint, Sentence Forge,
Gap Runner, Echo Dictation, Skim & Scan, plus Writing and Speaking labs with real
exam timing. Each runs at Easy, Medium, Hard, Hardest, or Adaptive (which follows
your measured band).

**Writing analysis** — a transparent rule-based estimate across the four public
criteria, with the specific patterns to fix. It reads patterns, not meaning, and
it says so.

**Progress** — streaks, XP, levels, badges, band-trend chart, skill radar, a
13-week practice heatmap, and JSON export/import.

## Try it

**[Open the app](https://band-ascent.github.io)** — replace this link with your GitHub Pages URL.

## Run it yourself

```bash
git clone https://github.com/Band-Ascent/band-ascent.git
cd band-ascent
python3 -m http.server 8000
# open http://localhost:8000/
```

A plain web server is all it needs — there is no build step, no bundler, no
dependencies. Opening `index.html` directly from disk also works, but browsers
block the question library on `file://` URLs, so the app falls back to a 351-item
sample built into the page. Settings → *Question library* lets you load the JSON
by hand in that case.

## Deploying to GitHub Pages

1. Push `index.html`, `band-ascent-content.json`, `.nojekyll` and `assets/` to `main`.
2. **Settings → Pages** → *Deploy from a branch* → `main` / `(root)`.
3. Open `https://<org>.github.io/band-ascent/`.

Serving over HTTPS also enables speech recognition in the Speaking Lab and
desktop notifications, both of which browsers block on `file://`.

## The question library

| | count |
|---|---|
| Vocabulary questions | 886 |
| Word Rush words | 410 |
| Grammar items | 201 |
| Speaking prompts | 180 |
| Gap-fill items | 172 |
| Collocations | 160 |
| Dictation sentences | 110 |
| Writing prompts | 99 |
| Paraphrase items | 88 |
| Sentence Forge | 70 |
| Skim & Scan statements | 60 (12 passages) |
| Reading questions | 59 (10 passages) |
| Listening questions | 40 (18 scripts) |
| **Total** | **2,125** |

Every item carries a band difficulty `b` (4.5–8.5) and a `tier`:

| tier | band |
|---|---|
| `easy` | ≤ 5.5 |
| `medium` | 6.0 – 6.5 |
| `hard` | 7.0 – 7.5 |
| `hardest` | ≥ 8.0 |

Adding items needs no code change. If a tier is thin for a drill, selection widens
to neighbouring tiers automatically rather than repeating questions.

## Privacy

There is no backend and no analytics. Progress lives in your browser's
`localStorage` and never leaves the device. The app makes exactly one network
request — for its own question library — and none at all once that is cached.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Content contributions are as welcome as
code. The one hard rule: never submit copyrighted exam material.

## Licences

- **Code** — [MIT](LICENSE)
- **Question content** — [CC BY 4.0](CONTENT-LICENSE)

## Honest limits

- The band figure is an estimate designed to show direction and movement. It is
  not an official score and does not replace an examiner or a real mock test.
- Writing is scored by heuristics against the four public criteria. It measures
  structure, range, cohesion and error patterns — not the quality of an argument.
- Listening uses your browser's speech engine, so the voice differs by device and
  is not equivalent to authentic exam recordings.
- Reminders only fire while the page is open in a tab. There is no server, so the
  app cannot reach you after you close it.

## Trademark

IELTS is a registered trademark of the British Council, IDP: IELTS Australia Pty
Ltd and Cambridge University Press & Assessment. Band Ascent is an independent
project and is **not affiliated with, endorsed by or approved by the IELTS
Partners**. See [TRADEMARKS.md](TRADEMARKS.md).
