import React, { useState, useEffect, useCallback, useRef } from 'react'
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight, Check, X, BookOpen, Keyboard } from 'lucide-react'

const STORAGE_KEY = 'nerc_rc_flashcard_v1'

const FLASHCARD_CHAPTERS = [
  { id: 'all', label: 'All Chapters' },
  { id: 'intro', label: '🎯 Overview' },
  { id: 'balancing', label: '⚖️ Balancing' },
  { id: 'transmission', label: '⚡ Transmission' },
  { id: 'emergency-prep', label: '🚨 Emerg. Prep' },
  { id: 'emergency-response', label: '🔧 Emerg. Response' },
  { id: 'iro', label: '🌐 IRO' },
  { id: 'interchange', label: '🔄 Interchange' },
  { id: 'power-systems', label: '🔌 Power Systems' },
  { id: 'var', label: '📊 Voltage/VAR' },
  { id: 'lab', label: '🧪 Exam Strategy' },
]

const FLASHCARDS = [
  // BALANCING
  { id: 'f01', chapter: 'balancing', front: 'ACE (Area Control Error)', back: 'ACE = (NIA − NIS) − 10B(FA − FS) − IME. The instantaneous difference between a BA\'s actual and scheduled net interchange, adjusted for the BA\'s frequency bias obligation and meter error. ACE near zero means the BA is meeting its obligations to the Interconnection.' },
  { id: 'f02', chapter: 'balancing', front: 'Frequency Bias Setting (B)', back: 'The amount of MW the BA is obligated to provide (or absorb) per 0.1 Hz deviation from 60 Hz, measured in MW/0.1 Hz. Always a negative number. A BA with B = −100 MW/0.1 Hz automatically contributes 100 MW for every 0.1 Hz of frequency drop, per its bias obligation.' },
  { id: 'f03', chapter: 'balancing', front: 'AGC (Automatic Generation Control)', back: 'The automated system that adjusts the MW output of selected generating units to maintain the Balancing Authority\'s ACE near zero. AGC implements secondary frequency control — it takes over from governor (primary) response to restore both ACE and system frequency to schedule.' },
  { id: 'f04', chapter: 'balancing', front: 'Balancing Authority (BA)', back: 'The entity responsible for integrating resource plans, maintaining load-interchange-generation balance within a Balancing Authority Area, and supporting Interconnection frequency in real time. The BA manages ACE, holds reserves, and must recover from the MSSC within 15 minutes.' },
  { id: 'f05', chapter: 'balancing', front: 'BAL-001-2', back: 'The NERC standard establishing Control Performance Standards CPS1 and CPS2 for Balancing Authorities. CPS1 measures ACE performance over a rolling 12-month period and must be ≥ 100%. CPS2 limits the magnitude of average ACE over any 10-minute period.' },
  { id: 'f06', chapter: 'balancing', front: 'BAL-002-3', back: 'The Disturbance Control Standard (DCS). Requires Balancing Authorities to: (1) carry Contingency Reserve ≥ MSSC at all times, (2) return ACE within the Disturbance Recovery Limit (DRL) within 15 minutes of a Reportable Balancing Contingency Event, and (3) restore reserves within 90 minutes.' },
  { id: 'f07', chapter: 'balancing', front: 'BAL-003-2', back: 'Frequency Response and Frequency Bias Setting standard. Requires BAs to provide sufficient frequency response (governor-responsive generation) to maintain Interconnection frequency stability following a disturbance. BAs must also report and maintain their Frequency Bias Setting.' },
  { id: 'f08', chapter: 'balancing', front: 'CPS1 (Control Performance Standard 1)', back: 'A NERC reliability standard metric measuring a Balancing Authority\'s ACE performance. CPS1 uses a statistical formula based on ACE × frequency deviation, evaluated over a rolling 12-month period. Must be ≥ 100% or the BA is in violation of BAL-001-2.' },
  { id: 'f09', chapter: 'balancing', front: 'CPS2 (Control Performance Standard 2)', back: 'A NERC reliability metric that limits how large a BA\'s average ACE can be during any 10-minute period. CPS2 prevents sustained, large ACE that would cause excessive frequency deviation. Must be met 90% of all 10-minute intervals in a month.' },
  { id: 'f10', chapter: 'balancing', front: 'Contingency Reserve', back: 'Operating Reserve held to cover the loss of the Most Severe Single Contingency (MSSC). Includes both Spinning Reserve (online, synchronized) and Non-Spinning Reserve (offline), both deployable within 10 minutes. Required minimum = MSSC MW. Governed by BAL-002-3.' },
  { id: 'f11', chapter: 'balancing', front: 'DRL (Disturbance Recovery Limit)', back: 'The magnitude of ACE that a Balancing Authority must return to within 15 minutes following a Reportable Balancing Contingency Event. Set equal to the BA\'s MSSC. If ACE exceeds DRL for more than 15 minutes, the BA is in violation of BAL-002-3.' },
  { id: 'f12', chapter: 'balancing', front: 'MSSC (Most Severe Single Contingency)', back: 'The single largest loss of resource (generation or import) that a Balancing Authority could experience. Sets the minimum Contingency Reserve requirement. If a BA\'s largest unit is 500 MW, its MSSC is 500 MW, and it must carry at least 500 MW of Contingency Reserve at all times.' },
  { id: 'f13', chapter: 'balancing', front: 'Spinning Reserve', back: 'Unloaded synchronized generation capacity that can be converted to energy within 10 minutes. The generator is already online and governor-responsive. Spinning reserve responds automatically to frequency decline and can be fully dispatched by AGC within the 10-minute window.' },
  { id: 'f14', chapter: 'balancing', front: 'Non-Spinning Reserve', back: 'Operating reserve held in offline resources (offline generators, interruptible load) that can be brought online and fully deployed within 10 minutes. Unlike spinning reserve, it is not synchronized and does not provide immediate governor response, but counts toward total Contingency Reserve.' },
  { id: 'f15', chapter: 'balancing', front: 'Regulation Reserve', back: 'Operating reserve controlled by AGC that responds to continuous ACE signals. Regulation reserve units are selected for their fast response, relatively flat cost, and ability to both increase and decrease output on AGC signals. Distinct from Contingency Reserve, which is held for large contingencies.' },
  { id: 'f16', chapter: 'balancing', front: 'Operating Reserve', back: 'The total capacity held above firm load obligation by a Balancing Authority. Consists of Regulation Reserve (for ACE management) plus Contingency Reserve (for MSSC events). Contingency Reserve is further divided into Spinning and Non-Spinning components.' },
  { id: 'f17', chapter: 'balancing', front: 'Inadvertent Interchange', back: 'The time-accumulated difference between a BA\'s actual net interchange and its scheduled net interchange. Positive inadvertent = exported more than scheduled. Negative = imported more than scheduled. BAL-006 requires BAs to account for and return inadvertent interchange over time.' },
  { id: 'f18', chapter: 'balancing', front: 'BAL-005', back: 'Balancing Authority Control — establishes AGC system requirements for Balancing Authorities, including the requirement to maintain an operating AGC system and to account for all scheduled and actual interchange in real time.' },
  { id: 'f19', chapter: 'balancing', front: 'BAL-006', back: 'Inadvertent Interchange — requires BAs to maintain cumulative inadvertent interchange accounting and return inadvertent interchange over time. BAs coordinate the method and timing of inadvertent return with their interconnection partners and the RC.' },
  { id: 'f20', chapter: 'balancing', front: 'Time Error Correction (Slow)', back: 'When electric clocks are running slow (Interconnection frequency has averaged below 60 Hz), the RC announces a slow time error correction. Balancing Authorities set their Scheduled Frequency (FS) to 60.02 Hz, biasing AGC to push generation higher and raise actual frequency above 60 Hz.' },
  { id: 'f21', chapter: 'balancing', front: 'Time Error Correction (Fast)', back: 'When electric clocks are running fast (frequency has averaged above 60 Hz), the RC announces a fast time error correction. BAs set their Scheduled Frequency (FS) to 59.98 Hz, biasing AGC to allow generation to drop and pull actual frequency below 60 Hz to correct the accumulated time error.' },

  // TRANSMISSION
  { id: 'f22', chapter: 'transmission', front: 'SOL (System Operating Limit)', back: 'The value of a system parameter (MW flow, bus voltage, fault duty) that, if exceeded, violates applicable facility ratings, voltage limits, or system stability limits for specified system configurations. SOLs are established by TOPs and Planners. An IROL is a subset of SOLs with Interconnection-wide significance.' },
  { id: 'f23', chapter: 'transmission', front: 'IROL (Interconnection Reliability Operating Limit)', back: 'A System Operating Limit whose violation could adversely affect the reliability of two or more RC Areas in the Interconnection. Each IROL has a violation time (Tv ≤ 30 minutes) beyond which cascading outages or uncontrolled separation could result. The RC monitors and enforces IROLs.' },
  { id: 'f24', chapter: 'transmission', front: 'Tv (IROL violation time)', back: 'The maximum time an IROL may be violated before the RC must take or direct immediate emergency action. Tv is determined individually for each IROL based on stability analysis. The NERC Glossary specifies Tv ≤ 30 minutes for any IROL. Exceeding Tv risks cascading outages.' },
  { id: 'f25', chapter: 'transmission', front: 'TLR Level 1', back: 'Transmission Loading Relief Level 1 (Eastern Interconnection): Notification. The RC notifies affected TOPs and market participants that a transmission path is approaching its SOL. No curtailment yet — this is a heads-up that action may be required if the overload is not resolved.' },
  { id: 'f26', chapter: 'transmission', front: 'TLR Level 2', back: 'Transmission Loading Relief Level 2 (Eastern Interconnection): Redirect or reallocate non-firm transactions. Market participants are asked to redirect energy flows to avoid the overloaded path. Non-firm reservations may be reallocated to use alternate transmission paths.' },
  { id: 'f27', chapter: 'transmission', front: 'TLR Level 3a', back: 'TLR Level 3a (Eastern Interconnection): Curtail non-firm redirected transactions. Transactions that were rerouted at Level 2 are curtailed if they cannot be further redirected and the overload persists. This is mandatory curtailment of non-firm redirects.' },
  { id: 'f28', chapter: 'transmission', front: 'TLR Level 3b', back: 'TLR Level 3b (Eastern Interconnection): Curtail non-firm Point-to-Point (PTP) transmission service. Mandatory curtailment of non-firm PTP transactions flowing on the overloaded path. This affects market participants\' interchange transactions directly. Escalated from 3a when redirects are insufficient.' },
  { id: 'f29', chapter: 'transmission', front: 'TLR Level 4', back: 'TLR Level 4 (Eastern Interconnection): Curtail firm Point-to-Point transmission service. A serious escalation — firm PTP transactions are curtailed. This affects contractually guaranteed transmission rights and requires careful documentation. All non-firm options must be exhausted first.' },
  { id: 'f30', chapter: 'transmission', front: 'TLR Level 5', back: 'TLR Level 5 (Eastern Interconnection): Curtail all remaining transactions including firm Network Integration Transmission Service. The most severe TLR level, affecting Network customers. Level 5a curtails firm non-network service; 5b curtails Network Integration Transmission Service (NITS).' },
  { id: 'f31', chapter: 'transmission', front: 'TOP (Transmission Operator)', back: 'The entity responsible for the reliability of its local transmission system and maintaining the transmission elements within its Transmission Operator Area within facility ratings and system operating limits. The TOP operates under the authority of the RC and must comply with RC Operating Instructions.' },
  { id: 'f32', chapter: 'transmission', front: 'TOP-001', back: 'The primary NERC standard for Transmission Operations. Requires TOPs to operate within SOLs and IROLs, monitor transmission facilities in real time, take corrective action when limits are approached or violated, and coordinate with the RC and neighboring TOPs.' },
  { id: 'f33', chapter: 'transmission', front: 'VAR-001-6', back: 'Voltage and Reactive Control. Requires Transmission Operators to establish and maintain voltage schedules or reactive power output schedules for generators at their interconnection points, and to monitor and maintain bus voltages within their Transmission Operator Area.' },
  { id: 'f34', chapter: 'transmission', front: 'FAC-001', back: 'Facility Connection Requirements. Requires Transmission Owners to have a documented process for evaluating interconnection requests and determining the requirements for connecting new facilities to the Bulk Electric System. Ensures new facilities are properly studied before connection.' },
  { id: 'f35', chapter: 'transmission', front: 'FAC-002', back: 'Facility Connections and Operational Planning Analysis. Requires Transmission Planners to perform planning assessments to ensure that new facility connections will not adversely affect the reliability of the Bulk Electric System under both normal and contingency conditions.' },
  { id: 'f36', chapter: 'transmission', front: 'Wide-Area', back: 'Referring to system conditions, events, or impacts that span multiple Balancing Authority Areas or Reliability Coordinator Areas. Wide-area reliability is the RC\'s primary concern — it looks across BA boundaries to identify system conditions that could cause multi-area outages.' },

  // EMERGENCY PREP
  { id: 'f37', chapter: 'emergency-prep', front: 'OPA (Operational Planning Analysis)', back: 'The next-day reliability assessment required by IRO-008-2. The RC performs an OPA to assess whether planned next-day operations will violate SOLs or IROLs, identify potential capacity deficiencies, and coordinate solutions with applicable TOPs and BAs before the operating day begins.' },
  { id: 'f38', chapter: 'emergency-prep', front: 'EOP-011-2', back: 'Emergency Operations Preparedness. Requires each Transmission Operator to develop, maintain, and implement Operating Plans for mitigating operating emergencies including capacity deficiencies, voltage emergencies, and transmission overloads. Plans must be documented and exercised.' },
  { id: 'f39', chapter: 'emergency-prep', front: 'IRO-008-2', back: 'The NERC standard requiring the RC to perform an Operational Planning Analysis (OPA) for next-day operations. The RC must assess compliance with SOLs and IROLs for the upcoming operating day and coordinate corrective actions with TOPs and BAs before the operating hour begins.' },
  { id: 'f40', chapter: 'emergency-prep', front: 'COM-001', back: 'Communications. Requires entities to have interpersonal communications capability for normal and emergency conditions, including primary and alternate communication paths. The RC must be able to communicate with all TOPs, BAs, GOPs, and adjacent RCs in its footprint.' },

  // EMERGENCY RESPONSE
  { id: 'f41', chapter: 'emergency-response', front: 'Blackstart Resource', back: 'A generating unit with the capability to start without an external electrical supply (self-starting) and can energize a transmission path to allow other generating units to be restarted. Critical for system restoration following a blackout. Requirements are in EOP-005-3.' },
  { id: 'f42', chapter: 'emergency-response', front: 'Cranking Path', back: 'A pre-determined switching sequence that establishes an energized transmission path from a blackstart resource to one or more generating units to be restarted. Documented in advance under EOP-005-3. Operators follow the cranking path exactly during actual restoration.' },
  { id: 'f43', chapter: 'emergency-response', front: 'System Restoration', back: 'The process of restoring a power system to normal operation following a partial or total blackout. Involves energizing blackstart resources, establishing cranking paths, restarting generating units, picking up load incrementally, and synchronizing restoration islands back to the Interconnection.' },
  { id: 'f44', chapter: 'emergency-response', front: 'EOP-005-3', back: 'System Restoration from Blackstart Resources. Requires Generator Operators with blackstart resources to maintain capability and provide training to operating personnel every 2 calendar years. TOPs must have documented plans for using blackstart resources to restore their system.' },
  { id: 'f45', chapter: 'emergency-response', front: 'EOP-006-2', back: 'System Restoration Coordination. Requires the RC to coordinate the restoration activities of multiple Transmission Operators within its RC Area following a blackout. The RC ensures islands are resynchronized at compatible frequency, voltage, and phase angle.' },
  { id: 'f46', chapter: 'emergency-response', front: 'Load Shedding', back: 'Controlled interruption of electric power to customers to prevent or correct a reliability emergency. The RC may direct load shedding as an emergency action when other corrective measures are insufficient to prevent cascading outages or uncontrolled system separation.' },
  { id: 'f47', chapter: 'emergency-response', front: 'UFLS (Under-Frequency Load Shedding)', back: 'Automatic protective relaying that sheds blocks of load when Interconnection frequency falls to pre-set thresholds (typically beginning around 59.3-59.5 Hz). UFLS arrests frequency decline to prevent system collapse. Requirements are in PRC-006. It is a last resort, not an operating tool.' },
  { id: 'f48', chapter: 'emergency-response', front: 'PRC-006', back: 'Under-Frequency Load Shedding (UFLS) requirements. Each region must maintain UFLS sufficient to arrest frequency decline during severe under-generation events. Sets minimum MW to be shed at specific frequency thresholds to prevent total system collapse.' },

  // IRO
  { id: 'f49', chapter: 'iro', front: 'RC (Reliability Coordinator)', back: 'The entity with the widest area view of, and the highest level of authority over, the Bulk Electric System operations. The RC monitors real-time conditions across its entire RC Area, performs operational planning analysis, and has authority to direct TOPs, BAs, and GOPs to take action for reliability.' },
  { id: 'f50', chapter: 'iro', front: 'IRO-001-4', back: 'The NERC standard establishing RC authority. Requires the RC to take corrective actions to maintain reliability and issue Operating Instructions to subordinate entities. Entities must comply with RC instructions or immediately inform the RC of their inability to comply.' },
  { id: 'f51', chapter: 'iro', front: 'IRO-006-EAST-2', back: 'TLR procedures for the Eastern Interconnection. Establishes the structured, escalating curtailment process (Levels 1 through 5) used by RCs to relieve transmission overloads on the Eastern Interconnection by curtailing interchange transactions.' },
  { id: 'f52', chapter: 'iro', front: 'IRO-010-3', back: 'RC data specification — specifies what data the RC must obtain from subordinate entities (TOPs, BAs, GOPs) to perform its wide-area reliability monitoring and operational planning functions. Ensures the RC has the real-time information needed to identify developing reliability threats.' },
  { id: 'f53', chapter: 'iro', front: 'IRO-017-1', back: 'Wide-area situational awareness — requires the RC to have tools and information needed to monitor system conditions across its entire RC Area, including state estimation, contingency analysis, frequency monitoring, and voltage monitoring at key buses.' },

  // INTERCHANGE
  { id: 'f54', chapter: 'interchange', front: 'INT-006-5', back: 'Interchange evaluation and implementation. When the RC directs modification of Confirmed or Implemented Interchange for reliability reasons, a Reliability Adjustment Arranged Interchange schedule must be submitted within 60 minutes of the start of the modification.' },
  { id: 'f55', chapter: 'interchange', front: 'INT-009-3', back: 'Interchange evaluation by Reliability Coordinators. Requires the RC to evaluate all new Arranged Interchange and Reliability Adjustments that will flow through its RC Area to determine if they will cause or contribute to SOL or IROL violations. RC may approve, deny, or condition interchange.' },
  { id: 'f56', chapter: 'interchange', front: 'Arranged Interchange', back: 'An interchange transaction that has been submitted by all parties (source BA, sink BA, transmission service providers) but has not yet been confirmed by all parties. The RC evaluates Arranged Interchange under INT-009-3 before it becomes Confirmed Interchange.' },
  { id: 'f57', chapter: 'interchange', front: 'Confirmed Interchange', back: 'An interchange transaction that has been agreed to by all parties — source BA, sink BA, and all applicable Transmission Service Providers. Confirmed Interchange is approved to flow. The RC may modify Confirmed Interchange for reliability per INT-006-5.' },

  // POWER SYSTEMS
  { id: 'f58', chapter: 'power-systems', front: 'Governor Droop', back: 'The relationship between frequency deviation and generator output change. Expressed as a percentage: 5% droop means a 5% deviation from nominal frequency (3 Hz on a 60 Hz system) would cause 100% change in unit output. Lower droop = more sensitive frequency response. Typical setting: 4-5%.' },
  { id: 'f59', chapter: 'power-systems', front: 'MOD-001', back: 'A NERC standard addressing generator available reactive power and real power capability. Requires Generator Owners to provide accurate machine capability data to support operational and planning studies. Accurate data is critical for the RC\'s and TOP\'s voltage management decisions.' },

  // VAR
  { id: 'f60', chapter: 'var', front: 'VAR-002-4', back: 'Generator reactive capability — requires Generator Operators to maintain terminal voltage or reactive output within the schedule established by the Transmission Operator. If the GOP cannot comply due to equipment limits, it must immediately notify the TOP, who must take alternate corrective action.' },
  { id: 'f61', chapter: 'var', front: 'Voltage Collapse', back: 'A system instability phenomenon where voltage progressively deteriorates as reactive power demand exceeds supply capability. The P-V curve "nose point" represents the maximum power transfer limit. Beyond this point, voltage cannot be maintained regardless of reactive support, and the system collapses.' },

  // INTRO / OVERVIEW
  { id: 'f62', chapter: 'intro', front: 'NERC (North American Electric Reliability Corporation)', back: 'The ERO (Electric Reliability Organization) designated by FERC under the Energy Policy Act of 2005 to develop and enforce reliability standards for the Bulk Electric System. NERC develops standards, oversees compliance, and administers operator certification programs for the US, Canada, and parts of Mexico.' },
  { id: 'f63', chapter: 'intro', front: 'Reliability Coordinator (RC) Certification', back: 'The highest-level NERC operator certification. Requires passing a Pearson VUE exam of 100-120 questions (plus ~20 unscored pilot questions). About 65% scenario-based. Valid for 3 years; renewal requires 36 continuing education hours. Tests knowledge of all reliability standards within the RC\'s scope.' },
]

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveProgress(prog) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prog))
}

