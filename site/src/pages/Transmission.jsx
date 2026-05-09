import React from 'react'
import ChapterLayout from '../components/ChapterLayout'
import Callout from '../components/Callout'
import FunFact from '../components/FunFact'
import AnalogyCard from '../components/AnalogyCard'
import GifCard from '../components/GifCard'
import Quiz from '../components/Quiz'
import { QUIZZES } from '../data/quizzes'

export default function Transmission() {
  return (
    <ChapterLayout
      chapterId="transmission"
      title="Transmission Operations"
      emoji="⚡"
      prev="balancing"
      next="emergency-prep"
    >
      <p className="text-lg text-slate-600 leading-relaxed">
        Transmission operations are the physical side of reliability — keeping power flowing
        within the limits of what the equipment can handle without catching fire, and within
        the bounds of what the system can withstand without going unstable. The RC monitors
        these limits across its entire footprint and directs corrective action when they're threatened.
      </p>

      <GifCard gifKey="voltage" caption="Every operator's nightmare: voltage collapse." side="right" />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">SOL vs IROL</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-blue-50 border border-blue-300 rounded-2xl p-5">
          <h3 className="font-bold text-blue-900 mb-2">SOL — System Operating Limit</h3>
          <p className="text-sm text-blue-800">
            The value of a system parameter (MW flow, voltage, frequency) that, if exceeded,
            violates facility ratings, voltage limits, or stability limits. SOLs are set by
            TOPs and Planners. There are thousands of SOLs on any large system.
          </p>
        </div>
        <div className="bg-red-50 border border-red-300 rounded-2xl p-5">
          <h3 className="font-bold text-red-900 mb-2">IROL — Interconnection Reliability Operating Limit</h3>
          <p className="text-sm text-red-800">
            A subset of SOLs whose violation could adversely affect the reliability of the
            Interconnection. Violation beyond Tv (max 30 min) risks cascading outages or
            uncontrolled separation. IROLs are identified by the RC and require immediate action.
          </p>
        </div>
      </div>

      <Callout type="warning" title="IROL Violation: The Clock is Ticking">
        Every IROL has a Tv (violation time) ≤ 30 minutes. Once an IROL has been violated
        for Tv, the RC MUST take or direct immediate emergency action — no more planning,
        no more coordinating. The risk of cascading is unacceptable beyond Tv.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">TLR Levels (Eastern Interconnection)</h2>
      <p>
        Transmission Loading Relief (TLR) is a structured procedure for reducing overloads
        on the Eastern Interconnection transmission system by curtailing interchange transactions.
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-navy-700 text-white">
              <th className="px-4 py-3 text-left rounded-tl-xl">Level</th>
              <th className="px-4 py-3 text-left">Action</th>
              <th className="px-4 py-3 text-left rounded-tr-xl">What Gets Curtailed</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', 'Notify', 'Notification only — no curtailment yet'],
              ['2', 'Reconfigure', 'Redirect or reallocate non-firm transactions'],
              ['3a', 'Curtail redirects', 'Curtail non-firm redirected transactions'],
              ['3b', 'Curtail non-firm PTP', 'Curtail non-firm Point-to-Point service'],
              ['4', 'Curtail firm PTP', 'Curtail firm Point-to-Point service'],
              ['5a', 'Curtail all non-firm', 'Curtail all remaining non-firm service'],
              ['5b', 'Curtail firm Network', 'Curtail Network Integration Transmission Service'],
            ].map(([level, action, desc], i) => (
              <tr key={level} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-4 py-3 font-bold text-mblue-600 font-mono">TLR {level}</td>
                <td className="px-4 py-3 font-medium">{action}</td>
                <td className="px-4 py-3 text-slate-600 text-xs">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="field" title="Exam Trap: TLR Level 3b">
        Many candidates confuse 3a and 3b. Remember: 3a = curtail non-firm redirects (transactions
        that were moved to avoid overloads). 3b = curtail non-firm Point-to-Point service (original
        transactions). 3b is a bigger step — it affects market participants directly.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Voltage and Reactive Power Fundamentals</h2>

      <AnalogyCard analogy={{
        title: "The Highway Speed Limit",
        concept: "Thermal limits and emergency ratings",
        analogy: "A transmission line's thermal limit is like a highway's speed limit — you can exceed it briefly in an emergency, but sustained violation means equipment failure, not just a ticket. The line heats up, sags into trees, and trips. Unlike a ticket, that's a multi-state blackout.",
        gif: "powerOut"
      }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-navy-700 mb-3">Real Power (MW) Flow</h3>
          <div className="font-mono text-center text-mblue-600 font-bold my-3 text-sm bg-mblue-50 rounded-xl p-3">
            P ≈ (V₁ · V₂ / X) · sin(δ₁ − δ₂)
          </div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Driven by <strong>voltage angle difference</strong></li>
            <li>• Higher angle at source → power flows to lower angle</li>
            <li>• Angle stability = transient stability concern</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-navy-700 mb-3">Reactive Power (MVAR) Flow</h3>
          <div className="font-mono text-center text-mcyan-500 font-bold my-3 text-sm bg-cyan-50 rounded-xl p-3">
            Q ≈ (V₁ · V₂ / X) · cos(δ) − V₂² / X
          </div>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Driven by <strong>voltage magnitude difference</strong></li>
            <li>• Flows from high-voltage bus to low-voltage bus</li>
            <li>• Voltage stability = reactive adequacy concern</li>
          </ul>
        </div>
      </div>

      <Callout type="key" title="VAR-001-6: TOP Sets Voltage Schedules">
        Under VAR-001-6, the Transmission Operator establishes voltage schedules or reactive power
        output schedules for generators at their interconnection points. Generator Operators
        (under VAR-002-4) must maintain their terminal voltage within these schedules.
        The RC coordinates when the TOP needs adjustments affecting wide-area voltage.
      </Callout>

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Voltage Collapse Mechanism</h2>
      <p>
        Voltage collapse is NOT a sudden event — it's a progressive deterioration that operators
        have multiple chances to prevent, and then it's over in seconds.
      </p>

      <div className="space-y-2 my-4">
        {[
          ['1', 'Loading increases or reactive sources trip', 'bg-blue-100 text-blue-800'],
          ['2', 'Receiving-end voltage drops; lines consume more MVAR', 'bg-amber-100 text-amber-800'],
          ['3', 'Generators hit MVAR limits; can\'t provide more reactive', 'bg-orange-100 text-orange-800'],
          ['4', 'Positive feedback: lower voltage → higher current → more MVAR consumed', 'bg-red-100 text-red-800'],
          ['5', 'Voltage collapses — cascading trips of generators and lines', 'bg-red-200 text-red-900'],
        ].map(([n, step, cls]) => (
          <div key={n} className={`flex items-start gap-3 p-3 rounded-xl ${cls}`}>
            <span className="font-black text-lg flex-shrink-0">{n}.</span>
            <span className="text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>

      <Callout type="pro" title="RC Action During Voltage Emergency">
        The RC's first action is assessment, not immediate load shedding. Assess the system
        state using EMS tools, identify the most effective corrective action (reactive compensation,
        generation dispatch, load shedding), then direct the TOP to act. The authority hierarchy
        is RC → TOP → GOP. Don't skip levels.
      </Callout>

      <FunFact index={7} />

      <h2 className="text-2xl font-bold text-navy-700 mt-8 mb-4">Key Transmission Standards</h2>
      <div className="space-y-2">
        {[
          ['TOP-001-5', 'Transmission operations — real-time monitoring and control requirements'],
          ['VAR-001-6', 'Voltage and reactive control — TOP establishes voltage schedules'],
          ['VAR-002-4', 'Generator reactive capability — GOPs maintain schedules set by TOP'],
          ['FAC-001', 'Facility connection requirements — process for interconnecting new facilities'],
          ['FAC-002', 'Facility connections and operational planning analysis'],
          ['IRO-006-EAST-2', 'TLR procedures for the Eastern Interconnection'],
        ].map(([std, desc]) => (
          <div key={std} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-mono text-xs font-bold text-mblue-600 bg-mblue-50 px-2 py-1 rounded-lg flex-shrink-0">{std}</span>
            <span className="text-sm text-slate-700">{desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6">
        <h2 className="text-xl font-bold text-navy-700 mb-2">Chapter Quiz</h2>
        <p className="text-sm text-slate-500 mb-4">SOL/IROL definitions, TLR levels, voltage fundamentals.</p>
        <Quiz chapterId="transmission" questions={QUIZZES.transmission} level={1} />
      </div>
    </ChapterLayout>
  )
}
