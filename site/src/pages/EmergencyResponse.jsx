import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function EmergencyResponse() {
  return (
    <ChapterLayout
      chapterId="emergency-response"
      title="Emergency Response & Restoration"
      emoji="🔧"
      prev="emergency-prep"
      next="iro"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        When the system has already gone wrong — a generator trips, voltage is collapsing,
        or the lights are out across multiple states — the RC coordinates the response.
        This chapter covers what to do when the playbook is being executed under pressure,
        not written in advance.
      </p>

      <GifCard gifKey="emergency" caption="Every blackout drill, ever." side="left" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">IROL Violation: Immediate Action Required</h2>

      <Callout type="warning" title="IROL + Tv Exceeded = Act NOW">
        When an IROL has been violated for longer than its Tv (always ≤ 30 minutes),
        the RC must IMMEDIATELY take or direct emergency actions. This is not a planning exercise.
        Acceptable emergency actions include: directing load shedding, curtailing interchange,
        reconfiguring transmission, or directing generation dispatch changes.
        There is no further wait period — delay risks cascading outages.
      </Callout>

      <div className="grid grid-cols-3 gap-4 my-6">
        {[
          { label: 'Tv Maximum', value: '30 min', desc: 'Maximum IROL violation time for any IROL' },
          { label: 'Action When Exceeded', value: 'Immediate', desc: 'RC must act or direct action immediately — no additional grace period' },
          { label: 'Risk', value: 'Cascading', desc: 'Uncontrolled separation or cascading outages' },
        ].map(({ label, value, desc }) => (
          <div key={label} className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <div className="text-sm text-red-600 mb-1">{label}</div>
            <div className="text-xl font-black text-red-700">{value}</div>
            <div className="text-xs text-red-500 mt-1">{desc}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Under-Frequency Load Shedding (UFLS)</h2>
      <p>
        UFLS is the automatic last line of defense against system collapse during severe
        under-generation events. When frequency falls low enough, protection relays automatically
        shed load — without operator action.
      </p>

      <div className="bg-navy-700 rounded-2xl p-5 my-6">
        <div className="text-white text-sm font-bold mb-3 uppercase tracking-widest">Frequency Action Timeline</div>
        <div className="space-y-2">
          {[
            { freq: '60.00 Hz', color: 'bg-mgreen-400', label: 'Normal — AGC managing ACE' },
            { freq: '59.95 Hz', color: 'bg-amber-400', label: 'Below normal — governor response activating' },
            { freq: '59.7 Hz', color: 'bg-orange-400', label: 'Under-frequency alert — RC should be acting' },
            { freq: '59.3 Hz', color: 'bg-mred-400', label: 'UFLS begins shedding load automatically (PRC-006)' },
            { freq: '59.0 Hz', color: 'bg-red-700', label: 'Severe — risk of generator trips, system separation' },
          ].map(({ freq, color, label }) => (
            <div key={freq} className="flex items-center gap-3">
              <span className={`${color} text-white font-mono text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 w-20 text-center`}>{freq}</span>
              <span className="text-slate-300 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <Callout type="field" title="UFLS is a Last Resort, Not a Plan">
        PRC-006 establishes UFLS settings, but the RC's job is to prevent frequency from
        reaching UFLS thresholds in the first place. If UFLS is activating, you've already
        lost control of the situation. The exam will ask what the RC should have done BEFORE
        frequency reached 59.3 Hz.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">System Restoration: Blackstart Basics</h2>

      <AnalogyCard analogy={{
        title: "Restarting the Data Center With a Flashlight",
        concept: "System restoration from blackstart",
        analogy: "System restoration from blackstart is like trying to restart a data center using only a flashlight, a walkie-talkie, and the guy who wrote the manual three jobs ago. The manual says 'Step 1: Start Unit A.' Great. Unit A needs 5 MW of auxiliary power to start. Where does that come from? The blackstart unit. Which needs to start first. And can only carry so much load. This is why we train.",
        gif: "studying"
      }} />

      <div className="space-y-4 my-6">
        <h3 className="font-bold text-navy-700">The Restoration Sequence</h3>
        {[
          ['1', 'Blackstart unit starts', 'Self-starting generator (combustion turbine, hydro, diesel) starts without external power'],
          ['2', 'Cranking Path energized', 'Pre-determined switching sequence establishes energized path to target units'],
          ['3', 'Target unit restarted', 'Larger generator picked up using blackstart power for auxiliaries'],
          ['4', 'Island stabilized', 'Frequency and voltage stabilized in small restoration island'],
          ['5', 'Load picked up incrementally', 'Cold load added in small blocks — beware inrush frequency drop'],
          ['6', 'Islands synchronized', 'Frequency, voltage, and phase angle matched before connecting islands'],
          ['7', 'System restoration complete', 'Normal interconnection frequency restored; reserves replenished'],
        ].map(([n, title, desc]) => (
          <div key={n} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="flex-shrink-0 w-8 h-8 bg-mblue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{n}</div>
            <div>
              <div className="font-semibold text-navy-700">{title}</div>
              <div className="text-sm text-slate-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Callout type="key" title="Cranking Path">
        A Cranking Path is a pre-determined switching sequence that establishes an energized
        path from a blackstart resource to the generator to be restarted. It is documented
        in advance under EOP-005-3. During actual restoration, operators follow the Cranking
        Path exactly — improvising energized switching sequences is how you create new faults.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Cold Load Pickup: The Restoration Trap</h2>
      <p>
        Cold load refers to load that has been de-energized for a period of time.
        When re-energized, it draws much higher current than normal operating load
        because thermostats, motors, and heaters all demand maximum power simultaneously.
      </p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 my-4">
        <h3 className="font-bold text-orange-900 mb-2">Cold Load Inrush Effect</h3>
        <p className="text-sm text-orange-800">
          Cold load inrush can be 2-5x normal load demand. On a weak restoration island
          (only 1-2 generators running), this sudden MW demand collapses frequency.
          The restoration generators trip on under-frequency, and the island goes dark again.
          <strong> Solution: pick up load in small increments, monitor frequency response carefully.</strong>
        </p>
      </div>

      <Callout type="pro" title="Island Synchronization Requirements">
        Before connecting two restoration islands, operators must verify:
        (1) Frequency within ±0.5 Hz of each other (check synchroscope),
        (2) Voltage magnitude within ±5% of each other,
        (3) Phase angle within acceptable limits for the synchronizing equipment.
        Connecting out-of-phase islands causes massive MW surges that can trip both islands.
      </Callout>

      <FunFact index={9} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Key Emergency Response Standards</h2>
      <div className="space-y-2">
        {[
          ['EOP-005-3', 'System Restoration from Blackstart — blackstart capability and 2-year training'],
          ['EOP-006-2', 'System Restoration Coordination — RC coordinates multiple TOPs during restoration'],
          ['PRC-006', 'UFLS requirements — settings, MW amounts, and frequency thresholds by region'],
          ['IRO-001-4', 'RC authority — RC may direct emergency actions including load shedding'],
          ['BAL-002-3', 'DCS — 15-minute ACE recovery requirement after contingency events'],
        ].map(([std, desc]) => (
          <div key={std} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono text-xs font-bold text-mblue-600 bg-mblue-50 px-2 py-1 rounded-lg flex-shrink-0">{std}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">IROL Tv, UFLS, blackstart, cold load pickup.</p>
        <Quiz chapterId="emergency-response" questions={QUIZZES['emergency-response']} level={1} />
      </div>
    </ChapterLayout>
  )
}