function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed >>> 0
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s ^ (s >>> 15), s | 1) ^ (s + Math.imul(s ^ (s >>> 7), s | 61))) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Flashcards() {
  const [chapter, setChapter] = useState('all')
  const [progress, setProgress] = useState(loadProgress)
  const [shuffled, setShuffled] = useState(false)
  const [seed, setSeed] = useState(Date.now())
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const baseCards = chapter === 'all' ? FLASHCARDS : FLASHCARDS.filter(c => c.chapter === chapter)
  const cards = shuffled ? seededShuffle(baseCards, seed) : baseCards
  const current = cards[index] || null

  const isMastered = current ? !!progress[current.id]?.mastered : false
  const isSeen = current ? !!progress[current.id]?.seen : false
  const seenCount = cards.filter(c => progress[c.id]?.seen).length
  const masteredCount = cards.filter(c => progress[c.id]?.mastered).length
  const pct = cards.length ? Math.round((masteredCount / cards.length) * 100) : 0

  const go = useCallback((dir) => {
    if (animating) return
    setAnimating(true)
    setFlipped(false)
    setTimeout(() => {
      setIndex(i => {
        const next = i + dir
        if (next < 0) return cards.length - 1
        if (next >= cards.length) return 0
        return next
      })
      setAnimating(false)
    }, 200)
  }, [animating, cards.length])

  const flip = useCallback(() => {
    if (animating) return
    setFlipped(f => !f)
    if (current) {
      const p = { ...progress }
      p[current.id] = { ...p[current.id], seen: true }
      setProgress(p)
      saveProgress(p)
    }
  }, [animating, current, progress])

  const markMastered = useCallback(() => {
    if (!current) return
    const p = { ...progress }
    p[current.id] = { ...p[current.id], seen: true, mastered: true }
    setProgress(p)
    saveProgress(p)
    go(1)
  }, [current, progress, go])

  const markNeeds = useCallback(() => {
    if (!current) return
    const p = { ...progress }
    p[current.id] = { ...p[current.id], seen: true, mastered: false }
    setProgress(p)
    saveProgress(p)
    go(1)
  }, [current, progress, go])

  const resetProgress = () => {
    setProgress({})
    saveProgress({})
    setIndex(0)
    setFlipped(false)
  }

  const doShuffle = () => { setSeed(Date.now()); setShuffled(true); setIndex(0); setFlipped(false) }
  const unShuffle = () => { setShuffled(false); setIndex(0); setFlipped(false) }

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); flip() }
      if (e.code === 'ArrowRight' || e.code === 'KeyL') go(1)
      if (e.code === 'ArrowLeft' || e.code === 'KeyH') go(-1)
      if (e.code === 'KeyM') markMastered()
      if (e.code === 'KeyN') markNeeds()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [flip, go, markMastered, markNeeds])

  useEffect(() => { setIndex(0); setFlipped(false) }, [chapter])

  if (!current) return (
    <div className="p-8 text-center text-slate-400">No cards for this chapter yet.</div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-navy-700 flex items-center gap-2">
              <BookOpen size={24} className="text-mblue-600" />
              NERC RC Flashcards
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{FLASHCARDS.length} terms · Space to flip · ← → navigate · M mastered · N needs review</p>
          </div>
          <button
            onClick={() => setShowHint(h => !h)}
            className="p-2 rounded-xl text-slate-400 hover:text-mblue-600 hover:bg-blue-50 transition-colors"
            title="Keyboard shortcuts"
          >
            <Keyboard size={20} />
          </button>
        </div>

        {showHint && (
          <div className="mb-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-xs text-slate-500 grid grid-cols-2 gap-2 animate-fadeIn">
            <div><kbd className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">Space</kbd> Flip card</div>
            <div><kbd className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">← →</kbd> Navigate</div>
            <div><kbd className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">M</kbd> Mark mastered</div>
            <div><kbd className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">N</kbd> Needs review</div>
          </div>
        )}

        {/* Chapter filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FLASHCARD_CHAPTERS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setChapter(ch.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                chapter === ch.id
                  ? 'bg-mblue-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-mblue-300 hover:text-mblue-600'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-6 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>{index + 1} / {cards.length} cards</span>
            <div className="flex gap-4">
              <span className="text-amber-500 font-semibold">{seenCount} seen</span>
              <span className="text-mgreen-500 font-semibold">{masteredCount} mastered</span>
              <span className="text-mblue-600 font-bold">{pct}%</span>
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full rounded-full bg-amber-300 transition-all duration-500"
              style={{ width: `${cards.length ? (seenCount / cards.length) * 100 : 0}%` }} />
            <div className="absolute left-0 top-0 h-full rounded-full bg-mgreen-400 transition-all duration-500"
              style={{ width: `${cards.length ? (masteredCount / cards.length) * 100 : 0}%` }} />
          </div>
          {cards.length <= 25 && (
            <div className="flex gap-1 mt-2 justify-center flex-wrap">
              {cards.map((c, i) => (
                <button key={c.id} onClick={() => { setIndex(i); setFlipped(false) }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === index ? 'scale-150 bg-mblue-600' :
                    progress[c.id]?.mastered ? 'bg-mgreen-400' :
                    progress[c.id]?.seen ? 'bg-amber-400' : 'bg-slate-200'
                  }`} />
              ))}
            </div>
          )}
        </div>

        {/* Card */}
        <div onClick={flip} className="relative cursor-pointer select-none mb-6"
          style={{ perspective: '1200px', minHeight: 300 }}>
          <div className="relative w-full transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', minHeight: 300 }}>

            {/* Front */}
            <div className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <div className="h-full min-h-[300px] bg-white rounded-3xl border-2 border-mblue-200 shadow-xl p-8 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-mblue-50 text-mblue-600 rounded-full text-xs font-bold uppercase tracking-wide">
                    {FLASHCARD_CHAPTERS.find(c => c.id === current.chapter)?.label || current.chapter}
                  </span>
                  {isMastered && (
                    <span className="px-2 py-1 bg-mgreen-50 text-mgreen-600 rounded-full text-xs font-bold flex items-center gap-1">
                      <Check size={12} /> Mastered
                    </span>
                  )}
                  {isSeen && !isMastered && (
                    <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold">Review</span>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-xl font-semibold text-navy-700 text-center leading-relaxed">{current.front}</p>
                </div>
                <div className="flex items-center justify-center gap-2 mt-4 text-slate-300 text-sm">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center animate-bounce">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  </div>
                  <span>Tap to reveal definition</span>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="h-full min-h-[300px] bg-gradient-to-br from-navy-700 to-navy-800 rounded-3xl border-2 border-navy-600 shadow-xl p-8 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-white/10 text-mcyan-300 rounded-full text-xs font-bold uppercase tracking-wide">
                    {current.front}
                  </span>
                  <span className="text-white/30 text-xs">Definition</span>
                </div>
                <div className="flex-1 flex items-start justify-center overflow-y-auto">
                  <p className="text-white/90 text-sm leading-relaxed text-left w-full">{current.back}</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={(e) => { e.stopPropagation(); markNeeds() }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold text-sm transition-all active:scale-95">
                    <X size={16} /> Needs Review
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); markMastered() }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-mgreen-500/20 hover:bg-mgreen-500/30 text-mgreen-300 font-semibold text-sm transition-all active:scale-95">
                    <Check size={16} /> Got It
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button onClick={() => go(-1)}
            className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:border-mblue-300 transition-all active:scale-95 shadow-sm">
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex gap-2">
            <button onClick={shuffled ? unShuffle : doShuffle}
              className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 ${
                shuffled ? 'bg-mblue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-mblue-300 hover:text-mblue-600'
              }`}>
              <Shuffle size={16} /> {shuffled ? 'Shuffled' : 'Shuffle'}
            </button>
            <button onClick={resetProgress}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-500 font-semibold text-sm hover:text-red-500 hover:border-red-200 transition-all active:scale-95"
              title="Reset progress">
              <RotateCcw size={16} />
            </button>
          </div>

          <button onClick={() => go(1)}
            className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 hover:border-mblue-300 transition-all active:scale-95 shadow-sm">
            Next <ChevronRight size={18} />
          </button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center text-xs text-slate-400">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Not seen</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Seen / Review</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-mgreen-400" /> Mastered</div>
        </div>
      </div>
    </div>
  )
}
