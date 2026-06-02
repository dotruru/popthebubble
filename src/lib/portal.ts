// Airtable embed share URLs for the gated hacker portal.
// Paste each form's iframe `src` (looks like https://airtable.com/embed/appXXX/shrYYY).
// Leave '' to render the "form drops here / see Discord" placeholder.
export const AIRTABLE_EMBEDS = {
  checkin: 'https://airtable.com/embed/app8MAWW2caOl7ooC/pagdY3ibpv6H3Xi6o/form',
  // One repeating form for BOTH milestone updates and the final submission.
  // Teams fill it multiple times; an "Update type" field (M1 / M2 / M3 / Final
  // submission) tags each row. Used by both the Milestones and Submit tabs.
  progress: 'https://airtable.com/embed/app8MAWW2caOl7ooC/pagX4WMI0Oll51E2u/form',
} as const

// Gate: the access link shared in Discord is `${origin}/hackpack?k=${PORTAL_ACCESS_TOKEN}`.
// Set PORTAL_ACCESS_TOKEN in the environment (see .env.example). Never commit the real token.
