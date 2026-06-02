# Hacker Portal — Airtable setup

Everything to stand up the two forms behind the gated `/hackpack` portal, copy-paste ready.

**Design goal: nothing gets lost or buried.** One base, **2 tables**, joined by `Team name`.
Categorical answers are **single-select** (filter/group, don't read blobs). Links are `URL`,
emails are `Email`, proof is `Attachment`. Submission-only fields are **conditional** so the
form stays short until the final round.

- Free plan fits easily: ~80 check-ins + ~320 progress/submission rows ≈ **~400 of 1,000** records, attachments only at final submission (well under 1 GB), no automations/AI used.

---

## 0. Create the base

1. [airtable.com](https://airtable.com) → **Create → Start from scratch** → name it `Pop the Bubble`.
2. You'll build **two tables**: `Check-ins` and `Progress & Submission`.

---

## 1. Table: `Check-ins`  → one row per **builder**

Captures identity + per-person dev accounts for sponsor credits. (Per builder, not per
team — credits attach to individual GitHub/Vercel accounts. `Team name` groups them.)

| Field name | Type | Required | Notes |
|---|---|---|---|
| `Builder name` | Single line text | ✅ | primary field |
| `Email` | Email | ✅ | |
| `Discord username` | Single line text | ✅ | so you can match them in Discord |
| `Team status` | Single select | ✅ | options below |
| `Team name` | Single line text | | the join key — solo? use your own name |
| `Teammates (names + emails)` | Long text | | |
| `Track` | Single select | ✅ | options below |
| `GitHub username` | Single line text | | for credits |
| `Vercel email` | Email | | for credits |
| `Other dev accounts` | Long text | | OpenAI org ID, Anthropic, AWS, etc. |
| `Dietary / access needs` | Long text | | |
| `OK to share with sponsors after?` | Checkbox | | opt-in shortlist |
| `Created` | Created time | | add this field for sorting |

**Single-select options (paste each option as its own choice):**
- `Team status` → `Solo` · `In a team`
- `Track` → `Outbuild` · `Validate` · `Effect`

**Quick field-name list (to type fast):**
```
Builder name
Email
Discord username
Team status
Team name
Teammates (names + emails)
Track
GitHub username
Vercel email
Other dev accounts
Dietary / access needs
OK to share with sponsors after?
Created
```

---

## 2. Table: `Progress & Submission`  → one row per **update per team**

The repeating form. Teams fill it at each milestone **and** for the final submission;
`Update type` tags each row so milestones and final entries live together but stay sortable.

| Field name | Type | Required | Show only when… |
|---|---|---|---|
| `Team name` | Single line text | ✅ | always (primary field, matches `Check-ins`) |
| `Update type` | Single select | ✅ | always |
| `Progress / what's working` | Long text | ✅ | always |
| `Traction (users / revenue / convos)` | Long text | | always |
| `Public post link` | URL | | always (build-in-public bonus) |
| `Blockers / need help` | Long text | | always |
| `One-line pitch` | Single line text | | `Update type` is `Final — Sun 8am` |
| `Live URL` | URL | | Final |
| `Repo URL` | URL | | Final |
| `Demo video URL` | URL | | Final |
| `Proof / evidence` | Long text | | Final |
| `Proof attachments` | Attachment | | Final |
| `Slides (optional)` | URL | | Final |
| `Created` | Created time | | always (sort milestones in order) |

**Single-select options:**
- `Update type` → `M1 — Sat 8am` · `M2 — Sat 8pm` · `Final — Sun 8am`

**Quick field-name list:**
```
Team name
Update type
Progress / what's working
Traction (users / revenue / convos)
Public post link
Blockers / need help
One-line pitch
Live URL
Repo URL
Demo video URL
Proof / evidence
Proof attachments
Slides (optional)
Created
```

---

## 3. Make a Form view for each table

For each table: views panel (top-left) → **+ Create → Form**.

Then in the form editor:
1. Add a title + one-line description.
2. Toggle **Required** on the ✅ fields above.
3. **Conditional fields (keeps the form short):** on each "Final"-only field in
   `Progress & Submission`, click the field → **Add condition** → *Show this field when
   `Update type` is `Final — Sun 8am`.* Now milestone-posters only see the top six fields;
   submission fields appear only at the final round.
   - *(If conditions aren't on your plan, just leave them optional with help text "fill at final submission.")*

---

## 4. Grab each form's embed URL

In a **Form view** → **Share form** (top-right) → **Embed this form on your site**. You'll see:

```html
<iframe class="airtable-embed" src="https://airtable.com/embed/appXXXX/shrYYYY" ...></iframe>
```

Copy **only the `src`** — the `https://airtable.com/embed/...` part. Do it for both forms.

---

## 5. Wire into the site (one file)

`src/lib/portal.ts`:

```ts
export const AIRTABLE_EMBEDS = {
  checkin:  'https://airtable.com/embed/appXXXX/shrCHECKIN',     // Check-ins form
  progress: 'https://airtable.com/embed/appXXXX/shrPROGRESS',    // Progress & Submission form
} as const
```

- `checkin` → the **Check in** tab.
- `progress` → both the **Milestones** and **Submit** tabs (same repeating form; each tab
  tells builders which `Update type` to pick).

Save → `npm run dev` → visit `/hackpack` (open in local dev) and click the tabs to confirm
the forms render in place of the placeholders.

---

## 6. The access gate (production only)

The portal is open in local dev; gated in production by a token link.

1. Generate a token: `openssl rand -hex 24`
2. Cloudflare → your project → **Settings → Environment variables** → set
   `PORTAL_ACCESS_TOKEN` to that value.
3. Pin this link in Discord: `https://YOUR-DOMAIN/hackpack?k=THE-TOKEN`
   - First click sets a 7-day cookie; afterwards plain `/hackpack` stays unlocked.
   - No link / no cookie → the "This page isn't available to you" page.

---

## Finding info later (why the types matter)

- **Group `Check-ins` by `Team name`** → instant team rosters with everyone's emails + dev accounts.
- **Filter `Check-ins` by `Track`** → who's on each track.
- **Filter `Progress & Submission` by `Update type` = `Final — Sun 8am`** → the judging list, nothing else.
- **Sort either table by `Created`** → chronological order of check-ins / milestone posts.
- Because `Team name` matches across both tables, you can cross-reference a team's roster and all their updates.
