export const EVENT = {
  name: 'Pop the Bubble',
  producer: 'Hackhouse London',
  edition: 'Issue 01 · Spring 2026',
  dates: '5–7 June 2026',
  datesShort: '5–7 June',
  location: 'London',
  prize: '£10,000',
  cohortSize: 80,
  acceptance: '~12%',
  duration: '36 hours',
  producerHref: 'https://hackhouse.uk',
  applyHref: 'https://lu.ma/035ubxn3',
  sponsorHref: 'mailto:contact@hackhouse.uk',
} as const


export const SPONSOR_TIERS = [
  {
    id: 'diamond',
    index: '01',
    name: 'Diamond',
    borderClass: 'border-sky-400/50 hover:border-sky-400',
    perks: [
      { title: 'Opening ceremony keynote', detail: '5-min address to all 80 builders on Day 1.' },
      { title: 'Award ceremony speech', detail: 'Close the event at St Katharine Cree.' },
      { title: 'Named prize or track', detail: 'Own a prize category in your area of focus.' },
      { title: 'Demo Day judge seat', detail: 'Alongside a16z scouts and OpenAI engineers.' },
      { title: 'First look at every build', detail: 'Curated shortlist delivered 24h before Demo Day.' },
      { title: 'Closing dinner', detail: 'With the top 3 finalist teams, Sunday night.' },
      { title: 'Full media package', detail: 'Branded recap film, photo set, post-event content.' },
      { title: 'Opt-in founder shortlist', detail: 'Post-event contact list from attendees.' },
    ],
  },
  {
    id: 'gold',
    index: '02',
    name: 'Gold',
    borderClass: 'border-amber-400/50 hover:border-amber-400',
    perks: [
      { title: 'Sponsor introduction slot', detail: '2-min address to all builders at opening.' },
      { title: 'Demo Day judge seat', detail: 'Alongside a16z scouts and OpenAI engineers.' },
      { title: 'Closing dinner', detail: 'With the top 3 finalist teams, Sunday night.' },
      { title: 'Mentor session', detail: 'Dedicated access to teams during the 36-hour build window.' },
      { title: 'Logo on all materials', detail: 'Website, signage, and recap content.' },
      { title: 'Opt-in founder shortlist', detail: 'Post-event contact list from attendees.' },
    ],
  },
  {
    id: 'silver',
    index: '03',
    name: 'Silver',
    borderClass: 'border-slate-400/50 hover:border-slate-400',
    perks: [
      { title: 'Mentor slot', detail: 'Access to teams during the build window.' },
      { title: 'Demo Day attendance', detail: 'In the room at St Katharine Cree for the award ceremony.' },
      { title: 'Warm intros', detail: 'To teams actively building in your sector post-event.' },
      { title: 'Logo & credit', detail: 'On recap content distributed post-event.' },
      { title: 'Opt-in founder shortlist', detail: 'Post-event contact list from attendees.' },
    ],
  },
] as const

export const MARQUEE_TEXT =
  '5–7 June 2026 ✦ Pop the Bubble ✦ 36-hour hackathon ✦ London ✦ £10,000 first prize ✦ 80 builders ✦ Apply now ✦ Hackhouse London ✦ Issue 01'

export const TRACKS = [
  {
    index: '01',
    title: 'Outbuild.',
    body: 'Find a slow, bloated product. Ship the sharper version. Steal their users.',
  },
  {
    index: '02',
    title: 'Validate.',
    body: 'Build the evidence pack, dashboard, or report against a company that makes the truth harder to ignore.',
  },
  {
    index: '03',
    title: 'Effect.',
    body: 'Pick one real person or org. Remove a recurring burden with them, not for them. Get paid.',
  },
] as const


