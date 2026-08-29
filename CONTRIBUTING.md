# Contributing

Contributions of exam content are as valuable as contributions of code — arguably
more so.

## Ground rules

1. **Never submit copyrighted material.** No past papers, no text from published
   IELTS preparation books, no reproduced official questions. Everything here is
   written from scratch. A pull request containing copied material will be closed.
2. **Every item needs a difficulty.** Set `b` to the band at which a candidate has
   roughly even odds of answering correctly, and set `tier` to match:
   `easy` ≤ 5.5 · `medium` 6.0–6.5 · `hard` 7.0–7.5 · `hardest` ≥ 8.0.
3. **Every wrong answer must be defensibly wrong**, and every right answer
   defensibly right. Reading items must be answerable from the passage alone.
4. **Explanations teach.** The `tip` field should say *why*, not restate the key.

## Adding questions

Edit `band-ascent-content.json`. No code changes are needed — the drills read
whatever is in each array. Schemas:

```jsonc
// vocab / grammar
{ "id":"G42", "b":7.0, "tier":"hard", "q":"Had the committee acted sooner, the crisis ___ avoided.",
  "opts":["would be","will be","could have been","had been"], "a":2,
  "tip":"Inverted third conditional pairs 'Had + past participle' with 'would/could have been'." }

// reading passage
{ "id":"R11", "b":7.0, "tier":"hard", "title":"…", "text":"…",
  "qs":[ { "type":"tfng", "q":"…", "a":0, "b":6.5, "tier":"medium", "tip":"…" },
         { "type":"mcq",  "q":"…", "opts":["…"], "a":1, "b":7.5, "tier":"hard", "tip":"…" } ] }
```

For True/False/Not Given, `a` is `0` = True, `1` = False, `2` = Not given.

## Before opening a pull request

- Confirm the JSON parses: `python3 -m json.tool band-ascent-content.json > /dev/null`
- Serve the folder and click through the affected drill:
  `python3 -m http.server` then open `http://localhost:8000/`
- Check Settings → *Question library* shows the new item count.

## Reporting a wrong answer key

Open an issue with the item `id` and your reasoning. Disputed keys are the most
useful issues we receive — an incorrect key actively teaches the wrong thing.
