# Omni prompt — `Check-ins` form

**How to use:** open Airtable → Omni (the AI assistant) → paste everything in the block
below as one message. Omni builds the table, field types, and the form. Markdown/natural
language is the right input for Omni — *not* CSV (CSV can't carry field types, required
flags, select options, or form conditions).

---

```text
Build a new table named "Check-ins" for a 36-hour hackathon. One row = one builder
checking in. Create exactly these fields, with these exact types and options, in this order:

1. "Builder name" — Single line text. Make this the primary field.
2. "Email" — Email.
3. "Discord username" — Single line text.
4. "Team status" — Single select with options: "Solo", "In a team".
5. "Team name" — Single line text.
6. "Teammates (names + emails)" — Long text.
7. "Track" — Single select with options: "Outbuild", "Validate", "Effect".
8. "GitHub username" — Single line text.
9. "Vercel email" — Email.
10. "Other dev accounts" — Long text.
11. "Dietary / access needs" — Long text.
12. "OK to share with sponsors after?" — Checkbox.
13. "Created" — Created time.

Then create a Form view named "Check in" with:
- Title: "Check in"
- Description: "Check in so we know you're hacking. Takes two minutes. Your dev-account
  handles let sponsors drop credits on the right accounts."
- Required fields: Builder name, Email, Discord username, Team status, Track.
- Helper text under "Team name": "Solo? Use your own name."
- Helper text under "Other dev accounts": "OpenAI org ID, Anthropic, AWS, etc."
- Keep the field order the same as above.

Do not add any automations.
```