export const TEAM = [
  {
    name: 'Aruzhan Nussipzhan',
    role: 'Lead Organiser',
    photo: '/team/aruzhan.jpeg',
    bio: ['Draper Fellow', 'Ex-Palantir', '9× hackathon wins'],
    linkedin: 'https://uk.linkedin.com/in/aruzhan-n',
  },
  {
    name: 'Lyndon Leong',
    role: 'Programme & Community',
    photo: '/team/lyndon.png',
    bio: ['EWOR Fellow', 'Scaled a gaming co to 1M users', 'Led £60B AUM regulatory reconciliation'],
    linkedin: 'https://uk.linkedin.com/in/lyndon-leong-25b704b2',
  },
  {
    name: 'Lois Zhao',
    role: 'Operations & Partners',
    photo: '/team/lois.png',
    bio: ['Founding engineer — Toma (YC, a16z) & Zephyr Cloud', 'Daytona consultant'],
    linkedin: 'https://www.linkedin.com/in/loiszhao/',
  },
  {
    name: 'Alramina Myrzabekova',
    role: 'Strategy & Partnerships',
    photo: '/team/alramina.png',
    bio: ['EWOR Fellow', 'Ex EY-P consultant', '4× hackathon winner'],
    linkedin: 'https://uk.linkedin.com/in/alramina-mz',
  },
] as const

export const COHORT_STATS = [
  { value: '80', label: 'builders' },
  { value: '~12%', label: 'acceptance' },
  { value: '36hrs', label: 'to build' },
  { value: '£10k', label: 'first prize' },
] as const

export const TIMELINE_STEPS = [
  {
    index: '01',
    label: 'Apply',
    detail: "A short form. No essay, no CV — just show us what you've built.",
    href: EVENT.applyHref,
    cta: 'Apply on Luma',
  },
  {
    index: '02',
    label: 'Get approved',
    detail: 'We review on a rolling basis and confirm 5 days before the event.',
  },
  {
    index: '03',
    label: 'Build',
    detail: '36 hours to build something real. 5–7 June, in London.',
  },
  {
    index: '04',
    label: 'Demo Day & awards',
    detail: 'Sunday at St Katharine Cree. Pitch to the room, then the £10,000 first prize is announced at the award ceremony.',
    note: {
      title: 'Separate registration',
      detail: "The ceremony has its own RSVP — register even if you've already applied to hack.",
    },
    href: 'https://luma.com/bi8t9jh8',
    cta: 'Register for the ceremony',
  },
] as const

export const SPONSORS = [
  { name: 'Mubit', logo: '/sponsor_mubit/Logo_Black_Only.svg' },
  { name: 'AccelerateMe', logo: '/sponsor_accelerateme/accelerateme.png' },
  { name: 'Standard Manufacturing Co.', logo: '/sponsor_standardmanufacturing/sponsor_standardmanufacturing.png' },
  { name: 'Cognition', logo: '/sponsor_cognition/Cognition_PrimaryLockup_Black.png' },
  { name: 'Zuba', logo: '/sponsor_zuba/zuba.png' },
] as const

export const FAQ_ITEMS = [
  {
    q: 'Who can apply?',
    a: "Anyone building something real. We don't care about credentials — we care about what you've already shipped or are committed to shipping.",
  },
  {
    q: 'Where is it?',
    a: 'London. Venue details are confirmed to accepted builders.',
  },
  {
    q: 'Is it free to attend?',
    a: 'Yes. Food, space, and the build environment are covered.',
  },
  {
    q: 'How are projects judged?',
    a: 'On evidence. Economic exchange, proof of customer conversations, and measurable real-world impact. No slide decks.',
  },
  {
    q: "What's the prize?",
    a: '£10,000 first prize. Additional credits and prizes from our partners.',
  },
  {
    q: 'Can I apply solo?',
    a: 'Yes. Teams of up to 4 are welcome.',
  },
  {
    q: "What's the Effect track?",
    a: 'Build something that earns real money during the 36 hours. Monetisation is the proof. Arrive with a target customer in mind.',
  },
  {
    q: 'When do I hear back?',
    a: 'Decisions go out 5 days before the hackathon.',
  },
  {
    q: 'Have questions?',
    a: 'Email us at contact@hackhouse.uk — we’re happy to help.',
  },
] as const

// ─── Links (single source of truth) ───
export const LINKS = {
  apply: 'https://lu.ma/035ubxn3',
  demoDay: 'https://luma.com/bi8t9jh8',
  discord: 'https://discord.gg/xZPfWvykd',
  hackpack: '/hackpack',
  schedule: '/schedule',
  email: 'mailto:contact@hackhouse.uk',
} as const

