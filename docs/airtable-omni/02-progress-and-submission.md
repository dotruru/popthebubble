# Omni prompt — `Progress & Submission` form

**How to use:** open Airtable → Omni → paste the block below as one message. This is the
single repeating form used for *both* milestone updates and the final submission, tagged by
an "Update type" field. Markdown/natural language is the right input for Omni — *not* CSV.

The key part is the **conditional logic**: the submission-only fields stay hidden until a
team picks "Final — Sun 8am", so milestone-posters see a short form.

---

```text
Build a new table named "Progress & Submission" for a 36-hour hackathon. One row = one
update from a team. Teams submit to it multiple times — at each milestone and for the final
submission. Create exactly these fields, with these exact types and options, in this order:

1. "Team name" — Single line text. Make this the primary field. (It matches the "Team name"
   field in the "Check-ins" table so the two can be cross-referenced.)
2. "Update type" — Single select with options: "M1 — Sat 8am", "M2 — Sat 8pm",
   "Final — Sun 8am".
3. "Progress / what's working" — Long text.
4. "Traction (users / revenue / convos)" — Long text.
5. "Public post link" — URL.
6. "Blockers / need help" — Long text.
7. "One-line pitch" — Single line text.
8. "Live URL" — URL.
9. "Repo URL" — URL.
10. "Demo video URL" — URL.
11. "Proof / evidence" — Long text.
12. "Proof attachments" — Attachment.
13. "Slides (optional)" — URL.
14. "Created" — Created time.

Then create a Form view named "Progress & Submission" with:
- Title: "Post an update"
- Description: "Use this for milestone updates AND your final submission. Pick your Update
  type below — the extra submission fields appear when you choose Final."
- Required fields: Team name, Update type, Progress / what's working.
- Helper text under "Public post link": "Posting publicly earns bonus points."
- Conditional logic: show these fields ONLY WHEN "Update type" is "Final — Sun 8am", and
  hide them for every other Update type:
  "One-line pitch", "Live URL", "Repo URL", "Demo video URL", "Proof / evidence",
  "Proof attachments", "Slides (optional)".
- Keep the field order the same as above.

Do not add any automations.
```
