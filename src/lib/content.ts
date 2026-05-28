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
    bio: '9x hackathon wins. Ex-Palantir. Draper Fellow.',
  },
  {
    name: 'Lyndon Leong',
    role: 'Programme & Community',
    photo: '/team/lyndon.png',
    bio: 'EWOR. Scaled a gaming co to 1M users. Led £60B AUM regulatory reconciliation.',
  },
  {
    name: 'Lois Zhao',
    role: 'Operations & Partners',
    photo: '/team/lois.png',
    bio: 'Founding engineer at Toma (YC, a16z) & Zephyr Cloud. Daytona consultant.',
  },
  {
    name: 'Alramina Myrzabekova',
    role: 'Strategy & Partnerships',
    photo: '/team/alramina.png',
    bio: 'EWOR Fellow. Ex EY-P consultant. 4x hackathon winner.',
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
    detail: 'Rolling applications. Short form, no essay.',
  },
  {
    index: '02',
    label: 'Confirmed',
    detail: 'Decisions 5 days before the hackathon.',
  },
  {
    index: '03',
    label: 'Build',
    detail: '5–7 June 2026, London. 36 hours.',
  },
  {
    index: '04',
    label: 'Demo Day',
    detail: 'Award ceremony. Register separately →',
    href: 'https://luma.com/bi8t9jh8',
  },
] as const

export const SPONSORS = [
  { name: 'AccelerateMe', logo: '/sponsor_accelerateme/accelerateme.png', label: 'Founding Partner' },
  { name: 'Mubit', logo: '/sponsor_mubit/Logo_Black_Only.svg', label: 'Founding Partner' },
  { name: 'Standard Manufacturing Co.', logo: '/sponsor_standardmanufacturing/sponsor_standardmanufacturing.png', label: 'Founding Partner' },
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