// ─── Day-by-day schedule (public-safe: hack venue intentionally unnamed) ───
export const SCHEDULE = [
  {
    day: 'Friday 5 June',
    tag: 'Day 1',
    note: 'Central London — exact venue shared with confirmed builders',
    items: [
      { time: '5:00pm', label: 'Doors open · check-in · arrival & mingling', highlight: false },
      { time: '6:20pm', label: 'Opening + sponsor talks + Q&A', highlight: false },
      { time: '7:00pm', label: 'Dinner served', highlight: false },
      { time: '8:00pm', label: 'Hacking officially begins', highlight: true },
    ],
  },
  {
    day: 'Saturday 6 June',
    tag: 'Day 2',
    note: 'Full day + overnight build · mentors & sponsors on-site',
    items: [
      { time: '8:00am', label: 'Milestone 1 — post your progress', highlight: false },
      { time: '9:00am', label: 'Breakfast + coffee', highlight: false },
      { time: 'Lunch', label: 'Light / leftovers — go talk to users', highlight: false },
      { time: '5:30pm', label: 'Dinner — pizza + fresh Red Bull', highlight: false },
      { time: '8:00pm', label: 'Milestone 2 — post your progress', highlight: false },
      { time: 'Overnight', label: 'All-night push', highlight: false },
    ],
  },
  {
    day: 'Sunday 7 June',
    tag: 'Day 3',
    note: '',
    items: [
      { time: '8:00am', label: 'Code freeze & final submission', highlight: true },
      { time: '8–11am', label: 'Submissions judged · rest, shower, brunch', highlight: false },
      { time: '11:00–3:00', label: 'Awards Reception @ St Katharine Cree', highlight: true },
      { time: 'After', label: 'Closing dinner — top 3 teams + sponsors', highlight: false },
    ],
  },
] as const

// ─── Tracks with examples + win conditions (hack-pack depth) ───
export const HACK_TRACKS = [
  {
    index: '01',
    title: 'Outbuild',
    body: 'Find a slow, bloated, or half-built product — even tools you use daily have broken corners. Ship the sharper version, ideally open source, and get real users and actual paychecks.',
    example: 'Pick a product with obvious gaps. Rebuild the broken part, open-source it, and pull over as many real (ideally paying) users as you can in 36 hours.',
    wins: 'Clearly better than the incumbent · real users switched · ideally revenue.',
  },
  {
    index: '02',
    title: 'Validate',
    body: "Build the evidence pack against a company and show where the story doesn't hold — where claims, numbers, or reality don't line up.",
    example: "Take a company making claims that don't add up. Build the dashboard / report / analysis that exposes the gap — and makes the truth impossible to ignore.",
    wins: "Rigour & credibility · the significance of the truth you surface · proof a decision-maker can't argue with.",
  },
  {
    index: '03',
    title: 'Effect',
    body: 'Find one real person or organisation and remove a recurring burden WITH them — not for them. Then get paid.',
    example: 'Find a real person, or a business in a stale industry, drowning in a repetitive burden. Build the thing that removes it — keeping them in the loop — and get paid for it.',
    wins: 'A real burden visibly removed for a named person/org · money changed hands · genuine collaboration with them.',
  },
] as const

// ─── Rules ───
export const HACK_RULES = [
  { title: 'Team size', detail: 'Solo or up to 4 people.' },
  { title: 'You own everything', detail: 'All IP — code, product, brand — stays 100% with your team. No cut, no equity, no rights. Optional opt-in: a post-event shortlist sponsors can contact.' },
  { title: 'Be honest', detail: "Don't fake traction, demos, revenue, or conversations. Every number you claim, you show. Inflated or fabricated proof = disqualified." },
  { title: 'Code of conduct', detail: 'Respect everyone — builders, organisers, mentors, sponsors, staff, guests — in the venue, in Discord, and on socials. Zero tolerance for harassment or discrimination. Report issues to any organiser.' },
] as const

// ─── Milestones (12h cadence) ───
export const MILESTONES = [
  { id: 'M1', when: 'Sat 8:00am', detail: "12h in — what's working so far" },
  { id: 'M2', when: 'Sat 8:00pm', detail: '24h in — traction / first users' },
  { id: 'M3', when: 'Sun 8:00am', detail: 'Final submission' },
] as const

