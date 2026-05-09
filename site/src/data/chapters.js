export const CHAPTERS = [
  { id: 'intro',             path: '/',                  label: 'RC Certification Overview',          emoji: '🎯', next: 'balancing' },
  { id: 'balancing',        path: '/balancing',          label: 'Resource & Demand Balancing',        emoji: '⚖️', prev: 'intro',              next: 'transmission' },
  { id: 'transmission',     path: '/transmission',       label: 'Transmission Operations',            emoji: '⚡', prev: 'balancing',          next: 'emergency-prep' },
  { id: 'emergency-prep',   path: '/emergency-prep',     label: 'Emergency Preparedness',             emoji: '🚨', prev: 'transmission',       next: 'emergency-response' },
  { id: 'emergency-response', path: '/emergency-response', label: 'Emergency Response & Restoration', emoji: '🔧', prev: 'emergency-prep',     next: 'iro' },
  { id: 'iro',              path: '/iro',                 label: 'IRO — RC Authority & Wide-Area',     emoji: '🌐', prev: 'emergency-response', next: 'interchange' },
  { id: 'interchange',      path: '/interchange',         label: 'Interchange Scheduling',             emoji: '🔄', prev: 'iro',                next: 'power-systems' },
  { id: 'power-systems',    path: '/power-systems',       label: 'Power Systems Fundamentals',         emoji: '🔌', prev: 'interchange',        next: 'var' },
  { id: 'var',              path: '/var',                 label: 'Voltage & Reactive Power',           emoji: '📊', prev: 'power-systems',      next: 'lab' },
  { id: 'lab',              path: '/lab',                 label: 'Practice & Exam Strategy',           emoji: '🧪', prev: 'var' },
]

export const ANALOGIES = {
  intro: { text: "The RC certification is to power system operators what the bar exam is to lawyers — except the grid doesn't grant appeals when you make a mistake.", author: "NERC examiner, probably" },
  balancing: { text: "Managing ACE is like balancing a checkbook that reconciles every 10 seconds, across 10 neighboring accounts, while someone keeps randomly depositing and withdrawing without telling you.", author: "Every BA operator ever" },
  transmission: { text: "A transmission line's thermal limit is like a highway's speed limit — you can exceed it briefly in an emergency, but sustained violation means equipment failure, not just a ticket.", author: "Emergency ratings, Section 1" },
  'emergency-prep': { text: "Writing an EOP is like writing a fire escape plan — everybody thinks it's bureaucratic busywork until the building is actually on fire.", author: "Post-event analysis, every time" },
  'emergency-response': { text: "System restoration from blackstart is like trying to restart a data center using only a flashlight, a walkie-talkie, and the guy who wrote the manual three jobs ago.", author: "Restoration drill debrief" },
  iro: { text: "The RC is the highest authority in the operating hierarchy — like an air traffic controller who can override any pilot's decision if it threatens other planes. The difference is the planes weigh 10 million pounds and are on fire.", author: "IRO-001-4, unofficially" },
  interchange: { text: "E-tagging is the power industry's way of saying 'we trust each other, but we're going to write everything down anyway.' Which is the correct approach when billions of dollars and grid stability are involved.", author: "NERC interchange desk" },
  'power-systems': { text: "Reactive power is the bouncer at the voltage club — you don't see it doing useful work, but without it, everything collapses and nobody has a good time.", author: "Power systems 101" },
  var: { text: "Voltage collapse is the most polite catastrophe in engineering — the system slowly, graciously, completely destroys itself while giving you multiple opportunities to prevent it.", author: "Voltage stability analysis" },
  lab: { text: "The NERC RC exam assumes you understand why things happen, not just that they happen. 'Because the standard says so' is not an explanation that passes the scenario-based questions.", author: "Exam prep experience" },
}

export const FUN_FACTS = [
  { emoji: '⚡', text: 'The Eastern Interconnection is one of the largest machines ever built, with over 700,000 miles of transmission lines synchronized to the same 60 Hz frequency.' },
  { emoji: '🕐', text: 'Time error on the interconnection is measured in seconds per day. A sustained 0.01 Hz frequency deviation causes about 0.6 seconds of time error per day.' },
  { emoji: '📋', text: 'NERC has over 100 reliability standards. The RC is responsible for compliance oversight across multiple standards, many of which have mandatory violations fines up to $1 million per violation per day.' },
  { emoji: '🔋', text: 'The Western Interconnection operates at slightly different frequency from ERCOT — they are physically separate and can have different instantaneous frequencies at any moment.' },
  { emoji: '🚨', text: 'The 2003 Northeast Blackout affected 55 million people and cost an estimated $6 billion. It was triggered by a software bug in FirstEnergy\'s EMS system that silenced alarms for over an hour.' },
  { emoji: '📡', text: 'NERC\'s Wide-Area Situational Awareness (WASA) systems include over 2,500 phasor measurement units (PMUs) across North America, providing synchronized real-time data at 30 samples per second.' },
  { emoji: '⚖️', text: 'CPS1 (Control Performance Standard 1) is calculated over a rolling 12-month period. A BA must maintain CPS1 ≥ 100%. Missing this standard results in mandatory reporting and potential penalties.' },
  { emoji: '🌡️', text: 'Transmission line ratings change with ambient temperature. A line rated at 1,200 MW on a 60°F day may only carry 800 MW on a 95°F day because hotter air reduces thermal dissipation.' },
  { emoji: '🔄', text: 'Inadvertent interchange is tracked cumulatively — some BAs have carried accumulated inadvertent for years. BAL-006 requires BAs to return inadvertent but allows them to do so gradually over time.' },
  { emoji: '🧮', text: 'The frequency bias constant B is always a negative number. A typical 5,000 MW BA might have B = -50 MW/0.1 Hz, meaning it will automatically contribute 50 MW for every 0.1 Hz of frequency drop.' },
  { emoji: '🗺️', text: 'There are approximately 65-70 Balancing Authorities in North America, but only around 10 Reliability Coordinators. Each RC oversees multiple BAs, TOPs, and GOPs within its RC Area.' },
  { emoji: '💡', text: 'Blackstart resources typically represent less than 5% of a BA\'s generating capacity, but they are absolutely critical — without them, there is no way to restore power after a complete blackout.' },
]
