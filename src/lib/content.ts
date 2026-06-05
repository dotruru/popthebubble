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

// Judges. `photo` is optional — drop a headshot at the given path in /public and
// it replaces the initials monogram automatically. LinkedIn blocks automated photo
// fetches, so photos must be saved manually.
export const JUDGES = [
  { name: 'Luigi Rivolta', initials: 'LR', note: 'Co-founder & CEO, Smartrip', photo: '/judges/luigi.jpg', linkedin: 'https://uk.linkedin.com/in/luigi-rivolta' },
  { name: 'Alex Tihenko', initials: 'AT', note: '', photo: '/judges/alex.jpg', linkedin: 'https://www.linkedin.com/in/aleksandrs-tihenko/' },
  { name: 'Gerred Dillon', initials: 'GD', note: 'Frontier AI compute', photo: '/judges/gerred.jpg', linkedin: 'https://www.linkedin.com/in/devgerred/' },
  { name: 'Henrijs Dandzbergs', initials: 'HD', note: '', photo: '/judges/henrijs.jpg', linkedin: 'https://www.linkedin.com/in/henrijs-dandzbergs-31b278302/' },
  { name: 'Kai', initials: 'K', note: '', photo: '/judges/kai.jpg', linkedin: 'https://www.linkedin.com/in/chihchiangyangkai/' },
  { name: 'Max A', initials: 'MA', note: 'CTO & Co-founder, Zuba', photo: '/judges/max.jpg', linkedin: 'https://uk.linkedin.com/in/mabdulker' },
  { name: 'Viktoria Izdebska', initials: 'VI', note: '', photo: '/judges/viktoria.jpg', linkedin: 'https://www.linkedin.com/in/viktoria-izdebska-42b17618b/' },
  { name: 'William Yu', initials: 'WY', note: '', photo: '/judges/william.jpg', linkedin: 'https://www.linkedin.com/in/williamqyu/' },
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

// ─── Socials — tag the organisers when you build in public (Aruzhan first; then sponsors) ───
export const SOCIALS = {
  instagram: { handle: '@popthebubble.hack', href: 'https://instagram.com/popthebubble.hack' },
  organisers: [
    { name: 'Aruzhan', xHandle: '@arukanism', x: 'https://x.com/arukanism', linkedin: 'https://uk.linkedin.com/in/aruzhan-n' },
    { name: 'Lois', xHandle: '@zmzlois', x: 'https://x.com/zmzlois', linkedin: 'https://www.linkedin.com/in/loiszhao' },
    { name: 'Lyndon', xHandle: '@Lantos1618', x: 'https://x.com/Lantos1618', linkedin: 'https://uk.linkedin.com/in/lyndon-leong-25b704b2' },
    { name: 'Alramina', xHandle: '@dimplnotsimpl', x: 'https://x.com/dimplnotsimpl', linkedin: 'https://uk.linkedin.com/in/alramina-mz' },
  ],
} as const

// ─── Day-by-day schedule (public-safe: hack venue intentionally unnamed) ───
export const SCHEDULE = [
  {
    day: 'Friday 5 June',
    tag: 'Day 1',
    note: 'Central London — exact venue shared with confirmed builders',
    items: [
      { time: '5:00pm', label: 'Doors open, check-in, team formation, and arrivals', highlight: false },
      { time: '6:20pm', label: 'Opening briefing, sponsor talks, tracks, judging, and Q&A', highlight: false },
      { time: '7:00pm', label: 'Dinner: Zia Pina spread with halal and vegetarian options', highlight: false },
      { time: '8:00pm', label: 'Hacking begins. Your 36-hour build clock starts.', highlight: true },
    ],
  },
  {
    day: 'Saturday 6 June',
    tag: 'Day 2',
    note: 'Full day + overnight build · mentors & sponsors on-site',
    items: [
      { time: '8:00am', label: 'Milestone 1: post what works, what changed, and what you need next', highlight: false },
      { time: '9:00am', label: 'Breakfast: Tongue & Brisket platters and coffee', highlight: false },
      { time: 'Lunch', label: 'Light leftovers. Use the middle of the day for users, evidence, and mentors.', highlight: false },
      { time: '5:30pm', label: 'Dinner: icco pizza, halal options, and fresh Red Bull', highlight: false },
      { time: '8:00pm', label: 'Milestone 2: show traction, user proof, or the strongest working demo so far', highlight: false },
      { time: 'Overnight', label: 'Final push. Keep Discord updated and get help early.', highlight: false },
    ],
  },
  {
    day: 'Sunday 7 June',
    tag: 'Day 3',
    note: '',
    items: [
      { time: '8:00am', label: 'Code freeze. Final submission is due.', highlight: true },
      { time: '8–11am', label: 'Remote judging. Rest, shower, and get brunch while judges review.', highlight: false },
      { time: 'By 11am', label: 'Top 3 teams are called for live demos. Everyone is welcome at awards.', highlight: false },
      { time: '11:30–3:00', label: 'Awards Reception at St Katharine Cree: demos, winners, drinks, networking, livestream', highlight: true },
      { time: 'After', label: 'Closing dinner for the top 3 teams and sponsors', highlight: false },
    ],
  },
] as const

// ─── Tracks with examples + win conditions (hack-pack depth) ───
export const HACK_TRACKS = [
  {
    index: '01',
    title: 'Outbuild',
    body: 'Choose a product that feels slow, bloated, or unfinished. Build the sharper version and prove real users would rather use yours.',
    example: 'Rebuild the broken workflow in a tool people already use, make it meaningfully faster or simpler, and invite real users to switch during the weekend.',
    wins: 'A clear measured improvement over the incumbent · real users switched · revenue or hard willingness to pay.',
  },
  {
    index: '02',
    title: 'Validate',
    body: "Build an evidence pack that tests a company's story. Show where claims, numbers, or reality do not line up.",
    example: 'Turn public filings, product data, customer evidence, or market signals into a dashboard, report, or analysis that a serious reader can verify.',
    wins: "Rigour and credibility · material truth surfaced · decision-ready proof a stakeholder can't easily dismiss.",
  },
  {
    index: '03',
    title: 'Effect',
    body: 'Find one real person or organisation with a recurring burden. Build with them, remove the burden, and get paid for the value.',
    example: 'Sit with a local business, solo operator, or team stuck in repetitive work. Let their feedback change the build, then prove the task became easier.',
    wins: 'A named person or organisation confirms the burden was removed · money changed hands · the final product reflects their feedback.',
  },
] as const

// ─── Rules ───
export const HACK_RULES = [
  { title: 'Team size', detail: 'Solo or up to 4 people.' },
  { title: 'You own everything', detail: 'Your team keeps 100% of the IP: code, product, brand, and company. We take no cut, equity, licence, or rights.' },
  { title: 'Be honest', detail: "Do not fake traction, demos, revenue, or conversations. If you claim a number, show the source. Fabricated proof disqualifies the team." },
  { title: 'Respect the room', detail: 'Treat builders, organisers, mentors, sponsors, venue staff, and guests with respect in the venue, Discord, awards reception, and public posts.' },
] as const

// ─── Milestones (12h cadence) ───
export const MILESTONES = [
  { id: 'M1', when: 'Sat 8:00am', detail: '12 hours in: show what works, what changed, and what you need next' },
  { id: 'M2', when: 'Sat 8:00pm', detail: '24 hours in: show traction, users, evidence, or your strongest working demo' },
  { id: 'M3', when: 'Sun 8:00am', detail: 'Final submission: code freeze, proof, demo video, live URL, and repo' },
] as const

// ─── Submission checklist ───
export const SUBMISSION_ITEMS = [
  'Team name + members',
  'Track',
  'One-line pitch',
  'Live URL + repo + demo video',
  'Proof: revenue, invoices, customer emails or call notes, signups, usage data, before/after numbers',
  'Slides are optional. Use them to show what you built and the evidence you collected, not to replace the demo.',
] as const

// ─── Judging ───
export const JUDGING_OVERVIEW = [
  { label: 'Core score', value: '90 core points', detail: '30 baseline points + 60 track-specific points.' },
  { label: 'Bonus ceiling', value: '+20 bonus points', detail: 'Build in public and Mubit SDK usage can lift strong evidence.' },
  { label: 'Maximum score', value: '110 points', detail: 'Total = baseline + chosen track + bonus.' },
  { label: 'Track rule', value: 'Pick one track', detail: 'You are judged on one track, not a blend of all three.' },
] as const

export const JUDGING_RUBRIC = [
  {
    section: 'Baseline',
    scope: 'All teams',
    points: 30,
    criteria: [
      {
        name: 'Does it actually work',
        points: 10,
        bands: [
          { score: '0', detail: 'Slides or mockup only.' },
          { score: '4', detail: 'Core flow runs locally.' },
          { score: '7', detail: 'Deployed and reachable by judges.' },
          { score: '10', detail: 'Judges complete full flow end-to-end themselves.' },
        ],
      },
      {
        name: 'Depth of proof',
        points: 12,
        bands: [
          { score: '0', detail: 'Claims only, no artifacts.' },
          { score: '4', detail: 'One verifiable artifact.' },
          { score: '8', detail: 'At least 3 artifacts across at least 2 types, for example revenue plus usage logs.' },
          { score: '12', detail: 'Every headline claim traces to a dated, independently checkable source.' },
        ],
      },
      {
        name: 'Honesty',
        points: 8,
        bands: [
          { score: '0', detail: 'Unverifiable headline claim.' },
          { score: '4', detail: 'Minor unverifiable claims, nothing inflated.' },
          { score: '8', detail: 'Every claim checks out.' },
          { score: 'DQ', detail: 'Fabrication is subject to disqualification.' },
        ],
      },
    ],
  },
  {
    section: 'Track 01 · Outbuild',
    scope: 'Build the sharper version of an incumbent',
    points: 60,
    criteria: [
      {
        name: 'Better than incumbent',
        points: 25,
        bands: [
          { score: '0', detail: 'No comparison.' },
          { score: '8', detail: 'Better, but unmeasured.' },
          { score: '16', detail: '>=25% improvement on a measured primary metric such as speed, cost, steps, or error rate.' },
          { score: '25', detail: '>=50% on a measured metric users care about, reproducible by judges.' },
        ],
      },
      {
        name: 'Real users switched',
        points: 20,
        bands: [
          { score: '0', detail: 'Nobody left the incumbent.' },
          { score: '8', detail: 'A handful of early switchers, lightly evidenced.' },
          { score: '14', detail: 'Real cluster of users actively choosing your version.' },
          { score: '20', detail: 'Clear evidenced migration: multiple active users stuck with it, usage data shown.' },
        ],
      },
      {
        name: 'Revenue / willingness to pay',
        points: 15,
        bands: [
          { score: '0', detail: 'No evidence.' },
          { score: '5', detail: 'Soft signal: verbal interest, waitlist, or unpaid signups.' },
          { score: '10', detail: 'Hard commitment: card on file, signed LOI, or pre-order.' },
          { score: '15', detail: 'Paying customers: real money from more than 1 user, receipts shown.' },
        ],
      },
    ],
  },
  {
    section: 'Track 02 · Validate',
    scope: "Test a company's story and make the evidence usable",
    points: 60,
    criteria: [
      {
        name: 'Rigour & credibility',
        points: 25,
        bands: [
          { score: '0', detail: 'Assertions with no backing.' },
          { score: '8', detail: 'Case made, but method is opaque or not reproducible.' },
          { score: '16', detail: 'Sound transparent method a third party could rerun.' },
          { score: '25', detail: 'Airtight: data and steps fully shared, conclusions reproducible, sourced so the target could not refute it.' },
        ],
      },
      {
        name: 'Significance of truth',
        points: 20,
        bands: [
          { score: '0', detail: 'Trivial or already known.' },
          { score: '8', detail: 'Matters to a single team or product line.' },
          { score: '14', detail: 'Matters to a whole company.' },
          { score: '20', detail: 'Matters across a market, with materiality shown.' },
        ],
      },
      {
        name: 'Decision-maker proof',
        points: 15,
        bands: [
          { score: '0', detail: 'Raw notes or data dump.' },
          { score: '6', detail: 'Clear readable writeup.' },
          { score: '11', detail: 'Decision-ready artifact, such as a one-pager, dashboard, or report, that a named role could act on today.' },
          { score: '15', detail: 'Decision-ready and put in front of, or acknowledged by, a relevant decision-maker.' },
        ],
      },
    ],
  },
  {
    section: 'Track 03 · Effect',
    scope: 'Remove a real recurring burden with a collaborator',
    points: 60,
    criteria: [
      {
        name: 'Burden actually removed',
        points: 25,
        bands: [
          { score: '0', detail: 'No burden removed.' },
          { score: '8', detail: 'Burden documented, partial relief.' },
          { score: '16', detail: '>=50% reduction in a recurring task for one cycle.' },
          { score: '25', detail: 'Sustained relief, confirmed by the user.' },
        ],
      },
      {
        name: 'Money changed hands',
        points: 20,
        bands: [
          { score: '0', detail: 'No money.' },
          { score: '7', detail: 'Committed to pay, signed or card on file.' },
          { score: '13', detail: 'Paid once, real transaction.' },
          { score: '20', detail: 'Paying relationship is repeat or ongoing, not token.' },
        ],
      },
      {
        name: 'Genuine collaboration',
        points: 15,
        bands: [
          { score: '0', detail: 'Built in a vacuum, no contact.' },
          { score: '6', detail: 'Talked once and took a brief.' },
          { score: '11', detail: 'Worked through build feedback that changed direction.' },
          { score: '15', detail: 'True working partnership: continuous loop, collaborator co-validates result.' },
        ],
      },
    ],
  },
] as const

export const JUDGING_BONUS = [
  {
    title: 'Build in public',
    points: 'up to +12',
    detail: '+2 per substantive, dated public post during the hack, roughly 6 posts max. Real moments beat polished marketing. Tag @popthebubble.hack and the organisers (Aruzhan first) so it counts and we can amplify you.',
  },
  {
    title: 'Mubit SDK',
    points: 'up to +10',
    detail: 'Up to +4 for bolted-on use. Up to +10 when the core product genuinely relies on Mubit operational memory and judges can verify it.',
  },
] as const

export const JUDGING_SCORING_RULES = [
  'Total score = baseline + chosen track + bonus.',
  'Each criterion is scored to the highest band fully met. A partial claim earns the band below.',
  'Every point above zero must be backed by evidence. Unverified claims score one band below.',
  'Fabrication is grounds for disqualification.',
  'Pick one track. Judges will not mix track-specific categories.',
] as const

// ─── Prizes ───
export const PRIZES = [
  { place: '1st', prize: '£10,000 cash' },
  { place: '2nd', prize: 'In-kind stack: accelerator interviews, sponsor credits, and sponsor hiring-pipeline access' },
  { place: '3rd', prize: 'In-kind stack: accelerator interviews, sponsor credits, and sponsor hiring-pipeline access' },
] as const

// ─── Food & travel ───
export const FOOD = [
  { when: 'Fri 7:00pm — Dinner', what: 'Zia Pina: pasta salad, beef bresaola platters, grilled-veg platters, halal and vegetarian options' },
  { when: 'Sat 9:00am — Breakfast', what: 'Tongue & Brisket sandwich platters: Reuben, roast beef, vegan options, and coffee' },
  { when: 'Sat — Lunch', what: 'Light leftovers by design. Use the time to talk to users, gather evidence, and get mentor help.' },
  { when: 'Sat 5:30pm — Dinner', what: 'icco pizza: Marinara, Funghi, Margherita, all halal, plus fresh Red Bull' },
  { when: 'Throughout', what: 'Red Bull regular and sugar-free, plus coffee. Help yourself and keep your water bottle filled.' },
] as const

export const FOOD_NOTE =
  'No Friday breakfast or lunch before doors open. Saturday lunch is light leftovers, not a fresh hot meal. There is no catered Sunday breakfast at the hack venue; grab brunch before awards. Ask organisers for allergen details.'

export const TRAVEL = [
  'There is no dedicated sleep room, but the venue has couches if you need to crash overnight.',
  'Bring a sleeping bag if you are staying at the venue. This matters most for out-of-towners.',
  'Pack an eye mask, toiletries, deodorant, and a change of clothes so Sunday still feels human.',
  'The building can run cold at night. Bring layers.',
  'If you are travelling in, coordinate in Discord to share accommodation or overnight plans.',
] as const

export const WHAT_TO_BRING = [
  'Laptop, charger, and a multi-plug if you have one',
  'Your own demo-screen adapter or dongle. HDMI and USB-C will be available.',
  'ID for check-in',
  'Sleeping bag if you plan to stay overnight',
  'Layers for late-night building',
  'Overnight kit: toothbrush, deodorant, eye mask, and change of clothes',
  'Headphones and a water bottle',
] as const

// ─── Hack-pack FAQ (distinct from the marketing FAQ) ───
export const HACK_FAQ = [
  { q: 'Can I start building before the event?', a: "You can prepare: research, plan, line up warm leads, and talk to users. The judged execution should happen during the 36 hours, and the weekend's progress must be substantial." },
  { q: 'Do I keep my IP?', a: 'Yes. Your team keeps 100% of the product, code, brand, and company.' },
  { q: 'Can I join solo and find a team there?', a: "Yes. Friday's arrival window is designed for this. You can also start early in #team-formation on Discord." },
  { q: 'Is there somewhere to sleep?', a: 'There is no dedicated sleep room, but the venue has couches. Bring a sleeping bag if you plan to stay overnight.' },
  { q: 'What if I get stuck?', a: 'Post in #help, tag a mentor or sponsor in Discord, or find them on-site. Ask early; waiting quietly costs more time than a quick question.' },
  { q: 'How do I win?', a: 'Build something real, prove it with evidence, and make the proof easy to verify. Money, users, burden removed, and honest receipts matter most.' },
] as const