// ─── Submission checklist ───
export const SUBMISSION_ITEMS = [
  'Team name + members',
  'Track',
  'One-line pitch',
  'Live URL + repo + demo video',
  'Proof — revenue, invoices, customer emails/calls, signups, real numbers',
  'Slides (optional) — only to show what you built + traction, never to pitch',
] as const

// ─── Judging ───
export const JUDGING_BASELINE = [
  'Does it actually work? Live, real, demonstrable.',
  'Depth of proof — show the receipts.',
  'Honesty — real numbers only.',
] as const

export const JUDGING_BY_TRACK = [
  { track: 'Outbuild', weight: 'How much better than the incumbent · real users switched · revenue earned.' },
  { track: 'Validate', weight: 'Rigour & credibility of the evidence · significance of the truth exposed.' },
  { track: 'Effect', weight: 'Realness of the burden removed for a named person/org · money earned · collaboration with them.' },
] as const

export const JUDGING_BONUS = [
  { title: 'Build in public', detail: 'Posting your progress during the hack earns bonus points.' },
  { title: 'Mubit SDK', detail: 'Meaningfully using the Mubit SDK (operational memory for AI agents) earns bonus points — a perk that lifts your score, not a separate prize.' },
] as const

// ─── Prizes ───
export const PRIZES = [
  { place: '1st', prize: '£10,000 cash' },
  { place: '2nd', prize: 'TBD' },
  { place: '3rd', prize: 'TBD' },
] as const

// ─── Food & travel ───
export const FOOD = [
  { when: 'Fri 7:00pm — Dinner', what: 'Zia Pina — pasta salad (side) + beef bresaola & grilled-veg platters (mains)' },
  { when: 'Sat 9:00am — Breakfast', what: 'Tongue & Brisket sandwich platters (Reuben / roast beef / vegan) + coffee' },
  { when: 'Sat — Lunch', what: 'Light / leftovers (go talk to users)' },
  { when: 'Sat 5:30pm — Dinner', what: 'icco pizza (Marinara / Funghi / Margherita, all Halal) + fresh Red Bull' },
  { when: 'Throughout', what: 'Red Bull (regular + sugar-free) + coffee — help yourself' },
] as const

export const FOOD_NOTE =
  'Halal options at every meal · vegetarian & vegan options · allergen info on request. No Friday breakfast/lunch; Saturday lunch is light leftovers; no catered breakfast Sunday. Bring a water bottle.'

export const TRAVEL = [
  'No dedicated sleep room — but the venue is large with plenty of couches to crash on.',
  'Bring a sleeping bag (or invest in one), especially if you have nowhere else to stay.',
  "Eye mask, toiletries, change of clothes — it's a 36-hour event.",
  'The building runs cold at night — pack layers.',
  'Coming from out of town? Coordinate in Discord to share accommodation.',
] as const

export const WHAT_TO_BRING = [
  'Laptop + charger (+ a multi-plug if you have one)',
  'Your own dongle/adapter for the demo screen (HDMI + USB-C available)',
  'ID for check-in',
  'Sleeping bag if staying overnight',
  'Layers — it gets cold at 3am',
  'Overnight kit — toothbrush, deodorant, eye mask, change of clothes',
  'Headphones + a water bottle',
] as const

// ─── Hack-pack FAQ (distinct from the marketing FAQ) ───
export const HACK_FAQ = [
  { q: 'Can I start building before the event?', a: "Prep all you want — plan, research, build context, line up warm leads. But the execution happens during the 36 hours. A little pre-building is fine; the bar is that the weekend's progress must be so substantial no one can deny it." },
  { q: 'Do I keep my IP?', a: "100%. It's entirely yours." },
  { q: 'Can I join solo and find a team there?', a: "Yes — Friday's arrival window is for exactly this. Start early in #team-formation on Discord." },
  { q: 'Is there somewhere to sleep?', a: "No dedicated rest zone, but the building's big and there are plenty of couches. Bring a sleeping bag." },
  { q: 'What if I get stuck?', a: 'Post in #help, tag a mentor/sponsor in Discord, or find them on-site.' },
  { q: 'How do I win?', a: 'Real evidence of impact against your track — money, users, burdens removed. Plus build in public for bonus points.' },
] as const
