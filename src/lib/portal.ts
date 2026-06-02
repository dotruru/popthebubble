// Airtable embed share URLs for the gated hacker portal.
// Paste each form's iframe `src` (looks like https://airtable.com/embed/appXXX/shrYYY).
// Leave '' to render the "form drops here / see Discord" placeholder.
export const AIRTABLE_EMBEDS = {
  checkin: '',
  milestones: '',
  submission: '',
} as const

// Gate: the access link shared in Discord is `${origin}/hackpack?k=${PORTAL_ACCESS_TOKEN}`.
// Set PORTAL_ACCESS_TOKEN in the environment (see .env.example). Never commit the real token.
