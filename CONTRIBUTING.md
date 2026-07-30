# Contributing to EMU Rules

EMU Rules is maintained by the EMU Committee, which decides what is merged.
See [`COMMITTEE.md`](COMMITTEE.md) for current members. This is a standards
document, not an open wiki: stability matters, and changes are deliberate
and versioned, not casual.

## Proposing a rule change

1. Open an issue describing the change and the reasoning behind it. Explain
   the problem you're solving, not just the wording you want.
2. Substantial changes should be discussed in the issue before any pull
   request is opened. Small, uncontroversial fixes (typos, clarifications
   that don't change meaning) can go straight to a PR.
3. Every change goes through the same process — issue or PR, review,
   discussion, approval. There are no direct edits to the published text.

## What a rule-change PR must include

- The change to `RULES.md` itself.
- An update to `DIVERGENCES.md` if the change affects EMU's relationship to
  FIIM tournament rules (i.e. it introduces, removes, or alters a
  divergence).
- An entry in `CHANGELOG.md` describing what changed and why.

## Style and consistency

- Keep terminology consistent with the existing text: Judge, Sheriff, Don,
  Red team, Dark team, the warning/foul ladder, and so on. Don't introduce
  synonyms for existing terms.
- Don't renumber sections casually. Section numbers are referenced elsewhere
  (including outside this repository); treat renumbering as a breaking
  change requiring its own discussion.

## Licensing your contribution

By submitting a contribution, you agree that it is your own original work
(or that you have the right to submit it), and that it is licensed under
CC BY 4.0 on the same terms as the rest of the Work. See
[`NOTICE.md`](NOTICE.md) for details.
