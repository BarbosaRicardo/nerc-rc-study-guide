import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function PowerSystems() {
  return (
    <ChapterLayout
      chapterId="power-systems"
      title="Power Systems Fundamentals"
      emoji="🔌"
      prev="interchange"
      next="var"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        The RC exam expects you to understand power system physics at the operator level —
        not at the engineering textbook level, but enough to reason through scenario questions
        about why systems behave the way they do. Governor response, frequency control,
        power-angle relationships — these are the "why" behind the standards.
      </p>

      <GifCard gifKey="frequency" caption="Frequency control in action." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Automatic Generation Control (AGC)</h2>

      <Callout type="key" title="What AGC Does">
        AGC automatically adjusts the MW output of selected generating units within a
        Balancing Authority to: (1) maintain the BA's ACE near zero, and (2) contribute
        to Interconnection frequency control via the BA's frequency bias obligation.
        AGC is secondary control — it operates after governor response has already responded.
      </Callout>

      <div className="my-6">
        <h3 className="font-bold text-navy-700 mb-3">Three Levels of Frequency Control</h3>
        <div className="space-y-3">
          {[
            {
              level: 'Primary',
              time: 'Seconds',
              mechanism: 'Governor response',
              color: 'border-mblue-400 bg-mblue-50',
              desc: 'Autonomous, proportional response to frequency deviation. Governors open/close valves automatically. Arrests frequency decline but does not restore 60 Hz.'
            },
            {
              level: 'Secondary',
              time: 'Minutes',
              mechanism: 'AGC',
              color: 'border-amber-400 bg-amber-50',
              desc: 'AGC adjusts unit setpoints to eliminate ACE and restore frequency to 60 Hz. This is secondary frequency response — it takes over from governor action and restores normal operation.'
            },
            {
              level: 'Tertiary',
              time: '10-30 min',
              mechanism: 'Reserve restoration',
              color: 'border-mgreen-400 bg-mgreen-50',
              desc: 'Replenish contingency reserves consumed during the primary/secondary response. Start additional units, purchase emergency energy, or implement demand response.'
            },
          ].map(({ level, time, mechanism, color, desc }) => (
            <div key={level} className={`border-l-4 pl-4 py-3 rounded-r-xl ${color}`}>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-navy-700">{level} Control</span>
                <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">{time}</span>
                <span className="text-xs text-mblue-600 font-semibold">{mechanism}</span>
              </div>
              <p className="text-sm text-slate-700">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Governor Droop Response</h2>
      <p>
        Governor droop is the relationship between frequency deviation and generator output change.
        A 5% droop means a 5% drop in frequency causes 100% increase in unit output.
      </p>

      <div className="bg-navy-700 rounded-2xl p-6 my-6 font-mono">
        <div className="text-mcyan-400 text-sm font-bold mb-3 uppercase tracking-widest">Droop Calculation Example</div>
        <div className="text-slate-300 text-sm space-y-2">
          <div>Droop = 5% | Unit rating = 100 MW</div>
          <div>Frequency drop: 60.0 → 59.7 Hz (0.3 Hz drop)</div>
          <div className="border-t border-slate-600 pt-2 mt-2">
            <span className="text-amber-400">% deviation = 0.3/60 × 100 = 0.5%</span>
          </div>
          <div>
            <span className="text-mgreen-400">MW response = (0.5% / 5%) × 100 MW = <strong>10 MW</strong></span>
          </div>
        </div>
      </div>

      <Callout type="field" title="Exam Trap: The Droop Formula">
        The governor droop formula on the exam requires tracking units carefully.
        5% droop = 5% frequency deviation causes 100% MW output change.
        A 0.5% frequency deviation with 5% droop = 10% of rated MW = 10 MW for a 100 MW unit.
        Don't confuse "droop of 5%" with "responds to 5% frequency deviation."
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Power Flow Basics: Angle and Voltage</h2>

      <AnalogyCard analogy={{
        title: "MW and MVAR: The Useful and The Invisible",
        concept: "Real power vs reactive power",
        analogy: "Real power (MW) is like the horsepower that actually moves the car. Reactive power (MVAR) is like the pressure in the tires — you can't see it doing work, but without it, everything collapses. Generators produce both. The grid needs both. But only MW shows up on your electric bill. MVAR just makes sure the voltage doesn't collapse while MW is being delivered.",
        gif: "voltage"
      }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-white rounded-2xl border-2 border-mblue-200 p-5">
          <h3 className="font-bold text-mblue-700 mb-3">Real Power (MW)</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Does actual work — motors, lighting, heating</li>
            <li>• Flows from high to low <strong>voltage angle</strong></li>
            <li>• Controlled by governor and AGC setpoints</li>
            <li>• Measured on customer electric meters</li>
            <li>• Changes frequency when supply ≠ demand</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl border-2 border-mcyan-400 p-5">
          <h3 className="font-bold text-mcyan-600 mb-3">Reactive Power (MVAR)</h3>
          <ul className="text-sm text-slate-700 space-y-2">
            <li>• Supports voltage — enables MW transfer</li>
            <li>• Flows from high to low <strong>voltage magnitude</strong></li>
            <li>• Cannot be transported efficiently over distance</li>
            <li>• Controlled by generator excitation, capacitors, reactors</li>
            <li>• Shortage causes voltage collapse, not frequency issues</li>
          </ul>
        </div>
      </div>

      <Callout type="key" title="The Key Distinction for the Exam">
        Real power (MW) problems → frequency symptoms → check ACE, governor response, reserves.
        Reactive power (MVAR) problems → voltage symptoms → check capacitor banks, generator excitation, line loading.
        These are separate phenomena with separate corrective actions. Confusing them on the exam
        leads to choosing actions that are correct for the wrong problem.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Transient Stability vs Voltage Stability</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
          <h3 className="font-bold text-purple-900 mb-2">Transient (Angle) Stability</h3>
          <p className="text-sm text-purple-800">
            Can generators maintain synchronism after a disturbance? Rotor angle swings
            must remain within bounds. Failure = generators pull out of step, trip on out-of-step
            protection, creating cascading generation loss. Caused by high X/R ratio lines,
            heavy loading, or large faults. SOL-based limits on MW flow.
          </p>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
          <h3 className="font-bold text-indigo-900 mb-2">Voltage Stability</h3>
          <p className="text-sm text-indigo-800">
            Can the system maintain adequate voltage as reactive demand increases?
            Failure = voltage collapse. Caused by reactive power shortage — insufficient
            local MVAR, generators at MVAR limits, heavy lagging loads, long lightly
            compensated lines. P-V curve analysis shows the "nose point" beyond which voltage collapses.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">BAL-003-2: Frequency Response Obligation</h2>
      <p>
        BAL-003-2 requires each BA to provide frequency response — specifically, to have
        sufficient governor-responsive generation to contribute to the Interconnection's
        frequency response following a large disturbance.
      </p>

      <Callout type="warning" title="Governor Response Must Be Available">
        If generators are operating at maximum output with no headroom, or if governors
        are blocked (AGC in isochronous mode), the BA cannot provide frequency response.
        The RC must ensure subordinate BAs have sufficient governor-responsive capacity online.
        BAL-003-2 violations are a serious reliability concern — they weaken the Interconnection's
        ability to survive large contingencies.
      </Callout>

      <FunFact index={4} />

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">AGC, governor droop calculations, real vs reactive power.</p>
        <Quiz chapterId="power-systems" questions={QUIZZES['power-systems']} level={1} />
      </div>
    </ChapterLayout>
  )
}
